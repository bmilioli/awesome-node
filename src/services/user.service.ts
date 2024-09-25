import * as userRepo from '../repositories/user.repo';
import * as roleRepo from '../repositories/role.repo';
import { v4 as uuidv4 } from 'uuid';
import * as common from '../utils/common.util';
import * as jwt from '../utils/jwt.util';
import * as mailService from './mail.service';
import User from '../models/user.model';

export const createUser = async (user: any) => {
  try {
    const { firstname, lastname, email, password, picture } = user;
    const confirmCode = common.uuidv4Code();
    const encryptPassword = await common.encryptPassword(password);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: encryptPassword,
      picture,
      confirmCode,
      active: false,
    });

    const createdUser = await userRepo.creatUser(newUser);

    await mailService.sendConfirmationEmail(
      firstname,
      lastname,
      email,
      confirmCode,
    );

    return createdUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const login = async (user: any) => {
  try {
    const { email, password } = user;
    const existingUser = await userRepo.getByEmail(email);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const encryptPassword = await userRepo.getPasswordByEmail(email);
    if (!encryptPassword) {
      throw new Error('Password not found');
    }

    const isPasswordMatch = await common.comparePassword(
      password,
      encryptPassword.password,
    );

    if (!isPasswordMatch) {
      throw new Error('Password does not match');
    }

    const token = jwt.sign(existingUser);

    return token;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await userRepo.getById(id);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const activeAccount = async (confirmCode: string) => {
  try {
    const user = await userRepo.getUserByConfirmCode(confirmCode);

    if (!user) {
      throw new Error('User not found');
    }

    await userRepo.activeAccount(user.id);

    const token = jwt.sign(user);

    return token;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const user = await userRepo.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const code = common.uuidv4Code();
    const resetPassword = await mailService.restPasswordEmail(email, code);

    if (!resetPassword) {
      throw new Error('Reset password failed');
    }

    await userRepo.updateResetPasswordCode(user.id, code);

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const renewPassword = async (user: any) => {
  const { email, rememberToken, password } = user;
  try {
    const user = await userRepo.getByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.rememberToken !== rememberToken || rememberToken == '') {
      throw new Error('Code does not match');
    }

    const encryptPassword = await common.encryptPassword(password);
    console.log(encryptPassword);

    await userRepo.updatePassword(user.id, encryptPassword);

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateUser = async (user: any) => {
  try {
    const { firstname, lastname, email, id, picture } = user;
    const existingUser = await userRepo.getByEmail(email);

    if (!existingUser) {
      throw new Error('User not found');
    }

    await userRepo.update({
      firstname,
      lastname,
      email,
      id,
      picture,
    });

    const updatedUser = await userRepo.getById(id);
    const token = jwt.sign({
      _id: updatedUser?.id,
      email: updatedUser?.email,
      firstname: updatedUser?.firstname,
      lastname: updatedUser?.lastname,
      picture: updatedUser?.picture,
    });
    return token;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updatePassword = async (user: any) => {
  try {
    const { email, currentPassword, newPassword, id } = user;

    const userExist = await userRepo.getByEmail(email);
    if (!userExist) {
      throw new Error('User does not exist');
    }
    const encryptPassword = await userRepo.getPasswordByEmail(email);
    if (!encryptPassword) {
      throw new Error('Failed to retrieve encrypted password');
    }

    const passwordMatches = await common.comparePassword(
      currentPassword,
      encryptPassword.password,
    );

    if (passwordMatches) {
      const newEncryptedPassword = await common.encryptPassword(newPassword);
      await userRepo.updatePassword(id, newEncryptedPassword);
      return true;
    } else {
      throw new Error('Password is incorrect');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};



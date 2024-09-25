import User from '../models/user.model';

export const getByEmail = (email: string) => {
  return User.findOne({ email }, { password: 0 });
};

export const getById = (id: string) => {
  return User.findOne({ _id: id }, { password: 0 });
};

export const creatUser = (user: any) => {
  return User.create(user);
};

export const getPasswordByEmail = (email: string) => {
  return User.findOne({ email }, { password: 1 });
};

export const getUserByConfirmCode = (confirmCode: string) => {
  return User.findOne({ confirmCode }, { password: 0 });
};

export const activeAccount = (id: string) => {
  return User.updateOne(
    { _id: id },
    {
      active: true,
      confirmCode: '',
    },
  );
};

export const updateResetPasswordCode = (_id: string, code: string) => {
  return User.updateOne({ _id }, { rememberToken: code });
};

export const updatePassword = (id: string, password: string) => {
  try {
    return User.updateOne({ _id: id }, { password, rememberToken: '' });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const update = (updateUser: any) => {
  return User.updateOne(
    { _id: updateUser.id },
    {
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      email: updateUser.email,
      picture: updateUser.picture,
    },
  );
};

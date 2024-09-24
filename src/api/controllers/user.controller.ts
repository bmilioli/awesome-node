import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import exp from 'constants';
import { Console } from 'console';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ data: token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const activeAccount = async (req: Request, res: Response) => {
  try {
    const token = await userService.activeAccount(req.params.confirmCode);
    res.status(200).json({ message: 'Account activated', data: token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await userService.forgotPassword(req.body.email);
    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const renewPassword = async (req: Request, res: Response) => {
  try {
    await userService.renewPassword(req.body);
    res.status(200).json({ message: 'Password updated' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listProjectsByUser = async (req: Request, res: Response) => {
  try {
    const user = req.params.id;
    const projects = await userService.listProjectsByUser(user);
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const token = await userService.updateUser(req.body);
    res.status(200).json({ data: token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    await userService.updatePassword(req.body);
    res.status(200).json({ message: 'Password updated' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

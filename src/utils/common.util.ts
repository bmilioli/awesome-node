import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const randomCode = (length = 6) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let confirmationCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    confirmationCode += characters[randomIndex];
  }

  return confirmationCode;
};

export const uuidv4Code = () => {
  return uuidv4();
};

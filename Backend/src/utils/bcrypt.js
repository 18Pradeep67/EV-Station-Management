import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password) => {
  return  bcrypt.hash(password, parseInt(process.env.SALT));
};

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

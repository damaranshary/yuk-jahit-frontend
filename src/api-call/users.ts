import axios from "axios";
import {
  LoginFormData,
  RegisterFormData,
  ResponseUserLogin,
  ResponseUserRegister,
  User
} from "../types/users";

export const fetchLoginData = async ({
  email,
  password,
}: LoginFormData): Promise<ResponseUserLogin> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password })
    .catch((err) => err);
  return data.data;
};

export const fetchRegisterData = async ({
  name,
  email,
  password,
  phone,
}: RegisterFormData): Promise<ResponseUserRegister> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/user/register`, {
      name,
      email,
      password,
      phone,
    })
    .catch((err) => err);
  return data.data;
};

export const fetchUserData = async (
  token: string
): Promise<User> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: header })
    .catch((err) => err);
  return data.data.user;
};

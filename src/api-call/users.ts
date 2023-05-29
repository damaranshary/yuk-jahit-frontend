import axios from "axios";
import {
  LoginFormData,
  RegisterFormData,
  ResponseUserLogin,
  ResponseUserRegister,
  User,
} from "../types/users";

export const fetchLoginData = async ({
  // api call for logging in
  email,
  password,
}: LoginFormData): Promise<ResponseUserLogin> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password })
    .catch((err) => err);
  return data.data;
};

export const fetchRegisterData = async ({
  // api call for registering
  name,
  email,
  password,
  phone,
  address,
}: RegisterFormData): Promise<ResponseUserRegister> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/user/register`, {
      name,
      email,
      password,
      phone,
      address,
    })
    .catch((err) => err);
  return data.data;
};

export const fetchUserData = async (
  // api call for getting user data
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

export const updateUserData = async (
  // api call for updating user data
  token: string,
  name: string,
  phone: string,
  address: string
): Promise<User> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .put(
      `${import.meta.env.VITE_API_URL}/user/me`,
      { name, phone, address }, // you can only modify name, phone, and address in this api for user profile
      { headers: header }
    )
    .catch((err) => err);
  return data.data.user;
};

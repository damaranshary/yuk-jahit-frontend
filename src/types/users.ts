export interface ResponseUserLogin {
  name: string;
  email: string;
  token: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ResponseUserRegister {
  name: string;
  email: string;
  token: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  tokens: Token[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Token {
  token: string
  _id: string
}

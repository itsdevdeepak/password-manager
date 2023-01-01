import axios from "axios";

type User = {
  name?: string;
  email: string;
  password: string;
};

const url = "http://localhost:3001";

export const createUser = async (user: User) => {
  try {
    const token: string = await (await axios.post(`${url}/signup`, user)).data;
    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

export const signIn = async (user: User) => {
  try {
    const token = await (await axios.post(`${url}/signin`, user)).data;
    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

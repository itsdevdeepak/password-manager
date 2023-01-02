import axios from "axios";

export type Password = {
  name?: string;
  website: string;
  username?: string;
  email?: string;
  password: string;
};

const url = process.env.PM_URL || "http://localhost:3001";

const getConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllPassword = async (token: string) => {
  try {
    const passwordList: Password = await (
      await axios.get(`${url}/api/passwords`, getConfig(token))
    ).data;
    return passwordList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

export const getPassword = async (token: string, id: string) => {
  try {
    const password: Password = await (
      await axios.get(`${url}/api/password/${id}`, getConfig(token))
    ).data;
    return password;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

export const createPassword = async (token: string, password: Password) => {
  try {
    const res: Password = await (
      await axios.post(`${url}/api/password`, password, getConfig(token))
    ).data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

export const updatePassword = async (
  token: string,
  id: string,
  password: Password
) => {
  try {
    const res: Password = await (
      await axios.post(`${url}/api/password/${id}`, password, getConfig(token))
    ).data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

export const deletePassword = async (token: string, id: string) => {
  try {
    const res: Password = await (
      await axios.delete(`${url}/api/password/${id}`, getConfig(token))
    ).data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response!.data;
    } else {
      return error;
    }
  }
};

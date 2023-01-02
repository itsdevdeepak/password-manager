import { getAllPassword } from "../api/password.js";

export const all = async (token: string) => {
  try {
    const passwords = await getAllPassword(token);
    if (passwords.error) {
      throw new Error();
    }
    return passwords.data;
  } catch (error) {
    console.log("oops something went worng");
  }
};

import axios from "axios";
export const createUser = async (user) => {
    try {
        const res = await axios({
            method: "POST",
            url: "http://localhost:3001/signup",
            data: user,
        });
        if (!res.data.error || !res.data.errors) {
            console.log(res);
        }
    }
    catch (err) {
        console.error(err.response.data);
    }
    return "";
};

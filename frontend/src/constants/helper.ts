import axios, { isAxiosError } from "axios";
import {jwtDecode} from "jwt-decode";

// server domain
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Make Api Requests

// to get username from token
export const getUsername = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("Cannot find token");
  }
  const decode: { username: string } = await jwtDecode(token);
  // console.log(decode);
  return decode;
};

// authenticate function
export const authenticate = async (username: string) => {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
};

// get user details
export const getUser = async (username: string) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match...!" };
  }
};

//register user function
export const registerUser = async (credentials: {
  profileImg: string | null;
  username: string;
  email: string | undefined;
  password: string | undefined;
}) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    const { username, email } = credentials;
    /**send email */
    if (status === 201) {
      // Registration was successful
      await axios.post(`/api/registerMail`, {
        username,
        userEmail: email,
        text: msg,
      });
      return Promise.resolve(msg);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      // Check if it's an AxiosError
      if (error.response?.status === 400) {
        // This means there was a Bad Request (HTTP 400) response
        const errorMsg = error.response?.data?.msg;
        if (errorMsg) {
          // You can access the error message here
          console.log(errorMsg);
          return Promise.reject(errorMsg);
        }
      } else {
        // Handle other Axios errors here if needed
        console.log("Axios Error:", error.message);
        return Promise.reject(
          `Server error!... make sure you have a stable connection`
        );
      }
    } else {
      // Handle non-Axios errors here
      console.log("Error:", error);
      return Promise.reject(error);
    }
  }
};

// login function
export const verifyPassword = async (username: string, password: string) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    if (isAxiosError(error)) {
      // Check if it's an AxiosError
      if (error.response?.status === 404) {
        // This means there was a Bad Request (HTTP 404) response
        const errorMsg = error.response.data.message;
        if (errorMsg) {
          // You can access the error message here
          return Promise.reject(errorMsg);
        }
      } else {
        // Handle other Axios errors here if needed
        console.log("Axios Error:", error.message);
        return Promise.reject(
          `Server error!... make sure you have a stable connection`
        );
      }
    } else {
      // Handle non-Axios errors here
      console.log("Error:", error);
      return Promise.reject(error);
    }
  }
};

// update user profile function
export const updateUser = async (updateInfo: {
  profileImg: string | null;
  username: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
}) => {
  try {
    const token = await localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.put("/api/updateUser", updateInfo, config);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile...!" });
  }
};

// generate OTP function
export const generateOTP = async (username: string) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    // send mail with the OTp
    if (status === 201) {
      const {
        data: { email },
      } = await getUser(username);
      const text = `Your Password Recovery OTP is ${code}. verify and recover your password.`;
      const subject = "OTP for recovery password";
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject,
      });
    }
    return Promise.resolve({ code });
  } catch (error) {
    return Promise.reject({ error });
  }
};

// verify OTP function
export const verifyOTP = async (data: { username: string; code: string }) => {
  try {
    const { username, code } = data;
    const { data: responseData, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return Promise.resolve({ data: responseData, status });
    // const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// reset password function
export const resetPassword = async (username: string, password: string) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });

    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
};



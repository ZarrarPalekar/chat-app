import axios from "axios";
import { REGISTRATION_FAIL, REGISTRATION_SUCCESS } from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data;`,
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: { success: response.data.status, token: response.data.token },
      });
      console.log("response: ", response.data);
    } catch (error) {
      console.error(error.response.data.error);
      dispatch({
        type: REGISTRATION_FAIL,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  };
};

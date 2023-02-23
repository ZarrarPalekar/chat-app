import { REGISTRATION_FAIL, REGISTRATION_SUCCESS } from "../types/authType";
import jwtDecode from "jwt-decode";
const authState = {
  loading: true,
  authenticated: false,
  error: "",
  success: "",
  myInfo: "",
};

const tokenDecoder = (token) => {
  const decodedToken = jwtDecode(token);
  const expTime = new Date(decodedToken.exp * 1000);

  if (new Date() > expTime) return null;

  return decodedToken;
};

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  switch (type) {
    case REGISTRATION_FAIL:
      return {
        ...state,
        error: payload.error,
        authenticated: false,
        myInfo: "",
        loading: true,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: payload.success,
        authenticated: true,
        myInfo: tokenDecoder(payload.token),
        loading: false,
      };

    default:
      break;
  }
  return state;
};

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_PORT = "8080";

export const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYxODQ1YTgwYTFhZWZiNzE3ZDE5YjUiLCJmaXJzdE5hbWUiOiJUaOG6r25nIiwibGFzdE5hbWUiOiJOZ3V54buFbiIsImlhdCI6MTY1MjIzMzQwMiwiZXhwIjoxNjU0ODI1NDAyfQ.8tbwvoIgK1TygQj_ADjaZAuZJrjggQNEs2d8LosG3fs";

export const LOGIN = `${BASE_URL}/user/login`;

export const REGISTER = `${BASE_URL}/api/register`;

export const ADD_CARTS = `${BASE_URL}/api/cart`

export const REQUEST_FORGOT_PASSWORD = `${BASE_URL}/user/forgotPassword`;

export const SIGNUP = `${BASE_URL}/user/register`;

export const EDIT_PROFILE = `${BASE_URL}/user/updateProfile`;

export const UPLOAD_AVATAR = `${BASE_URL}/user/updateAvatar`;

export const GET_CATEGORY = `${BASE_URL}/category`;

export const GET_ROOM_BY_CATEGORY = `${BASE_URL}/category`;
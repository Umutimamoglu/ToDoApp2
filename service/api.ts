import { IUser } from "../types";
import axiosInstance, { BLOSSOM_TOKEN_NAME, saveToken } from "./config";
import { AxiosError } from "axios";

type RegisterUserTypes = IUser;

export const registerUser = async ({
    email,
    name,
    password,
}: RegisterUserTypes) => {
    try {
        const response = await axiosInstance.post("/users/create", {
            email,
            password,
            name,
        });
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log("error response data:", error.response?.data);
            console.log("error request:", error.request);
            console.log("error message:", error.message);
        } else {
            console.log("unexpected error:", error);
        }
        throw error;
    }
};

type LoginUserTypes = Omit<IUser, "name">;
export const loginUser = async ({ email, password }: LoginUserTypes) => {
    console.log("Login data:", { email, password }); // E-postayı ve şifreyi kontrol edin
    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });
        console.log("Login response:", response.data); // Yanıt verilerini kontrol edin
        const _token = response.data.token;
        axiosInstance.defaults.headers.common["Authorization"] = _token;
        await saveToken(BLOSSOM_TOKEN_NAME, _token);
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log("error response data:", error.response?.data);
            console.log("error request:", error.request);
            console.log("error message:", error.message);
        } else {
            console.log("unexpected error:", error);
        }
        throw error;
    }
};

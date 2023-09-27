import { toast } from "react-toastify";

export const displayLoginNotification = (text) => {
    toast.success(text);
};
export const displayLoginError = (text) => {
    toast.error(text);
};
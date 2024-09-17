import axios from "axios";
import { updatedProfile } from "../../../types/types";

const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const API_URL = `${BACKEND_URL}/users`;

// Logout User
const logout = async () => {
  const resp = await axios.get(`${API_URL}/logout`);
  return resp.data.message;
};
// get login status
const getLoginStatus = async () => {
  const resp = await axios.get(`${API_URL}/loginStatus`);
  return resp.data;
};
// get User
const getUser = async () => {
  const resp = await axios.get(`${API_URL}/getUser`);
  return resp.data;
};
// Update User
const updateUser = async (userData: updatedProfile) => {
  const resp = await axios.patch(`${API_URL}/updateUser`, userData);
  return resp.data;
};
// get users
const getUsers = async () => {
  const resp = await axios.get(`${API_URL}/getUsers`);
  return resp.data;
};
// delete user
const deleteUser = async (id: string) => {
  const resp = await axios.delete(`${API_URL}/${id}`);
  return resp.data.message;
};
// upgrade user
const upgradeUser = async (userData) => {
  const resp = await axios.post(`${API_URL}/upgradeUser`, userData);
  return resp.data.message;
};

// Login with google
const loginWithGoogle = async (userToken) => {
  const resp = await axios.post(`${API_URL}/google/callback`, userToken);
  return resp.data;
};

const authService = {
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  getUsers,
  deleteUser,
  upgradeUser,
  loginWithGoogle,
};
export default authService;

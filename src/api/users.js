import { client } from "../utils/services/fetchClient";

export const getUsers = () => {
  return client.get('/users');
};

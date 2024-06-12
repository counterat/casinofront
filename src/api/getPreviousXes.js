import { client } from "../utils/services/fetchClient";

export const getPreviousXes = () => {
  return client.get('/get_previous_xes');
};

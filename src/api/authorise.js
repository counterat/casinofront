import { client } from "../utils/services/fetchClient";

export const authorise = (tgUsername, tgId, invitation_code) => {
  return client.post('/authorize', {id:tgId, tgusername:tgUsername, invitation_code : invitation_code});
};

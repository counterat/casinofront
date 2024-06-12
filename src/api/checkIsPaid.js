import { client } from "../utils/services/fetchClient";

export const checkIsPaid = (payment_id) => {
  return client.post('/check_is_paid', {payment_id:payment_id});
};

import { WITHDRAWAL_MODAL_TITLE } from "../constants";

export const getRefillWithdrawalTitle = (hasForm, hasSuccess, hasAddress) => {
  if (hasForm || hasAddress) {
    return WITHDRAWAL_MODAL_TITLE.REFILL;
  }

  if (hasSuccess) {
    return WITHDRAWAL_MODAL_TITLE.SUCCESS;
  }

  return WITHDRAWAL_MODAL_TITLE.CHOOSE_METHOD;
};

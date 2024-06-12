import { REFILL_MODAL_TITLE } from "../constants";

export const getRefillModalTitle = (hasForm, hasSuccess, hasAddress) => {
  if (hasForm || hasAddress) {
    return REFILL_MODAL_TITLE.REFILL;
  }

  if (hasSuccess) {
    return REFILL_MODAL_TITLE.SUCCESS;
  }

  return REFILL_MODAL_TITLE.CHOOSE_METHOD;
};

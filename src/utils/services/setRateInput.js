import { CHANGE_USER_BALANCE, DECREASE, DIVIDE, INCREASE, MAKE_MAX, MIN_RATE_INPUT_VALUE, MULTIPLY_ONE_AND_A_HALF, MULTIPLY_TWICE, SET_BY_USER } from "../constants";
import { validateInputValue } from "./validateInputValue";

export const setRateInput = (
  option,
  rateInputValue,
  setIsNotEnoughMoneyError,
  setRateInputValue,
  userCurrentBalance,
  customValue,
) => {
  setIsNotEnoughMoneyError(false);
  let inputValue = Number(rateInputValue);

  switch (option) {
    case INCREASE:
      inputValue++;
      break;
    case DECREASE:
      inputValue--;
      break;
    case DIVIDE:
      inputValue = Number((inputValue / 2).toFixed(2));
      break;
    case MULTIPLY_ONE_AND_A_HALF:
      inputValue = Number((inputValue * 1.5).toFixed(2));
      break;
    case MULTIPLY_TWICE:
      inputValue = inputValue * 2;
      break;
    case MAKE_MAX:
      inputValue = userCurrentBalance;
      break;
    case SET_BY_USER:
      inputValue = Number(customValue);
      break;
    case CHANGE_USER_BALANCE:
      inputValue = '';
      break;
    default:
      return inputValue;
  }

  const validInput = validateInputValue(
    inputValue,
    MIN_RATE_INPUT_VALUE,
    userCurrentBalance,
    setIsNotEnoughMoneyError,
  );

  setRateInputValue(validInput);
};

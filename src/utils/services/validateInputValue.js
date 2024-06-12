export const validateInputValue = (inputValue, min, max, setNoMoneyError) => {
  if (inputValue < min) {
    return min;
  }

  if (inputValue > max) {
    setNoMoneyError(true);
    
    return max;
  }

  return inputValue;
};

export const createCopy = (data, setIsCopied) => {
  navigator.clipboard.writeText(data);

  setIsCopied(() => true);

  setTimeout(() => {
    setIsCopied(() => false);
  }, 3000);
};

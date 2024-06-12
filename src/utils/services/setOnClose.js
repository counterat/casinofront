export const setOnClose = (setIsClose, setHasElement) => {
  setIsClose(true);

  setTimeout(() => {
    setHasElement(false);
  }, 400);
};

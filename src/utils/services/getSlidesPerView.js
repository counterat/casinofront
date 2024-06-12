import { userDeviceWidth } from "../constants";

export const getSlidesPerView = (slideWidth, spaceBetween, slidesAmount) => {
  const width = userDeviceWidth > 640 ? 640 : userDeviceWidth;

  let slidesPerView = width / (slideWidth + spaceBetween);

  if (slidesPerView > slidesAmount) {
    return slidesAmount;
  }

  return slidesPerView;
};

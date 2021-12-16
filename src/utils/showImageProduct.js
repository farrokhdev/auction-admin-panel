import { DEFAULT_URL_IMAGE } from "./defaultImage";

export const handleShowImage = (item) => {
  return item?.media?.length &&
    item?.media?.filter((item) => item?.is_default === true)[0]?.exact_url
    ? item?.media?.filter((item) => item?.is_default === true)[0]?.exact_url
    : DEFAULT_URL_IMAGE;
};

/**
 * @description This file contains utility functions.
 */
export const getJwtToken = () => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    if (cookie.startsWith("token=")) {
      return cookie.split("=")[1];
    }
  }
  return null;
};

export const setDefaultAjaxHeaders = () => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    $.ajaxSetup({
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }
};

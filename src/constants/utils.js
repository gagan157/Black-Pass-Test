import { toast } from "react-toastify";

export const serialize = (params) => {
  var str = [];
  for (var p in params)
    if (
      params.hasOwnProperty(p) &&
      params[p] !== undefined &&
      params[p].toString()
    ) {
      if (Array.isArray(params[p])) {
        str.push(
          encodeURIComponent(p) +
          "=" +
          encodeURIComponent(JSON.stringify(params[p]))
        );
      } else {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
    }
  return str.join("&");
};

export const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const copyHandler = async ({ data, label = "" }) => {
  try {
    data && (await navigator.clipboard.writeText(data));
    // toast.success(label + " " + "copied successfully");
    toast.success("Copied!");
  } catch (err) {
    toast.error(err);
  }
};
export const isMobileDevice = () => {
  // return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isDevices = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const formatNumber = (num) => {
  num = parseFloat(num);
  if (num % 1 === 0) {
    return num.toFixed(0); // Convert to whole number
  } else {
    return num.toFixed(2); // Show with 2 decimal places
  }
}
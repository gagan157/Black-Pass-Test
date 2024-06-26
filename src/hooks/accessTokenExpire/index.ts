import { AxiosError } from "axios";
import { useNavigationAction } from "hooks";
import { toast } from "react-toastify";

interface CustomError extends Error {
  statusCode?: number;
}

type AppError = Error | AxiosError<CustomError>;

export const useCustomError = () => {
  const { handleAction } = useNavigationAction();

  const handleError = (error: AppError) => {
    if (isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        switch (statusCode) {
          case 400:
            toast.error(axiosError.response.data.message || "Bad Request", {
              toastId: "bedrequesterror",
            });
            break;
          case 401:
            toast.error(axiosError.response.data.message, {
              toastId: "unauthorizedError",
            });
            setTimeout(() => {
              handleAction("Logout");
            }, 2000);
            break;
          case 404:
            const message = axiosError.response.data.message;
            toast.error(message);
            if (message === "wallet not found or connect your wallet again") {
              setTimeout(() => {
                handleAction("Logout");
              }, 2000);
            }
            break;
          case 500:
            toast.error(
              axiosError.response.data.message || "Internal Server Error",
              {
                toastId: "internalServererror",
              }
            );
            break;
          case 409:
            toast.error(axiosError.response.data.message);
            break;
          case 403:
            toast.error(axiosError.response.data.message);
            break;
          default:
            console.error("Unhandled Status Code:", statusCode);
            break;
        }
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      } else {
        console.error("Error:", axiosError.message);
      }
    } else {
      if (isJsonSerializable(error)) {
        const customeErr = JSON.parse(JSON.stringify(error));
        toast.error(customeErr.shortMessage ? customeErr.shortMessage : customeErr.message);
      } else {
        toast.error(error && error.message ? error.message : "Something went wrong. Please try again later.");
      }
    }
  };

  function isJsonSerializable(obj: any) {
    try {
      JSON.stringify(obj);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Type guard to check if the error is an AxiosError
  const isAxiosError = (error: any): error is AxiosError<CustomError> => {
    return "isAxiosError" in error && error.isAxiosError === true;
  };

  return {
    handleError,
  };
};
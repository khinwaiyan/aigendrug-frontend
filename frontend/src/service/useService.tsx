import axios from "axios";
import { jobService } from "./job/api";
import { experimentService } from "./experiment/api";

export const useService = () => {
  const instance = axios.create({
    baseURL: "https://api-aigendrug.lighterlinks.io",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return {
    jobService: new jobService(instance),
    experimentService: new experimentService(instance),
  };
};

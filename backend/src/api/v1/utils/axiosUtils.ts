// axios-utils.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "../../../lib/logger";

type RequestOptions = AxiosRequestConfig & {
  token?: string; // optional auth token
};

// Store Axios instances keyed by base URL
const clients: Record<string, AxiosInstance> = {};

/**
 * Extract the base URL from a full URL
 */
const getBaseUrl = (url: string) => {
  const urlObj = new URL(url);
  return `${urlObj.protocol}//${urlObj.host}`;
};

/**
 * Get or create an Axios instance for a base URL
 */
const getClient = (url: string, token?: string): AxiosInstance => {
  const baseURL = getBaseUrl(url);

  if (!clients[baseURL]) {
    const client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    client.interceptors.request.use(
      (config) => {
        const reqToken = token;
        if (reqToken) {
          config.headers = config.headers || {};
          config.headers["Authorization"] = `Bearer ${reqToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          logger.error("Axios error", {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          logger.error("Axios: no response received", { request: error.request });
        } else {
          logger.error("Axios request setup error", { message: error.message });
        }
        return Promise.reject(error);
      },
    );

    clients[baseURL] = client;
  }

  return clients[baseURL];
};

/**
 * Generic GET
 */
export const axiosGet = async <T>(
  url: string,
  options?: RequestOptions,
): Promise<T> => {
  const client = getClient(url, options?.token);
  const response = await client.get<T>(url, options);
  return response.data;
};

/**
 * Generic POST
 */
export const axiosPost = async <T>(
  url: string,
  data?: unknown,
  options?: RequestOptions,
): Promise<T> => {
  const client = getClient(url, options?.token);
  const response = await client.post<T>(url, data, options);
  return response.data;
};

/**
 * Generic PUT
 */
export const axiosPut = async <T>(
  url: string,
  data?: unknown,
  options?: RequestOptions,
): Promise<T> => {
  const client = getClient(url, options?.token);
  const response = await client.put<T>(url, data, options);
  return response.data;
};

/**
 * Generic DELETE
 */
export const axiosDel = async <T>(
  url: string,
  options?: RequestOptions,
): Promise<T> => {
  const client = getClient(url, options?.token);
  const response = await client.delete<T>(url, options);
  return response.data;
};

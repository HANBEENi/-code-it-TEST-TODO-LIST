import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

interface AxiosType {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  body?: object;
  params?: object;
}

interface ResponseType {
  data?: any;
}

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

const axiosWrap = async ({ url, method, body, params }: AxiosType) => {
  try {
    const config: AxiosRequestConfig = {
      baseURL: "/api",
      params,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      {};
    return data;
  } catch (error) {
    console.log("API 요청 에러: ", error);
    throw error;
  }
};

export const GET = (url: string, params?: {}) =>
  axiosWrap({ url, method: "get", params });

export const POST = (url: string, body?: {}, params?: {}) =>
  axiosWrap({ url, method: "post", body, params });

export const PUT = (url: string, body?: {}, params?: {}) =>
  axiosWrap({ url, method: "put", body, params });

export const PATCH = (url: string, body?: {}, params?: {}) =>
  axiosWrap({ url, method: "patch", body, params });

export const DELETE = (url: string) => axiosWrap({ url, method: "delete" });

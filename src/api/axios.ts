import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

interface AxiosType {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  body?: Record<string, unknown>; // 구체적인 타입으로 변경
  params?: Record<string, unknown>; // 구체적인 타입으로 변경
}

const axiosWrap = async ({
  url,
  method,
  body,
  params,
}: AxiosType): Promise<AxiosResponse> => {
  try {
    const config: AxiosRequestConfig = {
      baseURL: "/api",
      params,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 메서드에 따라 axios 호출
    if (method === "get") return await axios.get(url, config);
    if (method === "post") return await axios.post(url, body, config);
    if (method === "put") return await axios.put(url, body, config);
    if (method === "delete") return await axios.delete(url, config);
    if (method === "patch") return await axios.patch(url, body, config);

    throw new Error(`Unsupported method: ${method}`);
  } catch (error) {
    console.error("API 요청 에러:", error);
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

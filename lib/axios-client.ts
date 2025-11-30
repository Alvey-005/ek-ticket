import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://65.0.99.141:8080",
  withCredentials: true,
  timeout: 20000,
});

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

const normalizeError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      code: error.response?.data?.code,
    };
  }
  return {
    message: error instanceof Error ? error.message : "Unknown error",
    status: 500,
  };
};

// ================= REQUEST INTERCEPTOR =================
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const token = getAccessToken();

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(normalizeError(error));
  }
);

// ================= RESPONSE INTERCEPTOR =================
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data?.access_token;

        if (newToken) {
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", newToken);
          }

          axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

export default axiosClient;

import useAuth from "./useAuth";
import axios from "../axios";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh() {
    try {
      const response = await axios.get("/refresh", {
        timeout: 3000,
        withCredentials: true,
      }).then(setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.accessToken,
          email: response.data.email,
        };
      }));
      return response.data.accessToken;
    } catch (error) {
      throw error;
    }
  }

  return refresh;
}

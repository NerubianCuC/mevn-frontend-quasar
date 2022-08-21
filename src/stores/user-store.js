import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expireIn = ref(null);
  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      token.value = res.data.token;
      expireIn.value = res.data.expireIn;
      sessionStorage.setItem("user", "true");
      setTime();
    } catch (error) {
      if (error.response) {
        //  console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log("Error", error.message);
      }
    }
  };
  const register = async (email, password, repassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        repassword,
      });

      token.value = res.data.token;
      expireIn.value = res.data.expireIn;
      sessionStorage.setItem("user", "true");
      setTime();
    } catch (error) {
      if (error.response) {
        //  console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log("Error", error.message);
      }
    }
  };
  const logout = async () => {
    try {
      const res = await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
    }
  };
  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expireIn.value * 1000 - 6000);
  };
  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expireIn.value = res.data.expireIn;
      sessionStorage.setItem("user", "true");
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("user");
    }
  };
  const resetStore = () => {
    (token.value = null), (expireIn.value = null);
  };
  return {
    token,
    expireIn,
    access,
    refreshToken,
    logout,
    register,
  };
});

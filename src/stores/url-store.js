import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useUrlStore = defineStore("url", () => {
  const userStore = useUserStore();
  const links = ref([]);
  const createLink = async (longlink) => {
    try {
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longlink,
        },
      });
      console.log(res.data);
      links.value.push(res.data.newlink);
    } catch (error) {
      throw error.response?.data || error;
    }
  };
  const getLinks = async () => {
    try {
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      /* links.value = res.data.links.map((item) => {
        return {
          longlink: item.longlink,
          nanoLink: item.nanoLink,
        };
      }); */
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  // getLinks();
  return {
    createLink,
    links,
    getLinks,
  };
});

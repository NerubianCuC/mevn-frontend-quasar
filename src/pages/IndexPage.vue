<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn> -->
    <q-btn class="m-3" @click="createLink">Crear Link</q-btn>
    <!-- <q-btn @click="userStore.logout">Cerrar Session</q-btn> -->
    {{ userStore.token }} -- {{ userStore.expireIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";
const userStore = useUserStore();
userStore.refreshToken();

const createLink = async () => {
  console.log(userStore.token);
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
      data: {
        longlink:
          "https://www.google.com/search?q=quasar+cli+instalacion&oq=quasar+cli+instalacion&aqs=chrome..69i57j0i22i30j69i64.6404j0j7&sourceid=chrome&ie=UTF-8",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>

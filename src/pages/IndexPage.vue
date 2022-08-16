<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn class="m-3" @click="createLink">Crear Link</q-btn>
    {{ token }} -- {{ expireIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue-demi";
const token = ref("");
const expireIn = ref("");
//const longlink = ref("");
const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "yudier@gmail.com",
      password: "123456",
    });

    token.value = res.data.token;
    expireIn.value = res.data.expireIn;
    setTime();
  } catch (error) {
    console.log(error);
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
    setTime();
  } catch (error) {
    console.log(error);
  }
};
const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
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
refreshToken();
</script>

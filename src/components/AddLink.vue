<script setup>
import { ref } from "vue";
import { useUrlStore } from "src/stores/url-store";
import { useNotify } from "../composables/notify";
const useLink = useUrlStore();
const { showNotify } = useNotify();

const link = ref("");
const loading = ref(false);
const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify("Link Agregado con Exito", "green");
    link.value = "";
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return error.errors.forEach((element) => {
        showNotify(element.msg);
      });
    }
    showNotify(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Ingrese el Link aqui"
      placeholder="Ingrese su super Link"
      :rules="[(val) => (val && val.trim() !== '') || 'Escribe algo por favor']"
    >
    </q-input>
    <q-btn
      label="Agregar"
      color="primary"
      type="submit"
      class="q-mt-sm full-width"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

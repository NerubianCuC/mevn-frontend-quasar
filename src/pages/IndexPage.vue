<template>
  <q-page padding>
    <AddLink />
    <pre>
      {{ useLink.links }}
    </pre>
    <template v-for="link of useLink.links" :key="link._id">
      <LinkCard />
    </template>
  </q-page>
</template>

<script setup>
import { useUrlStore } from "../stores/url-store";
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";
const useLink = useUrlStore();
useLink.getLinks();
</script>

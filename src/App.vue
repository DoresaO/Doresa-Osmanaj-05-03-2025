<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  computed: {
    showHeader() {
      return this.$route.name !== "login"; 
    },
  },
};
</script>

<template>
  <div id="app">
    <AppHeader v-if="showHeader" />
    <router-view />
  </div>
</template>

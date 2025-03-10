<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
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
    <AppFooter v-if="showHeader" />
  </div>
</template>

<script lang="ts">
// import Sidebar from '@/components/sidebar/Sidebar.vue';
import AppSidebar from '../src/components/sidebar/Sidebar.vue';
import { sidebarWidth } from '../src/components/sidebar/state';

export default {
  components: {
    AppSidebar
  },
  setup() {
    return { sidebarWidth }
  }
}

</script>

<template>
  <AppSidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<style scoped>
</style>
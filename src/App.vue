<script lang="ts">
// import Sidebar from '@/components/sidebar/Sidebar.vue';
import AppSidebar from '../src/components/sidebar/Sidebar.vue';
import { sidebarWidth } from '../src/components/sidebar/state';
import { computed, ref } from 'vue';


export default {
  components: {
    AppSidebar
  },
  setup() {

    // Una nueva ref para mantener el estado de visibilidad de la barra lateral
    const isSidebarVisible = ref(false);

    // Actualizar isSidebarVisible basado en el evento emitido
    const updateSidebarVisibility = (isVisible: boolean) => {
      isSidebarVisible.value = isVisible;
    };

    // La lógica para calcular el marginLeft
    const marginLeft = computed(() => {
      return isSidebarVisible.value ? sidebarWidth.value : '0px';
    });

    return { sidebarWidth, updateSidebarVisibility, marginLeft }
  }
}

</script>

<template>
  <!-- <AppSidebar /> -->
  <AppSidebar @sidebar-visibility="updateSidebarVisibility" />
  <div :style="{ 'margin-left': marginLeft }">
  <!-- <div :style="{ 'margin-left': sidebarWidth }"> -->
    <router-view />
  </div>
</template>

<style scoped>
</style>
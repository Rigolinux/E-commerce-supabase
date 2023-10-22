<script lang="ts">
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'

export default {
  name: 'AppSidebar',
  props: {},
  components: {
    SidebarLink
  },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}

</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }" >

    <h1>
      <!-- span que si esta collapsed desabilita el onclik -->
      <span v-if="collapsed ">
        <center>
          <!-- <div>V</div>
          <div>S</div> -->
          <img 
            alt="Vue logo" 
            src="@/assets/logo.svg" 
            
            style="
            width: 50px;
            height: 50px;" 
          />
        </center>
      </span>
      <span v-else>
        <br />
        <center>
          <img 
            alt="Vue logo" 
            src="@/assets/logo.svg" 
            @click="$router.push('/')"
            style="
            width: 50px;
            height: 50px;
            cursor: pointer;"
          /> 
        </center>
      </span>
    
      <br /><br /><br />

    </h1>

    <SidebarLink to="/" class="mdi mdi-home icon">
      Home 
    </SidebarLink>
    <br />
    <SidebarLink to="/products" class="mdi mdi-shopping icon">
      Productos 
    </SidebarLink>
    <br />
    <SidebarLink to="/categories" class="mdi mdi-shape icon">
      Categorias 
    </SidebarLink>
    <br />
    <SidebarLink to="/cart" class="mdi mdi-cart-variant icon">
      Carrito 
    </SidebarLink>
    <br />
    <SidebarLink to="/logout" class="mdi mdi-logout icon">
      LogOut 
    </SidebarLink>

    


    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
      <v-icon>mdi-chevron-double-left</v-icon>
      <i class="fas fa-angle-double-left" />
    </span>

    <br />

  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>

.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em 0 0.75em;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.icon {
  /* width: 50px;
  height: 50px; */
  /* align-items: center; */
  font-size: 20px;
  /* padding: 0.75em 0 0.75em; */
  /* justify-content: center; */
}
</style>./state
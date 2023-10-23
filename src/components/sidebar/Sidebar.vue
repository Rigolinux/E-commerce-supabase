<script lang="ts">
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'
import { supabase } from '../../config/supbaseClient';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useRouteStore } from '../../stores/RouteStore';
import { ref } from 'vue';


export default {
  name: 'AppSidebar',
  props: {},
  components: {
    SidebarLink
  },
  setup() {

    const router = useRouter();
    const route = useRoute();

    const logout = async() =>{
      await supabase.auth.signOut()
      router.push({ 
        name: 'login' 
      })
    }

    const showNavbar = ref(true);
    const isAuthenticated = ref(false);
    const Banner = useRouteStore();
    
    supabase.auth.onAuthStateChange((_event, session) => {
      isAuthenticated.value = session !== null;
      showNavbar.value      = isAuthenticated.value && !route.meta.hideNavbar;
    })

    // Verificando el nivel de acceso del usuario
    const isAdmin = ref(false);

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if(session) {
        const resp = await supabase.rpc('get_claims', { uid: session.user.id });
        isAdmin.value = resp.data && resp.data.Adminlevel;
      } else {
        isAdmin.value = false;
      }
    })
    
    return { collapsed, toggleSidebar, sidebarWidth, logout, isAuthenticated, showNavbar, Banner, isAdmin }
  }
}

</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }" v-if="isAuthenticated && showNavbar && !Banner.removeNav">

    <h1>
      <span v-if="collapsed ">
        <center>
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
      <a class="sidebar-text">
        Home
      </a>
    </SidebarLink>

    <br />
    <SidebarLink to="/products" class="mdi mdi-basket-outline icon">
      <a class="sidebar-text">
        Productos
      </a>
    </SidebarLink>

    <br v-if="isAdmin" />
    <SidebarLink v-if="isAdmin" to="/listproducts" class="mdi mdi-basket-plus-outline icon">
      <a class="sidebar-text">
        Modificar Productos 
      </a>
    </SidebarLink>

    <br />
    <SidebarLink to="/categories" class="mdi mdi-shape-outline icon">
      <a class="sidebar-text">
        Categorías        
      </a>
    </SidebarLink>

    <br v-if="isAdmin" />
    <SidebarLink v-if="isAdmin" to="/listcategories" class="mdi mdi-shape-plus-outline icon">
      <a class="sidebar-text">
        Modificar Categorías 
      </a>
    </SidebarLink>

    <br />
    <SidebarLink to="/cart" class="mdi mdi-cart-variant icon"> 
      <a class="sidebar-text">
        Carrito
      </a>
    </SidebarLink>
    
    <br />
    <SidebarLink to="/login" class="mdi mdi-logout icon" @click="logout">
      <a class="sidebar-text">
        LogOut
      </a>
    </SidebarLink>

    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
      <v-icon>mdi-chevron-double-left</v-icon>
      <i class="fas fa-angle-double-left" />
    </span>

    <br />
  </div>
  <!-- <RouterView :showNavbar="showNavbar" /> -->
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
.sidebar-text {
  color: white;
  font-size: 20px;
  padding: 0.75em 0 0.75em;
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
  font-size: 22px;
  /* padding: 0.75em 0 0.75em; */
  /* justify-content: center; */
}
</style>
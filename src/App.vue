<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { supabase } from '@/config/supbaseClient';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouteStore } from '@/stores/RouteStore';

const Banner = useRouteStore();


import { useRoute } from 'vue-router';
const route = useRoute();
import { useRouter } from 'vue-router';
const router = useRouter();
const showNavbar = ref(true);


console.log(router.currentRoute.value);

const Navegacion = () => {
  // fullPath: "/reset-password"
  console.log(router.currentRoute.value.fullPath);
  console.log(router.currentRoute.value);

  if (router.currentRoute.value.fullPath === '/reset-password') {
    // showNavbar.value = false;
    return false;
  }
  return true;
}

const NavigationPath = ref(Navegacion());

const isAuthenticated = ref(false);

supabase.auth.onAuthStateChange((_event, session) => {
  console.log('onAuthStateChange', session);
  isAuthenticated.value = session !== null;
  showNavbar.value      = isAuthenticated.value && !route.meta.hideNavbar;
})

//move to main when is prepared
const auth = useAuthStore();
auth.getRole();

const refresh  = async() =>await supabase.auth.getSession()

const logout = async() =>{
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}

/* const get_my_claims = async () => {
  console.log('get_my_claims');
    const { data, error } = await supabase
    .rpc('get_claims', {uid:'9cc7c223-752f-4f7d-b3a2-1babb3bc5f5c'});
    values.value = data;
    return { data, error };
  }
 */
/* const values = ref<any>([]);
  const login  = async() => await supabase.auth.signInWithPassword({
  email: 'jbugakykidgeovovdf@cazlp.com',
  password: '1234',
})
 */

</script>

<template>
  
  <!-- NavBar -->
  <!-- <v-toolbar app> -->
  <v-toolbar app v-if="isAuthenticated && showNavbar && !Banner.removeNav">
    
    <!-- Imagen boton -->
    <router-link to="/">
      <v-btn icon size="60px">
        <v-icon size="40px">
          <img alt="Vue logo" src="@/assets/logo.svg" />
        </v-icon>
      </v-btn>
    </router-link>

    <v-toolbar-title>E-Commerce</v-toolbar-title>
    <v-spacer />
    
    <router-link to="/about">
      <v-btn variant="text" class="btnclass">About solo prueba del logo</v-btn>
    </router-link>

    <!-- <router-link to="/register">
      <v-btn variant="text" class="btnclass">Registrarse</v-btn>
    </router-link> -->

    
      <v-btn variant="tonal" class="btnclassLgO" @click="logout()" >LogOut</v-btn>
    
    
  </v-toolbar>
  
  <RouterView :showNavbar="showNavbar" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  /* padding-top: 10px;  Antes 50px */
  padding-left: 10px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btnclass {
  margin-left: 5px;
  margin-right: 5px;
  transition: none;
  color: white;
  background-color: rgb(79, 103, 241);
}

.btnclass:hover {
  transition: none;
}

.btnclassLgO {
  margin-left: 5px;
  margin-right: 5px;
  transition: none;
  color: white;
  background-color: rgb(241, 79, 79);
}

.btnclassLgO:hover {
  transition: none;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

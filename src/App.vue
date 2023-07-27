<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { supabase } from '@/config/supbaseClient';
import { ref } from 'vue';






supabase.auth.onAuthStateChange((_event, session) => {
    console.log('onAuthStateChange', session);
            
		})


const refresh  = async() =>await supabase.auth.getSession()

const logout = async() =>await supabase.auth.signOut()

const get_my_claims = async () => {
  console.log('get_my_claims');
    const { data, error } = await supabase
    .rpc('get_claims', {uid:'9cc7c223-752f-4f7d-b3a2-1babb3bc5f5c'});
    values.value = data;
    return { data, error };
  }

const values = ref<any>([]);
  const login  = async() => await supabase.auth.signInWithPassword({
  email: 'jbugakykidgeovovdf@cazlp.com',
  password: '1234',
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div>
      {{values}}
    </div>
    <button @click="get_my_claims()">Get My Claims</button> |
    <button @click="login()"> login</button> |
    <button @click="refresh()"> Refresh</button> |
    <button @click="logout()"> logout</button>   
    
  
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

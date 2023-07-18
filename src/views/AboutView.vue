<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="bg-red-800 divide-gray-200" @click="$router.push('/')">Go to Home</button>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

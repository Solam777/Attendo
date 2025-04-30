<template>
  <div class="bg-black">
    <header class="text-purple-700 text-center text-4xl"> Attendo </header>

    <nav class="text-purple-700 p-4">
      <RouterLink :to="{ name: 'accueil' }" class="mr-4">Accueil</RouterLink>
      <RouterLink :to="{ name: 'apropos' }" class="mr-4">À propos</RouterLink>
      <RouterLink :to="{ name: 'sessions' }">Sessions</RouterLink>
    </nav>
    <AuthGoogle />
  </div>
  <div class="bg-gray-100 border-b border-gray-200">
    <Breadcrumb />
  </div>
  <router-view />
</template>

<script>
import AuthGoogle from "@/Components/AuthGoogle.vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";


export default {
  components: {
    AuthGoogle,
    Breadcrumb,
  },
};
</script>

<style scoped>

</style>

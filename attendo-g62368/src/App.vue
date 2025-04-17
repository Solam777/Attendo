<template>
  <div class="bg-black">
    <header class="text-purple-700 text-center"> Attendo </header>

    <nav class="text-purple-700 p-4">
      <RouterLink :to="{ name: 'accueil' }" class="mr-4">Accueil</RouterLink>
      <RouterLink :to="{ name: 'apropos' }" class="mr-4">À propos</RouterLink>
      <RouterLink :to="{ name: 'sessions' }">Sessions</RouterLink>
    </nav>


    <AuthGoogle />
  </div>
</template>

<script>
import AuthGoogle from "@/Components/AuthGoogle.vue";

export default {
  components: {
    AuthGoogle,
  },
};
</script>

<style scoped>

</style>

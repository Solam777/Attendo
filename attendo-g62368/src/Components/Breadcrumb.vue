<template>
  <div class="flex items-center p-2 text-sm">
    <RouterLink
      :to="{ name: 'accueil' }"
      class="text-blue-500 hover:text-blue-700"
    >
      Accueil
    </RouterLink>
    <template v-if="currentRouteName !== 'accueil'">
      <span class="mx-2 text-gray-500"> > </span>
      <span
        v-if="currentRouteName === 'sessions'"
        class="text-gray-700"
      >
        sessions
      </span>
      <span
        v-else-if="currentRouteName === 'apropos'"
        class="text-gray-700"
      >
        À propos
      </span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>

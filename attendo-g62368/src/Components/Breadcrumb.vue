<template>
  <div class="flex items-center p-2 text-sm">
    <RouterLink :to="{ name: 'accueil' }" class="text-blue-500 hover:text-blue-700">
      Accueil
    </RouterLink>

    <template v-if="currentRouteName !== 'accueil'">
      <span class="mx-2 text-gray-500"> > </span>

      <template v-if="currentRouteName === 'sessions' || currentRouteName === 'detailSession'|| currentRouteName === 'epreuves' || currentRouteName === 'locaux'">
        <RouterLink :to="{ name: 'sessions' }" class="text-blue-500 hover:text-blue-700">
          Sessions
        </RouterLink>
      </template>

      <template v-else-if="currentRouteName === 'apropos'">
        <span class="text-gray-700">À propos</span>
      </template>

      <template v-if="currentRouteName === 'detailSession'|| currentRouteName === 'epreuves'|| currentRouteName === 'locaux'">
        <span class="mx-2 text-gray-500"> > </span>
        <RouterLink
          :to="{ name: 'detailSession', params: { label: $route.params.sessionLabel || $route.params.label } }"
          class="text-blue-500 hover:text-blue-700"
        >
          {{ $route.params.sessionLabel || $route.params.label }}
        </RouterLink>
      </template>

      <template v-if="currentRouteName === 'epreuves' || currentRouteName === 'locaux'">
        <span class="mx-2 text-gray-500"> > </span>
        <RouterLink
          :to="{
            name: 'epreuves',
            params: {
              sessionLabel: $route.params.sessionLabel || $route.params.label,
              ueId: $route.params.ueId
            }
          }"
          class="text-blue-500 hover:text-blue-700"
        >
          {{ $route.params.ueId }}
        </RouterLink>
      </template>

      <template v-if="currentRouteName === 'locaux'" >
        <span class="mx-2 text-gray-500"> > </span>
        <span class="text-gray-700"> {{ $route.params.epreuveName}}</span>
      </template>

    </template>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
};
</script>

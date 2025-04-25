<template>
  <div class="p-4 text-black">
    <h1 class="text-2xl mb-4">Liste des sessions</h1>
    <Tableaux
      :headers="['ID', 'Nom']"
      :rows="sessions"
      :attributes="['id', 'label']"
      @row-click="goToSession"
    />
  </div>
</template>

<script>
import Tableaux from "@/Components/Tableaux.vue";

export default {
  components: {
    Tableaux,
  },
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToSession(session) {
      this.$router.push({ name: 'detailSession', params: { label: session.label } });
    }
  }
};
</script>

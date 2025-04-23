<template>
  <div>
    <div class="flex items-center space-x-4 mb-4">
      <AddSession @newSession="reloadSessions" />
      <SuppSessions @Sessionsupp="reloadSessions" />
    </div>

    <ListeSessions :sessions="sessions" />
  </div>
</template>

<script>
import AddSession from "@/Components/AddSessions.vue";
import ListeSessions from "@/Components/ListeSessions.vue";
import SuppSessions from "@/Components/SuppSessions.vue";
import { getSessions } from "@/Service/listSessionsService.js";


export default {
  components: {
    AddSession,
    ListeSessions,
    SuppSessions,
  },
  data() {
    return {
      sessions: [],
    };
  },
  async mounted() {
    console.log("session page mounted.");
    await this.reloadSessions();
  },
  methods: {
    async reloadSessions() {
      const result = await getSessions();
      if (result) {
        this.sessions = result;
        console.log("Sessions rechargées:", this.sessions);
      }
    }
  }
};
</script>

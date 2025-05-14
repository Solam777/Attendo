<template>
  <div class="flex items-center space-x-4 p-4 bg-gray-100 rounded">
    <p class="text-lg font-medium">New session:</p>
    <input
      v-model="inputValue"
      class="border border-gray-400 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
      placeholder="Nom de la session"
    />
    <button
      @click="addnewSession(inputValue)"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add
    </button>
  </div>
</template>

<script>

import {addSession} from "@/Service/SessionService.js";

export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    async addnewSession(unesession) {
      if (!unesession || unesession.trim() === "") {
        alert("Le nom de la session est vide");
        return;
      }

      const result = await addSession(unesession);
      if (result) {
        this.$emit("newSession");
        console.log(unesession);
      }
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
</style>

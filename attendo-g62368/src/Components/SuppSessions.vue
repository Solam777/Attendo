<template>
  <div class="flex items-center space-x-4 p-4 bg-gray-100 rounded">
    <p class="text-lg font-medium">Supp Session:</p>
    <input
      v-model="inputValue"
      class="border border-gray-400 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
      placeholder="Id de la session"
    />
    <button
      @click="removeNewSession(inputValue)"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Del
    </button>
  </div>
</template>

<script>

import {removeSession} from "@/Service/SessionService.js";
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    async removeNewSession(idSession) {
      if (!idSession || idSession.trim() === "") {
        alert("Le nom de la session est vide");
        return;
      }
      const response = await removeSession(idSession);
      if (response){
        this.$emit("Sessionsupp");
        console.log(idSession);
        this.inputValue = "";
      }
    }
  },
};
</script>

<style scoped>
</style>

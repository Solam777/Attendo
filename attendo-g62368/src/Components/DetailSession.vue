<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Session <i>{{ sessionName }}</i></h1>

    <Tableaux
      :headers="['UE']"
      :rows="ues"
      :attributes="['nom']"
      @row-click='goToEpreuve'
    />

    <div class="mt-6 border-t pt-4">
      <h2 class="text-xl mb-2">Ajouter une UE dans la session</h2>
      <select v-model="selectedUE" class="border px-2 py-1 mr-2 text-black">
        <option disabled value="">Choisissez une UE</option>
        <option v-for="ue in availableUEs" :key="ue.ue" :value="ue.ue" class="text-black">
          {{ ue.ue }}
        </option>
      </select>
      <button @click="addUE" class="bg-blue-600 text-white px-4 py-1 rounded">Ajouter l'UE</button>
    </div>
  </div>
</template>

<script>
import Tableaux from "@/Components/Tableaux.vue";
import {getOneSession} from "@/Service/listSessionsService.js";
import { getUEsBySessionId, getAvailableUEs, addUEToSession } from "@/Service/ueService.js";

export default {
  components: { Tableaux },
  props: {
    label : {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ues: [],
      availableUEs: [],
      selectedUE: '',
      sessionName: '',
      sessionId : null
    };
  },
  async mounted() {

    const sessionData = await getOneSession(this.label);
    this.sessionName = sessionData[0]?.label || 'Inconnue';
    this.sessionId = sessionData[0].id;
    console.log("Session Id:", this.sessionId);
    console.log("Session name:", sessionData);


    // Récupérer les UEs associées à la session
    this.ues = await getUEsBySessionId(this.sessionId);
    console.log("UEs récupérées:", this.ues);

    this.availableUEs = await getAvailableUEs(this.sessionId);
    console.log("UEs disponibles:", this.availableUEs);
  },
  methods: {
    async addUE() {

      if (!this.selectedUE) return;
      await addUEToSession(this.sessionId, this.selectedUE);
      this.ues = await getUEsBySessionId(this.sessionId);
      this.availableUEs = await getAvailableUEs(this.sessionId);
      this.selectedUE = '';
    },
    goToEpreuve(ue) {
      this.$router.push({
        name: 'epreuves',
        params: {
          sessionLabel: this.label,
          ueId: ue.id || ue.nom
        }
      });
    }
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Liste des épreuves de {{ ueId }} (session : {{ sessionName }})</h1>

    <div class="grid grid-cols-2 gap-4 mb-6">

      <div v-for="epreuve in epreuves" :key="epreuve.id" @click = 'gotolocaux(epreuve.label)' >
      <carte-epreuve :name-epreuve="epreuve.label" />
        <button @click="deleteEpreuve(epreuve.id)" class="text-red-600 hover:text-red-800">
          Supprimer
        </button>

      </div>
    </div>
    <div class="mt-8 border-t pt-4">
      <h2 class="text-xl mb-4">Ajouter une épreuve</h2>
      <div class="flex gap-4">
        <input
          type="text"
          v-model="nouvelleEpreuve.label"
          placeholder="Bilan,projet,examen "
          class="border rounded px-3 py-2 flex-1"
        />
        <button
          @click="addEpreuve"
          class="bg-blue-600 text-white px-4 py-2 rounded"
          :disabled="nouvelleEpreuve.label.trim() === ''"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneSession } from "@/Service/listSessionsService.js";
import {
  getSessionCompoId,
  getEpreuvesBySessionCompo,
  addEpreuveService,
  deleteEpreuveService,
  isInEpreuve, getOnEpreuve
} from "@/Service/epreuveService.js";
import CarteEpreuve from "@/Components/CarteEpreuve.vue";

export default {
  components: {CarteEpreuve},
  props: {
    sessionLabel: {
      type: String,
      required: true
    },
    ueId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sessionId: null,
      sessionName: '',
      epreuves: [],
      sessionCompoId: null,
      nouvelleEpreuve: {
        label: '',

      }
    };
  },
  computed: {

  },
  async mounted() {
    await this.loadSessionInfo();
    await this.loadEpreuves();
  },
  methods: {
    async loadSessionInfo() {
      //recup info sur la session
      const sessionData = await getOneSession(this.sessionLabel);
      if (sessionData && sessionData.length > 0) {
        this.sessionId = sessionData[0].id;
        this.sessionName = sessionData[0].label;
        //  recup l'ID de session_compo
        this.sessionCompoId = await getSessionCompoId(this.sessionId, this.ueId);
      }
    },

    async loadEpreuves() {
      if (!this.sessionCompoId) return;
      this.epreuves = await getEpreuvesBySessionCompo(this.sessionCompoId);
    },

    async addEpreuve() {
      if (!this.nouvelleEpreuve.label.trim() || !this.sessionCompoId) return;

      const existeDeja = await isInEpreuve(this.nouvelleEpreuve.label);
      if (existeDeja) {
        alert("Ce label existe déjà dans un événement.");
        return;
      }

      await addEpreuveService(this.sessionCompoId, this.nouvelleEpreuve.label);
      await this.loadEpreuves();
      this.nouvelleEpreuve.label = '';
    },
    async deleteEpreuve(epreuveId) {
      await deleteEpreuveService(epreuveId);
      await this.loadEpreuves();
    },

    async gotolocaux(epreuve) {
      const eupreuveData = await getOnEpreuve(epreuve);
      const eupreuveID = eupreuveData[0]?.id;
      const eupreuveLabel = eupreuveData[0]?.label;

      console.log("epreuveData"+eupreuveData[0].label);

      if (!eupreuveID) {
        console.error("Aucun ID trouvé pour l'épreuve", epreuve);
        return;
      }
      this.$router.push({
        name: "locaux",
        params: {
          ueId: this.ueId, //nom de la metiere
          epreuveId: Number(eupreuveID), //id epreuve
          epreuveName: eupreuveLabel,

        }
      });

    }
  }
};
</script>

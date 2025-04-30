<script>
import CarteLocaux from '@/Components/CarteLocaux.vue'
import {addLocal, getLocalAdd, getLocalNotAdded} from "@/Service/LocalService.js";

export default {
  props : {
    ueId : { // nom de l'event
      type: String,
      required: true
    },
    epreuveId :{
      type: [Number,String],
      required: true
    },
    epreuveName : {
      type: String,
      required: true
    }
  },
  data(){
    return{
      selectedLocal: '',
      availableLocal :[],
      localAdded : []
    }
  },
  components: {
    CarteLocaux,
  },

  async mounted(){

    this.availableLocal =  await getLocalNotAdded(this.epreuveId);
    await this.loadLocalAddAndNotAdded();

  },
  methods: {
    async addLocal (){
      await addLocal(this.epreuveId, this.selectedLocal.label)
      await this.loadLocalAddAndNotAdded();
    },
    async loadLocalAddAndNotAdded(){
      this.localAdded = await getLocalAdd(this.epreuveId);
      this.availableLocal =  await getLocalNotAdded(this.epreuveId);
    },
    gotoLocal(local){
      console.log("gotolocal",local);
    }
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Liste des Locaux pour {{ ueId }} </h1>
    <div class="flex flex-wrap gap-3 mb-6">
      <CarteLocaux v-for="local in this.localAdded" :key="local.label" :local="local" @click="gotoLocal(local)" />
    </div>
    <div class=" gap-2 mb-4">
      <h2 class="text-xl mb-2">Ajouter un local </h2>
      <span class="bg-gray-100 px-3 py-1 rounded-l text-gray-700 font-semibold">Local</span>
      <select v-model="selectedLocal" class="border px-2 py-1 text-black rounded">
        <option disabled value="">Choisissez un local</option>
        <option v-for="local in availableLocal" :key="local.id" :value="local">
          {{ local.label }}
        </option>
      </select>
      <button @click = 'addLocal' class="bg-blue-600 text-white px-4 py-1 rounded">Ajouter local</button>

    </div>
  </div>
</template>
<style scoped>
</style>

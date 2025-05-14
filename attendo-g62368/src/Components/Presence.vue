<script>
import Tableaux from "@/Components/Tableaux.vue";
import {
  getAvailableSupervisors,
  PutPresent,
  getPresentStudent,
  getAllStudentsByUe,
  RemovePresent,
  getAllStudentInLocal,
  addSupervisor
} from "@/Service/PresenceService.js";
import {getCapacityRoom} from "@/Service/LocalService.js";
export default {
  props: {
    id: {type: [Number, String], required: true},
    ueId: {type: String, required: true},
    sessionLabel: {type: String, required: true},
    epreuveId: {type: [Number, String], required: true},
    epreuveName: {type: String, required: true},
    localNum: {type: String, required: true},
  },
  components: {Tableaux},
  methods: {
    async presentOrNot(student) {
      const index = this.ColorStudent.findIndex(s => s.matricule === student.matricule);
      if (index !== -1) {
        this.ColorStudent.splice(index, 1); // Decocher
        await this.RemovePresentStudent(student.matricule);

      } else {
        if(await getCapacityRoom(this.localNum) === await getAllStudentInLocal()) {
          console.error("il n'y a plus de place dans le local");

        }
        else {
          this.ColorStudent.push(student); // Cocher
          await this.AddStudentPresent(student.matricule, this.localNum);
        }
      }
    },
    async loadSupervisors() {
      this.availableSurveillant = await getAvailableSupervisors();
    },

    async modifAddSupervisor() {
      console.log("supervisor add", this.selecteProf);
      console.log(this.localNum);
      await addSupervisor(this.localNum ,this.selecteProf );
    },

    async AddStudentPresent(StudentMAtricule, local) {
      await PutPresent(StudentMAtricule,local)
    },
    async getStudentPresent() {
      this.presentStudentFromTable = await getPresentStudent();
    },
    async getAllStudents() {
      this.AllStudents = await getAllStudentsByUe(this.ueId);
    },
    async RemovePresentStudent(matricule) {
      await RemovePresent(matricule);
    }

  },
  data() {
    return {
      selecteProf: "",
      availableSurveillant: [],
      AllStudents: [],
      ColorStudent: [],
      presentStudentFromTable : [],

    }
  },
  async mounted() {
    await this.loadSupervisors();
    await this.getStudentPresent();
    await this.getAllStudents();
    //colorier les etudiants deja presents
    this.ColorStudent = this.AllStudents.filter(student =>
      this.presentStudentFromTable.some(p => p.student === student.matricule)
    );  },
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Local: {{ localNum }} - {{ ueId }}</h1>

    <div class="mb-4 flex items-center space-x-2">
      <select v-model="selecteProf" class="border px-2 py-1 text-black rounded">
        <option disabled value="">Choisir/modifier surveillant</option>
        <option v-for="prof in availableSurveillant" :key="prof.id" :value="prof.acro">
          {{ prof.acro }}
        </option>
      </select>
      <button @click="modifAddSupervisor" class="bg-blue-600 text-white px-4 py-1 rounded">Définir Superviseur</button>
    </div>

    <div class="mt-4">
      <h2 class="text-xl font-bold mb-2">Liste des étudiants - {{ ueId }}</h2>
      <Tableaux :headers="['Matricule', 'Groupe', 'Nom', 'Prenom']"
                :rows="AllStudents"
                :attributes="['matricule', 'group', 'nom', 'prenom']"
                :highlighted="ColorStudent"
                @row-click="presentOrNot">
      </Tableaux>
    </div>
  </div>
</template>

<style scoped>
</style>

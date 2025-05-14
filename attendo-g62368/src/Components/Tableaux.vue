<!-- src/Components/Table.vue -->
<template>
  <table class="table-auto w-full border border-gray-300 text-black">
    <thead class="bg-purple-700">
    <tr>
      <th v-for="header in headers" :key="header" class="p-2">{{ header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in rows"
        :key="index"
        :class="{
      'bg-green-200': isHighlighted(row),
      'cursor-pointer': true
       }"
        @click="$emit('row-click',row)" class=" cursor-pointer border-t border-gray-400">
      <td v-for="attr in attributes" :key="attr" class="p-2 text-center">
        {{ row[attr] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "table-view",
  props: {
    headers: Array,        // Liste des entêtes (affichage)
    rows: Array,           // Liste d’objets (les données à afficher)
    attributes: Array,     // Liste d’attributs à afficher (clés de l’objet)
    highlighted: { //
      type: Array,
      default: () => []
    }
  },
  methods: {
    isHighlighted(row) {
      return this.highlighted.some(s => s.matricule === row.matricule);
    }
  }
};
</script>

<style scoped>

</style>

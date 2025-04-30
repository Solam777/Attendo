<script>
import {getCapacityRoom} from "@/Service/LocalService.js";

export default {
  props: {
    local: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      capacity : null
    }
  },
  methods: {
    async  loadCapacite(){
      this.capacity = await getCapacityRoom(this.local.room)
    }
  },
  async mounted(){
    await this.loadCapacite();
  }
};
</script>

<template>
  <div class="carte-locaux">
    <div class="top">
      <span class="numero">{{ local.room }}</span>
      <span class="capacite">0/{{this.capacity}}</span>
    </div>
    <div class="bottom">
      <div class="role">Surveillant</div>
      <div class="acronyme">{{ local.surveillant }}</div>
    </div>
  </div>

</template>

<style scoped>
.carte-locaux {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  min-width: 100px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.numero {
  font-weight: bold;
  font-size: 1.1rem;
}
.capacite {
  font-size: 0.9rem;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 12px;
  padding: 0 6px;
}
.bottom .role {
  font-weight: 600;
  font-size: 0.9rem;
}
.bottom .acronyme {
  font-size: 0.85rem;
  color: #777;
}
</style>

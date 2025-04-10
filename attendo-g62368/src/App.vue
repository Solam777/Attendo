
<template>
  <div class="bg-black">
    <header class="text-purple-700 text-center"> Attendo </header>
    <ul class=" text-purple-700">
      <li> <RouterLink :to = "{name:'accueil'}">Acceuil</RouterLink></li>
      <li> <RouterLink :to ="{name:'apropos'}">Apropos</RouterLink></li>
      <li> <RouterLink :to="{name:'sessions'}">session</RouterLink></li>
    </ul>
  </div>
  <button @click = "connexionButton" > Connexion avec Google </button>
</template>

<script >

export default {
  computed: {
  },
  data (){
    return {

    };
  },
  methods: {
    connexionButton(){
      console.log("Connexion");
    }
  }
};

</script>


<style scoped>

</style>

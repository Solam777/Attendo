<template>
  <div class="text-center text-white">
    <button
      v-if="!user"
      @click="login"
      class="p-2 px-4 bg-purple-700 rounded hover:bg-purple-800 transition"
    >
      Se connecter avec Google
    </button>

    <div v-else class="mt-4">
      <p>Bienvenue, {{ user.user_metadata.name }}</p>
      <img :src="user.user_metadata.picture" alt="profil" class="w-16 h-16 rounded-full mx-auto my-2" />
      <button
        @click="logout"
        class="p-2 px-4 bg-red-600 rounded hover:bg-red-700 transition"
      >
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/Service/supabaseClient.js';

export default {
  name: 'AuthGoogle',
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const { data: { session } } = await supabase.auth.getSession();
    this.user = session?.user || null;

    // Mettre à jour l'utilisateur si la session change
    supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user || null;
    });
  },
  methods: {
    async login() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) console.error('Erreur de connexion:', error.message);
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Erreur de déconnexion:', error.message);
    },
  },
};
</script>

<style scoped>

</style>

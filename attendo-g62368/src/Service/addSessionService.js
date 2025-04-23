import {supabase} from "@/Service/supabaseClient.js";
const tableSession = "session";

export async function addSession(sessionName) {
  const { data, error } = await supabase
    .from(tableSession)
    .insert({ label: sessionName })
    .select(); // select() pour récupérer les données insérées apres avoir add

  if (error) {
    console.log("Erreur session non ajoute :", error.message);
    return null;
  }

  return data;
}

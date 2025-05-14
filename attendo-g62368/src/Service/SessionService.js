import {supabase} from "@/Service/supabaseClient.js";

const tableSession = "session";

export async function addSession(sessionName) {
  const {data, error} = await supabase
    .from(tableSession)
    .insert({label: sessionName})
    .select(); // select() pour récupérer les données insérées apres avoir add

  if (error) {
    console.log("Erreur session non ajoute :", error.message);
    return null;
  }

  return data;
}

export async function getSessions() {
  const {data, error} = await supabase.from(tableSession).select("*");

  if (error) {
    console.log("Erreur:", error.message);
    return null;
  }

  return data;
}


export async function getOneSession(labelname) {
  // Vérifier que sessionId est défini et valide
  if (!labelname) {
    console.log("Erreur: sessionId est undefined ou null");
    return null;
  }

  const {data, error} = await supabase
    .from("session")
    .select("id, label")
    .eq("label", labelname)

  if (error) {
    console.log("Erreur:", error.message);
    return null;
  }

  return data;
}

export async function removeSession(noSession) {
  const {data, error} = await supabase
    .from(tableSession)
    .delete()
    .eq('id', noSession)
    .select();

  if (error) {
    console.log("Erreur session non supp :", error.message);
    return null;
  }
  return data;
}

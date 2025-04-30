import { supabase } from "@/Service/supabaseClient.js";

export async function getAllLocal() {
  const {data, error} = await supabase
    .from('room')
    .select('label')
  if (error){
    console.log("erreur lors de la recup des locaux",error);
  }
  return data;
}

export async function getLocalAdd(eventID) {
  const {data, error} = await supabase
    .from('examination_room')
    .select()
    .eq('event' , eventID)
  if (error){
    console.error("erreur lors de la recup des info des locaux ajoute",error)
  }
  return data
}
export async function addLocal(epreuveId, roomLabel) {
  const { data, error } = await supabase
    .from('examination_room')
    .insert([{ event: epreuveId, room: roomLabel }]);

  if (error) {
    console.error("Erreur lors de l'ajout du local :", error);
    throw error;
  }
  console.log("added");

  return data;
}

export  async function getCapacityRoom (numRoom) {
  const {data, error} = await supabase
    .from('room')
    .select('capacity')
    .eq('label',numRoom)
  if (error) {
    console.error("Erreur lors de la recup des room",error);
  }
  return data[0].capacity;
}

export async function getLocalNotAdded(eventID) {
  const allLocals = await getAllLocal();
  const addedLocals = await getLocalAdd(eventID);

  // Extraire uniquement les labels déjà utilisés
  const addedLabels = addedLocals.map(l => l.room);

  // Filtrer les locaux qui NE sont PAS dans addedLabels
  const notAddedLocals = allLocals.filter(local => !addedLabels.includes(local.label));

  return notAddedLocals;
}


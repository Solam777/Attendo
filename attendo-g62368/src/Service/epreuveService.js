import { supabase } from "@/Service/supabaseClient.js";

export async function getSessionCompoId(sessionId, ueId) {
  const { data, error } = await supabase
    .from('session_compo')
    .select('id')
    .eq('session', sessionId)
    .eq('ue', ueId)
    .single();

  if (error) {
    console.error("Erreur lors de la récupération du session_compo:", error);
    return null;
  }

  return data?.id;
}

export async function getEpreuvesBySessionCompo(sessionCompoId) {
  const { data, error } = await supabase
    .from('event')
    .select('*')
    .eq('session_compo', sessionCompoId);

  if (error) {
    console.error("Erreur lors de la récupération des épreuves:", error);
    return [];
  }

  return data || [];
}

export async function addEpreuveService(sessionCompoId, label) {
  const { data, error } = await supabase
    .from('event')
    .insert([{
      session_compo: sessionCompoId,
      label,
      completed: false
    }])
    .select();

  if (error) {
    console.error("Erreur lors de l'ajout de l'épreuve:", error);
    return null;
  }

  return data;
}

export async function deleteEpreuveService(epreuveId) {
  const { error } = await supabase
    .from('event')
    .delete()
    .eq('id', epreuveId);

  if (error) {
    console.error("Erreur lors de la suppression de l'épreuve:", error);
    return false;
  }

  return true;
}

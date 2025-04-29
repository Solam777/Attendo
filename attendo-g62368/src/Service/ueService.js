import {supabase} from "@/Service/supabaseClient.js";

export async function getUEsBySessionId(sessionId) {
  // recup les associations entre UEs et sessions depuis la table 'session_compo'x
  // en filtrant par l'ID de session spécifié et en incluant les données de label de session
  const { data, error } = await supabase
    .from('session_compo')
    .select('ue, session:session(label)')
    .eq('session', sessionId);

  if (error) {
    console.error("Erreur lors de la recup des UEs ");
    return [];
  }

  if (data && data.length > 0) { //si le resultat n'est pas vide
    const ueIds = data.map(item => item.ue); //pour avoir les id des eu
    const { data: ueDetails, error: ueError } = await supabase
      .from('ue')
      .select('*')
      .in('ue', ueIds);

    if (ueError) {
      console.error("Erreur lors de la recup des détails des ue ");
      return [];
    }

    return ueDetails.map(ue => ({
      id: ue.ue, // Utilise l'identifiant de l'UE comme id
      nom: ue.ue, // Utilise l'identifiant de l'UE comme nom
      session_label: data[0].session.label // avoir le libelle de la session
    }));
  }

  return [];
}

export async function getAvailableUEs(sessionId) {
  const { data: allUEs } = await supabase.from('ue').select('*');
  const { data: linkedUEs } = await supabase
    .from('session_compo')
    .select('ue')
    .eq('session', sessionId);

  const linkedIds = new Set(linkedUEs?.map(ue => ue.ue));
  return allUEs.filter(ue => !linkedIds.has(ue.ue));
}

export async function addUEToSession(sessionId, ueId) {
  return await supabase.from('session_compo').insert([{ session: sessionId, ue: ueId }]);
}

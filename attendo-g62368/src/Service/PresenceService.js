import { supabase } from "@/Service/supabaseClient.js";


export async function getAvailableSupervisors() {
  const {data, error} = await supabase
    .from('teacher')
    .select('acro')

  if (error) {
    console.error("erreur lors de la recup des supervisor",error)
  }
  return data;
}
export async function getAllStudentsByUe(ue) {
  const { data, error } = await supabase
    .from('pae')
    .select(`
      student_id,
      group,
      student:student_id (
        firstname,
        lastname
      )
    `)
    .eq('ue', ue);

  if (error) {
    console.error("Erreur lors de la récupération des étudiants avec UE:", error);
    return [];
  }
  return data.map((paeItem) => ({
    matricule: paeItem.student_id,
    group: paeItem.group,
    nom: paeItem.student?.lastname || "Non disponible",
    prenom: paeItem.student?.firstname || "Non disponible"
  }));

}

export  async function PutPresent(matricule,local) {
  const id = await getIdFromExamniationRoom(local);
  const {data, error} = await supabase
    .from('examination')
    .insert([{ student: matricule, examination_room: id }]);
  if (error) {
     console.log("la presence de letudiant a echoue ",error);
  }
  return data;
}

export async function RemovePresent(matricule) {
  const { error } = await supabase
    .from('examination')
    .delete()
    .eq('student', matricule)

  if (error) {
    console.error("Erreur lors de la suppression de l'étudiant présent :", error);
  }
}

export async function getIdFromExamniationRoom(localNum) {
  const {data, error} = await supabase
    .from('examination_room')
    .select('id')
    .eq('room', localNum)
  if (error) {
    console.error("l'id du local de la table examniation room a echoue ",error);
  }
  console.log("Resultat de la recup d'id du local",localNum,": ",data[0].id);
  return data[0].id;

}
export async function getPresentStudent() {
  const {data, error} = await supabase
  .from('examination')
  .select()

  if (error) {
    console.error("erreur lors de la recup des etudiant present",error);
  }
  return data;
}


export async function getAllStudentInLocal() {
  const resultat = await getPresentStudent();
  resultat.length;
  return resultat.length;
}

export async function addSupervisor(NumRoom,NomProf) {
  const { error} = await supabase
    .from('examination_room')
    .update({ supervisor: NomProf })
    .eq('room', NumRoom)
  if (error) {
    console.error("erreur lors d'ajout du superviser",error);
  }
}

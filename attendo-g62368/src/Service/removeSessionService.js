import {supabase} from "@/Service/supabaseClient.js";
const tableSession = "session";

export async function removeSession(noSession) {
  const { data, error } = await supabase
    .from(tableSession)
    .delete()
    .eq('id',noSession )
    .select();

  if (error) {
    console.log("Erreur session non supp :", error.message);
    return null;
  }
  return data;
}

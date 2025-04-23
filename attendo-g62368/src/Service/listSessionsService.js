import { supabase } from "@/Service/supabaseClient.js";

const tableSession = "session";

export async function getSessions() {
  const { data, error } = await supabase.from(tableSession).select("*");

  if (error) {
    console.log("Erreur:", error.message);
    return null;
  }

  return data;
}



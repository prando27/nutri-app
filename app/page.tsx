import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "./login/actions";
import FileUpload from "./components/FileUpload";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const { user } = data;

  return (
    <div>
      Logged User: {user.email}
      <div>
        <div>
          <h1>Upload de Imagem</h1>
          <FileUpload />
        </div>
        <form>
          <button formAction={signOut}>Sign Out</button>
        </form>
      </div>
    </div>
  );
}

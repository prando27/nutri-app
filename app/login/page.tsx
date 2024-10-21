import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInWithGoogle } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { Google } from "lucide-react";

export default async function ContinueWithGooglePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Bem vindo
          </CardTitle>
          <CardDescription className="text-center">
            Continue com o Google para começar
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form>
            <Button
              formAction={signInWithGoogle}
              className="w-full"
              variant="outline"
            >
              {/* <Google className="mr-2 h-4 w-4" /> */}
              Continue com o Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

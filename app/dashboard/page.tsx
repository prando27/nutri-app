// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
        Bem vindo a NutrIA
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl lg:text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl lg:text-3xl font-bold">567</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl lg:text-3xl font-bold">789 GB</p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

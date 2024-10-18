import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Google } from "lucide-react";

export default function ContinueWithGooglePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Continue with Google to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="w-full" variant="outline">
            {/* <Google className="mr-2 h-4 w-4" /> */}
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";
import { useState } from "react";
import  { AxiosError } from "axios";
import { ApiResponse } from "@/app/types/ApiResponse";

function SignOut() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const result = await signOut({ redirect: false });
      if (result?.url) {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
          variant: "default",
        });
        router.replace("/sign-in");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError);
      toast({
        title: "Error Signing Out",
        description: "Something went wrong while signing out.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-600 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            See You Soon!
          </h1>
          <p className="mb-4">Click the button below to log out of your account.</p>
        </div>

        <div className="text-center">
          <Button onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing Out...
              </>
            ) : (
              "Sign Out"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SignOut;

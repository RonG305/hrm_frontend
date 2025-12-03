import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorMessagePage({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <Alert variant="destructive" className="w-full justify-center">
      <AlertCircleIcon />
      <AlertTitle >Error</AlertTitle>
      <AlertDescription>
        {errorMessage || "Oops! Something went wrong while fetching the data."}

        {errorMessage?.includes("Unauthorized") && (
            <div>
                <p className="mt-2">Please check the following:</p>
                <ul className="list-disc list-inside">
                    <li>Your authentication status. You may need to log in again.</li>
                    <li>Your user permissions. Ensure you have access to this resource.</li>
                </ul>
            </div>
        )}

        {errorMessage?.includes("Network Error") && (
            <div>
                <p className="mt-2">Please check your internet connection and try again.</p>
            </div>
        )}

        {errorMessage?.includes("Forbidden") && (
            <div>
                <p className="mt-2">You do not have permission to access this resource. Please contact your administrator if you believe this is an error.</p>
            </div>
        )}

   
      </AlertDescription>
    </Alert>
  );
}

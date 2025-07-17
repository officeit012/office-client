import { SignUp } from "@clerk/clerk-react";

const AdminSignupPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <SignUp
        forceRedirectUrl="/officeit-admin"
        signInUrl="/officeit-admin/login"
        appearance={{
          elements: {
            card: "flex flex-col items-center",
            headerTitle: "text-center",
            headerSubtitle: "text-center",
            logoBox: "-mb-2 -mt-1",
          },
          layout: {
            logoImageUrl: "/logo.jpeg",
          },
        }}
      />
    </div>
  );
};

export default AdminSignupPage;

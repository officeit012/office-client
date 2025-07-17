import { SignIn } from "@clerk/clerk-react";

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <SignIn
        path="/officeit-admin/login"
        routing="path"
        forceRedirectUrl="/officeit-admin"
        signUpUrl="/officeit-admin/signup"
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

export default AdminLoginPage;

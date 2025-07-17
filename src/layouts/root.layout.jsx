import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default RootLayout;

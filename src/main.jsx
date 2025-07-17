import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ScrollToTop from "@/components/scroll-to-top.jsx";

import { ClerkProvider } from "@clerk/clerk-react";

import RootLayout from "@/layouts/root.layout.jsx";
import MainLayout from "@/layouts/main.layout.jsx";
import ProtectedLayout from "@/layouts/protected.layout.jsx";

import HomePage from "@/pages/home.page.jsx";
import AboutPage from "@/pages/about.page.jsx";
import ContactPage from "@/pages/contact.page.jsx";
import ProductsPage from "@/pages/products.page.jsx";
import ProductDetailPage from "@/pages/product-detail.page.jsx";
import AdminPage from "@/pages/admin.page.jsx";
import AdminLoginPage from "@/pages/admin-login.page.jsx";
import AdminSignupPage from "@/pages/admin-signup.page.jsx";
import NotFoundPage from "@/pages/404.page.jsx";

// Initialize Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if PUBLISHABLE_KEY is defined
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/officeit-admin" element={<AdminPage />} />
              </Route>
            </Route>
            <Route path="/officeit-admin/login" element={<AdminLoginPage />} />
            <Route
              path="/officeit-admin/signup"
              element={<AdminSignupPage />}
            />
            {/* 404 Page - Catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);

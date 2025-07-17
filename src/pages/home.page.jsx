import Hero from "@/components/Hero";
import ProductCategoriesSection from "@/components/ProductCategoriesSection";
import AboutSection from "@/components/AboutSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import HomeCTASection from "@/components/HomeCTASection";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ProductCategoriesSection />
      <AboutSection />
      <FeaturedProductsSection />
      <HomeCTASection />
    </div>
  );
};

export default HomePage;

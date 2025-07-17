import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Custom WhatsApp icon component to match Lucide React styling
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Backend URL from environment variables
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully subscribed to newsletter!");
        setEmail(""); // Clear the input
      } else {
        toast.error(data.message || "Failed to subscribe to newsletter");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-7 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo.jpeg"
                alt="Office IT Logo"
                className="h-24 md:h-28 border-12 border-white rounded"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Your one-stop solution for all office and IT equipment needs. We
              provide high-quality products with exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com/Officeitpvtltd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link
                to="https://wa.me/94725828283"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 h-4 w-4 text-purple-500 flex-shrink-0" />
                <Link
                  to="https://www.google.com/maps/place/සෙත්+සේවන+හෙද+විද්%E2%80%8Dයලය+කුරුණෑගල+_+seth+sewana+nursing+school+kurunegala/@7.4804306,80.3670562,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae3391721cf742f:0xe12fa333b13596b9!8m2!3d7.4804306!4d80.3696311!16s%2Fg%2F11rjrzc_f1?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <div>
                    <div className="text-sm">No.177/E, Kandy Road</div>
                    <div className="text-sm">Kurunegala, Sri Lanka</div>
                  </div>
                </Link>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 h-4 w-4 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm">
                    <Link
                      to="tel:+94725828283"
                      className="hover:text-white transition-colors duration-200"
                    >
                      +94 (72) 582 8283
                    </Link>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <Link
                      to="tel:+94372202000"
                      className="hover:text-white transition-colors duration-200"
                    >
                      +94 (37) 220 2000
                    </Link>
                  </div>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 mt-1 h-4 w-4 text-purple-500 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <Link
                    to="mailto:info@officeit.lk"
                    className="hover:text-white transition-colors duration-200"
                  >
                    info@officeit.lk
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Office IT (Private) Limited. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

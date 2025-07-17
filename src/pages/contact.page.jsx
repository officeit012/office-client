import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, Facebook } from "lucide-react";
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

const ContactPage = () => {
  // Backend server URL obtained from environment variable
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [searchParams] = useSearchParams();
  const formSectionRef = useRef(null);
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle URL parameters on component mount
  useEffect(() => {
    const subject = searchParams.get("subject");
    const focus = searchParams.get("focus");

    if (subject) {
      setFormData((prev) => ({
        ...prev,
        subject: subject,
      }));
    }

    if (focus === "name") {
      // Scroll to form section and focus on name input
      setTimeout(() => {
        if (formSectionRef.current) {
          formSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        setTimeout(() => {
          if (nameInputRef.current) {
            nameInputRef.current.focus();
          }
        }, 500);
      }, 100);
    }
  }, [searchParams]);

  // Validation functions
  const validateEmail = (email) => {
    // Check total length
    if (email.length > 254) return false;

    // Check for exactly one "@" symbol
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) return false;

    const [localPart, domainPart] = email.split("@");

    // Check if both parts exist and are not empty
    if (!localPart || !domainPart) return false;

    // Check local part length
    if (localPart.length > 64) return false;

    // Check domain part length
    if (domainPart.length > 255) return false;

    // Validate local part
    const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!localPartRegex.test(localPart)) return false;

    // Check for consecutive dots or dots at beginning/end in local part
    if (
      localPart.includes("..") ||
      localPart.startsWith(".") ||
      localPart.endsWith(".")
    ) {
      return false;
    }

    // Validate domain part
    // Must have at least one dot
    if (!domainPart.includes(".")) return false;

    // Split domain into segments
    const domainSegments = domainPart.split(".");

    // Each segment must be valid
    for (const segment of domainSegments) {
      if (!segment) return false; // Empty segment
      if (segment.startsWith("-") || segment.endsWith("-")) return false; // Hyphen at start/end
      if (!/^[a-zA-Z0-9-]+$/.test(segment)) return false; // Invalid characters
    }

    return true;
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, "");

    // Check if it's exactly 10 digits
    return cleanPhone.length === 10;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided must be valid)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Show loading toast immediately
    const loadingToastId = toast.loading("Sending your message...", {
      description: "Please wait while we process your request.",
      classNames: {
        description: "!text-slate-500",
      },
    });

    try {
      // Prepare data for API call
      const contactData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      // Make API call to backend
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update loading toast to success
        toast.success("Message sent successfully!", {
          id: loadingToastId,
          description:
            "Thank you for contacting us. We'll get back to you soon.",
          duration: 4000,
          classNames: {
            description: "!text-slate-500",
          },
        });

        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        // Update loading toast to error
        toast.error("Failed to send message", {
          id: loadingToastId,
          description:
            result.message ||
            "Your message couldn't be delivered. Please try again or contact us directly at info@officeit.lk",
          duration: 6000,
          classNames: {
            description: "!text-slate-500",
          },
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error("Something went wrong", {
        id: loadingToastId,
        description:
          "An unexpected error occurred. Please check your connection and try again.",
        duration: 6000,
        classNames: {
          description: "!text-slate-500",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-7 py-20 lg:py-28">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Let's Start a Conversation
            </p>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Get in touch with our team for all your office and IT equipment
              needs. We're here to help you find the perfect solutions for your
              business.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-7 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 [@media(min-width:1388px)]:grid-cols-4 gap-6 md:gap-8">
            {/* Address Card */}
            <div className="bg-white h-auto rounded-xl shadow-lg p-6 text-center justify-center group hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Visit Us
              </h3>
              <Link
                to="https://www.google.com/maps/place/සෙත්+සේවන+හෙද+විද්%E2%80%8Dයලය+කුරුණෑගල+_+seth+sewana+nursing+school+kurunegala/@7.4804306,80.3670562,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae3391721cf742f:0xe12fa333b13596b9!8m2!3d7.4804306!4d80.3696311!16s%2Fg%2F11rjrzc_f1?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 block"
              >
                <p className="text-sm">No.177/E, Kandy Road</p>
                <p className="text-sm">Kurunegala, Sri Lanka</p>
              </Link>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Call Us
              </h3>
              <div className="space-y-1">
                <Link
                  to="tel:+94725828283"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 block text-sm"
                >
                  +94 (72) 582 8283
                </Link>
                <Link
                  to="tel:+94372202000"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 block text-sm"
                >
                  +94 (37) 220 2000
                </Link>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Us
              </h3>
              <Link
                to="mailto:info@officeit.lk"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 block text-sm"
              >
                info@officeit.lk
              </Link>
              <Link
                to="mailto:chathuranga@officeit.lkk"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 block text-sm"
              >
                chathuranga@officeit.lk
              </Link>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Business Hours
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex flex-col lg:flex-row justify-center lg:space-x-2">
                  <p className="mr-3">Monday - Friday:</p>
                  <p className="font-medium">8:30 AM - 5:30 PM</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-center lg:space-x-2">
                  <p className="mr-3">Saturday:</p>
                  <p className="font-medium">8:30 AM - 1:30 PM</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-center lg:space-x-2">
                  <p className="mr-3">Sunday:</p>
                  <p className="font-medium">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Social Media Section */}
      <section ref={formSectionRef} className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have a question or need more information? Fill out the form
                below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={nameInputRef}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g.: 0725828283"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Tell us more about your requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-medium"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Social Media and Additional Info */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Connect with Us
              </h2>
              <p className="text-gray-600 mb-8">
                Follow us on social media for the latest updates, product
                announcements, and special offers.
              </p>

              {/* Social Media Links */}
              <div className="space-y-4 mb-8">
                <Link
                  to="https://www.facebook.com/officeitpvtltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Facebook</h3>
                    <p className="text-sm text-gray-600">
                      Follow us on Facebook
                    </p>
                  </div>
                </Link>

                <Link
                  to="https://wa.me/94725828283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <WhatsAppIcon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-sm text-gray-600">
                      Chat with us instantly
                    </p>
                  </div>
                </Link>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Choose Office IT?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>High-quality office and IT equipment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expert consultation and support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Competitive pricing and flexible payment options
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Fast delivery and installation services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-7">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our showroom to see our products in person and get expert
              advice from our team.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-96 md:h-[450px] lg:h-72 border-2 border-gray-200 rounded-xl shadow-xl shadow-purple-100/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.760234696!2d80.3670562!3d7.4804306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3391721cf742f%3A0xe12fa333b13596b9!2z4LK44LGB4LKz4LK6IOCyuOCzgOCyteCyuiDgspngrrLgspQg4LC14LC_4LKQ4LOU4LKv4LKy4LKwIOCyleCzgOCysOCzgOCyoyAtIOCyuOCzgOCypOCzigsgc2V3YW5hIG5lcnNpbmcgc2Nob29sIGt1cnVuZWdhbGE!5e0!3m2!1sen!2slk!4v1699999999999!5m2!1sen!2slk"
                className="absolute inset-0 w-full h-full border-0 rounded-xl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office IT Location Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

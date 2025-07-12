import React from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";

export function FormDemo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      // Handle form submission
      console.log("Form submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen py-20">
      <motion.div
        className="max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Contact Us
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            Have questions or need support? We're here to help you on your
            journey 🚀
          </motion.p>
        </motion.div>

        {/* Form Section */}
        <motion.div className="max-w-2xl mx-auto" variants={itemVariants}>
          <motion.div
            className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <form onSubmit={submitHandler} className="space-y-8">
                {/* Name Fields */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={itemVariants}
                >
                  <LabelInputContainer>
                    <Label htmlFor="firstname">
                      <User className="w-4 h-4 mr-2" />
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      placeholder="Enter your first name"
                      type="text"
                      required
                    />
                  </LabelInputContainer>

                  <LabelInputContainer>
                    <Label htmlFor="lastname">
                      <User className="w-4 h-4 mr-2" />
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      placeholder="Enter your last name"
                      type="text"
                      required
                    />
                  </LabelInputContainer>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <LabelInputContainer>
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      placeholder="your.email@example.com"
                      type="email"
                      required
                    />
                  </LabelInputContainer>
                </motion.div>

                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                  <LabelInputContainer>
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                      required
                    />
                  </LabelInputContainer>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={itemVariants}>
                  <LabelInputContainer>
                    <Label htmlFor="message">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Label>
                    <textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-white hover:border-gray-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </LabelInputContainer>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="flex items-center justify-center space-x-2 relative z-10">
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    {/* Button Gradient Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    <BottomGradient />
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <p className="text-gray-600 font-medium">
            Or reach us directly at{" "}
            <motion.a
              href="mailto:support@100xdevs.com"
              className="text-blue-600 hover:text-purple-600 font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              support@100xdevs.com
            </motion.a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex w-full flex-col space-y-3 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </label>
  );
};

const Input = ({
  id,
  placeholder,
  type,
  required = false,
}: {
  id: string;
  placeholder: string;
  type: string;
  required?: boolean;
}) => {
  return (
    <motion.input
      id={id}
      placeholder={placeholder}
      type={type}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 placeholder-gray-500"
      style={{ fontFamily: "'Inter', sans-serif" }}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    />
  );
};

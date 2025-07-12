import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react";

export const Footer = () => {
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

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      x: 5,
      color: "#3b82f6",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const socialLinks = [
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "#",
      color: "hover:text-gray-700",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "#",
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#", icon: <Users className="w-4 h-4" /> },
    { name: "Directory", href: "#", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Dashboard", href: "#", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Login", href: "#", icon: <ExternalLink className="w-4 h-4" /> },
  ];

  const resources = [
    { name: "Workshops", href: "#" },
    { name: "Career Support", href: "#" },
    { name: "Meetups", href: "#" },
    { name: "Jobs Board", href: "#" },
  ];

  return (
    <motion.footer
      className="bg-white border-t border-gray-200 mt-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-16"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <motion.h2
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <motion.span
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    100xAlumni
                  </motion.span>
                </motion.h2>
              </motion.div>

              <motion.p
                className="text-gray-600 font-medium leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
                variants={itemVariants}
              >
                Empowering alumni to connect, grow, and lead in the tech world.
                Join the movement that's{" "}
                <span className="text-blue-600 font-semibold">
                  transforming careers
                </span>
                .
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex space-x-4"
                variants={containerVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 ${social.color} group`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Quick Links</span>
              </motion.h3>
              <motion.ul className="space-y-4" variants={containerVariants}>
                {quickLinks.map((link, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <motion.a
                      href={link.href}
                      className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 group"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      variants={linkVariants}
                      whileHover="hover"
                    >
                      <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Resources</span>
              </motion.h3>
              <motion.ul className="space-y-4" variants={containerVariants}>
                {resources.map((link, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <motion.a
                      href={link.href}
                      className="text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 block"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      variants={linkVariants}
                      whileHover="hover"
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Stay Connected</span>
              </motion.h3>

              <motion.p
                className="text-gray-600 font-medium mb-4 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
                variants={itemVariants}
              >
                Get the latest updates on events, opportunities, and community
                news.
              </motion.p>

              <motion.div className="space-y-3" variants={containerVariants}>
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  variants={itemVariants}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-200 bg-gray-50"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
              variants={containerVariants}
            >
              <motion.p
                className="text-gray-600 font-medium text-center md:text-left"
                style={{ fontFamily: "'Inter', sans-serif" }}
                variants={itemVariants}
              >
                © {new Date().getFullYear()} 100xAlumni. All rights reserved.
                <span className="text-blue-600 font-semibold">
                  {" "}
                  Built with ❤️ for the community
                </span>
              </motion.p>

              <motion.div
                className="flex items-center space-x-6 text-sm"
                variants={containerVariants}
              >
                {["Privacy Policy", "Terms of Service", "Support"].map(
                  (item, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      variants={linkVariants}
                      whileHover="hover"
                    >
                      {item}
                    </motion.a>
                  ),
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

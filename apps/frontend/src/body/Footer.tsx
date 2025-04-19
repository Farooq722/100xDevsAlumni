export const Footer = () => {
  return (
    <footer className="bg-gradient-to-bl from-teal-200 to-pink-200 text-black mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-black">100xAlumni</h2>
          <p className="text-lg">
            Empowering alumni to connect, grow, and lead in the tech world. Join
            the movement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-black">Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Directory
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Login
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-black">Resources</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Workshops
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Career Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Meetups
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Jobs Board
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-black">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-pink-800">
                Email Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 text-center py-4 text-sm">
        © {new Date().getFullYear()} 100xAlumni. All rights reserved.
      </div>
    </footer>
  );
};

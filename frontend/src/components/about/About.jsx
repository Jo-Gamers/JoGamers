import React from "react";
import Navbar from "../navbar/Navbar";

const AboutUs = () => {
  return (
    <section className="py-16 bg-[#EFF5F5] text-gray-800">
      <Navbar/>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#497174] mb-4">
            About <span className="text-[#EB6440]">Us</span>
          </h2>
          <p className="text-lg text-gray-600">
            Learn more about our mission, vision, and the team behind our
            platform.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-[#497174] mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700">
              Our mission is to provide gamers and enthusiasts with the most
              up-to-date information on upcoming game releases, breaking news,
              and insightful content. We aim to build a community where everyone
              can share their passion for gaming.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-lg text-gray-600">
              Your content and community are our priorities.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="flex justify-center items-center">
            <p className="text-lg text-gray-600">
              To keep pushing the boundaries of what gaming content can be!
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-[#497174] mb-4">
              Our Vision
            </h3>
            <p className="text-lg text-gray-700">
              Our vision is to create an inclusive platform where gamers can
              engage, learn, and grow together. We strive to offer content that
              sparks creativity, encourages new connections, and keeps players
              up-to-date on everything in the gaming world.
            </p>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-[#497174] text-center mb-8">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1: Scrum Master */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Mohammed Alsarrawi
              </h4>
              <p className="text-sm text-gray-600">Scrum Master</p>
            </div>

            {/* Team Member 2: Product Owner */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Mustafa Obeidat
              </h4>
              <p className="text-sm text-gray-600">Product Owner</p>
            </div>

            {/* Team Member 3: QA */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Mohammed Abudayyeh
              </h4>
              <p className="text-sm text-gray-600">QA</p>
            </div>

            {/* Team Member 4: Developer */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Hasan Mansour
              </h4>
              <p className="text-sm text-gray-600">Developer</p>
            </div>

            {/* Team Member 5: Developer */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Ahmad Tabaza
              </h4>
              <p className="text-sm text-gray-600">Developer</p>
            </div>

            {/* Team Member 6: Developer */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 p-6">
              <h4 className="text-xl font-semibold text-[#497174]">
                Faisal Jadallah
              </h4>
              <p className="text-sm text-gray-600">Developer</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Join our community and become a part of the future of gaming. Stay
            connected and informed!
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block text-[#EB6440] font-semibold hover:text-[#497174] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

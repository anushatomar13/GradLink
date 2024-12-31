// import React, { useState } from 'react';

// const FeaturesSection = () => {
//   const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

//   const features = [
//     { title: 'Alumni Registration', description: 'Allow alumni to register and create profiles on the platform.' },
//     { title: 'Job Portal', description: 'Browse job opportunities, mentorship programs, and professional growth avenues.' },
//     { title: 'Donation Portal', description: 'Facilitate donations for alumni projects, scholarships, and educational funds.' },
//     { title: 'Networking Hub', description: 'Connect with fellow alumni for professional networking and collaboration.' },
//     { title: 'Alumni Directory & Success Stories', description: 'Search alumni profiles and track successful career paths and stories.' },
//     { title: 'Events and Reunions', description: 'Create, manage, and participate in alumni events, reunions, and celebrations.' },
//     { title: 'Feedback and Surveys', description: 'Collect feedback from alumni to improve platform features and initiatives.' },
//     { title: 'Mentorship Programs', description: 'Foster mentor-mentee relationships for alumni to guide younger graduates.' },
//     { title: 'Volunteer Opportunities', description: 'Enable alumni to find volunteer opportunities and give back to the community.' },
//     { title: 'Alumni News and Updates', description: 'Stay updated on the latest news, accomplishments, and announcements within the alumni network.' },
//     { title: 'Alumni Resource Center', description: 'Access career development tools, resume templates, and workshops tailored to alumni needs.' },
//     { title: 'Alumni Stories and Spotlights', description: 'Showcase alumni achievements and share inspiring career and life journeys.' },
//     { title: 'Exclusive Offers', description: 'Get special offers, discounts, and benefits from alumni-owned businesses and partners.' },
//     { title: 'Job Referral System', description: 'Alumni can refer others for job openings or share opportunities with the community.' },
//     { title: 'Awards and Recognition', description: 'Celebrate alumni achievements with awards and recognition for contributions to society.' },
//     { title: 'Freelance/Internship Job Board', description: 'Discover short-term freelance gigs or internships suited for alumni exploring new fields.' },
//   ];

//   const goToNextFeature = () => {
//     setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
//   };

//   const goToPreviousFeature = () => {
//     setCurrentFeatureIndex(
//       (prevIndex) => (prevIndex - 1 + features.length) % features.length
//     );
//   };

//   return (
//     <section className="p-12 bg-gray-900 text-cyan-400">
//       <div className="relative z-10 max-w-7xl mx-auto text-center">
//         <h2 className="text-4xl font-extrabold text-white mb-12 tracking-wider">
//           Platform Highlights
//         </h2>

//         <div className="bg-gray-800 text-gray-100 rounded-xl shadow-lg p-8 transition-all duration-500">
//           <h3 className="text-3xl font-medium mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//             {features[currentFeatureIndex].title}
//           </h3>
//           <p className="text-lg mb-6">{features[currentFeatureIndex].description}</p>

//           <div className="flex justify-center gap-6 mt-8">
//             <button
//               onClick={goToPreviousFeature}
//               className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Previous
//             </button>
//             <button
//               onClick={goToNextFeature}
//               className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

import React, { useState } from 'react';

const FeaturesSection = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    { title: 'Alumni Registration', description: 'Allow alumni to register and create profiles on the platform.' },
    { title: 'Job Portal', description: 'Browse job opportunities, mentorship programs, and professional growth avenues.' },
    { title: 'Donation Portal', description: 'Facilitate donations for alumni projects, scholarships, and educational funds.' },
    { title: 'Networking Hub', description: 'Connect with fellow alumni for professional networking and collaboration.' },
    { title: 'Alumni Directory & Success Stories', description: 'Search alumni profiles and track successful career paths and stories.' },
    { title: 'Events and Reunions', description: 'Create, manage, and participate in alumni events, reunions, and celebrations.' },
    { title: 'Feedback and Surveys', description: 'Collect feedback from alumni to improve platform features and initiatives.' },
    { title: 'Mentorship Programs', description: 'Foster mentor-mentee relationships for alumni to guide younger graduates.' },
    { title: 'Volunteer Opportunities', description: 'Enable alumni to find volunteer opportunities and give back to the community.' },
    { title: 'Alumni News and Updates', description: 'Stay updated on the latest news, accomplishments, and announcements within the alumni network.' },
    { title: 'Alumni Resource Center', description: 'Access career development tools, resume templates, and workshops tailored to alumni needs.' },
    { title: 'Alumni Stories and Spotlights', description: 'Showcase alumni achievements and share inspiring career and life journeys.' },
    { title: 'Exclusive Offers', description: 'Get special offers, discounts, and benefits from alumni-owned businesses and partners.' },
    { title: 'Job Referral System', description: 'Alumni can refer others for job openings or share opportunities with the community.' },
    { title: 'Awards and Recognition', description: 'Celebrate alumni achievements with awards and recognition for contributions to society.' },
    { title: 'Freelance/Internship Job Board', description: 'Discover short-term freelance gigs or internships suited for alumni exploring new fields.' },
  ];

  const goToNextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const goToPreviousFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex - 1 + features.length) % features.length
    );
  };

  return (
    <section id="features" className="py-12 bg-gray-900 text-cyan-400">
      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 
                       text-white [text-shadow:0_0_10px_rgba(0,255,255,0.5)]
                       bg-clip-text text-transparent bg-gradient-to-r 
                       from-cyan-400 to-blue-500">
          Platform Highlights
        </h2>

        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-8 transition-all duration-500">
          <h3 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {features[currentFeatureIndex].title}
          </h3>
          <p className="text-lg mb-6">{features[currentFeatureIndex].description}</p>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={goToPreviousFeature}
              className="group relative px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 
                         hover:bg-cyan-400 hover:text-gray-900 transition-all duration-1000
                         overflow-hidden font-mono">
              <div className="absolute inset-0 w-1 bg-cyan-400 transition-all duration-300
                           group-hover:w-full -z-10" />
              &lt; Previous
            </button>
            <button
              onClick={goToNextFeature}
              className="group relative px-6 py-3 bg-cyan-400 text-gray-900 
                         hover:bg-cyan-300 transition-all duration-300
                         font-mono">
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Animated corner borders */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400 animate-pulse" />
    </section>
  );
};

export default FeaturesSection;
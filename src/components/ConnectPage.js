import React, { useState } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, UserPlus } from 'lucide-react';

const ConnectPage = () => {
  const [filters, setFilters] = useState({
    year: '',
    industry: '',
    location: ''
  });

  const alumni = [
    {
      id: 1,
      name: "Sunaina Sharma",
      year: "2019",
      role: "Software Engineer",
      company: "Google",
      location: "San Francisco",
      industry: "Technology",
      interests: ["AI/ML", "Web Development", "Mentoring"],
    },
    {
      id: 2,
      name: "Romil Shekhawat",
      year: "2018",
      role: "Product Manager",
      company: "Amazon",
      location: "Seattle",
      industry: "Technology",
      interests: ["Product Strategy", "UX Design", "Startups"],
    },
    {
        id: 3,
        name: "Sakshi Vijay",
        year: "2016",
        role: "IOS Developer",
        company: "Apple",
        location: "California",
        industry: "Technology",
        interests: ["Development", "UX Design", "SEO"],
      },
      {
        id: 4,
        name: "Aarav Sharma",
        year: "2015",
        role: "Data Scientist",
        company: "Flipkart",
        location: "Bangalore",
        industry: "E-commerce",
        interests: ["Data Analytics", "Machine Learning", "E-commerce"],
      },
      {
        id: 5,
        name: "Priya Reddy",
        year: "2017",
        role: "Cloud Engineer",
        company: "Microsoft",
        location: "Hyderabad",
        industry: "Technology",
        interests: ["Cloud Computing", "DevOps", "Cybersecurity"],
      },
      {
        id: 6,
        name: "Arvind Kumar",
        year: "2014",
        role: "AI Researcher",
        company: "Tata Consultancy Services",
        location: "Mumbai",
        industry: "Consulting",
        interests: ["AI", "Research", "Ethical AI"],
      },
      {
        id: 7,
        name: "Simran Kapoor",
        year: "2016",
        role: "Full Stack Developer",
        company: "Zoho",
        location: "Chennai",
        industry: "Software",
        interests: ["Full Stack Development", "JavaScript", "Web Security"],
      },
      {
        id: 8,
        name: "Rahul Soni",
        year: "2018",
        role: "Blockchain Developer",
        company: "Wipro",
        location: "Noida",
        industry: "Technology",
        interests: ["Blockchain", "Cryptocurrency", "Decentralized Applications"],
      },
      {
        id: 9,
        name: "Neha Gupta",
        year: "2019",
        role: "Product Designer",
        company: "Swiggy",
        location: "Bangalore",
        industry: "Food Delivery",
        interests: ["UI/UX Design", "Product Design", "Design Thinking"],
      },
      {
        id: 10,
        name: "Karan Patel",
        year: "2015",
        role: "Network Architect",
        company: "Cisco",
        location: "Pune",
        industry: "Networking",
        interests: ["Networking", "5G", "Telecommunications"],
      },
      {
        id: 11,
        name: "Meera Desai",
        year: "2017",
        role: "Android Developer",
        company: "Adobe",
        location: "Bangalore",
        industry: "Software",
        interests: ["Android Development", "Mobile Apps", "Cloud Computing"],
      },
      {
        id: 12,
        name: "Vikram Singh",
        year: "2016",
        role: "Business Analyst",
        company: "Deloitte",
        location: "Gurgaon",
        industry: "Consulting",
        interests: ["Data Analysis", "Business Intelligence", "Strategy"],
      },
      {
        id: 13,
        name: "Ananya Iyer",
        year: "2014",
        role: "Marketing Manager",
        company: "Ola",
        location: "Mumbai",
        industry: "Transportation",
        interests: ["Digital Marketing", "Growth Hacking", "Branding"],
      },
      {
        id: 14,
        name: "Ravi Ramesh",
        year: "2015",
        role: "Software Architect",
        company: "Infosys",
        location: "Bangalore",
        industry: "IT Services",
        interests: ["Software Architecture", "Cloud", "Tech Leadership"],
      },
      {
        id: 15,
        name: "Deepa Nair",
        year: "2018",
        role: "Cybersecurity Specialist",
        company: "IBM",
        location: "Chennai",
        industry: "Technology",
        interests: ["Cybersecurity", "Ethical Hacking", "Data Privacy"],
      },
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search alumni by name, company, or role..."
              className="w-full py-3 px-4 pr-10 bg-gray-800 border border-cyan-400/20 
                       text-white rounded-lg focus:outline-none focus:border-cyan-400/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 w-5 h-5" />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="px-4 py-3 bg-gray-800 border border-cyan-400/20 text-white 
                       rounded-lg focus:outline-none focus:border-cyan-400/50"
            >
              <option value="">Graduation Year</option>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filters.industry}
              onChange={(e) => setFilters({...filters, industry: e.target.value})}
              className="px-4 py-3 bg-gray-800 border border-cyan-400/20 text-white 
                       rounded-lg focus:outline-none focus:border-cyan-400/50"
            >
              <option value="">Industry</option>
              {["Technology", "Finance", "Healthcare", "Education"].map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map(person => (
            <div key={person.id} className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 
                                        hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/20">
                    <img
                      src={`${person.name}.jpeg`}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                    <p className="text-cyan-400 text-sm">{person.role}</p>
                  </div>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                  <UserPlus size={20} />
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Briefcase size={16} className="text-cyan-400/70" />
                  <span>{person.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap size={16} className="text-cyan-400/70" />
                  <span>Class of {person.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-cyan-400/70" />
                  <span>{person.location}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {person.interests.map(interest => (
                  <span key={interest} className="px-2 py-1 text-xs bg-cyan-400/10 text-cyan-400 
                                              rounded-full border border-cyan-400/20">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
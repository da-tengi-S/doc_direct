import React from 'react'
import { assets } from '../assets/assets'
import { FaChartLine, FaUserFriends, FaHandshake } from 'react-icons/fa'

const About = () => {
  return (
    <div className="px-6 md:px-10 lg:px-24 py-16 bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800">
      {/* About Us Header */}
      <div className="text-center text-3xl font-bold pb-12">
        <p>
          About <span className="text-indigo-600">Us</span>
        </p>
      </div>

      {/* About Us Content */}
      <div className="my-12 flex flex-col md:flex-row gap-10 items-center">
        <img
          className="w-full md:max-w-md rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          src={assets.about_image}
          alt="About us"
        />

        <div className="flex flex-col justify-center gap-6 text-lg md:w-2/3 text-gray-700">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quae, sapiente minus ab laboriosam a porro commodi temporibus voluptate nulla nisi blanditiis quidem, impedit laborum voluptatum iste eaque facere obcaecati.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At delectus officiis, ratione eos sunt ipsam! Perferendis quod autem earum corrupti ex cupiditate ratione asperiores officia fuga? Quis reiciendis dolore maiores!</p>
          
          <b className="text-gray-900 text-2xl mt-8">Our Vision</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos delectus dolorum omnis libero aut illum ratione amet. Consectetur ducimus veniam unde placeat necessitatibus iusto sunt hic accusamus nisi temporibus. Consequuntur?</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl mt-16 text-center font-bold text-gray-800">
        <p>WHY <span className="text-indigo-600">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-10 mb-20">
        {[
          { title: "Efficiency", icon: <FaChartLine /> },
          { title: "Competence", icon: <FaUserFriends /> },
          { title: "Personalization", icon: <FaHandshake /> }
        ].map((feature, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg px-8 py-8 flex flex-col gap-4 text-gray-700 items-center text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-white hover:bg-indigo-600 hover:text-white hover:shadow-lg">
            <div className="text-3xl text-indigo-600 hover:text-white transition-colors duration-300">
              {feature.icon}
            </div>
            <b className="text-lg">{feature.title}</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit aliquam ex dolor vel, quas quo soluta, maxime, accusantium quidem vitae adipisci fugiat veniam nobis necessitatibus eligendi. Nihil voluptas minima nostrum!</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="text-xl mt-16 text-center font-bold text-gray-800">
        <p>OUR <span className="text-indigo-600">STATS</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8 justify-around text-center text-gray-800">
        {[
          { label: "Projects Completed", value: "200+" },
          { label: "Years of Experience", value: "10+" },
          { label: "Happy Clients", value: "150+" }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105">
            <p className="text-4xl font-semibold text-indigo-600">{stat.value}</p>
            <p className="text-lg text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="text-xl mt-16 text-center font-bold text-gray-800">
        <p>MEET OUR <span className="text-indigo-600">TEAM</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8 mb-20 justify-around items-center">
        {[
          { name: "Alex Johnson", role: "CEO", img: assets.team_member1 },
          { name: "Sophia Lee", role: "CTO", img: assets.team_member2 },
          { name: "Michael Brown", role: "Lead Designer", img: assets.team_member3 }
        ].map((member, idx) => (
          <div key={idx} className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 w-60 transform hover:scale-105 transition-transform duration-300">
            <img
              className="w-24 h-24 rounded-full mb-4 shadow-md"
              src={member.img}
              alt={member.name}
            />
            <p className="text-lg font-bold">{member.name}</p>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About

import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-8">
      <div className="text-center">
        <p className="text-3xl text-gray-800 font-semibold pt-10">
          CONTACT <span className="text-blue-500">US</span>
        </p>
        <div className="mt-6">
          <img className="w-full max-w-[360px] rounded-lg shadow-lg mx-auto" src={assets.contact_image} alt="Contact" />
        </div>
      </div>
      
      <div className="my-10 flex flex-col justify-center items-center md:flex-row gap-10 md:gap-28 text-sm text-gray-700 max-w-4xl">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg">OUR Office</p>
          <p className="mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut blanditiis
            ipsum unde expedita est, dolore voluptatibus aspernatur. Porro sequi corporis,
            facilis repellendus maiores suscipit perferendis quae debitis dolore vitae.
          </p>
        </div>

        <div className="text-center md:text-left">
          <p className="font-bold text-lg">Contact Information</p>
          <p className="mt-3 leading-relaxed">
            Tel: 12345678 <br />
            <a href="mailto:hello@gmail.com" className="text-blue-500 hover:underline">hello@gmail.com.np</a>
          </p>
        </div>

        <div className="text-center md:text-left">
          <p className="font-bold text-lg">Careers at Doc-Direct</p>
          <p className="mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur
            accusantium expedita voluptas voluptatibus, mollitia nesciunt iste vero.
            Accusantium maiores atque ad magni ea quisquam aperiam! Molestiae, dignissimos.
            Facere, voluptates?
          </p>
          <button className="mt-4 border border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-all">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Contact = () => {
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return toast.error('All fields are required');
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${backendUrl}/api/form`, formData);

      if (data.success) {
        toast.success('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-blue-100 p-8 min-h-screen">
    <div
  className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-blue-100 p-6 min-h-screen"
  style={{
    backgroundImage: `url('https://www.shutterstock.com/image-photo/doctor-utilizing-advanced-digital-tablet-600nw-2481904799.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="text-center">
    <p className="text-5xl text-gray-800 font-extrabold pt-10">
      Connect with <span className="text-blue-600">Us</span>
    </p>
  </div>

  <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 max-w-7xl">
    <div className="p-8 bg-white bg-opacity-80 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <p className="font-bold text-xl text-blue-600">Our Office</p>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut
        blanditiis ipsum unde expedita est, dolore voluptatibus aspernatur. Porro sequi
        corporis, facilis repellendus maiores suscipit perferendis quae debitis dolore
        vitae.
      </p>
    </div>

    <div className="p-8 bg-white bg-opacity-80 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <p className="font-bold text-xl text-blue-600">Contact Information</p>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Tel: 12345678 <br />
        <a href="mailto:hello@gmail.com" className="text-blue-500 hover:underline">
          hello@gmail.com.np
        </a>
      </p>
    </div>

    <div className="p-8 bg-white bg-opacity-80 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <p className="font-bold text-xl text-blue-600">Careers at Doc-Direct</p>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur
        accusantium expedita voluptas voluptatibus, mollitia nesciunt iste vero.
        Accusantium maiores atque ad magni ea quisquam aperiam! Molestiae, dignissimos.
        Facere, voluptates?
      </p>
      <button className="mt-4 py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
        Explore Jobs
      </button>
    </div>
  </div>
</div>

      {/* Support Form */}
      
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Support Center</h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Issue Type
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
              required
            >
              <option value="">Select an issue</option>
              <option value="Login Issue">Login Issue</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Appointment Issue">Appointment Issue</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

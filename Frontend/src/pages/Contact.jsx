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
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-gray-50 p-10">
      <div className="text-center">
        <p className="text-4xl text-gray-900 font-bold pt-10">
          Connect with <span className="text-blue-600">Us</span>
        </p>
        <div className="mt-6">
          <img
            className="w-full max-w-[400px] rounded-xl shadow-xl mx-auto border border-gray-200"
            src={assets.contact_image}
            alt="Contact"
          />
        </div>
      </div>

      <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-800 max-w-6xl">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="font-bold text-xl text-blue-600">Our Office</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut
            blanditiis ipsum unde expedita est, dolore voluptatibus aspernatur. Porro sequi
            corporis, facilis repellendus maiores suscipit perferendis quae debitis dolore
            vitae.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="font-bold text-xl text-blue-600">Contact Information</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Tel: 12345678 <br />
            <a href="mailto:hello@gmail.com" className="text-blue-500 hover:underline">
              hello@gmail.com.np
            </a>
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="font-bold text-xl text-blue-600">Careers at Doc-Direct</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur
            accusantium expedita voluptas voluptatibus, mollitia nesciunt iste vero.
            Accusantium maiores atque ad magni ea quisquam aperiam! Molestiae, dignissimos.
            Facere, voluptates?
          </p>
          <button className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Explore Jobs
          </button>
        </div>
      </div>
      {/* Support Form */}
      
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Support Center</h2>
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
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
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
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
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
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
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
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-medium"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
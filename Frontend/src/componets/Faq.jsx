import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: 'What is Doc_direct?',
      answer: 'Doc_direct is an online platform that connects patients with qualified doctors for consultations, scheduling appointments, and accessing medical records.',
    },
    {
      question: 'How do I start an online consultation with doctors on Doc_direct?',
      answer: 'Starting an online doctor consultation is simple on Doc_direct. Create an account, select a doctor, and schedule a consultation at your convenience.',
    },
    {
      question: 'Are the doctors on Doc_direct verified?',
      answer: 'Yes, we follow a strict verification process to ensure that every doctor on Doc_direct is licensed and qualified.',
    },
    {
      question: 'Is my data secure on Doc_direct?',
      answer: 'We prioritize your privacy and data security, complying with industry standards to keep your information safe and confidential.',
    },
    {
      question: 'What if I face issues during my consultation?',
      answer: 'If you encounter any issues, our support team is available 24/7 to assist you. Additionally, you can reschedule or request a refund if needed.',
    },
    {
      question: 'Can I book in-person appointments using Doc_direct?',
      answer: 'Yes, Doc_direct allows you to book in-person appointments with doctors at their clinics or hospitals, based on your preference.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-12">
        Frequently Asked Questions
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              {faq.question}
            </h2>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

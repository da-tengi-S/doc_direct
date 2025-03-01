

// import React, { useContext, useState } from 'react'
// import { assets } from '../../assets/assets_admin/assets'
// import { AdminContext } from '../../context/AdminContext'
// import {toast} from 'react-toastify'
// import axios from 'axios'

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setpassword] = useState('')
//   const [experience, setExperience] = useState('1 year');
//   const [fees, setFees] = useState('')
//   const [about, setAbout] = useState('')
//   const [specilaity, setSpecilaity] = useState('Genaral Physician')
//   const [degree, seDegree] = useState('')
//   const [addres1, setAddress1] = useState('')
//   const [addres2, setAddress2] = useState('')

//   const { backendUrl , aToken} = useContext(AdminContext)

//   const onSubmithandler = async (event) => {
//     event.preventDefault()
//     try{
//       if(!docImg){
//         return toast.error('img is not selceted')
//       }
//       const formData = new FormData()
//       formData.append('image', docImg)
//       formData.append('name', name)
//       formData.append('email', email)
//       formData.append('password', password)
//       formData.append('experience', experience)
//       formData.append('fees', Number(fees))
//       formData.append('about', about)
//       formData.append('speciality', specilaity); 
//       formData.append('degree', degree)
//       formData.append('address', JSON.stringify({ line1: addres1, line2: addres2 }));

//       //for check 
//       formData.forEach((value, key)=> {
//         console.log(`${key} : ${value}`)
//       })
//       const { data } = await axios.post(
//         backendUrl + '/api/admin/add-doctor',
//         formData,
//         { headers: { Authorization: `Bearer ${aToken}` } }
//       );
      

//       if(data.success ){
//         toast.success(data.message)
//         setDocImg(false)
//         setName('')
//         setpassword('')
//         setAddress1("")
//         setAddress2('')
//         setAbout('')
//         setFees('')
//         setEmail('')


//       }
//       else{
//         toast.error(data.message)
//       }

      
//     }catch{
//       toast.error(error.message)
//       console.log(error)
//     }
//   }

//   return (
//     <form onSubmit={onSubmithandler} className=" max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">Add Doctor</h2>
      
//       {/* Upload Doctor Picture */}
//       <div className="flex flex-col items-center">
//         <label htmlFor="doc-img" className="cursor-pointer">
//           <img src={docImg ? URL.createObjectURL(docImg):assets.upload_area} alt="Upload" className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
//         </label>
//         <input onChange={(e) =>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
//         <p className="mt-1 text-midium text-black-900">Upload Doctor Picture</p>
//       </div>
      
//       {/* Form Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* Name Field */}
//         <div>
//           <label className="block text-black-600 mb-2">Your Name</label>
//           <input onChange={(e) =>setName(e.target.value)} value={name} type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
        
//         {/* Email Field */}
//         <div>
//           <label className="block text-black-600 mb-2">Doctor Email</label>
//           <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
        
//         {/* Password Field */}
//         <div>
//           <label className="block text-black-600 mb-2">Doctor Password</label>
//           <input onChange={(e) => setpassword (e.target.value)} value={password} type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
        
//         {/* Experience Dropdown */}
//         <div>
//           <label className="block text-black-600 mb-2">Doctor Experience</label>
//           <select  onChange={(e) => setExperience(e.target.value)} value={experience}  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
//             <option value="1 year">1 year</option>
//             <option value="2 years">2 years</option>
//             <option value="3 years">3 years</option>
//             <option value="4 years">4 years</option>
//             <option value="5 years">5 years</option>
//             <option value="6 years">6 years</option>
//             <option value="7 years">7 years</option>
//             <option value="8 years">8 years</option>
//             <option value="9 years">9 years</option>
//             <option value="10 years">10 years</option>
//           </select>
//         </div>
        
//         {/* Fee Field */}
//         <div>
//           <label className="block text-black-600 mb-2">Doctor Fee</label>
//           <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fees" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
        
//         {/* Speciality Dropdown */}
//         <div>
//           <label className="block text-black-600 mb-2">Speciality</label>
//           <select   onChange={(e) => setSpecilaity(e.target.value)} value={specilaity}  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
//             <option value="General physician">General physician</option>
//             <option value="Gynecologist">Gynecologist</option>
//             <option value="Dermatologist">Dermatologist</option>
//             <option value="Pediatricians">Pediatricians</option>
//             <option value="Neurologist">Neurologist</option>
//             <option value="Gastroenterologist">Gastroenterologist</option>
//           </select>
//         </div>
        
//         {/* Education Field */}
//         <div>
//           <label className="block text-black-600 mb-2">Education</label>
//           <input onChange={(e) =>seDegree(e.target.value) }  value={degree} type="text" placeholder="Education" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
        
//         {/* Address Fields */}
//         <div>
//           <label className="block text-black-600 mb-2">Address</label>
//           <input  onChange={(e) =>setAddress1(e.target.value) }  value={addres1}  type="text" placeholder="Address 1" className="w-full mb-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//           <input  onChange={(e) =>setAddress2(e.target.value) }  value={addres2}  type="text" placeholder="Address 2" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//         </div>
//       </div>
      
//       {/* About Field */}
//       <div>
//         <label className="block text-black-600 mb-2">About</label>
//         <textarea onChange={(e) =>setAbout(e.target.value)} value={about} placeholder="Write about the doctor" rows={5} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required></textarea>
//       </div>
      
//       {/* Submit Button */}
//       <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Add Doctor</button>
//     </form>
//   )
// }

// export default AddDoctor


import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmithandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Image is not selected');
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setAbout('');
        setFees('');
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmithandler} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Make a Application</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-black-600 mb-2">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-black-600 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-black-600 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-black-600 mb-2">Experience</label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            {[...Array(10)].map((_, i) => (
              <option key={i} value={`${i + 1} years`}>{i + 1} years</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-black-600 mb-2">Fee</label>
          <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-black-600 mb-2">Speciality</label>
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-black-600 mb-2">Degree</label>
          <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-black-600 mb-2">Address</label>
          <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" className="w-full mb-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
          <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
      </div>
      <div>
        <label className="block text-black-600 mb-2">About</label>
        <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required></textarea>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
        </label>
        <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Add Doctor</button>
    </form>
  );
};

export default AddDoctor;

import appointment_img from './appointment_img.png'
import headerdoctors from './headerdoctors.png'
import group_profiles from './group_profiles.png'
import ladyforMoreremovebgpreview from './ladyforMoreremovebgpreview.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import dropdown_icon from './dropdown_icon.png'
import logo1 from './logo1.png'
import menu_icon from './menu_icon.png'
import doc1 from './doc1.png';
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';
import Dermatologist from './Dermatologist.png';
import Gastroenterologist from './Gastroenterologist.png';
import General_physician from './General_physician.png';
import Gynecologist from './Gynecologist.png';
import Neurologist from './Neurologist.png';
import Pediatricians from './Pediatricians.png';
import { Form } from 'react-router-dom'


export const assets = {
    appointment_img,
    headerdoctors,
    ladyforMoreremovebgpreview,
    group_profiles,
    logo1,
    profile_pic,
    contact_image,
    about_image,
    menu_icon,
    dropdown_icon,
}
export const specialityData = [
    {
        speciality: 'General Physician (सामान्य चिकित्सक)',
        image: General_physician
    },
    {
        speciality: 'Gynecologist (प्रसूति एवं स्त्रीरोग विशेषज्ञ)',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist (छालारोग विशेषज्ञ)',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician (बालरोग विशेषज्ञ)',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist (आन्द्रा तथा पेट विशेषज्ञ)',
        image: Gastroenterologist
    },
];

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Anil K.C',
        image: doc1,
        speciality: 'General Physician (सामान्य चिकित्सक)',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Anil K.C specializes in preventive care, early diagnosis, and comprehensive treatment of common illnesses. He is committed to providing holistic healthcare services.',
        fees: 1500,
        address: {
            line1: 'Kalanki',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Pasang Futi Sherpa',
        image: doc2,
        speciality: 'Gynecologist (प्रसूति एवं स्त्रीरोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '3 Years',
        about: 'Dr.  Pasang Futi Sherpa focuses on women’s health, offering expert care in gynecological health and pregnancy management.',
        fees: 2000,
        address: {
            line1: 'Kumaripati',
            line2: 'Lalitpur, Nepal'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Anita Parajuli',
        image: doc3,
        speciality: 'Dermatologist (छालारोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '1 Year',
        about: 'Dr. Anita Parajuli is an expert in treating various skin conditions and promoting skin health.',
        fees: 1200,
        address: {
            line1: 'Baneshwor',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Madan Shrestha',
        image: doc4,
        speciality: 'Pediatrician (बालरोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '2 Years',
        about: 'Dr. Madan Shrestha provides specialized care for infants, children, and adolescents.',
        fees: 1800,
        address: {
            line1: 'Pulchowk',
            line2: 'Lalitpur, Nepal'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Parjita Adhikari',
        image: doc5,
        speciality: 'Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Parjita Adhikari is a leading specialist in the diagnosis and treatment of neurological disorders.',
        fees: 2500,
        address: {
            line1: 'Thapathali',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Nisha Acharya',
        image: doc6,
        speciality: 'Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Nisha Acharya is dedicated to offering advanced neurological care with a focus on patient well-being.',
        fees: 2500,
        address: {
            line1: 'Baluwatar',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Prakash Bhandari',
        image: doc7,
        speciality: 'General Physician (सामान्य चिकित्सक)',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Prakash Bhandari emphasizes holistic treatment and early diagnosis for better health outcomes.',
        fees: 1500,
        address: {
            line1: 'Koteshwor',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Pema Tamang',
        image: doc8,
        speciality: 'Gynecologist (प्रसूति एवं स्त्रीरोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '3 Years',
        about: 'Dr. Pema Tamang is a compassionate gynecologist who supports women in all stages of life.',
        fees: 2000,
        address: {
            line1: 'Bouddha',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Binita Sharma',
        image: doc9,
        speciality: 'Dermatologist (छालारोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '1 Year',
        about: 'Dr. Binita Sharma is skilled in diagnosing and treating skin-related conditions effectively.',
        fees: 1200,
        address: {
            line1: 'Dhapasi',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Ramesh Adhikari',
        image: doc10,
        speciality: 'Pediatrician (बालरोग विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '2 Years',
        about: 'Dr. Ramesh Adhikari is an expert in pediatric healthcare, providing comprehensive treatment for children.',
        fees: 1800,
        address: {
            line1: 'Pepsi Cola',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Shreya Koirala',
        image: doc11,
        speciality: 'Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Shreya Koirala offers expert care in diagnosing and treating complex neurological conditions.',
        fees: 2500,
        address: {
            line1: 'Maitidevi',
            line2: 'Kathmandu, Nepal'
        }
    },
];

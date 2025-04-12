import React from 'react'
import Header from '../componets/Header'
import SpecialityMenu from '../componets/SpecialityMenu'
import TopDoctors from '../componets/TopDoctors'
import Banner from '../componets/Banner'
import DoctorsWithVideo from '../componets/DoctorsWithVideo'
import Faq from '../componets/Faq'

const Home = () => {
  return (
    <div>
        <Header/> 
        <DoctorsWithVideo/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
        <Faq/>
    </div>

  )
}

export default Home
import React from 'react'
import Navigationbar from '../Components/Userinterface/Navigationbar/Navigationbar'
import Banner from '../Components/Userinterface/Banner/Banner'
import Footer from '../Components/Userinterface/Footer/Footer'
function Home() {
  return (
    <div>
        <Navigationbar/>
        <Banner/>
        <Footer/>
    </div>
  )
}

export default Home
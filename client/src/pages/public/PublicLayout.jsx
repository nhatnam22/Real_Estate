import { Header } from '@/components/header'
import { Slide } from '@/components/bannerSlide'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { BoxSearch } from '@/components/search'
import { Feature, ReForYou} from '@/components/newsFeature'



const PublicLayout = () => {
  return (
    <div>
      <Header/>
      <Slide/>
      <Feature/>
      <ReForYou/>
      <Outlet/>
    </div>
  )
}

export default PublicLayout

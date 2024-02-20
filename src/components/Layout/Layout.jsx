import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import TopBanner from 'components/TopBanner/TopBanner'
import React from 'react'
import { Layout1280 } from './LayoutStyles'

export default function Layout({children}) {
  return (
    <>
      <Header />
      <TopBanner />
      <Layout1280>
        {children}
      </Layout1280>
      <Footer />
    </>
  )
}

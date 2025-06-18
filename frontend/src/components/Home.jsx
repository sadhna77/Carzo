import React from 'react'
import "tailwindcss";
import { Header } from './ui/Header';
import { Hero } from './ui/Hero';
import { Category } from './ui/Category';
import InfoSection from './ui/Infosection';
import Footer from './ui/Footer';
import { MostSearch } from './ui/MostSearch';


export const Home = () => {
  return (
    <> 
    <Header/>
    <Hero/>
    <Category/>
    <MostSearch/>
    <InfoSection/>
    <Footer/>


    </>
  )
}

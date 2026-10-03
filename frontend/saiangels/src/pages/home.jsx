import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/home.css";
import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import WhySection from "../components/WhySection";
import Programs from "../components/Programs";
import GallerySection from "../components/GallerySection";
import RankCarousel from "../components/RankCarousel";
import Banner from "../components/Banner";


// ✅ Declare data OUTSIDE return (infrastructure section)
const programs = [
  {
    title: "Science",
    image: "/images/science-img.jpg",
    desc: "Build a strong foundation in Science with experienced faculty, practical learning, and a supportive classroom environment.",
  },
  {
    title: "Laboratories",
    image: "/images/commerce-img.jpg",
    desc: "Discover the world of practical science with our well-equipped labs, experienced guidance, and hands-on learning opportunities.",
  },
  {
    title: "Class Room",
    image: "/images/competitive-img.jpg",
    desc: "A Premier institute for NEET/JEE/K-CET/NATA. We have expert faculties in our institute for those who want to opt for different competitive exams.",
  },
];


export default function Home() {

  return (
    <>
      {/* banner starts */}
        <div>
          <Banner />
        </div>
     {/* banner ends */}

      <div className="contact-container p-0">
        

        {/* About Section starts*/}
            <AboutSection />
         {/* about section ends */}


        {/* WHY SECTION starts*/}
          <WhySection />
        {/* WHY SECTION ends*/}


        {/* infrastructure Starts */}
          <Programs programs={programs} />
        {/* infrastructure ends */}


            {/* Result section Starts */}
              <RankCarousel />
            {/* Result section ends */}

        {/* Bottom Section starts*/}
            <CTASection />
        {/* Bottom Section ends*/}


      {/* Gallery starts */}
          <GallerySection />
      {/* Gallery ends */}
      

      </div>
    </>
  );
}
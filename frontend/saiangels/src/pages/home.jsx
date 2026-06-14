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
    title: "Laboratories",
    image: "/images/science-img.jpg",
    desc: "Now study in a leading science college with experienced staff & a positive learning environment. Contact now! ",
  },
  {
    title: "Class Room",
    image: "/images/commerce-img.jpg",
    desc: "Passionate about your higher studies and your subjects?We offer you the best of commerce courses to persue.",
  },
  {
    title: "Office Room",
    image: "/images/competitive-img.jpg",
    desc: "A Premier institute for NEET/JEE/K-CET/NATA in coffee land We have expert faculties in our institute for those who want to opt for different competitive exams.",
  },
];


// ✅ Declare data OUTSIDE return (gallery section)
  const images = [
  { src: "/images/gallery/nature.jpg", caption: "Beautiful Landscape" },
  { src: "/images/gallery/nature.jpg", caption: "Mountain View" },
  { src: "/images/gallery/nature.jpg", caption: "City Lights" },
  { src: "/images/gallery/nature.jpg", caption: "Ocean Breeze" },
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
          <GallerySection images={images} />
      {/* Gallery ends */}
      

      </div>
    </>
  );
}
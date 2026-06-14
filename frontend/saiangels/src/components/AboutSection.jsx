import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="about container">
          <div className="about-container">

            <div className="about-images">
              <img src="/images/about-img.webp" alt="Students discussion"/>
            </div>

            <div className="about-content">
              <h2>Welcome to Sai Angles PU College</h2>

              <p>
                Sai Angels is committed to serving society in an environment 
                dedicated to provide for its students the opportunity to excel 
                in academic performance while also developing their individual 
                talent in the fields of sports and creativity. The institution 
                strives to promote in young minds a sense of responsibility for 
                their own development and an understanding of their duties as 
                members of a society. The institution encourages students to 
                learn and develop the ability to think clearly and express 
                themselves effectively. Along with the habit of analytical and 
                reflective thought, and an awareness about themselves their 
                heritage, their culture, their environment and their country.
              </p>

              <Link to="/about">
                <button className="watch-btn">Read More</button>
              </Link>
            </div>
          </div>
        </section>
  );
}
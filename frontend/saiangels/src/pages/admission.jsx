import { useState } from "react";
import banner from "/images/admission-banner.jpg";
import "../assets/css/admission.css";

export default function Admission() {

  const [course, setCourse] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const response = await fetch("http://localhost/sent2.php", {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    if (result === "success") {
      alert("Message sent successfully ✅");
      e.target.reset(); // clear form
    } else {
      alert("Failed to send message ❌");
    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};

  return (
    <>
          {/* Full Width Banner */}
          <div className="contact-banner-wrapper">
          <img src={banner} alt="Contact Banner" className="contact-banner" />
        </div>

    <div className="container">
      <div className="admission">
      <div className="content">
        <h1>Admission Process at Sri Sai Angels PU College </h1>

        <h2>Eligibility</h2>
        <p>
          To secure admission in one of the best PU colleges in Chikkamagaluru,
          applicants must have successfully passed the Karnataka SSLC
          Examination or an equivalent examination recognized by the Department
          of Pre-University Education, Karnataka.
        </p>

        <h2>Process of Enrolment</h2>
        <ul>
          <li>
            Students must fill out the application form available at the college
            office.
          </li>
          <li>
            Submit the completed form with documents in person or via courier.
          </li>
          <li>
            Shortlisted applicants will be invited for further formalities.
          </li>
          <li>
            Parents/guardians must confirm admission by paying fees within two
            days.
          </li>
          <li>
            Admission is subject to the discretion of the college.
          </li>
        </ul>
      </div>

      <div className="form-box ">
        <h2>Online Admissions Form</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter your name" />
          <input type="email" name="email" placeholder="Enter email address" />
          <input type="tel" name="mobile" placeholder="Enter phone number" />
          <input type="text" name="address" placeholder="Address" />
          <select name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select Course</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
          </select>
          <textarea name="message" placeholder="Enter message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
}
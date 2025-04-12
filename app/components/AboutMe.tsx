"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../css/AboutMe.css";
import { Typewriter } from "react-simple-typewriter";

const AboutMe: React.FC = () => {
  const [logoIndex, setLogoIndex] = useState(1);
  const [photoIndex, setPhotoIndex] = useState(1); // for dev.jpg / dev1.jpg

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setLogoIndex((prev) => (prev >= 3 ? 1 : prev + 1)); // loop DD1-DD3
    }, 2000);

    const photoInterval = setInterval(() => {
      setPhotoIndex((prev) => (prev === 1 ? 2 : 1)); // toggle between dev and dev1
    }, 5000); // 5s interval for photo

    return () => {
      clearInterval(logoInterval);
      clearInterval(photoInterval);
    };
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image-wrapper">
          <Image
            src={`/logo/dev${photoIndex === 1 ? "" : "1"}.jpg`}
            alt="My Photo"
            className="about-image"
            width={300}
            height={300}
          />

          {/* Logo Image Below Photo */}
          <div className="logo-wrapper">
            <Image
              src={`/logo/DD${logoIndex}.png`}
              alt="Designer Devdeep Logo"
              className="logo-image"
              width={160}
              height={50}
            />
          </div>
        </div>

        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-intro">
            Hi! I'm Devdeep,and I'm a 
            <br className="typewriter-break" />
            <span className="typewriter">
              <Typewriter
                words={[
                  "Fast-Paced Designer",
                  "Student",
                  "Creative Coder",
                  "3D Artist",
                  "Problem Solver",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </p>

          <p>
            I love bringing bold ideas to life. I'm a creative thinker who
            delivers high-quality results in less time, always learning and
            pushing the boundaries of what's possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

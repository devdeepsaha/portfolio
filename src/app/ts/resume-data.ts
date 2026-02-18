// src/data/resume-data.ts

export const resumeData = {
  header: {
    title: "Career Timeline",
    lastUpdated: "Feb 2026",
    status: "Available",
    resumeLink: "./resume/resume/devdeep.pdf"
  },
  education: [
    {
      degree: "Bachelor of Technology (CSE)",
      institution: "Abacus Institute of Engineering and Management",
      year: "2022 - 2026",
      score: "CGPA: 7.5",
      isCurrent: true,
    },
    {
      degree: "Class XII (Higher Secondary)",
      institution: "Delhi Public School",
      year: "2022",
      score: "84%",
      isCurrent: false,
    },
    {
      degree: "Class X (Secondary)",
      institution: "Delhi Public School",
      year: "2020",
      score: "93.8%",
      isCurrent: false,
    },
  ],
  experience: [
    {
      role: "INTERN - Full Stack Developer",
      company: "BCCL (Bharat Coking Coal Limited)",
      year: "2nd Sept - 4th Oct 2025",
      description: "Decoupled, Multi-role Content Management System",
      tags: ["React", "Laravel", "Python", "MySQL"],
    },
  ],
  
  // UPDATED: Split into two categories
  certifications: {
    professional: [
      {
        name: "Full Stack Development",
        issuer: "BCCL",
        year: "2025",
        link: "./resume/certifications/bccl.pdf",
        type: "tech" 
      },
      {
        name: "The Fundamentals of Digital Marketing",
        issuer: "Google Digital Unlocked",
        year: "2020",
        link: "./resume/certifications/google-digital.pdf",
        type: "tech"
      },
      {
        name: "Placement Preparation Programme",
        issuer: "Abhyuday IIT Bombay",
        year: "2024",
        link: "./resume/certifications/iit.pdf",
        type: "tech"
      }
      // Add more technical certificates here
      
    ],
    extracurricular: [
      {
        name: "Best Photography",
        issuer: "Amar Chokhe Durga",
        year: "2025",
        link: "/certs/photo.pdf",
        type: "creative"
      },
      // Add more creative/hobby certificates here
    ]
  }
};
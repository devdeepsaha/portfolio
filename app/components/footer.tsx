import "../css/footer.css"; // ✅ Importing the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Devdeep Saha. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/devdeepsaha/">Instagram</a>
            <a href="https://www.linkedin.com/in/devdeep-saha-3b4570260/">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M12 3 2 8l10 5 8-4v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              Greenfield <strong>Academy</strong>
            </span>
          </div>
          <p className={styles.text}>
            Nurturing curious minds and confident leaders since 1985. A modern
            learning community for students aged 5 to 16.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              in
            </a>
            <a href="#" aria-label="YouTube">
              yt
            </a>
            <a href="#" aria-label="LinkedIn">
              li
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.heading}>Explore</h4>
          <ul className={styles.list}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/academics">Academics</Link>
            </li>
            <li>
              <Link to="/faculty">Faculty</Link>
            </li>
            <li>
              <Link to="/admissions">Admissions</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Programs</h4>
          <ul className={styles.list}>
            <li>
              <Link to="/academics">Primary School</Link>
            </li>
            <li>
              <Link to="/academics">Middle School</Link>
            </li>
            <li>
              <Link to="/academics">Secondary School (Class 9 - 10)</Link>
            </li>
            <li>
              <Link to="/academics">Science &amp; Robotics Lab</Link>
            </li>
            <li>
              <Link to="/academics">Sports &amp; Arts</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Get in touch</h4>
          <ul className={styles.list}>
            <li>14 Maple Avenue, Greenfield</li>
            <li>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>
              <a href="mailto:hello@greenfield.edu">hello@greenfield.edu</a>
            </li>
            <li>Mon - Fri, 8:00 AM - 4:30 PM</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {year} Greenfield Academy. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}

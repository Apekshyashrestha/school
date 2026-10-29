import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import styles from './Academics.module.css'

const stages = [
  {
    stage: 'Primary',
    ages: 'Ages 5 - 10 · Grades 1 - 5',
    text: 'Foundational literacy and numeracy through play, stories and guided exploration.',
    subjects: ['English', 'Mathematics', 'Science', 'World Languages', 'Art & Music', 'PE'],
    accent: 'green',
  },
  {
    stage: 'Middle School',
    ages: 'Ages 11 - 14 · Grades 6 - 8',
    text: 'Subject specialists, lab work and project-based learning that builds independence.',
    subjects: ['Literature', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Computing', 'Design'],
    accent: 'amber',
  },
  {
    stage: 'Secondary School',
    ages: 'Ages 15 - 16 · Grades 9 - 10',
    text: 'Board exam preparation with career counselling and guidance for the stream chosen after Class 10.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'Physical Education'],
    accent: 'slate',
  },
]

const facilities = [
  {
    title: 'Science Labs',
    text: 'Physics, chemistry and biology labs with modern safety equipment.',
    icon: 'M9 3h6M10 3v6.5L5.2 17.8A2 2 0 0 0 6.9 21h10.2a2 2 0 0 0 1.7-3.2L14 9.5V3',
  },
  {
    title: 'Robotics & Coding',
    text: 'Weekly robotics sessions from Grade 4 and a dedicated innovation studio.',
    icon: 'M12 3v3m0 12v3M3 12h3m12 0h3M7.8 7.8 5.6 5.6m12.8 12.8-2.2-2.2m0-8.4 2.2-2.2M5.6 18.4l2.2-2.2M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z',
  },
  {
    title: 'Library & Media',
    text: '30,000 titles, quiet study zones and a digital resource centre.',
    icon: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Zm0 0V20.5M8 7h8m-8 4h6',
  },
  {
    title: 'Sports Complex',
    text: 'Olympic-size court, swimming pool, athletics track and football field.',
    icon: 'M12 3a9 9 0 1 0 9 9M12 3v9l6.4 6.4M12 3a9 9 0 0 1 9 9h-9',
  },
  {
    title: 'Arts Centre',
    text: 'Music rooms, a 400-seat theatre and studios for painting and design.',
    icon: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    title: 'Health & Wellbeing',
    text: 'On-site infirmary, counsellors and a daily mindfulness programme.',
    icon: 'M20.8 5.6a5.4 5.4 0 0 0-7.7 0L12 6.7l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7l8.8 8.8 8.8-8.8a5.4 5.4 0 0 0 0-7.7Z',
  },
]

const faculty = [
  { name: 'Dr. Helen Brooks', dept: 'School Leadership', years: '25 yrs' },
  { name: 'Marcus Lee', dept: 'Mathematics', years: '18 yrs' },
  { name: 'Aisha Khan', dept: 'Biology & Chemistry', years: '12 yrs' },
  { name: 'Tom Alvarez', dept: 'Physics & Robotics', years: '9 yrs' },
  { name: 'Grace Mensah', dept: 'English Literature', years: '15 yrs' },
  { name: 'Kenji Watanabe', dept: 'Computer Science', years: '7 yrs' },
]

export default function Academics() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="A curriculum that challenges and inspires"
        lead="Structured pathways from Grade 1 to Grade 10, taught by specialists who make hard things feel possible."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Learning pathways</span>
            <h2 className="section-title">Three stages, one coherent journey</h2>
            <p className="section-lead">
              Each stage builds on the last, so students move forward with
              strong foundations and no gaps.
            </p>
          </div>
          <div className={styles.stages}>
            {stages.map((item) => (
              <article
                key={item.stage}
                className={`${styles.stage} ${styles[item.accent]}`}
              >
                <div className={styles.stageTop}>
                  <span className={styles.stageAges}>{item.ages}</span>
                  <h3>{item.stage}</h3>
                  <p>{item.text}</p>
                </div>
                <ul className={styles.subjects}>
                  {item.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Facilities</span>
            <h2 className="section-title">Built for how students learn today</h2>
          </div>
          <div className="grid-3">
            {facilities.map((item) => (
              <article key={item.title} className="card">
                <span className="icon-badge">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path
                      d={item.icon}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className={styles.facTitle}>{item.title}</h3>
                <p className={styles.facText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.facultyHead}>
            <div>
              <span className="eyebrow">Faculty</span>
              <h2 className="section-title">Taught by people who love to teach</h2>
              <p className="section-lead">
                85 teachers, an average of 12 years&apos; experience, and a
                student - teacher ratio of 18:1.
              </p>
            </div>
            <Link to="/faculty" className="btn btn-outline">
              Meet the team
            </Link>
          </div>
          <div className="grid-3">
            {faculty.map((person) => (
              <article key={person.name} className={`card ${styles.facultyCard}`}>
                <span className={styles.facultyAvatar}>
                  {person.name
                    .split(' ')
                    .map((part) => part.charAt(0))
                    .slice(-2)
                    .join('')}
                </span>
                <div>
                  <h3>{person.name}</h3>
                  <p className={styles.dept}>{person.dept}</p>
                  <p className={styles.years}>{person.years} at Greenfield</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Want the full curriculum?</h2>
              <p>
                Download our academic handbook or speak with admissions about
                the right path for your child.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/admissions" className="btn btn-light">
                Admissions
              </Link>
              <Link to="/contact" className="btn btn-ghost-light">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

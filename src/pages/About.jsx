import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import styles from './About.module.css'

const values = [
  {
    title: 'Integrity',
    text: 'We do the right thing even when no one is watching - honesty is taught and practised daily.',
    icon: 'M12 3 4 6v6c0 4.4 3.4 8.4 8 9 4.6-.6 8-4.6 8-9V6l-8-3Zm-2.5 9.5 2 2 4.5-4.5',
  },
  {
    title: 'Curiosity',
    text: 'Questions are celebrated here. Children are encouraged to wonder, explore and discover.',
    icon: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm10 17-5.2-5.2',
  },
  {
    title: 'Respect',
    text: 'Different backgrounds, one community. Kindness and empathy guide every interaction.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm13 14v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  },
  {
    title: 'Excellence',
    text: 'Good enough never is. We set high bars and give students the support to clear them.',
    icon: 'm12 3 2.7 5.6 6.3.9-4.5 4.4 1 6.1-5.5-3-5.5 3 1-6.1L3 9.5l6.3-.9L12 3Z',
  },
]

const milestones = [
  { year: '1985', title: 'Founded', text: 'Opened our doors with 60 students and 4 teachers.' },
  { year: '1998', title: 'New Campus', text: 'Moved to the 12-acre Maple Avenue campus.' },
  { year: '2010', title: 'STEM Wing', text: 'Launched science, robotics and computer labs.' },
  { year: '2018', title: 'Arts Centre', text: 'Opened the performing arts and music complex.' },
  { year: '2026', title: '1,200 Students', text: 'A diverse community from 14 countries.' },
]

const leaders = [
  { name: 'Dr. Helen Brooks', role: 'Principal', detail: 'Ed.D, 25 years in education' },
  { name: 'Marcus Lee', role: 'Vice Principal, Academics', detail: 'M.Sc Mathematics' },
  { name: 'Priya Nair', role: 'Head of Student Life', detail: 'M.A Psychology' },
  { name: 'James Carter', role: 'Director of Sports', detail: 'National coach, 18 years' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A school built on values, driven by results"
        lead="For four decades, Greenfield Academy has combined academic rigour with genuine care - helping young people become thoughtful, capable and kind."
      />

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="section-title">Growing with our community since 1985</h2>
            <p className={styles.p}>
              What began as a single-storey building with 60 students is today
              a 12-acre campus serving 1,200 learners. Through every chapter,
              one idea has stayed constant: education should open doors, not
              just fill notebooks.
            </p>
            <p className={styles.p}>
              Our teachers design lessons around how children actually learn -
              through projects, discussion, and hands-on work - while keeping
              standards high enough to prepare students for the top schools
              and colleges of their choice.
            </p>
            <Link to="/academics" className="btn btn-primary">
              See our academics
            </Link>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelItem}>
              <strong>1,200+</strong>
              <span>Students on campus</span>
            </div>
            <div className={styles.panelItem}>
              <strong>85</strong>
              <span>Qualified teachers</span>
            </div>
            <div className={styles.panelItem}>
              <strong>98%</strong>
              <span>Class 10 pass rate</span>
            </div>
            <div className={styles.panelItem}>
              <strong>14</strong>
              <span>Nationalities represented</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.principalWrap}`}>
        <div className={styles.principal}>
          <span className={styles.principalAvatar} aria-hidden="true">
            HB
          </span>
          <div>
            <p className={styles.principalKicker}>From the Principal&apos;s desk</p>
            <blockquote className={styles.principalQuote}>
              &ldquo;A school is only as good as the care inside it. At
              Greenfield, we know every student by name, celebrate small wins
              loudly, and hold high expectations kindly. Visit us once and you
              will feel the difference for yourself.&rdquo;
            </blockquote>
            <p className={styles.principalName}>
              <strong>Dr. Helen Brooks</strong>
              <span>Principal, Greenfield Academy</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Mission &amp; vision</span>
            <h2 className="section-title">What we stand for</h2>
          </div>
          <div className={styles.missions}>
            <article className={`card ${styles.missionCard}`}>
              <h3>Our Mission</h3>
              <p>
                To deliver a joyful, challenging education that builds strong
                character, sharp minds and the confidence to lead - in a
                community where every child belongs.
              </p>
            </article>
            <article className={`card ${styles.missionCardAlt}`}>
              <h3>Our Vision</h3>
              <p>
                To be a school where every Class 10 graduate moves on to the
                next stage ready to excel - curious enough to keep learning and
                grounded enough to make it matter.
              </p>
            </article>
          </div>

          <div className="grid-4" style={{ marginTop: '2.5rem' }}>
            {values.map((value) => (
              <article key={value.title} className="card">
                <span className="icon-badge">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path
                      d={value.icon}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Milestones</span>
            <h2 className="section-title">Four decades in five moments</h2>
          </div>
          <ol className={styles.timeline}>
            {milestones.map((item) => (
              <li key={item.year} className={styles.timelineItem}>
                <span className={styles.year}>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Leadership</span>
            <h2 className="section-title">The people leading the way</h2>
          </div>
          <div className="grid-4">
            {leaders.map((person) => (
              <article key={person.name} className={`card ${styles.person}`}>
                <span className={styles.personAvatar}>
                  {person.name
                    .split(' ')
                    .map((part) => part.charAt(0))
                    .slice(-2)
                    .join('')}
                </span>
                <h3>{person.name}</h3>
                <p className={styles.personRole}>{person.role}</p>
                <p className={styles.personDetail}>{person.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

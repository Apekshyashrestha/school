import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultAchievements, defaultEvents } from '../data/defaults'
import { sortByOrder, subscribeCollection } from '../lib/liveCollection'
import styles from './Home.module.css'

const stats = [
  { value: '1,200+', label: 'Students' },
  { value: '85', label: 'Expert Teachers' },
  { value: '40+', label: 'Clubs & Activities' },
  { value: '40 yrs', label: 'Of Excellence' },
]

const features = [
  {
    title: 'Experienced Faculty',
    text: 'Mentors who teach with passion, patience and a commitment to every learner.',
    icon: 'M12 3 2 8l10 5 8-4v6M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5',
  },
  {
    title: 'Modern Laboratories',
    text: 'STEM, robotics and science labs where ideas become working prototypes.',
    icon: 'M9 3h6M10 3v6.5L5.2 17.8A2 2 0 0 0 6.9 21h10.2a2 2 0 0 0 1.7-3.2L14 9.5V3',
  },
  {
    title: 'Sports & Arts',
    text: 'Full courts, a swimming pool, music rooms and studios for every talent.',
    icon: 'M12 3a9 9 0 1 0 9 9M12 3v9l6.4 6.4M12 3a9 9 0 0 1 9 9h-9',
  },
  {
    title: 'Safe & Caring Campus',
    text: 'Secure premises, counsellors on staff and a culture built on respect.',
    icon: 'M12 3 4 6v6c0 4.4 3.4 8.4 8 9 4.6-.6 8-4.6 8-9V6l-8-3Zm-3 9 2 2 4-4',
  },
]

const programs = [
  {
    tag: 'Ages 5 - 10',
    title: 'Primary School',
    text: 'Play-based learning that builds strong foundations in literacy, numeracy and curiosity.',
    color: 'green',
  },
  {
    tag: 'Ages 11 - 14',
    title: 'Middle School',
    text: 'Subject-based teaching with projects, labs and leadership roles for growing minds.',
    color: 'amber',
  },
  {
    tag: 'Ages 15 - 16',
    title: 'Secondary School',
    text: 'Board exam preparation, career counselling and guidance for the path after Class 10.',
    color: 'slate',
  },
]

const testimonials = [
  {
    quote:
      'Greenfield gave my daughter the confidence to speak on stage and the discipline to top her class.',
    name: 'Amara Patel',
    role: 'Parent, Grade 8',
  },
  {
    quote:
      'The robotics lab and teachers who actually listen made me fall in love with engineering.',
    name: 'Daniel Okafor',
    role: 'Alumnus, Class of 2023',
  },
  {
    quote:
      'Every child here is known by name. That personal attention is rare and priceless.',
    name: 'Sofia Ramirez',
    role: 'Parent, Grade 3',
  },
]

export default function Home() {
  const [achievements, setAchievements] = useState(defaultAchievements)
  const [events, setEvents] = useState(defaultEvents)

  useEffect(() => {
    let active = true
    const unsubscribers = []

    const watch = (name, setter) => {
      subscribeCollection(name, (docs) => {
        if (active && docs.length > 0) setter(sortByOrder(docs))
      }).then((cleanup) => {
        if (active) unsubscribers.push(cleanup)
        else cleanup()
      })
    }

    watch('achievements', setAchievements)
    watch('events', setEvents)

    return () => {
      active = false
      unsubscribers.forEach((cleanup) => cleanup())
    }
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.pill}>Admissions open for 2026 - 27</span>
            <h1 className={styles.heroTitle}>
              Where curiosity grows into{' '}
              <span className={styles.highlight}>character</span>
            </h1>
            <p className={styles.heroLead}>
              Greenfield Academy is a modern learning community blending strong
              academics, sports and the arts - so every student leaves ready
              for the world.
            </p>
            <div className={styles.heroActions}>
              <Link to="/admissions" className="btn btn-light">
                Start Application
              </Link>
              <Link to="/academics" className="btn btn-ghost-light">
                Explore Academics
              </Link>
            </div>
            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.cardMain}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path
                    d="M12 3 2 8l10 5 8-4v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className={styles.cardKicker}>Our promise</p>
              <p className={styles.cardTitle}>
                Every child known, challenged and celebrated.
              </p>
              <div className={styles.meter}>
                <span style={{ width: '92%' }} />
              </div>
              <p className={styles.cardMeta}>92% parent satisfaction rate</p>
            </div>
            <div className={styles.floatA}>
              <strong>STEM</strong>
              <span>Lab sessions weekly</span>
            </div>
            <div className={styles.floatB}>
              <strong>18:1</strong>
              <span>Student - teacher ratio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why Greenfield</span>
            <h2 className="section-title">Everything a learner needs to thrive</h2>
            <p className="section-lead">
              Four pillars that shape daily life on campus and the kind of
              human being each student becomes.
            </p>
          </div>
          <div className="grid-4">
            {features.map((feature) => (
              <article key={feature.title} className="card">
                <span className="icon-badge">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path
                      d={feature.icon}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className={styles.cardH}>{feature.title}</h3>
                <p className={styles.cardP}>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Programs</span>
            <h2 className="section-title">A pathway for every stage</h2>
            <p className="section-lead">
              From first letters to final exams, learning is sequenced,
              intentional and genuinely enjoyable.
            </p>
          </div>
          <div className="grid-3">
            {programs.map((program) => (
              <article
                key={program.title}
                className={`${styles.program} ${styles[program.color]}`}
              >
                <span className={styles.programTag}>{program.tag}</span>
                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.programText}>{program.text}</p>
                <Link to="/academics" className={styles.programLink}>
                  View curriculum →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title">Loved by families, trusted by alumni</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((item) => (
              <figure key={item.name} className={`card ${styles.quote}`}>
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <span className={styles.avatar}>
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Achievements</span>
            <h2 className="section-title">Recognition we&apos;re proud of</h2>
            <p className="section-lead">
              Awards, results and titles earned by our students and teachers
              over the years.
            </p>
          </div>
          <div className="grid-3">
            {achievements.map((item) => (
              <article key={item.title} className="card">
                <span className="icon-badge">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path
                      d={
                        item.icon ||
                        'm12 3 2.7 5.6 6.3.9-4.5 4.4 1 6.1-5.5-3-5.5 3 1-6.1L3 9.5l6.3-.9L12 3Z'
                      }
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={styles.awardYear}>{item.year}</span>
                <h3 className={styles.awardTitle}>{item.title}</h3>
                <p className={styles.awardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">News &amp; events</span>
            <h2 className="section-title">What&apos;s happening on campus</h2>
            <p className="section-lead">
              Mark your calendars - families are welcome at every event.
            </p>
          </div>
          <div className="grid-4">
            {events.map((item) => (
              <article key={item.title} className={`card ${styles.news}`}>
                <div className={styles.newsTop}>
                  <span className={styles.date}>
                    <strong>{item.day}</strong>
                    <small>{item.month}</small>
                  </span>
                  <span
                    className={`${styles.type} ${
                      item.type === 'News' ? styles.typeNews : ''
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <span className={styles.ctaKicker}>Ready when you are</span>
              <h2>Give your child a Greenfield start</h2>
              <p>
                Book a campus tour, meet our teachers and see learning in
                action. Applications for the 2026 - 27 session are open.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/admissions" className="btn btn-light">
                Apply Now
              </Link>
              <Link to="/contact" className="btn btn-ghost-light">
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { defaultTeachers } from '../data/defaults'
import { sortByOrder, subscribeCollection } from '../lib/liveCollection'
import styles from './Faculty.module.css'

const stats = [
  { value: '85', label: 'Teachers in all' },
  { value: '12 yrs', label: 'Average experience' },
  { value: '18:1', label: 'Student - teacher ratio' },
  { value: '60+', label: 'Advanced degrees' },
]

export default function Faculty() {
  const [teachers, setTeachers] = useState(defaultTeachers)

  useEffect(() => {
    let active = true
    let unsubscribe = null

    subscribeCollection('teachers', (docs) => {
      if (active && docs.length > 0) setTeachers(sortByOrder(docs))
    }).then((cleanup) => {
      if (active) unsubscribe = cleanup
      else cleanup()
    })

    return () => {
      active = false
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Our faculty"
        title="The teachers behind every success story"
        lead="85 educators who bring real expertise, genuine care and a lot of energy to the classroom every day."
      />

      <section className="section">
        <div className="container">
          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Meet the team</span>
            <h2 className="section-title">Teacher profiles</h2>
            <p className="section-lead">
              A snapshot of the people shaping classrooms across primary,
              middle and secondary school.
            </p>
          </div>

          <div className={styles.grid}>
            {teachers.map((teacher) => (
              <article key={teacher.name} className={`card ${styles.card}`}>
                <div className={styles.top}>
                  <span className={styles.avatar}>
                    {teacher.name
                      .split(' ')
                      .map((part) => part.charAt(0))
                      .slice(-2)
                      .join('')}
                  </span>
                  <div>
                    <h3>{teacher.name}</h3>
                    <p className={styles.role}>{teacher.role}</p>
                  </div>
                </div>
                <p className={styles.subject}>{teacher.subject}</p>
                <p className={styles.note}>{teacher.note}</p>
                <dl className={styles.meta}>
                  <div>
                    <dt>Qualification</dt>
                    <dd>{teacher.qualification}</dd>
                  </div>
                  <div>
                    <dt>Experience</dt>
                    <dd>{teacher.years}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Want to teach at Greenfield?</h2>
              <p>
                We are always looking for passionate educators. Send us your
                CV and a short note about how you teach.
              </p>
            </div>
            <Link to="/contact" className="btn btn-light">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

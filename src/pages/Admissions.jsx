import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import styles from './Admissions.module.css'

const steps = [
  {
    title: 'Enquire',
    text: 'Fill in the enquiry form or call us - we reply within one working day.',
  },
  {
    title: 'Campus tour',
    text: 'Visit classrooms, labs and meet the admissions team in person.',
  },
  {
    title: 'Apply',
    text: 'Submit the online application with the required documents.',
  },
  {
    title: 'Assessment',
    text: 'A friendly placement test and interaction session for the student.',
  },
  {
    title: 'Offer & enrol',
    text: 'Receive the offer letter, confirm the seat and welcome aboard.',
  },
]

const requirements = [
  'Completed online application form',
  'Previous two years\' school reports',
  'Copy of birth certificate',
  'Two recent passport-size photographs',
  'Immunisation and health records',
  'Transfer certificate (if applicable)',
]

const fees = [
  { stage: 'Primary (Grades 1 - 5)', tuition: '$3,200', term: '$1,070 / term' },
  { stage: 'Middle School (Grades 6 - 8)', tuition: '$4,100', term: '$1,370 / term' },
  { stage: 'Secondary School (Grades 9 - 10)', tuition: '$4,800', term: '$1,600 / term' },
]

const faqs = [
  {
    q: 'When do admissions open?',
    a: 'Applications for the 2026 - 27 session are open now. Rolling admissions continue through the year subject to seat availability.',
  },
  {
    q: 'Is there an entrance exam?',
    a: 'Students applying to Grades 1 - 8 take a friendly placement test in English and Mathematics, followed by a short conversation. Grade 9 - 10 applicants also take a subject test.',
  },
  {
    q: 'Are scholarships available?',
    a: 'Yes. We offer merit scholarships covering up to 50% of tuition, plus need-based assistance. Mention your interest in the application form.',
  },
  {
    q: 'Can my child join mid-year?',
    a: 'Mid-year transfers are accepted if seats are open in that grade. Our admissions team will guide you through credit transfer.',
  },
  {
    q: 'What is the school day timing?',
    a: '8:00 AM to 3:30 PM for all grades, with optional clubs and sports until 4:30 PM.',
  },
]

export default function Admissions() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Your journey to Greenfield starts here"
        lead="A simple, five-step process designed to be clear for families and welcoming for students."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title">Five steps to enrolment</h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNum}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className={`container ${styles.twoCol}`}>
          <div>
            <span className="eyebrow">Checklist</span>
            <h2 className="section-title">Documents you&apos;ll need</h2>
            <p className="section-lead">
              Have these ready before you apply - it keeps everything moving
              quickly.
            </p>
            <ul className={styles.checklist}>
              {requirements.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow">Investment</span>
            <h2 className="section-title">Tuition at a glance</h2>
            <p className="section-lead">
              Transparent annual fees. Uniform, books and meals are billed
              separately.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Annual</th>
                    <th>Per term</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((row) => (
                    <tr key={row.stage}>
                      <td>{row.stage}</td>
                      <td>{row.tuition}</td>
                      <td>{row.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.note}>
              Need help with fees? Merit and need-based assistance of up to
              50% is available.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Questions parents ask us</h2>
          </div>
          <div className={styles.faq}>
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={item.q}
                  className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {item.q}
                    <span className={styles.faqIcon} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <span className={styles.ctaKicker}>Seats filling fast</span>
              <h2>Apply for the 2026 - 27 session</h2>
              <p>
                It takes about 10 minutes. Our admissions team will guide you
                through the rest.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/contact" className="btn btn-light">
                Start Application
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

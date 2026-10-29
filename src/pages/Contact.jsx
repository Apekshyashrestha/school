import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import styles from './Contact.module.css'

const info = [
  {
    label: 'Visit us',
    lines: ['14 Maple Avenue', 'Greenfield, GF 21400'],
    icon: 'M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  {
    label: 'Call us',
    lines: ['+1 (555) 123-4567', 'Mon - Fri, 8 AM - 4:30 PM'],
    icon: 'M4 5.5C4 4.1 5.1 3 6.5 3h1.8c.7 0 1.3.5 1.5 1.1l.7 2.7c.2.6 0 1.3-.5 1.7l-1.2 1a12.5 12.5 0 0 0 4.7 4.7l1-1.2c.4-.5 1-.7 1.7-.5l2.7.7c.6.2 1.1.8 1.1 1.5v1.8c0 1.4-1.1 2.5-2.5 2.5A15.5 15.5 0 0 1 4 5.5Z',
  },
  {
    label: 'Email us',
    lines: ['hello@greenfield.edu', 'admissions@greenfield.edu'],
    icon: 'M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm0 1.8 8 4.7 8-4.7',
  },
  {
    label: 'Office hours',
    lines: ['Monday - Friday: 8 AM - 4:30 PM', 'Saturday: 9 AM - 1 PM'],
    icon: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
]

const initialForm = { name: '', email: '', phone: '', subject: 'General enquiry', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email and message.')
      return
    }

    setError('')
    setSending(true)
    try {
      const [{ addDoc, collection, serverTimestamp }, { db, isFirebaseConfigured }] =
        await Promise.all([
          import('firebase/firestore'),
          import('../lib/firebase'),
        ])

      if (!isFirebaseConfigured) {
        setError(
          'Firebase is not configured yet. Add your keys to the .env file (see .env.example).',
        )
        return
      }

      await addDoc(collection(db, 'messages'), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
        read: false,
        createdAt: serverTimestamp(),
      })
      setSent(true)
      setForm(initialForm)
    } catch {
      setError('Something went wrong while sending. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        lead="Questions about admissions, campus tours or anything else - our team replies within one working day."
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.infoGrid}>
            {info.map((item) => (
              <article key={item.label} className={`card ${styles.infoCard}`}>
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
                <h3>{item.label}</h3>
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            ))}
          </div>

          <div className={styles.formWrap}>
            <div className={styles.formHead}>
              <span className="eyebrow">Send a message</span>
              <h2 className="section-title">How can we help?</h2>
              <p className="section-lead">
                Fill in the form and the right person will get back to you.
              </p>
            </div>

            {sent ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon}>✓</span>
                <div>
                  <h3>Thank you for reaching out!</h3>
                  <p>
                    Your message has been received. Our team will reply within
                    one working day.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setSent(false)}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Full name *</span>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={update('name')}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email address *</span>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={update('email')}
                    />
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Phone number</span>
                    <input
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Subject</span>
                    <select value={form.subject} onChange={update('subject')}>
                      <option>General enquiry</option>
                      <option>Admissions</option>
                      <option>Campus tour</option>
                      <option>Fees &amp; scholarships</option>
                      <option>Careers</option>
                    </select>
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Message *</span>
                  <textarea
                    rows="6"
                    placeholder="Tell us a little about what you need..."
                    value={form.message}
                    onChange={update('message')}
                  />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

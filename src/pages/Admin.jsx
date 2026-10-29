import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db, isFirebaseConfigured } from '../lib/firebase'
import { useAuth } from '../lib/useAuth'
import CrudSection from '../components/CrudSection'
import {
  defaultAchievements,
  defaultEvents,
  defaultTeachers,
} from '../data/defaults'
import styles from './Admin.module.css'

const tabs = [
  { key: 'messages', label: 'Messages' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'events', label: 'News & Events' },
]

const loginErrors = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/too-many-requests': 'Too many attempts. Try again later.',
  'auth/invalid-email': 'Please enter a valid email address.',
}

const teacherFields = [
  { key: 'name', label: 'Full name' },
  { key: 'role', label: 'Role' },
  { key: 'subject', label: 'Subject' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'years', label: 'Experience' },
  { key: 'note', label: 'Short bio', type: 'textarea' },
]

const achievementFields = [
  { key: 'year', label: 'Year / badge' },
  { key: 'title', label: 'Title' },
  { key: 'text', label: 'Description', type: 'textarea' },
]

const eventFields = [
  { key: 'day', label: 'Day (e.g. 18)' },
  { key: 'month', label: 'Month (e.g. Oct)' },
  { key: 'type', label: 'Type', type: 'select', options: ['Event', 'News'] },
  { key: 'title', label: 'Title' },
  { key: 'text', label: 'Description', type: 'textarea' },
]

const replyHref = (message) => {
  const to = encodeURIComponent(message.email)
  const subject = encodeURIComponent(`Re: ${message.subject || 'your enquiry'}`)
  const body = encodeURIComponent(
    `Hello ${message.name},\n\nThank you for contacting Greenfield Academy.\n\n---\nYou wrote:\n${message.message}\n`,
  )
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`
}

const formatTime = (value) => {
  if (!value) return ''
  const date = value.seconds
    ? new Date(value.seconds * 1000)
    : new Date(value)
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (err) {
      setError(loginErrors[err.code] || 'Sign in failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <span className={styles.loginMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
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
        <h1>Greenfield Admin</h1>
        <p className={styles.loginLead}>
          Sign in to manage messages, teachers, achievements and events.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email address</span>
            <input
              type="email"
              autoComplete="username"
              placeholder="admin@greenfield.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <Link to="/" className={styles.back}>
          ← Back to website
        </Link>
      </div>
    </div>
  )
}

function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((item) => {
            const data = item.data()
            return {
              id: item.id,
              ...data,
              read: Boolean(data.read),
              timeLabel: formatTime(data.createdAt),
            }
          }),
        )
        setLoadError('')
        setLoading(false)
      },
      () => {
        setLoadError(
          'Could not load messages. Check your Firestore security rules.',
        )
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const toggleRead = (message) =>
    updateDoc(doc(db, 'messages', message.id), { read: !message.read })

  const removeMessage = (message) => {
    if (window.confirm(`Delete the message from ${message.name}?`)) {
      deleteDoc(doc(db, 'messages', message.id))
    }
  }

  const unread = messages.filter((message) => !message.read).length

  return (
    <>
      <div className={styles.sectionHead}>
        <div>
          <h1>Contact Messages</h1>
          <p className={styles.counts}>
            {unread} unread · {messages.length} total
          </p>
        </div>
      </div>

      {loadError && <p className={styles.error}>{loadError}</p>}

      {loading ? (
        <p className={styles.empty}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No messages yet</p>
          <p>Messages from the contact form will appear here in real time.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {messages.map((message) => (
            <li
              key={message.id}
              className={`${styles.message} ${
                message.read ? '' : styles.unread
              }`}
            >
              <div className={styles.msgTop}>
                <div className={styles.msgWho}>
                  <strong>{message.name}</strong>
                  <span className={styles.subject}>{message.subject}</span>
                </div>
                <time className={styles.time}>{message.timeLabel}</time>
              </div>
              <p className={styles.contact}>
                {message.email}
                {message.phone ? ` · ${message.phone}` : ''}
              </p>
              <p className={styles.body}>{message.message}</p>
              <div className={styles.msgActions}>
                <a
                  className="btn btn-primary"
                  href={replyHref(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reply
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => toggleRead(message)}
                >
                  {message.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                  type="button"
                  className={`btn btn-outline ${styles.deleteBtn}`}
                  onClick={() => removeMessage(message)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default function Admin() {
  const { user, loading } = useAuth()
  const [tab, setTab] = useState('messages')

  if (!isFirebaseConfigured) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Firebase is not configured</p>
          <p>Add your keys to the .env file (see .env.example).</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.loginPage}>
        <p className={styles.empty}>Loading...</p>
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <div className={styles.shell}>
      <header className={styles.shellHeader}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M12 3 2 8l10 5 8-4v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Greenfield <strong>Admin</strong>
        </div>

        <nav className={styles.tabs}>
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.tab} ${
                tab === item.key ? styles.tabActive : ''
              }`}
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.shellActions}>
          <Link to="/" className={styles.viewSite}>
            View site
          </Link>
          <span className={styles.userEmail}>{user.email}</span>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </header>

      <main className={styles.shellBody}>
        {tab === 'messages' && <Messages />}
        {tab === 'teachers' && (
          <CrudSection
            collectionName="teachers"
            title="Teachers"
            fields={teacherFields}
            defaults={defaultTeachers}
          />
        )}
        {tab === 'achievements' && (
          <CrudSection
            collectionName="achievements"
            title="Achievements"
            fields={achievementFields}
            defaults={defaultAchievements}
          />
        )}
        {tab === 'events' && (
          <CrudSection
            collectionName="events"
            title="News & Events"
            fields={eventFields}
            defaults={defaultEvents}
          />
        )}
      </main>
    </div>
  )
}

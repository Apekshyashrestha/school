import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'
import { sortByOrder } from '../lib/liveCollection'
import styles from './CrudSection.module.css'

const seededCollections = new Set()

async function seedDefaults(collectionName, defaults) {
  const batch = writeBatch(db)
  defaults.forEach((item, index) => {
    batch.set(doc(collection(db, collectionName)), { ...item, order: index })
  })
  await batch.commit()
}

const emptyForm = (fields) =>
  Object.fromEntries(fields.map((field) => [field.key, '']))

export default function CrudSection({
  collectionName,
  title,
  fields,
  defaults = [],
}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(() => !isFirebaseConfigured)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined
    }

    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const docs = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))

        if (
          snapshot.empty &&
          defaults.length > 0 &&
          !seededCollections.has(collectionName)
        ) {
          seededCollections.add(collectionName)
          seedDefaults(collectionName, defaults).catch(() =>
            seededCollections.delete(collectionName),
          )
        }

        setItems(sortByOrder(docs))
        setError('')
        setLoading(false)
      },
      () => {
        setError('Could not load data. Check your Firestore security rules.')
        setLoading(false)
      },
    )

    return unsubscribe
  }, [collectionName, defaults])

  const openNew = () => {
    setForm(emptyForm(fields))
    setEditingId('new')
  }

  const openEdit = (item) => {
    setForm(
      Object.fromEntries(
        fields.map((field) => [field.key, item[field.key] ?? '']),
      ),
    )
    setEditingId(item.id)
  }

  const cancel = () => {
    setEditingId(null)
    setForm({})
  }

  const save = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId === 'new') {
        const order = items.length
          ? Math.max(...items.map((item) => item.order ?? 0)) + 1
          : 0
        await addDoc(collection(db, collectionName), { ...form, order })
      } else {
        await updateDoc(doc(db, collectionName, editingId), form)
      }
      cancel()
    } catch {
      setError('Could not save. Check your Firestore security rules.')
    } finally {
      setSaving(false)
    }
  }

  const remove = (item) => {
    const label = item[fields[0].key] || 'this item'
    if (window.confirm(`Delete "${label}"?`)) {
      deleteDoc(doc(db, collectionName, item.id)).catch(() =>
        setError('Could not delete. Check your Firestore security rules.'),
      )
    }
  }

  const updateField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  if (!isFirebaseConfigured) {
    return (
      <p className={styles.error}>
        Firebase is not configured. Add your keys to the .env file.
      </p>
    )
  }

  return (
    <section>
      <div className={styles.head}>
        <div>
          <h1>{title}</h1>
          <p className={styles.count}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        {editingId === null && (
          <button type="button" className="btn btn-primary" onClick={openNew}>
            + Add new
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {editingId !== null && (
        <form className={styles.form} onSubmit={save}>
          <div className={styles.formGrid}>
            {fields.map((field) => (
              <label
                key={field.key}
                className={`${styles.field} ${
                  field.type === 'textarea' ? styles.full : ''
                }`}
              >
                <span>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    rows="3"
                    value={form[field.key] || ''}
                    onChange={updateField(field.key)}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={form[field.key] || ''}
                    onChange={updateField(field.key)}
                  >
                    {field.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form[field.key] || ''}
                    onChange={updateField(field.key)}
                    required
                  />
                )}
              </label>
            ))}
          </div>
          <div className={styles.formActions}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : editingId === 'new' ? 'Add' : 'Save changes'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={cancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className={styles.empty}>Loading...</p>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nothing here yet</p>
          <p>Click &ldquo;Add new&rdquo; to create the first one.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemBody}>
                {fields.map((field) => (
                  <p key={field.key} className={styles.row}>
                    <span className={styles.rowLabel}>{field.label}</span>
                    <span className={styles.rowValue}>
                      {item[field.key] || '—'}
                    </span>
                  </p>
                ))}
              </div>
              <div className={styles.itemActions}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`btn btn-outline ${styles.deleteBtn}`}
                  onClick={() => remove(item)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

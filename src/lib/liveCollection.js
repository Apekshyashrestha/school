export const sortByOrder = (items) =>
  [...items].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))

export async function subscribeCollection(name, onData, onError = () => {}) {
  const [{ collection, onSnapshot }, { db, isFirebaseConfigured }] =
    await Promise.all([
      import('firebase/firestore'),
      import('./firebase'),
    ])

  if (!isFirebaseConfigured) return () => {}

  return onSnapshot(
    collection(db, name),
    (snapshot) =>
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))),
    onError,
  )
}

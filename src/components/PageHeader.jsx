import styles from './PageHeader.module.css'

export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
    </section>
  )
}

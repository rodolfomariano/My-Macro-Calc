import { Pencil, TrashSimple } from 'phosphor-react'
import styles from './styles.module.scss'

interface ActivityCardProps {
  title: string
  time: number
  caloriesSpent: number
}

export function ActivityCard({ title, time, caloriesSpent }: ActivityCardProps) {

  const caloriesSpentFormatted = caloriesSpent.toFixed(2).replace('.', ',')

  const titleFormatted = title.substring(0, 10) + '...'
  const titleIsBig = title.length > 10

  return (
    <div className={styles.container}>
      <header className={styles.activityTitle}>{titleIsBig ? titleFormatted : title}</header>
      <span className={styles.activityTime}>{time} min</span>
      <footer className={styles.activityKcal}>{caloriesSpentFormatted}kcal</footer>

      <button className={styles.removeActivity}>
        <TrashSimple size={16} />
      </button>
      <button className={styles.editActivity}>
        <Pencil size={16} />
      </button>
    </div>
  )
}
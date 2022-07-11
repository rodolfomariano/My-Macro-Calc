import { CaretDown, CaretRight } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import styles from './styles.module.scss'

interface CalcCardProps {
  title: string
  content: ReactNode
}

export function CalcCard({ title, content }: CalcCardProps) {
  const [carOpen, setCardOpen] = useState(false)

  return (
    <div className={styles.cardContainer}>
      <button
        onClick={() => setCardOpen(!carOpen)}
      >
        {title}

        {carOpen
          ? <CaretDown />
          : <CaretRight />
        }
      </button>

      {carOpen && (
        <div className={styles.cardContent}>
          {content}
        </div>

      )}

    </div>
  )
}
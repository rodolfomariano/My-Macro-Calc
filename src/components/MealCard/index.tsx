import { InputHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface MealCardProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  value: number | string
  totalKcal: number
}

export function MealCard({ title, value, totalKcal, ...rest }: MealCardProps) {

  let kcalToConsumeFormatted = '0'
  let bgStyle = ''

  if (typeof value === 'number') {
    const kcalToConsume = (totalKcal * value) / 100
    kcalToConsumeFormatted = kcalToConsume.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  switch (title) {
    case 'Almoço' || 'Lanche da tarde':
      bgStyle = '#FADFDF'
      break;
    case 'Lanche da tarde':
      bgStyle = '#FADFDF'
      break;
    case 'Janta':
      bgStyle = '#D6DFFF'
      break;
    case 'Lanche da noite':
      bgStyle = '#D6DFFF'
      break;
    case 'Pré-treino':
      bgStyle = '#E3E6F3'
      break;
    case 'Pós-treino':
      bgStyle = '#E3E6F3'
      break;
    default:
      break;
  }


  return (
    <div className={styles.cardContainer}>
      <strong
        className={styles.mealHeader}
        style={{ backgroundColor: bgStyle }}
      >
        {title}
      </strong>

      <div
        className={styles.mealContent}
        style={{ backgroundColor: bgStyle }}
      >
        <div className={styles.mealPercentage}>
          <input type="number" id="meal" value={value} {...rest} />
          <label htmlFor="meal">%</label>
        </div>
        <strong>{kcalToConsumeFormatted}kcal</strong>
      </div>
    </div>
  )
}
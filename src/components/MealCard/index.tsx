import styles from './styles.module.scss'

export function MealCard() {
  return (
    <div className={styles.cardContainer}>
      <strong className={styles.mealHeader}>
        Café da manhã
      </strong>

      <div className={styles.mealContent}>
        <div className={styles.mealPercentage}>
          <input type="number" id="meal" />
          <label htmlFor="meal">%</label>
        </div>
        <strong>0kcal</strong>
      </div>
    </div>
  )
}
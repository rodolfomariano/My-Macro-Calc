import { motion } from "framer-motion"
import { ChangeEvent, useState } from "react"

import { MealCard } from "../MealCard"

import styles from './styles.module.scss'

interface KcalSuggestionPerMealProps {
  weightObject: string
  proteinToMaintainWeight: number
  fatToMaintainWeight: number
  carbohydrateToMaintainWeight: number
  proteinToLoseWeight: number
  fatToLoseWeight: number
  carbohydrateToLoseWeight: number
  proteinToGainMass: number
  fatToGainMass: number
  carbohydrateToGainMass: number
}

export function KcalSuggestionPerMeal({
  weightObject,
  proteinToMaintainWeight,
  fatToMaintainWeight,
  carbohydrateToMaintainWeight,
  proteinToLoseWeight,
  fatToLoseWeight,
  carbohydrateToLoseWeight,
  proteinToGainMass,
  fatToGainMass,
  carbohydrateToGainMass,

}: KcalSuggestionPerMealProps) {
  const [breakfast, setBreakfast] = useState(12)
  const [morningSnack, setMorningSnack] = useState(12)
  const [lunch, setLunch] = useState(20)
  const [afternoonSnack, setAfternoonSnack] = useState(10)
  const [dinner, setDinner] = useState(20)
  const [eveningSnack, setEveningSnack] = useState(12)
  const [preTraining, setPreTraining] = useState(0)
  const [afterTraining, setAfterTraining] = useState(14)

  const weightObjectToLoseWeight = (proteinToLoseWeight * 4) + (fatToLoseWeight * 9) + (carbohydrateToLoseWeight * 4)
  const weightObjectToMaintainWeight = (proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9) + (carbohydrateToMaintainWeight * 4)
  const weightObjectToGainMass = (proteinToGainMass * 4) + (fatToGainMass * 9) + (carbohydrateToGainMass * 4)

  return (
    <motion.div
      animate={{ scale: [0, 1], opacity: [0, 1] }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className={styles.kcalSuggestionPerMeal}
    >

      <div className={styles.suggestionHeader}>
        <span>
          Calorias para distribuir:
          <strong> {weightObject === 'loseWeight'
            ? ((proteinToLoseWeight * 4) + (fatToLoseWeight * 9) + (carbohydrateToLoseWeight * 4)).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            : weightObject === 'maintainWeight'
              ? ((proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9) + (carbohydrateToMaintainWeight * 4)).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              : ((proteinToGainMass * 4) + (fatToGainMass * 9) + (carbohydrateToGainMass * 4)).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} kcal</strong>
        </span>

        <a href="#">Dica</a>
      </div>

      <div className={styles.mealContainer}>
        <MealCard
          title="Café da manhã"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!breakfast ? '' : breakfast}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setBreakfast(Number(event.target.value))}
        />

        <MealCard
          title="Lanche da manhã"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!morningSnack ? '' : morningSnack}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setMorningSnack(Number(event.target.value))}
        />

        <MealCard
          title="Almoço"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!lunch ? '' : lunch}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setLunch(Number(event.target.value))}
        />

        <MealCard
          title="Lanche da tarde"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!afternoonSnack ? '' : afternoonSnack}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAfternoonSnack(Number(event.target.value))}
        />

        <MealCard
          title="Janta"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!dinner ? '' : dinner}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setDinner(Number(event.target.value))}
        />

        <MealCard
          title="Lanche da noite"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!eveningSnack ? '' : eveningSnack}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEveningSnack(Number(event.target.value))}
        />

        <MealCard
          title="Pré-treino"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!preTraining ? '' : preTraining}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPreTraining(Number(event.target.value))}
        />

        <MealCard
          title="Pós-treino"
          totalKcal={weightObject === 'loseWeight'
            ? weightObjectToLoseWeight
            : weightObject === 'maintainWeight'
              ? weightObjectToMaintainWeight
              : weightObjectToGainMass
          }
          value={!afterTraining ? '' : afterTraining}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAfterTraining(Number(event.target.value))}
        />

        <span>
          <strong>{breakfast + morningSnack + lunch + afternoonSnack + dinner + eveningSnack + preTraining + afterTraining}%</strong> das calorias distribuidas
        </span>
      </div>
    </motion.div>
  )
}
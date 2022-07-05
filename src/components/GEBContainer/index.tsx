import { useEffect, useState } from 'react'
import { motion } from "framer-motion"

import styles from './styles.module.scss'
import { WarningMessage } from '../WarningMessage'
import { usePersonalData } from '../../hooks/usePersonalData'

export function GEBContainer() {
  const { userInfo, setGeb, geb, imc, myActivities, setTotalKcal, totalKcal, setMacro, macro, weightObject, setWeightObject } = usePersonalData()

  function calcGEB() {
    if (userInfo.genderOption === 'masculine') {
      const getGeb = 66.47 + (13.75 * userInfo.weight) + (5 * userInfo.stature) - (6.76 * userInfo.age)
      return setGeb(getGeb)
    } else {
      const getGeb = 655.1 + (9.56 * userInfo.weight) + (1.85 * userInfo.stature) - (4.68 * userInfo.age)
      return setGeb(getGeb)
    }
  }

  const totalKcalByActivity = myActivities.reduce((totalCaloriesSpent, actualCaloriesSpent) => totalCaloriesSpent + actualCaloriesSpent.caloriesSpent, 0)
  const totalKcalCalc = totalKcalByActivity + geb

  function calcMacro() {
    const proteinToMaintainWeight = 1.8 * userInfo.weight
    const fatToMaintainWeight = 0.8 * userInfo.weight
    const carbohydrateToMaintainWeight = (totalKcal - ((proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9))) / 4

    const proteinToLoseWeight = 1.8 * userInfo.weight
    const fatToLoseWeight = 0.8 * userInfo.weight
    const carbohydrateToLoseWeight = ((totalKcal - ((proteinToLoseWeight * 4) + (fatToLoseWeight * 9))) / 4) * (userInfo.bioType === 'endomorfo' ? 0.6 : 0.8)

    const proteinToGainMass = 2 * userInfo.weight
    const fatToGainMass = 1 * userInfo.weight
    const carbohydrateToGainMass = ((totalKcal - ((proteinToGainMass * 4) + (fatToGainMass * 9))) / 4) * (userInfo.bioType === 'ectomorfo' ? 1.6 : 1.4)

    setMacro({
      proteinToMaintainWeight,
      fatToMaintainWeight,
      carbohydrateToMaintainWeight,

      proteinToLoseWeight,
      fatToLoseWeight,
      carbohydrateToLoseWeight,

      proteinToGainMass,
      fatToGainMass,
      carbohydrateToGainMass,
    })
  }

  useEffect(() => {
    setTotalKcal(totalKcalCalc)
    calcMacro()
  }, [geb])

  useEffect(() => {
    calcMacro()
  }, [totalKcal])

  useEffect(() => {
    calcGEB()
  }, [])

  return (
    <div className={styles.ResultGEBContainer}>

      <div className={styles.GEBContainer}>

        <motion.div
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 1 }}
          className={styles.GEBInfo}
        >
          <div className={styles.GEBContent}>
            <span>GEB</span>
            <strong>{geb.toLocaleString('pt-BR')}kcal</strong>
          </div>

          <p>Gasto Energético Basal</p>
        </motion.div>

        <motion.div
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 1.25 }}
          className={styles.GEBInfo}
        >
          <div className={styles.GEBContent}>
            <span>Exercícios</span>
            <strong>{totalKcalByActivity.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}kcal</strong>
          </div>

          <p>Gastos em Exercícios</p>
        </motion.div>

        <motion.span
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 1.5 }}

        >
          =
        </motion.span>

        <motion.div
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 1.75 }}
          className={styles.GEBInfo}
        >
          <div className={styles.GEBContent}>
            <span>GET</span>
            <strong>{(totalKcal).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}kcal</strong>
          </div>

          <p>Gasto Energético Total</p>
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 2 }}
        className={styles.microsPerDayToConsumeContainer}
      >

        <div className={styles.objectiveTypesContainer}>
          <button
            className={`${styles.objectiveTypeButton} ${weightObject === 'loseWeight' && styles.weightObjectSelected}`}
            onClick={() => setWeightObject('loseWeight')}
          >
            Perder peso
          </button>
          <button
            className={`${styles.objectiveTypeButton} ${weightObject === 'maintainWeight' && styles.weightObjectSelected}`}
            onClick={() => setWeightObject('maintainWeight')}
          >
            Manter peso
          </button>
          <button
            className={`${styles.objectiveTypeButton} ${weightObject === 'gainMass' && styles.weightObjectSelected}`}
            onClick={() => setWeightObject('gainMass')}
          >
            Ganhar massa
          </button>
        </div>

        <div className={styles.microsToConsumeContainer}>
          <strong>Micronutrientes diários</strong>

          <div className={styles.microContainer}>
            <div className={styles.microTypeContainer}>
              <div className={styles.microContent}>
                <span>
                  {weightObject === 'loseWeight'
                    ? `${Math.round(macro.carbohydrateToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(macro.carbohydrateToMaintainWeight)}g`
                      : `${Math.round(macro.carbohydrateToGainMass)}g`
                  }
                </span>
              </div>

              <p>Carboidratos</p>
            </div>

            <div className={styles.microTypeContainer}>
              <div className={styles.microContent}>
                <span>
                  {weightObject === 'loseWeight'
                    ? `${Math.round(macro.proteinToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(macro.proteinToMaintainWeight)}g`
                      : `${Math.round(macro.proteinToGainMass)}g`
                  }
                </span>
              </div>

              <p>Proteínas</p>
            </div>

            <div className={styles.microTypeContainer}>
              <div className={styles.microContent}>
                <span>
                  {weightObject === 'loseWeight'
                    ? `${Math.round(macro.fatToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(macro.fatToMaintainWeight)}g`
                      : `${Math.round(macro.fatToGainMass)}g`
                  }
                </span>
              </div>

              <p>Gorduras</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 2.25 }}
        className={styles.warningMessageContainer}
      >
        <WarningMessage
          iconPosition='start'
          position='center'
          message='Nota: Gastos energéticos durante taréfas cotidianas, como: lavar louça, limpar a casa, etc, não estão inclusos no calculo!'
        />
      </motion.div>
    </div>
  )
}
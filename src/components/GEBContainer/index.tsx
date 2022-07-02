import { useState } from 'react'
import { motion } from "framer-motion"

import styles from './styles.module.scss'
import { WarningMessage } from '../WarningMessage'

interface GEBContainerProps {
  weightObject: string
  geb: number
  totalKcalByActivity: number
  totalKcal: number
  proteinToMaintainWeight: number
  fatToMaintainWeight: number
  carbohydrateToMaintainWeight: number
  proteinToLoseWeight: number
  fatToLoseWeight: number
  carbohydrateToLoseWeight: number
  proteinToGainMass: number
  fatToGainMass: number
  carbohydrateToGainMass: number
  setWeightObject: (obj: string) => void
}

export function GEBContainer({
  weightObject,
  geb,
  totalKcalByActivity,
  totalKcal,
  proteinToMaintainWeight,
  fatToMaintainWeight,
  carbohydrateToMaintainWeight,
  proteinToLoseWeight,
  fatToLoseWeight,
  carbohydrateToLoseWeight,
  proteinToGainMass,
  fatToGainMass,
  carbohydrateToGainMass,
  setWeightObject,
}: GEBContainerProps) {

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
                    ? `${Math.round(carbohydrateToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(carbohydrateToMaintainWeight)}g`
                      : `${Math.round(carbohydrateToGainMass)}g`
                  }
                </span>
              </div>

              <p>Carboidratos</p>
            </div>

            <div className={styles.microTypeContainer}>
              <div className={styles.microContent}>
                <span>
                  {weightObject === 'loseWeight'
                    ? `${Math.round(proteinToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(proteinToMaintainWeight)}g`
                      : `${Math.round(proteinToGainMass)}g`
                  }
                </span>
              </div>

              <p>Proteínas</p>
            </div>

            <div className={styles.microTypeContainer}>
              <div className={styles.microContent}>
                <span>
                  {weightObject === 'loseWeight'
                    ? `${Math.round(fatToLoseWeight)}g`
                    : weightObject === 'maintainWeight'
                      ? `${Math.round(fatToMaintainWeight)}g`
                      : `${Math.round(fatToGainMass)}g`
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
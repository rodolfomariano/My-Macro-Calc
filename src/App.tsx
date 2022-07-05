import { ChangeEvent, useState, useRef } from "react"
import { motion } from "framer-motion"


import styles from './App.module.scss'
import './global.scss'

import { Header } from './components/Header'
import { WarningMessage } from './components/WarningMessage'
import { MealCard } from './components/MealCard'
import { ActivityCard } from "./components/ActivityCard";
import { KcalSuggestionPerMeal } from "./components/KcalSuggestionPerMeal";
import { ModalActivities } from "./components/ModalActivities";
import { IMCContainer } from "./components/IMCContainer";
import { GEBContainer } from "./components/GEBContainer";
import { usePersonalData } from "./hooks/usePersonalData";
import { PersonalInfo } from "./components/PersonalInfo";


function App() {

  // const [weightObject, setWeightObject] = useState('maintainWeight')


  // // HOOK USERINFO
  const { setUserInfo, myActivities, setMyActivities, totalKcal, hasCalculated } = usePersonalData()

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>

          <PersonalInfo />

          {!hasCalculated
            ? <p>Calcular</p>
            : (
              <motion.div
                className={styles.resultsContainer}
              >

                <WarningMessage
                  iconPosition='center'
                  position='center'
                  message='Nota: Os resultados aqui apresentados não substituem um especialista!'
                />

                <div className={styles.resultHeader}>
                  <h3>Resultado:</h3>
                  <a href="#">Saiba como foi feito os calculos!</a>
                </div>

                <IMCContainer />

                <GEBContainer />

                <KcalSuggestionPerMeal />

              </motion.div>
            )
          }

        </div>
      </main>


    </>
  )
}

export default App

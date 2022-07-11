import ReactLoading from 'react-loading'
import { motion } from "framer-motion"

import styles from './App.module.scss'
import './global.scss'

import { usePersonalData } from "./hooks/usePersonalData";

import Calc from './assets/calc.svg'

import { Header } from './components/Header'
import { WarningMessage } from './components/WarningMessage'
import { KcalSuggestionPerMeal } from "./components/KcalSuggestionPerMeal";
import { IMCContainer } from "./components/IMCContainer";
import { GEBContainer } from "./components/GEBContainer";
import { PersonalInfo } from "./components/PersonalInfo";
import { useNavigate } from 'react-router-dom';



function App() {
  const { hasCalculated, isLoading } = usePersonalData()

  const navigation = useNavigate()

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>

          <PersonalInfo />

          {!hasCalculated
            ? (
              <div className={styles.noResults}>
                <img src={Calc} alt="Imagem de papel em branco" />
                <strong>Calcule os macros nutrientes necessários para o seu dia</strong>
              </div>
            )
            : isLoading
              ? (
                <div className={styles.loadingContainer}>
                  <ReactLoading type='bubbles' height={32} color='#37B947' />
                </div>
              )
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
                    <button
                      onClick={() => navigation('calc')}
                    >
                      Saiba como foi feito os calculos!
                    </button>
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

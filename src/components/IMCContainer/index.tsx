import { motion } from "framer-motion"
import { useEffect } from "react"
import { usePersonalData } from "../../hooks/usePersonalData"
import { WarningMessage } from "../WarningMessage"

import styles from './styles.module.scss'

interface IMCContainerProps {
  // bodyFat: string
}

export function IMCContainer() {
  const { userInfo, setImc, imc, setBodyFat, bodyFat, myRef } = usePersonalData()


  function calcIMC() {
    const calcImc = userInfo.weight / (userInfo.stature * userInfo.stature)
    const imcFormatted = (calcImc * 10000)

    return setImc(imcFormatted)
  }

  function calcBodyFat() {
    const calcBodyFatAndFormat = ((1.2 * imc) + (0.23 * userInfo.age) - (10.8 * (userInfo.genderOption === 'masculine' ? 1 : 0)) - 5.4).toFixed(2)

    return setBodyFat(calcBodyFatAndFormat)
  }

  useEffect(() => {
    calcIMC()
    calcBodyFat()
  }, [imc])

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })

  }, [])

  return (
    <div className={styles.ResultIMCContent} ref={myRef}>

      <div className={styles.IMCContainer}>

        <motion.div
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0 }}
          className={styles.IMCInfo}
        >
          <div className={styles.IMCContent}>
            <span>IMC</span>
            <strong>{imc.toFixed(2).replace('.', ',')}</strong>
          </div>

          <p>Índice de Massa Corporal</p>
        </motion.div>

        <motion.div
          animate={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={styles.IMCInfo}
        >
          <div className={styles.IMCContent}>
            <span>Gordura</span>
            <strong>{bodyFat}%</strong>
          </div>

          <p>Gordura Corporal Corporal</p>
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={styles.IMCTableOfResults}
      >
        <table>
          <tbody>
            <tr>
              <th>Condição</th>
              <th>IMC</th>
              <th>Peso</th>
            </tr>
            <tr className={imc <= 18.5 ? styles.normal : ''}>
              <td>Magreza</td>
              <td>{'< 18.5'}</td>
              <td>{'< 55.4 Kg'}</td>
            </tr>
            <tr className={imc > 18.5 && imc <= 24.9 ? styles.normal : ''}>
              <td>Normal</td>
              <td>{'18.5 a 24.9'}</td>
              <td>{'55.4 a 74.5 Kg'}</td>
            </tr>
            <tr className={imc > 24.9 && imc <= 30 ? styles.normal : ''}>
              <td>Sobrepeso</td>
              <td>{'24.9 a 30'}</td>
              <td>{'74.5 a 89.8 Kg'}</td>
            </tr>
            <tr className={imc > 30 ? styles.normal : ''}>
              <td>Obesidade</td>
              <td>{'> 30'}</td>
              <td>{'> 89.8 Kg'}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className={styles.warningMessageContainer}
      >
        <WarningMessage
          iconPosition='start'
          position='center'
          message='Nota: Os resultados aqui apresentados podem não indicar a sua realidade, uma vez que a tabela é baseada em individuos “normais”. Por exemplo: se você for um fisioculturista, irá dar IMC auto, mas isso não quer dizer que está obeso. Procure um especialista para ter resultados mais precisos.'
        />
      </motion.div>
    </div>
  )
}
import { ChangeEvent, useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CaretLeft, CaretRight, PlusCircle, X } from 'phosphor-react'
import { toast } from 'react-toastify';

import styles from './App.module.scss'
import './global.scss'

import { Header } from './components/Header'
import { WarningMessage } from './components/WarningMessage'
import { MealCard } from './components/MealCard'
import { ActivityCard } from "./components/ActivityCard";
import { KcalSuggestionPerMeal } from "./components/KcalSuggestionPerMeal";
import { ModalActivities } from "./components/ModalActivities";
import { IMCContainer } from "./components/IMCContainer";

interface Activity {
  id: number
  title: string
  time: number
  caloriesSpent: number
}

interface ScrollProp {
  scrollLeft: number
}

function App() {
  const [genderOption, setGenderOption] = useState('')
  const [bioType, setBioType] = useState('')
  const [weight, setWeight] = useState(0)
  const [stature, setStature] = useState(0)
  const [age, setAge] = useState(0)
  const [isOpenModalActivities, setIsOpenModalActivities] = useState(false)

  const [errorType, setErrorType] = useState('')

  const [imc, setImc] = useState(0)
  const [bodyFat, setBodyFat] = useState('')
  const [geb, setGeb] = useState(0)

  const [weightObject, setWeightObject] = useState('maintainWeight')

  const [myActivities, setMyActivities] = useState<Activity[]>([])

  const [hasCalculated, setHasCalculated] = useState(false)

  const activitiesCarousel = useRef<ScrollProp | any>(null)


  const errorGenderNotFilled = () => toast.error("Selecione um gênero!");
  const errorBioTypeNotFilled = () => toast.error("Selecione um biotipo!");

  const errorWeightNotFilled = () => toast.error("Campo peso não está preenchido!");
  const errorStatureNotFilled = () => toast.error("Campo altura não está preenchido!");
  const errorAgeNotFilled = () => toast.error("Campo idade não está preenchido!");

  const totalKcalByActivity = myActivities.reduce((totalCaloriesSpent, actualCaloriesSpent) => totalCaloriesSpent + actualCaloriesSpent.caloriesSpent, 0)
  const totalKcal = totalKcalByActivity + geb

  function calcIMC() {
    const calcImc = weight / (stature * stature)
    const imcFormatted = (calcImc * 10000)

    return setImc(imcFormatted)
  }

  function calcBodyFat() {
    const calcBodyFatAndFormat = ((1.2 * imc) + (0.23 * age) - (10.8 * (genderOption === 'masculine' ? 1 : 0)) - 5.4).toFixed(2)

    return setBodyFat(calcBodyFatAndFormat)
  }

  function calcGEB() {
    if (genderOption === 'masculine') {
      const getGeb = 66.47 + (13.75 * weight) + (5 * stature) - (6.76 * age)
      return setGeb(getGeb)
    } else {
      const getGeb = 655.1 + (9.56 * weight) + (1.85 * stature) - (4.68 * age)
      return setGeb(getGeb)
    }
  }

  // function calMacro() {
  /*
  proteina =    1.8 a 2 * peso
  gordura =     0.8 a 1 * peso
  carboidrato = respo

  1g de proteina =    4kcal
  1g de gordura =     9kcal
  1g de carboidrato = 4kcal
  */

  const proteinToMaintainWeight = 1.8 * weight
  const fatToMaintainWeight = 0.8 * weight
  const carbohydrateToMaintainWeight = (totalKcal - ((proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9))) / 4

  const proteinToLoseWeight = 1.8 * weight
  const fatToLoseWeight = 0.8 * weight
  const carbohydrateToLoseWeight = ((totalKcal - ((proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9))) / 4) * 0.8

  const proteinToGainMass = 2 * weight
  const fatToGainMass = 1 * weight
  const carbohydrateToGainMass = ((totalKcal - ((proteinToMaintainWeight * 4) + (fatToMaintainWeight * 9))) / 4) * 1.2

  function openModalActivities() {
    if (weight === 0) {
      return errorWeightNotFilled()
    }

    setIsOpenModalActivities(!isOpenModalActivities)
  }

  function handleAddActivity(activity: Activity) {
    setMyActivities([...myActivities, activity])
    toast.success("Atividade adicionada com sucesso!")
  }

  function handleRemoveActivity(id: number) {
    const listWithoutActivity = myActivities.filter(activity => activity.id !== id)
    setMyActivities(listWithoutActivity)
  }

  function handleSeePreviousActivity() {
    activitiesCarousel.current!.scrollLeft -= 120
  }

  function handleSeeNextActivity() {
    activitiesCarousel.current!.scrollLeft += 120
  }

  async function handleCalcTheIMCAndMacro() {
    if (!genderOption) {
      setErrorType('gender')
      return errorGenderNotFilled()
    }
    if (!bioType) {
      setErrorType('bioType')
      return errorBioTypeNotFilled()
    }
    if (!weight) {
      setErrorType('weight')
      return errorWeightNotFilled()
    }
    if (!stature) {
      setErrorType('stature')
      return errorStatureNotFilled()
    }
    if (!age) {
      setErrorType('age')
      return errorAgeNotFilled()
    }

    calcIMC()
    calcGEB()

    setHasCalculated(true)

  }

  useEffect(() => {
    calcBodyFat()
    // calMacro()
  }, [imc, myActivities])

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <div className={styles.personalInfo}>
            <h3>Seus dados:</h3>

            <div className={styles.personalInfoContent}>
              <div className={styles.genderAndBioType}>
                <div className={`${styles.gender} ${errorType === 'gender' && genderOption.length === 0 && styles.warning}`}>
                  <strong>Gênero:</strong>
                  <div className={styles.genderOptions}>
                    <button
                      onClick={() => setGenderOption('masculine')}
                      className={genderOption === 'masculine' ? styles.active : ''}
                    >
                      Masculino
                    </button>
                    <button
                      onClick={() => setGenderOption('feminine')}
                      className={genderOption === 'feminine' ? styles.active : ''}
                    >
                      Feminino
                    </button>

                  </div>
                </div>

                <div className={`${styles.bioType} ${errorType === 'bioType' && bioType.length === 0 && styles.warning}`}>
                  <div className={styles.bioTypeHeader}>
                    <strong>Biotipo:</strong>
                    <a href="#">Qual o meu biotipo?</a>
                  </div>

                  <div className={styles.bioTypesContainer}>
                    <button
                      onClick={() => setBioType('ectomorfo')}
                      className={bioType === 'ectomorfo' ? styles.active : ''}
                    >
                      Ectomorfo
                    </button>
                    <button
                      onClick={() => setBioType('mesomorfo')}
                      className={bioType === 'mesomorfo' ? styles.active : ''}
                    >
                      Mesomorfo
                    </button>
                    <button
                      onClick={() => setBioType('endomorfo')}
                      className={bioType === 'endomorfo' ? styles.active : ''}
                    >
                      Endomorfo
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.personalInfoAndActivityButton}>
                <div className={styles.personalInfoWeightStatureAge}>
                  <div className={`${styles.weight} ${errorType === 'weight' && weight === 0 && styles.warning}`}>
                    <strong>Peso</strong>
                    <input
                      type="number"
                      id="weight"
                      placeholder='ex: 70'
                      value={weight > 0 ? weight : ''}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setWeight(Number(event.target.value))}

                    />
                    <label htmlFor="weight">kg</label>
                  </div>

                  <div className={`${styles.stature} ${errorType === 'stature' && stature === 0 && styles.warning}`}>
                    <strong>Altura</strong>
                    <input
                      type="number"
                      id="stature"
                      placeholder='ex: 170'
                      value={stature > 0 ? stature : ''}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setStature(Number(event.target.value))}
                    />
                    <label htmlFor="stature">cm</label>
                  </div>

                  <div className={`${styles.age} ${errorType === 'age' && age === 0 && styles.warning} `}>
                    <strong>Idade</strong>
                    <input
                      type="number"
                      id="age"
                      placeholder='ex: 22'
                      value={age > 0 ? age : ''}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setAge(Number(event.target.value))}
                    />
                    <label htmlFor="stature"></label>
                  </div>
                </div>

                <div className={styles.physicalActivityButton}>
                  <strong>Atividades:</strong>
                  <button
                    onClick={openModalActivities}
                  >
                    <PlusCircle size={20} />
                    Add
                  </button>

                </div>
              </div>

              {isOpenModalActivities && (
                <ModalActivities
                  handleAddActivity={handleAddActivity}
                  myActivities={myActivities}
                  weight={weight}
                  setIsOpenModalActivities={setIsOpenModalActivities}
                  isOpenModalActivities
                />
              )}

              <div className={styles.activitiesContainer} >
                <div className={styles.activitiesContent} ref={activitiesCarousel}>

                  {myActivities.length > 0
                    ? myActivities.map(active => <ActivityCard
                      key={active.id}
                      id={active.id}
                      title={active.title}
                      time={active.time}
                      caloriesSpent={active.caloriesSpent}
                      removeItem={() => handleRemoveActivity(active.id)}
                    />
                    )
                    : "Voce ainda não tem atividade"
                  }
                </div>

                {myActivities.length >= 2 && (
                  <>
                    <button
                      className={styles.seePreviousActivity}
                      onClick={handleSeePreviousActivity}
                    >
                      <CaretLeft size={24} />
                    </button>
                    <button
                      className={styles.seeNextActivity}
                      onClick={handleSeeNextActivity}
                    >
                      <CaretRight size={24} />
                    </button>

                  </>
                )}

              </div>

              <button
                className={styles.calculateButton}
                onClick={handleCalcTheIMCAndMacro}
              >
                Calcular
              </button>
            </div>

          </div>

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

                <IMCContainer
                  imc={imc}
                  bodyFat={bodyFat}
                />

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

                <KcalSuggestionPerMeal
                  weightObject={weightObject}
                  proteinToMaintainWeight={proteinToMaintainWeight}
                  fatToMaintainWeight={fatToMaintainWeight}
                  carbohydrateToMaintainWeight={carbohydrateToMaintainWeight}
                  proteinToLoseWeight={proteinToLoseWeight}
                  fatToLoseWeight={fatToLoseWeight}
                  carbohydrateToLoseWeight={carbohydrateToLoseWeight}
                  proteinToGainMass={proteinToGainMass}
                  fatToGainMass={fatToGainMass}
                  carbohydrateToGainMass={carbohydrateToGainMass}
                />

              </motion.div>
            )
          }



        </div>
      </main>


    </>
  )
}

export default App

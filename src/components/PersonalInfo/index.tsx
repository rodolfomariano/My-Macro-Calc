import { ChangeEvent, useRef, useState } from 'react'
import { CaretLeft, CaretRight, PlusCircle } from 'phosphor-react'

import styles from './styles.module.scss'

import { ActivityCard } from '../ActivityCard'
import { ModalActivities } from '../ModalActivities'
import { toast } from 'react-toastify'
import { usePersonalData } from '../../hooks/usePersonalData'
import { useNavigate } from 'react-router-dom'

interface Activity {
  id: number
  title: string
  time: number
  caloriesSpent: number
}

interface ScrollProp {
  scrollLeft: number
}

export function PersonalInfo() {
  const [genderOption, setGenderOption] = useState('')
  const [bioType, setBioType] = useState('')
  const [weight, setWeight] = useState(0)
  const [stature, setStature] = useState(0)
  const [age, setAge] = useState(0)
  const [isOpenModalActivities, setIsOpenModalActivities] = useState(false)

  const [errorType, setErrorType] = useState('')

  const navigation = useNavigate()

  // const [hasCalculated, setHasCalculated] = useState(false)

  const activitiesCarousel = useRef<ScrollProp | any>(null)

  // HOOK USERINFO
  const { setUserInfo, myActivities, setMyActivities, totalKcal, setHasCalculated, setIsLoading } = usePersonalData()

  const errorGenderNotFilled = () => toast.error("Selecione um gênero!");
  const errorBioTypeNotFilled = () => toast.error("Selecione um biotipo!");

  const errorWeightNotFilled = () => toast.error("Campo peso não está preenchido!");
  const errorStatureNotFilled = () => toast.error("Campo altura não está preenchido!");
  const errorAgeNotFilled = () => toast.error("Campo idade não está preenchido!");

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
    setIsLoading(true)

    setUserInfo({
      genderOption,
      bioType,
      weight,
      stature,
      age,
    })

    setHasCalculated(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

  }

  return (
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
              <button
                onClick={() => navigation('bio-type')}
              >
                Qual o meu biotipo?
              </button>
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
  )
}
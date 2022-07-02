import { ChangeEvent, useState } from "react"
import { motion } from "framer-motion"

import styles from './styles.module.scss'

import activityList from '../../utils/activityList.json'
import { X } from "phosphor-react"

interface Activity {
  id: number
  title: string
  time: number
  caloriesSpent: number
}

interface ModalActivitiesProps {
  weight: number
  myActivities: Array<Activity>
  handleAddActivity: ({ }: Activity) => void
  setIsOpenModalActivities: (status: boolean) => void
  isOpenModalActivities: boolean
}

export function ModalActivities({ weight, handleAddActivity, myActivities, setIsOpenModalActivities, isOpenModalActivities }: ModalActivitiesProps) {
  const [timeOfActivity, setTimeOfActivity] = useState(0)
  const [closingModal, setClosingModal] = useState(false)
  const [activitySelected, setActivitySelected] = useState<[] | any>([])

  const kcalResultToActivity = activitySelected.length > 0 && (Number(activitySelected.split(',')[0]) * weight * timeOfActivity) / 60

  function closeModalActivities() {
    setClosingModal(true)
    setActivitySelected([])
    setTimeOfActivity(0)

    setTimeout(() => {
      setIsOpenModalActivities(!isOpenModalActivities)
      setClosingModal(false)
    }, 900)
  }

  function addActivity() {
    closeModalActivities()

    handleAddActivity({
      id: myActivities.length + 1,
      title: activitySelected.split(',')[1],
      time: timeOfActivity,
      caloriesSpent: kcalResultToActivity ? kcalResultToActivity : 0
    })
  }

  return (
    <div className={styles.modalActivities}>
      <div className={styles.modalActivitiesBackground}>
        <motion.div
          animate={
            closingModal
              ? { scale: [1, 1.2, 0], }
              : { scale: [0, 1.2, 1], }
          }
          transition={{ duration: 0.75, delay: 0 }}
          className={styles.modalActivitiesContent}
        >
          <div className={styles.modalHeader}>
            <strong>
              Atividades
            </strong>
            <button
              onClick={closeModalActivities}
            >
              <X size={16} />
            </button>
          </div>

          <div className={styles.activitiesOptions}>
            <strong>Selecione uma atividade</strong>
            <select
              name="" id=""
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setActivitySelected(event.target.value)}
            >
              <option>Selecione uma categoria</option>
              {activityList.map((activity => (
                <option key={activity.id} value={[String(activity.met), activity.title]}>{activity.title}</option>
              )))}

            </select>

            <div className={styles.timeTraining}>
              <strong>Treinou quanto tempo?</strong>
              <div className={styles.timeInput}>
                <input
                  type="number"
                  id='time'
                  placeholder={timeOfActivity > 0 ? String(timeOfActivity) : 'ex: 60'}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setTimeOfActivity(Number(event.target.value))}
                />
                <label htmlFor="time">min</label>
              </div>
            </div>
          </div>

          <div className={styles.caloriesSpent}>
            <strong>{kcalResultToActivity ? (kcalResultToActivity).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) : 0}kcal</strong><span> gastas</span>
          </div>

          <footer>
            <button
              onClick={closeModalActivities}
            >
              Cancelar
            </button>
            <button
              onClick={addActivity}
            >
              Confirmar
            </button>
          </footer>
        </motion.div>
      </div>

    </div>
  )
}
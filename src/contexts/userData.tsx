import { createContext, ReactNode, useState } from "react";

interface UserInfo {
  genderOption: string
  bioType: string
  weight: number
  stature: number
  age: number
}

interface Activity {
  id: number
  title: string
  time: number
  caloriesSpent: number
}

interface Macro {
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

interface UserDataContextProps {
  userInfo: UserInfo
  imc: number
  geb: number
  bodyFat: string
  myActivities: Activity[]
  totalKcal: number
  macro: Macro
  hasCalculated: boolean
  weightObject: 'loseWeight' | 'maintainWeight' | 'gainMass' | string
  setUserInfo: ({ genderOption, bioType, weight, stature, age }: UserInfo) => void
  // calcIMC: (weight: number, stature: number) => void
  setImc: (imc: number) => void
  setGeb: (geb: number) => void
  setBodyFat: (bodyFat: string) => void
  setMyActivities: ([]: Activity[]) => void
  setTotalKcal: (totalKcal: number) => void
  setMacro: (macro: Macro) => void
  setHasCalculated: (calculated: boolean) => void
  setWeightObject: (value: 'loseWeight' | 'maintainWeight' | 'gainMass') => void
}

interface UserDataProviderProps {
  children: ReactNode
}

const UserDataContext = createContext({} as UserDataContextProps)

function UserDataProvider({ children }: UserDataProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)
  const [imc, setImc] = useState(0)
  const [geb, setGeb] = useState(0)
  const [bodyFat, setBodyFat] = useState('')
  const [myActivities, setMyActivities] = useState<Activity[]>([])
  const [totalKcal, setTotalKcal] = useState(0)
  const [macro, setMacro] = useState<Macro>({} as Macro)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [weightObject, setWeightObject] = useState('maintainWeight')

  return (
    <UserDataContext.Provider value={{
      userInfo,
      setUserInfo,
      imc,
      setImc,
      geb,
      setGeb,
      bodyFat,
      setBodyFat,
      myActivities,
      setMyActivities,
      totalKcal,
      setTotalKcal,
      macro,
      setMacro,
      hasCalculated,
      setHasCalculated,
      weightObject,
      setWeightObject
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export { UserDataContext, UserDataProvider }
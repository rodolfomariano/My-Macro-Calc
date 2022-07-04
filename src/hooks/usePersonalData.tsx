import { useContext } from "react";
import { UserDataContext } from "../contexts/userData";

function usePersonalData() {
  const context = useContext(UserDataContext)

  return context
}

export { usePersonalData }
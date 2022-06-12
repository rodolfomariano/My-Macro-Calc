import Logo from '../../assets/logo.svg'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <img src={Logo} alt="Logo com uma balança" />
    </header>
  )
}
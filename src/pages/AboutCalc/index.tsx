import { ArrowLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { CalcCard } from '../../components/CalcCard'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export function AboutCalc() {
  const navigation = useNavigate()

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <button
          onClick={() => navigation('/')}
          className={styles.goToBack}
        >
          <ArrowLeft />
          Voltar para a home
        </button>

        <h1>Calculos</h1>

        <div className={styles.calcContainer}>
          <CalcCard
            title='Calculo do IMC'
            content='IMC = peso / (altura * altura)'
          />
          <CalcCard
            title='Calculo do percentual de gordura'
            content={(
              <>
                <p>Em Homens: Gordura = (1.2 * imc) + (0.23 * idade) - (10.8 * 1) - 5.4)</p>
                <p>Em Mulheres: Gordura = (1.2 * imc) + (0.23 * idade) - (10.8 * 0) - 5.4)</p>
              </>
            )}
          />
          <CalcCard
            title='Calculo do GEB'
            content={(
              <>
                <p>Em Homens: GEB = 66.47 + (13.75 * peso) + (5 * altura) - (6.76 * idade)</p>
                <p>Em Mulheres: GEB = 655.1 + (9.56 * peso) + (1.85 * altura) - (4.68 * idade)</p>
              </>
            )}
          />
        </div>

      </main>
    </>
  )
}
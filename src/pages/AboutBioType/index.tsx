import { ArrowArcLeft, ArrowLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";

import TestImg from '../../assets/test-biotype.svg'

import styles from './styles.module.scss'

export function AboutBioType() {

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

        <div className={styles.bioTypeContainer}>
          <h1>Biotipos e suas características</h1>

          <div className={styles.bioTypeCardContainer}>
            <div className={styles.bioTypeCard}>
              <div className={styles.cardHeader}>
                Ectomorfo
              </div>

              <div className={styles.cardContent}>
                <ul>
                  <li>Metabolismo acelerado</li>
                  <li>Dificuldade de ganhar massa</li>
                  <li>Ossos pouco densos</li>
                  <li>Perde gordura com mais facilidade</li>
                </ul>
              </div>
            </div>



            <div className={styles.bioTypeCard}>
              <div className={styles.cardHeader}>
                Mesomorfo
              </div>

              <div className={styles.cardContent}>
                <ul>
                  <li>Ossos mais densos</li>
                  <li>Ombros mais largos</li>
                  <li>Facilidade para ganhar musculo</li>
                  <li>Facilidade para queimar gordura</li>
                </ul>
              </div>
            </div>



            <div className={styles.bioTypeCard}>
              <div className={styles.cardHeader}>
                Endomorfo
              </div>

              <div className={styles.cardContent}>
                <ul>
                  <li>Dificuldade para perder gordura</li>
                  <li>Pré-disposição para acumular gordura</li>
                  <li>Metabolismo mais lento</li>
                  <li>Rosto redondo</li>
                  <li>Ossos mais densos</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.testContainer}>
          <h2>
            Teste do pulso
          </h2>

          <img src={TestImg} alt="" />

        </div>

        <p>
          <strong>Observação:</strong> Um indivíduo pode ter características de  mais de um biotipo, mas sempre irá pender para um,  que é o seu biotipo predominante.
          E um indivíduo pode ser de um biotipo, porém ‘estar’ em outro, ex: uma pessoa que tem os ossos das articulações aparentes e está acima do peso provavelmente será um ectomorfo, porém está endomorfo.
        </p>

      </main>
    </>
  )
}
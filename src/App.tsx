import styles from './App.module.scss'
import './global.scss'

import { Header } from './components/Header'
import { WarningMessage } from './components/WarningMessage'
import { MealCard } from './components/MealCard'

import { PlusCircle } from 'phosphor-react'

function App() {

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <div className={styles.personalInfo}>
            <h3>Seus dados:</h3>

            <div className={styles.personalInfoContent}>
              <div className={styles.genderAndBioType}>
                <div className={styles.gender}>
                  <strong>Genero:</strong>
                  <div className={styles.genderOptions}>
                    <button>Homen</button>
                    <button>Mulher</button>

                  </div>
                </div>

                <div className={styles.bioType}>
                  <div className={styles.bioTypeHeader}>
                    <strong>Biotipo:</strong>
                    <a href="#">Qual o meu biotipo?</a>
                  </div>

                  <div className={styles.bioTypesContainer}>
                    <button>Ectomorfo</button>
                    <button>Mesomorfo</button>
                    <button>Endomorfo</button>
                  </div>
                </div>
              </div>

              <div className={styles.personalInfoAndActivityButton}>
                <div className={styles.personalInfoWeightStatureAge}>
                  <div className={styles.weight}>
                    <strong>Peso</strong>
                    <input
                      type="number"
                      id="weight"
                      placeholder='ex: 73'
                    />
                    <label htmlFor="weight">kg</label>
                  </div>

                  <div className={styles.stature}>
                    <strong>Altura</strong>
                    <input
                      type="number"
                      id="stature"
                      placeholder='ex: 173'
                    />
                    <label htmlFor="stature">cm</label>
                  </div>

                  <div className={styles.age}>
                    <strong>Idade</strong>
                    <input
                      type="number"
                      id="age"
                      placeholder='35'
                    />
                    <label htmlFor="stature"></label>
                  </div>
                </div>

                <div className={styles.physicalActivityButton}>
                  <strong>Atividades:</strong>
                  <button>
                    <PlusCircle size={20} />
                    Add
                  </button>

                </div>
              </div>

              <div className={styles.activitiesContainer}>
                Você ainda não tem atividade
              </div>

              <button className={styles.calculateButton}>Calcular</button>
            </div>

          </div>

          <div className={styles.resultsContainer}>

            <WarningMessage
              iconPosition='center'
              position='center'
              message='Nota: Os resultados aqui apresentados não substituem um especialista!'
            />

            <div className={styles.resultHeader}>
              <h3>Resultado:</h3>
              <a href="#">Saiba como foi feito os calculos!</a>
            </div>

            <div className={styles.ResultIMCContent}>

              <div className={styles.IMCContainer}>
                <div className={styles.IMCInfo}>
                  <div className={styles.IMCContent}>
                    <span>IMC</span>
                    <strong>24, 74</strong>
                  </div>

                  <p>Índice de Massa Corporal</p>
                </div>

                <div className={styles.IMCInfo}>
                  <div className={styles.IMCContent}>
                    <span>Gordura</span>
                    <strong>18.62%</strong>
                  </div>

                  <p>Gordura Corporal Corporal</p>
                </div>
              </div>

              <div className={styles.IMCTableOfResults}>
                <table>
                  <tr>
                    <th>Condição</th>
                    <th>IMC</th>
                    <th>Peso</th>
                  </tr>
                  <tr>
                    <td>Magreza</td>
                    <td>{'< 18.5'}</td>
                    <td>{'< 55.4 Kg'}</td>
                  </tr>
                  <tr className={styles.normal}>
                    <td>Normal</td>
                    <td>{'18.5 a 24.9'}</td>
                    <td>{'55.4 a 74.5 Kg'}</td>
                  </tr>
                  <tr>
                    <td>Sobrepeso</td>
                    <td>{'24.9 a 30'}</td>
                    <td>{'74.5 a 89.8 Kg'}</td>
                  </tr>
                  <tr>
                    <td>Obesidade</td>
                    <td>{'> 30'}</td>
                    <td>{'> 89.8 Kg'}</td>
                  </tr>
                </table>
              </div>

              <div className={styles.warningMessageContainer}>
                <WarningMessage
                  iconPosition='start'
                  position='center'
                  message='Nota: Os resultados aqui apresentados podem não indicar a sua realidade, uma vez que a tabela é baseada em individuos “normais”. Por exemplo: se você for um fisioculturista, irá dar IMC auto, mas isso não quer dizer que está obeso. Procure um especialista para ter resultados mais realistas.'
                />
              </div>
            </div>

            <div className={styles.ResultGEBContainer}>

              <div className={styles.GEBContainer}>
                <div className={styles.GEBInfo}>
                  <div className={styles.GEBContent}>
                    <span>GEB</span>
                    <strong>2.600kcal</strong>
                  </div>

                  <p>Gasto Energético Basal</p>
                </div>

                <div className={styles.GEBInfo}>
                  <div className={styles.GEBContent}>
                    <span>Exercícios</span>
                    <strong>700kcal</strong>
                  </div>

                  <p>Gastos em Exercícios</p>
                </div>

                <span>=</span>

                <div className={styles.GEBInfo}>
                  <div className={styles.GEBContent}>
                    <span>GET</span>
                    <strong>3.300kcal</strong>
                  </div>

                  <p>Gasto Energético Total</p>
                </div>
              </div>

              <div className={styles.microsPerDayToConsumeContainer}>

                <div className={styles.objectiveTypesContainer}>
                  <button className={styles.objectiveTypeButton}>
                    Perder peso
                  </button>
                  <button className={styles.objectiveTypeButton}>
                    Manter peso
                  </button>
                  <button className={styles.objectiveTypeButton}>
                    Ganhar massa
                  </button>
                </div>

                <div className={styles.microsToConsumeContainer}>
                  <strong>Micronutrientes diários</strong>

                  <div className={styles.microContainer}>
                    <div className={styles.microTypeContainer}>
                      <div className={styles.microContent}>
                        <span>333g</span>
                      </div>

                      <p>Carboidratos</p>
                    </div>

                    <div className={styles.microTypeContainer}>
                      <div className={styles.microContent}>
                        <span>148g</span>
                      </div>

                      <p>Proteínas</p>
                    </div>

                    <div className={styles.microTypeContainer}>
                      <div className={styles.microContent}>
                        <span>74g</span>
                      </div>

                      <p>Gorduras</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.warningMessageContainer}>
                <WarningMessage
                  iconPosition='start'
                  position='center'
                  message='Nota: Os resultados aqui apresentados podem não indicar a sua realidade, uma vez que a tabela é baseada em individuos “normais”. Por exemplo: se você for um fisioculturista, irá dar IMC auto, mas isso não quer dizer que está obeso. Procure um especialista para ter resultados mais realistas.'
                />
              </div>
            </div>

            <div className={styles.kcalSuggestionPerMeal}>
              <div className={styles.suggestionHeader}>
                <strong>
                  Divisão das calorias por refeição
                </strong>

                <a href="#">Dica</a>
              </div>

              <div className={styles.mealContainer}>
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />

                <span>
                  <strong>100%</strong> das calorias distribuidas
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default App

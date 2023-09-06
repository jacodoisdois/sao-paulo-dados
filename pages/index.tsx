import React from 'react';
import MyIconSVG  from '../assets/Brasao_do_Sao_Paulo_Futebol_Clube.svg'
import Image from 'next/image';
import styles from '../styles/style.module.css'
import Header
 from '../components/Header';
import {  formatCurrencyBRL, useTotalPlanValues } from './api/api';
import config from '../config/config.json'

 const IndexPage = () => { 
  const { data, isLoading, isError } =  useTotalPlanValues();
  const plansNames = Object.keys(config.Api.planCost) 

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao buscar os dados.</p>;
  }


  return(
  <div className={styles['main-page-container']}> 
    <Header />
    <div>
      <Image  className={styles.logo} src={MyIconSVG} alt={''}/>
    </div>
    <div  className={`${styles['div-finance-data']}`}>
      <h3>Total da soma de recursos</h3>
      <div className={styles['div-header-finance-data']}>  
      <p>Ganhos previstos em 6 meses: {data.sixMonthsEarnings}</p>
      <p>Ganhos previstos em 12 meses: {data.twelveMonthsEarnings}</p>
      </div>
      <div className={`${styles['div-header-plans-finance']} ${styles['div-data-session']}`}>
      <h3>Recursos agrupados por planos - 6 meses</h3>
      <div className={`${styles['div-header-plans-finance-data']}`}>
        {
          plansNames.map((planName: string) => { 
            const currentPlan = data.plans.filter(plan => plan.description.toLowerCase() === planName)[0]
            const totalPlanEarnings = config.Api.planCost[currentPlan.description.toLowerCase()] * currentPlan.totalRaw * 6
            
            return (
              <div className={styles['div-plan-earnings']}>
                <p>{planName.charAt(0).toUpperCase() + planName.slice(1)}</p>
                <p>{formatCurrencyBRL(totalPlanEarnings)}</p>
              </div>
          
            )}
          )
        }
      </div>
      </div>
      <div className={`${styles['div-header-plans-finance']} ${styles['div-data-session']}`}>
      <h3>Recursos agrupados por planos - 12 meses</h3>
      <div className={styles['div-header-plans-finance-data']}>
        {
          plansNames.map((planName: string) => { 
            const currentPlan = data.plans.filter(plan => plan.description.toLowerCase() === planName)[0]
            const totalPlanEarnings = config.Api.planCost[currentPlan.description.toLowerCase()] * currentPlan.totalRaw * 12
            return (
              <div className={styles['div-plan-earnings']}>
                <p>{planName.charAt(0).toUpperCase() + planName.slice(1)}</p>
                <p>{formatCurrencyBRL(totalPlanEarnings)}</p>
              </div>
          
            )}
          )
        }
      </div>
      </div>
    </div>
  </div>
)
}

export default IndexPage

import React, { ReactNode } from 'react'
import styles from '../styles/style.module.css'

const Header = () => (
  <div>
    <h1 className={styles['spfc-text']}>São Paulo F.C.</h1>
    <p className={styles.subtext}>Estimativa de dados sobre ganhos dos planos de sócio torcedor</p>
  </div>
)

export default Header

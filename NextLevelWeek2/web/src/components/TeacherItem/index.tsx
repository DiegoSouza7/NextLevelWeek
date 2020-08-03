import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/59752536?s=460&u=9fff4adbffa09f2dc0daec13c5120e0d99e59875&v=4" alt="Diego Souza"/>
        <div>
          <strong>Diego Souza</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Primeira descrição
        <br/> <br/>
        Descriçao do professor
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
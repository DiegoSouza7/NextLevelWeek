import React, { FormEvent, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import logo from '../images/map-marker.svg'

import '../styles/pages/forgotPassword.css'
import api from '../services/api'

export default function ResetPassword() {
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  let location = useLocation().search
  location = location.replace('?', '')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if(password === passwordRepeat) {
      api.post('reset', {password, location}).then(response => {
        alert('Senha alterada com sucesso')

        history.push('/login')
      }).catch(error => {
        alert('Tente novamente!')
      })
    } else {
      return alert('As senhas devem ser iguais!')
    }
  }

  return (
    <div className="page">
      <div className="showIcon">
        <div className="icon">
          <img className="imageIcon" src={logo} alt="Happy"/>
          <h1 className="nameIcon">Happy</h1>
        </div>

        <div className="cityState">
          <p className="city">Belo Horizonte</p>
          <p className="state">Minas Gerais</p>
        </div>
      </div>

      <main className="formForgotPassword">
        <Link to={'/login'} className="back">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Redefinição de senha</legend>

            <span>
            Escolha uma nova senha para você acessar o dashboard do Happy.
            </span>
            
            <div className="input-block">
              <label htmlFor="nameInput">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="nameInput">Repetir senha</label>
              <input
                type="password"
                id="password"
                value={passwordRepeat}
                onChange={event => setPasswordRepeat(event.target.value)} 
              />
            </div>

          <button className="submit" type="submit">
            Recuperar senha
          </button>
          </fieldset>
        </form>
      </main>
    </div>
  )
}
import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import logo from '../images/map-marker.svg'

import '../styles/pages/forgotPassword.css'
import api from '../services/api'

function ForgotPassword() {
  const history = useHistory()
  const [email, setEmail] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    api.post('forgot', {email}).then(response => {
      alert(`${response.data}`)
      history.push('/login')
    }).catch(error => {
      alert('Tente novamente!')
    })
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
            <legend>Esqueci a senha</legend>

            <span>
            Sua redefinição de senha será enviada para o e-mail cadastrado.
            </span>

            <div className="input-block">
              <label htmlFor="nameInput">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)} 
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

export default ForgotPassword;
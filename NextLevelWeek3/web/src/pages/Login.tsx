import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import logo from '../images/map-marker.svg'

import '../styles/pages/login.css'
import api from '../services/api'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState<boolean>(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    api.post('login', {email, password}).then(response => {
      if(remember === true) {
        localStorage.setItem('Authorization', `Bearer ${response.data}`)
        history.push('/app')
      } else {
        sessionStorage.setItem('Authorization', `Bearer ${response.data}`)
        history.push('/app')
      }
    }).catch(error => {
      localStorage.clear()
      sessionStorage.clear()
      alert('Email ou senha incorreta.')
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

      <main className="formLogin">
        <Link to="/" className="back">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Fazer login</legend>

            <div className="input-block">
              <label htmlFor="nameInput">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="nameInput">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)} 
              />
            </div>

            <div className="checkAndForgotPassword">
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={event => setRemember(event.target.checked)} 
                />
                <label className="nameInput">Lembrar-me</label>
              </div>
              <Link to="/forgot" className="toForgotPassword">Esqueci minha senha</Link>
            </div>

          <button className="submit" type="submit">
            Entrar
          </button>
          </fieldset>
        </form>
      </main>
    </div>
  )
}

export default Login;
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowRight, FiPlus, FiPower } from 'react-icons/fi'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import api from '../services/api'

import mapMarkerImg from '../images/map-marker.svg'
import MapIcon from '../utils/mapIcon'

import '../styles/pages/orphanages-map.css'

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

interface User {
  id: number
  name: string
  email: string
}

function OrphanagesMap() {
	const history = useHistory()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)
  const [user, setUser] = useState<User>()

  const Authorization = (localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization'))
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })
  }, [])

  useEffect(() => {
    if(Authorization) {
      api.get('Auth', {
				headers: {
					Authorization
				}
			}).then(response => {
        if(response.data === true) setTokenIsValid(true)
				return 
			}).catch(err => {
        localStorage.clear()
        sessionStorage.clear()
				return
			})
    } else {
      return
    }
	}, [Authorization, history])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  useEffect(() => {
    if(Authorization) {
      api.get('/users', {
        headers: {Authorization}
      }).then(response => {
        setUser(response.data)
      })
    } else {
      return
    }
  }, [Authorization])

  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    history.push('/')
  }
  
  return (
    <div id="page-map">
      {user ? (
        <div className="loginName">
          <Link className="toDashboardUserName" to="/dashboard">{user?.name}</Link>
          <button type="button" onClick={logout}>
            <FiPower size={24} color="#FFF" />
          </button>
        </div>
      ) : (
        <div className="loginName">
          <Link className="tologin" to="/login">Faça Login</Link>
        </div>
      )}

      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Belo Horizonte</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map center={initialPosition} zoom={15} style={{width: '100%', height: '100%'}}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {orphanages.map(orphanage => (
          <Marker key={orphanage.id} icon={MapIcon} position={[orphanage.latitude, orphanage.longitude]}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
      
      {tokenIsValid === true && (
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      )}
    </div>
  )
}

export default OrphanagesMap
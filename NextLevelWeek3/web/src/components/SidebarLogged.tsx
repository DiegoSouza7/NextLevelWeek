import React from 'react'
import { useHistory } from 'react-router-dom';
import { FiPower, FiAlertCircle, FiMapPin } from 'react-icons/fi'

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebarlogged.css'

interface Marker {
  marker?: string;
}

export default function SidebarLogged({ marker}: Marker) {
  const history = useHistory();

  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    history.push('/')
  }

  function toDashboard() {
    history.push('/dashboard')
  }

  function toPendingOrphanages() {
    history.push('/pending')
  }
  
  if(marker === 'dashboard') {
    return (
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />
  
        <div className="iconsMarkerAlert">
          <button className="alert" type="button" onClick={toDashboard}>
            <FiMapPin size={24} color="#FFF" />
          </button>
  
          <button type="button" onClick={toPendingOrphanages}>
            <FiAlertCircle size={24} color="#FFF" />
          </button>
        </div>
  
        <footer>
          <button type="button" onClick={logout}>
            <FiPower size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
  } else {
    return (
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />
  
        <div className="iconsMarkerAlert">
          <button type="button" onClick={toDashboard}>
            <FiMapPin size={24} color="#FFF" />
          </button>
  
          <button className="alert" type="button" onClick={toPendingOrphanages}>
            <FiAlertCircle size={24} color="#FFF" />
          </button>
        </div>
  
        <footer>
          <button type="button" onClick={logout}>
            <FiPower size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
  }
}
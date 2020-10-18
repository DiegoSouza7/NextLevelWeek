import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import SidebarLogged from '../components/SidebarLogged'
import { Map, Marker, TileLayer } from "react-leaflet";
import {AiOutlineDelete} from 'react-icons/ai'
import {RiPencilLine} from 'react-icons/ri'
import MapIcon from '../utils/mapIcon'
import api from '../services/api';

import '../styles/pages/dashboard.css'


interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}
export default function Dashboard() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const Authorization = (localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization'))
  const history = useHistory()

  useEffect(() => {
    if(Authorization) {
      api.get('Auth', {
				headers: {
					Authorization
				}
			}).then(response => {
        if(response.data === true) return 
			}).catch(err => {
        localStorage.clear()
        sessionStorage.clear()
				return history.push('/')
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
  
  return (
    <div className="dashboard">
      <SidebarLogged marker="dashboard" />
      <main>
        <div className="listOrphanages">
          {orphanages.map(orphanage => (
            <div className="orphanage" key={orphanage.id}>
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 227, borderRadius: 20 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker interactive={false} icon={MapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <div className="description">
                <span>{orphanage.name}</span>
                <div className="iconsEditDelete">
                  <button type="button" className="icon">
                    <RiPencilLine size={26} color="#15C3D6" />
                  </button>

                  <button className="icon">
                  <AiOutlineDelete size={26} color="#15C3D6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
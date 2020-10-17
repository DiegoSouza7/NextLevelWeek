import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';

import { useNavigation} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  useEffect(() => {
    async function loadPosition() {
      const {status} = await requestPermissionsAsync()
      
      if(status !== 'granted') {
        Alert.alert('Precisamos de sua permição para obter a localização.')
        return
      }

      const location = await getCurrentPositionAsync()
      const {latitude, longitude} = location.coords
      setInitialPosition([latitude, longitude])
    }

    loadPosition()
  }, [])

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      {initialPosition[0] !== 0 && (
        <MapView 
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ latitude: position.latitude, longitude: position.longitude }}
            />
          )}
        </MapView>
      )}
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
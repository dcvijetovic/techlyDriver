import { useRef, useEffect, useState } from 'react';
import { View, useWindowDimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';
import { useOrderContext } from '../../context/OrderContext';
import BottomSheetDetails from './BottomSheetDetails';
import CustomMarker from '../../components/CustomMarker';
import { DataStore } from 'aws-amplify';
import { Courier } from '../../models';
import { useAuthContext } from '../../context/AuthContext';

const OrderDeliveryScreen = () => {
  const { order, user, fetchOrder } = useOrderContext();
  const { dbCourier } = useAuthContext();

  const [driverLocation, setDriverLocation] = useState(null);
  const [deliveryDuration, setDeliveryDuration] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);

  const mapRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  useEffect(() => {
    if (!driverLocation) {
      return;
    }
    DataStore.save(
      Courier.copyOf(dbCourier, (update) => {
        updated.lat = driverLocation.latitude;
        updated.lng = driverLocation.longitude;
      })
    );
  }, [driverLocation]);

  useEffect(() => {
    const getDeliveryLocations = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === 'granted') {
        console.log('permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getDeliveryLocations();

    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 300, // decrese for higher accuracy
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    return foregroundSubscription;
  }, []);

  const driverFocus = () => {
    mapRef.current.animateToRegion({
      latitude: driverLocation.latitude,
      longitude: driverLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const shopLocation = {
    latitude: order?.Shop?.lat,
    longitude: order?.Shop?.lng,
  };
  const userLocation = {
    latitude: user?.lat,
    longitude: user?.lng,
  };

  if (!order || !user || !driverLocation) {
    return <ActivityIndicator size={'large'} color="gray" top={50} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ width, height }}
        showsUserLocation
        followUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            order.status === 'ACCEPTED' ? shopLocation : userLocation
          }
          strokeWidth={8}
          waypoints={order.status === 'READY_FOR_PICKUP' ? [shopLocation] : []}
          strokeColor="#3fc060"
          apikey={'AIzaSyAM_2sQVTSb-HP_CkFpRL5Nv6p_6eQTKKs'}
          onReady={(result) => {
            setDeliveryDuration(result.duration);
            setDeliveryDistance(result.distance);
          }}
        />

        <CustomMarker data={order.Shop} type="SHOP" />

        <CustomMarker data={user} type="USER" />
      </MapView>

      <BottomSheetDetails
        deliveryDistance={deliveryDistance}
        deliveryDuration={deliveryDuration}
        onAccept={driverFocus}
      />

      {order.status === 'READY_FOR_PICKUP' && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={50}
          color="black"
          style={{ top: 50, left: 20, position: 'absolute' }}
        />
      )}
    </View>
  );
};

export default OrderDeliveryScreen;

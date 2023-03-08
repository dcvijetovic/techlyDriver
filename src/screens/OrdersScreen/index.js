import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import OrderItem from '../../components/OrderItem';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Order } from '../../models';
import { DataStore } from 'aws-amplify';
import CustomMarker from '../../components/CustomMarker';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [driverLocation, setDriverLocation] = useState(null);

  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const snapPoints = useMemo(() => ['12%', '95%'], []);

  const fetchOrders = () => {
    DataStore.query(Order, (order) =>
      order.or((orderStatus) =>
      orderStatus
        // .order_status('eq', 'NEW')
        .order_status('eq', 'STORE_ACCEPTED')
        .order_status('eq', 'STORE_READY')
        // .order_status('eq', 'USER_PICKUP')
        // .order_status('eq', 'USER_PICKED_UP')
        // .order_status('eq', 'STORE_QUEUED')
        // .order_status('eq', 'STORE_INPROGRESS')
        // .order_status('eq', 'STORE_PROBLEM')
        // .order_status('eq', 'STORE_READY')
    )
).then(setOrders)
    
  };

  useEffect(() => {
    fetchOrders();

    const subscription = DataStore.observe(Order).subscribe((msg) => {
      if (msg.opType === 'UPDATE') {
        fetchOrders();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
  }, []);

  if (!driverLocation) {
    return <ActivityIndicator size={'large'} color="gray" top={50} />;
  }

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <MapView
        style={{
          height,
          width,
        }}
        showsUserLocation
        followUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        {orders.map((order) => (
          <CustomMarker key={order.id} data={order.Business} type="SHOP" />
        ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              letterSpacing: 0.5,
              paddingBottom: 5,
            }}
          >
            You're Online
          </Text>
          <Text style={{ color: '#666' }}>
            Available Orders: {orders.length}
          </Text>
        </View>
        <BottomSheetFlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </View>
  );
};

export default OrdersScreen;

import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import styles from './styles';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigation } from '@react-navigation/native';

const BUTTON_TITLE = {
  // STORE_READY: 'Accept Order',
  USER_READY: 'Accept Order',
  USER_PICKEDUP: 'Complete Delivery',
  STORE_READY: 'Accept order',
  STORE_PICKEDUP: 'Complete Delivery',
};

const BottomSheetDetails = (props) => {
  const { deliveryDistance, deliveryDuration, onAccept } = props;
  const driverClose = deliveryDistance <= 0.7; // decrese for higher accuracy

  const { order, user, products, acceptOrder, completeOrder, pickUpOrder } =
    useOrderContext();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['12%', '95%'], []);

  const navigation = useNavigation()

  const onButtonPress = async () => {
    const { order_status } = order;
    if (order_status === 'STORE_ACCEPTED') {
      bottomSheetRef.current?.collapse();
      await acceptOrder()
      onAccept();
    }
    else if (order_status === 'STORE_READY'){
      bottomSheetRef.current?.collapse();
      await acceptOrder()
      onAccept();
    }
    else if (order_status === 'USER_PICKUP') {
      bottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    else if (order_status === 'USER_PICKEDUP') {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
    else if (order_status === 'STORE_PICKUP'){
      bottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    else if (order_status === 'STORE_PICKEDUP') {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const disableButton = () => {
    const { order_status } = order;
    if (order_status === 'USER_READY' || 'STORE_READY') {
      return false;
    }
    if ((order_status === 'USER_PICKUP' || order_status === 'USER_PICKEDUP') && driverClose) {
      return false;
    }
    return true;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View style={styles.handleIndicatorContainer}>
        <Text style={styles.routeDetailsText}>
          {deliveryDuration.toFixed(0)} min
        </Text>
        {/* <FontAwsome5 name="shopping-bag" size={30} color="#3FC060" /> */}
        <Text style={styles.routeDetailsText}>
          {deliveryDistance.toFixed(2)} km
        </Text>
      </View>
      <View style={styles.deliveryDetailsContainer}>
        {/* <Text style={styles.shopName}>Pickup: {order?.Business?.name}</Text> */}
        <View style={styles.addressContainer}>
          <Fontisto name="shopping-store" size={22} color="#666" />
          <Text style={styles.addressText}>Pickup address: {order?.Business?.address}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Delivery address: {user?.address}</Text>
        </View>
        <View>
          <Text>{order.order_status}</Text>
        </View>

        <View style={styles.orderDetailsContainer}>
          {products?.map((product) => (
            <Text style={styles.orderItemText} key={product.id}>
              {product?.Product?.name} x{product?.quantity}
            </Text>
          ))}
        </View>
      </View>
      <Pressable
        onPress={onButtonPress}
        disabled={disableButton()}
        style={{
          ...styles.buttonContainer,
          backgroundColor: disableButton() ? '#666' : '#3FC060',
        }}
      >
        <Text style={styles.buttonText}>{BUTTON_TITLE[order.order_status]}</Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;

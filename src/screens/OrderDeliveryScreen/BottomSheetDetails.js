import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import styles from './styles';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigation } from '@react-navigation/native';

const BUTTON_TITLE = {
  READY_FOR_PICKUP: 'Accept Order',
  ACCEPTED: 'Pick-up order',
  PICKED_UP: 'Complete Delivery',
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
    const { status } = order;
    if (status === 'READY_FOR_PICKUP') {
      bottomSheetRef.current?.collapse();
      await acceptOrder()
      onAccept();
    }
    else if (status === 'ACCEPTED') {
      bottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    else if (status === 'PICKED_UP') {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const disableButton = () => {
    const { status } = order;
    if (status === 'READY_FOR_PICKUP') {
      return false;
    }
    if ((status === 'ACCEPTED' || status === 'PICKED_UP') && driverClose) {
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
        <Text style={styles.shopName}>{order.Shop.name}</Text>
        <View style={styles.addressContainer}>
          <Fontisto name="shopping-store" size={22} color="#666" />
          <Text style={styles.addressText}>{order.Shop.address}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{user?.address}</Text>
        </View>

        <View style={styles.orderDetailsContainer}>
          {products?.map((product) => (
            <Text style={styles.orderItemText} key={product.id}>
              {product.Product.name} x{product.quantity}
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
        <Text style={styles.buttonText}>{BUTTON_TITLE[order.status]}</Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;

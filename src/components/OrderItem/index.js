import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';

const OrderItem = ({ order }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User, order?.userID).then(setUser);
  }, []);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        margin: 10,
        borderColor: '#3fc060',
        borderWidth: 2,
        borderRadius: 12,
      }}
      onPress={() =>
        navigation.navigate('OrderDeliveryScreen', { id: order.id })
      }
    >
      {/* <Image
        source={{ uri: order?.Business?.image }}
        style={{
          width: '25%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      /> */}
      <View style={{ flex: 1, marginLeft: 10, paddingVertical: 5 }}>
        <Text style={{ marginVertical: 5 }}>
          {order?.order_status === 'STORE_ACCEPTED' && (
            <Text>Customer pickup address:</Text>
          )}
          {order?.order_status === 'STORE_READY'  && (
            <Text>Store pickup: {order?.Business?.name}</Text>
          )}
        </Text>
        <Text style={{ color: '#666', marginBottom: 10 }}>
          {order?.order_status === 'STORE_ACCEPTED' && (
            
            <Text>{user?.first_name} {user?.last_name}, {user?.address}</Text>
          )}
          {order?.order_status === 'STORE_READY'  && (
            <Text>{order?.Business?.address}</Text>
          )}
        </Text>
        {/* <Text>{order?.order_status}</Text> */}
        <Text style={{ marginVertical: 5 }}>Delivery address:</Text>
        {order?.order_status === 'STORE_ACCEPTED' && (<Text style={{ color: '#666', marginBottom: 5 }}>{order?.Business?.name}</Text>)} 
        {order?.order_status === 'STORE_ACCEPTED' && (<Text style={{ color: '#666', marginBottom: 5 }}>{order?.Business?.address}</Text>)}

        {order?.order_status === 'STORE_READY'  && (<Text style={{ color: '#666', marginBottom: 5 }}>{user?.first_name} {user?.last_name}</Text>)} 
        {order?.order_status === 'STORE_READY'  && (<Text style={{ color: '#666', marginBottom: 5 }}>{user?.address}</Text>)}
      </View>
      <View
        style={{
          backgroundColor: '#3fc060',
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
        }}
      >
        <Entypo
          name="check"
          size={30}
          color="white"
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </Pressable>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';

const OrderItem = ({ order }) => {
  const [user, setUser] = useState(null)
  const navigation = useNavigation();

  useEffect(()=> {
    DataStore.query(User, order.userID).then(setUser)
  }, [])

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
      <Image
        source={{ uri: order.Shop.image }}
        style={{
          width: '25%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <View style={{ flex: 1, marginLeft: 10, paddingVertical: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {order.Shop.name}
        </Text>
        <Text style={{ color: '#666' }}>{order.Shop.address}</Text>

        <Text style={{ marginTop: 10 }}>Delivery Details:</Text>
        <Text style={{ color: '#666' }}>{user?.name}</Text>
        <Text style={{ color: '#666' }}>{user?.address}</Text>
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

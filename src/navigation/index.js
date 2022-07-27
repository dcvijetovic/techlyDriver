import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDeliveryScreen from '../screens/OrderDeliveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { dbCourier, loading } = useAuthContext();

  if (loading) {
    return <ActivityIndicator size={'large'} color="gray" top={50} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbCourier ? (
        <>
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen
            name="OrderDeliveryScreen"
            component={OrderDeliveryScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;

import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import AuthContextProvider from './src/context/AuthContext';
import OrderContextProvider from './src/context/OrderContext';
import {LogBox} from 'react-native'

YellowBox.ignoreLogs(['Setting a timer'])

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthContextProvider>
          <OrderContextProvider>
          <Navigation />
          </OrderContextProvider>
        </AuthContextProvider>

        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default withAuthenticator(App);

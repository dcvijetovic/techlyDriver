import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, DataStore } from 'aws-amplify';
import { Courier, TransportationModes } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

import { MateralIcons, FontAwsome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { dbCourier, sub, setdbCourier } = useAuthContext();

  const [name, setName] = useState(dbCourier?.name || '');
  // const [transportationMode, setTransportationMode] = useState(
  //   TransportationModes.DRIVING
  // );

  const navigation = useNavigation();

  const onSave = async () => {
    if (dbCourier) {
      await updateCourier();
    } else {
      await createCourier();
    }
    navigation.goBack();
  };

  const updateCourier = async () => {
    const courier = await DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.name = name;
        // updated.transportationMode = transportationMode;
      })
    );
    setdbCourier(courier);
  };

  const createCourier = async () => {
    try {
      const courier = await DataStore.save(
        new Courier({
          name,
          sub,
          // transportationMode,
        })
      );
      setdbCourier(courier);
    } catch (err) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.BICYCLING)}
          style={{
            backgroundColor:
              transportationMode === TransportationModes.BICYCLING
                ? '#3fc060'
                : 'white',
            margin: 10,
            padding: 10,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color:
                transportationMode === TransportationModes.BICYCLING
                  ? 'white'
                  : 'black',
              fontSize: 40,
            }}
          >
            Bike
          </Text>
          <MateralIcons name="pedal-bike" size={40} color="white" />
        </Pressable>
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.DRIVING)}
          style={{
            backgroundColor:
              transportationMode === TransportationModes.DRIVING
                ? '#3fc060'
                : 'white',
            margin: 10,
            padding: 10,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color:
                transportationMode === TransportationModes.DRIVING
                  ? 'white'
                  : 'black',
              fontSize: 40,
            }}
          >
            Car
          </Text>
          {/* <FontAwsome5 name="car" size={40} color="white" /> 
        </Pressable>
      </View> */}

      <Button onPress={onSave} title="Save" />
      <Button onPress={() => Auth.signOut()} title="Logout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
});

export default ProfileScreen;

import { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CustomMarker = ({ data, type }) => {
  return (
    <Marker
      coordinate={{ latitude: data?.lat, longitude: data?.lng }}
      title={data?.name}
      description={data?.address}
    >
      <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 50 }}>
        {
          type === 'SHOP' ? (
            <Entypo name="shop" size={24} color="#fff" />
          ) : (
            <Entypo name="shop" size={24} color="#fff" />
          ) 
        }
      </View>
    </Marker>
  );
};

export default CustomMarker;

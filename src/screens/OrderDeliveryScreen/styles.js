import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: '#666',
    width: 100,
  },
  handleIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  routeDetailsText: { fontSize: 25, letterSpacing: 1, marginHorizontal: 10 },
  deliveryDetailsContainer: { paddingHorizontal: 20 },
  shopName: { fontSize: 25, paddingVertical: 20 },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  addressText: {
    fontSize: 20,
    color: '#666',
    marginLeft: 15,
  },
  orderDetailsContainer: {
    borderTopWidth: 1,
    borderColor: '#d6d6d6',
    paddingTop: 20,
  },
  orderItemText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    paddingVertical: 15,
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

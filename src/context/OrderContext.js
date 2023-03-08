import { Auth, DataStore } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { Courier, Order, User, OrderItems } from '../models';
import { useAuthContext } from './AuthContext';

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [products, setProducts] = useState();

  const fetchOrder = async (id) => {
    if (!id) {
      setOrder(null);
      return;
    }
    const fetchedOrder = await DataStore.query(Order, id);
    setOrder(fetchedOrder);

    DataStore.query(User, fetchedOrder.userID).then(setUser);

    DataStore.query(OrderItems, (oi) =>
      oi.orderID('eq', fetchedOrder.id)
    ).then(setProducts);
  };

  useEffect(() => {
    if (!order) {
      return;
    }

    const subscription = DataStore.observe(Order, order.id).subscribe(
      ({ opType, element }) => {
        if (opType === 'UPDATE') {
          fetchOrder(element.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [order?.id]);

  const acceptOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.order_status = 'STORE_ACCEPTED' || 'STORE_READY';
        updated.Courier = dbCourier;
      })
    );
    setOrder(updatedOrder);
  };

  const pickUpOrder = async () => {
    // update order, change status, assign courier
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.order_status = 'PICKED_UP';
      })
    );
    setOrder(updatedOrder);
  };

  const completeOrder = async () => {
    // update order, change status
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.order_status = 'COMPLETED';
      })
    );
    setOrder(updatedOrder);
  };

  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        order,
        user,
        products,
        fetchOrder,
        pickUpOrder,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);

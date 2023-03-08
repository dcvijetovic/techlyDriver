// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ProductAvailable = {
  "AVAILABLE": "AVAILABLE",
  "OUT_OF_STOCK": "OUT_OF_STOCK"
};

const CourierOnline = {
  "ONLINE": "ONLINE",
  "OFFLINE": "OFFLINE"
};

const BusinessOnline = {
  "ONLINE": "ONLINE",
  "OFFLINE": "OFFLINE",
  "BUSY": "BUSY"
};

const OrderStatus = {
  "NEW": "NEW",
  "STORE_ACCEPTED": "STORE_ACCEPTED",
  "STORE_DECLINED": "STORE_DECLINED",
  "USER_PICKUP": "USER_PICKUP",
  "USER_PICKEDUP": "USER_PICKEDUP",
  "STORE_QUEUED": "STORE_QUEUED",
  "STORE_INPROGRESS": "STORE_INPROGRESS",
  "STORE_PROBLEM": "STORE_PROBLEM",
  "STORE_READY": "STORE_READY",
  "STORE_PICKUP": "STORE_PICKUP",
  "STORE_PICKEDUP": "STORE_PICKEDUP",
  "DELIVERED": "DELIVERED"
};

const { OrderItems, Product, ShoppingSession, CartItem, Courier, Order, Business, DeliveryFee, ServiceFee, User } = initSchema(schema);

export {
  OrderItems,
  Product,
  ShoppingSession,
  CartItem,
  Courier,
  Order,
  Business,
  DeliveryFee,
  ServiceFee,
  User,
  ProductAvailable,
  CourierOnline,
  BusinessOnline,
  OrderStatus
};
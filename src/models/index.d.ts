import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum ProductAvailable {
  AVAILABLE = "AVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK"
}

export enum CourierOnline {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE"
}

export enum BusinessOnline {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BUSY = "BUSY"
}

export enum OrderStatus {
  NEW = "NEW",
  STORE_ACCEPTED = "STORE_ACCEPTED",
  STORE_DECLINED = "STORE_DECLINED",
  USER_PICKUP = "USER_PICKUP",
  USER_PICKEDUP = "USER_PICKEDUP",
  STORE_QUEUED = "STORE_QUEUED",
  STORE_INPROGRESS = "STORE_INPROGRESS",
  STORE_PROBLEM = "STORE_PROBLEM",
  STORE_READY = "STORE_READY",
  STORE_PICKUP = "STORE_PICKUP",
  STORE_PICKEDUP = "STORE_PICKEDUP",
  DELIVERED = "DELIVERED"
}

type OrderItemsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShoppingSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourierMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DeliveryFeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ServiceFeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class OrderItems {
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderItemsProductId?: string | null;
  constructor(init: ModelInit<OrderItems, OrderItemsMetaData>);
  static copyOf(source: OrderItems, mutator: (draft: MutableModel<OrderItems, OrderItemsMetaData>) => MutableModel<OrderItems, OrderItemsMetaData> | void): OrderItems;
}

export declare class Product {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image: string;
  readonly SKU: string;
  readonly price: number;
  readonly businessID: string;
  readonly available?: ProductAvailable | keyof typeof ProductAvailable | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class ShoppingSession {
  readonly id: string;
  readonly CartItems?: (CartItem | null)[] | null;
  readonly userID: string;
  readonly businessID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShoppingSession, ShoppingSessionMetaData>);
  static copyOf(source: ShoppingSession, mutator: (draft: MutableModel<ShoppingSession, ShoppingSessionMetaData>) => MutableModel<ShoppingSession, ShoppingSessionMetaData> | void): ShoppingSession;
}

export declare class CartItem {
  readonly id: string;
  readonly quantity: number;
  readonly shoppingsessionID: string;
  readonly Product?: Product | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartItemProductId?: string | null;
  constructor(init: ModelInit<CartItem, CartItemMetaData>);
  static copyOf(source: CartItem, mutator: (draft: MutableModel<CartItem, CartItemMetaData>) => MutableModel<CartItem, CartItemMetaData> | void): CartItem;
}

export declare class Courier {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly sub: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly available?: CourierOnline | keyof typeof CourierOnline | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Courier, CourierMetaData>);
  static copyOf(source: Courier, mutator: (draft: MutableModel<Courier, CourierMetaData>) => MutableModel<Courier, CourierMetaData> | void): Courier;
}

export declare class Order {
  readonly id: string;
  readonly total: number;
  readonly user_notes?: string | null;
  readonly order_status: OrderStatus | keyof typeof OrderStatus;
  readonly payment_status?: string | null;
  readonly userID: string;
  readonly Business?: Business | null;
  readonly OrderItems?: (OrderItems | null)[] | null;
  readonly Courier?: Courier | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderBusinessId?: string | null;
  readonly orderCourierId?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class Business {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly image: string;
  readonly adminSub: string;
  readonly phone: string;
  readonly email: string;
  readonly website?: string | null;
  readonly description: string;
  readonly business_hours?: string | null;
  readonly delivery_time_min?: number | null;
  readonly delivery_time_max?: number | null;
  readonly Products?: (Product | null)[] | null;
  readonly ShoppingSessions?: (ShoppingSession | null)[] | null;
  readonly available?: BusinessOnline | keyof typeof BusinessOnline | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(source: Business, mutator: (draft: MutableModel<Business, BusinessMetaData>) => MutableModel<Business, BusinessMetaData> | void): Business;
}

export declare class DeliveryFee {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<DeliveryFee, DeliveryFeeMetaData>);
  static copyOf(source: DeliveryFee, mutator: (draft: MutableModel<DeliveryFee, DeliveryFeeMetaData>) => MutableModel<DeliveryFee, DeliveryFeeMetaData> | void): DeliveryFee;
}

export declare class ServiceFee {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ServiceFee, ServiceFeeMetaData>);
  static copyOf(source: ServiceFee, mutator: (draft: MutableModel<ServiceFee, ServiceFeeMetaData>) => MutableModel<ServiceFee, ServiceFeeMetaData> | void): ServiceFee;
}

export declare class User {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly phone: string;
  readonly sub: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly address_details?: string | null;
  readonly courier_notes?: string | null;
  readonly ShoppingSessions?: (ShoppingSession | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
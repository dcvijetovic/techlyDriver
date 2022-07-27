import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NEW = "NEW",
  COOKING = "COOKING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}



type CartProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourierMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CartProduct {
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartProductProductId?: string | null;
  constructor(init: ModelInit<CartProduct, CartProductMetaData>);
  static copyOf(source: CartProduct, mutator: (draft: MutableModel<CartProduct, CartProductMetaData>) => MutableModel<CartProduct, CartProductMetaData> | void): CartProduct;
}

export declare class Product {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly shortDescription?: string | null;
  readonly price: number;
  readonly shopID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class OrderProduct {
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
  constructor(init: ModelInit<OrderProduct, OrderProductMetaData>);
  static copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct, OrderProductMetaData>) => MutableModel<OrderProduct, OrderProductMetaData> | void): OrderProduct;
}

export declare class Courier {
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly transportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Courier, CourierMetaData>);
  static copyOf(source: Courier, mutator: (draft: MutableModel<Courier, CourierMetaData>) => MutableModel<Courier, CourierMetaData> | void): Courier;
}

export declare class Cart {
  readonly id: string;
  readonly shopID: string;
  readonly userID: string;
  readonly CartProducts?: (CartProduct | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Cart, CartMetaData>);
  static copyOf(source: Cart, mutator: (draft: MutableModel<Cart, CartMetaData>) => MutableModel<Cart, CartMetaData> | void): Cart;
}

export declare class Order {
  readonly id: string;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly userID: string;
  readonly Shop?: Shop | null;
  readonly OrderProducts?: (OrderProduct | null)[] | null;
  readonly Courier?: Courier | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderShopId?: string | null;
  readonly orderCourierId?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class Shop {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee?: number | null;
  readonly minDeliveryTime?: number | null;
  readonly maxDeliveryTime?: number | null;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly lng?: number | null;
  readonly Products?: (Product | null)[] | null;
  readonly Carts?: (Cart | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Shop, ShopMetaData>);
  static copyOf(source: Shop, mutator: (draft: MutableModel<Shop, ShopMetaData>) => MutableModel<Shop, ShopMetaData> | void): Shop;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly sub: string;
  readonly Orders?: (Order | null)[] | null;
  readonly Carts?: (Cart | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
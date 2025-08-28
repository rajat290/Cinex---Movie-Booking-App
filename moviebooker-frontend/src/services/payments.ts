import { api } from './api';

export type CreateOrderRequest = {
  bookingId: string;
  paymentMethod?: 'upi' | 'card' | 'netbanking';
};

export type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
  booking: {
    id: string;
    bookingId: string;
    movie: string;
    theatre: string;
    seats: string[];
    finalAmount: number;
  };
};

export type VerifyPaymentRequest = {
  orderId: string;
  paymentId: string;
  signature: string;
};

export type VerifyPaymentResponse = {
  message: string;
  booking: {
    id: string;
    bookingId: string;
    status: string;
    paymentStatus: string;
  };
};

export async function createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
  const { data } = await api.post<CreateOrderResponse>('/payments/create-order', orderData);
  return data;
}

export async function verifyPayment(paymentData: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
  const { data } = await api.post<VerifyPaymentResponse>('/payments/verify', paymentData);
  return data;
}

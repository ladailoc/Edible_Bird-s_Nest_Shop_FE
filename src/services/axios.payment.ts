// import  from "~/types/order";
import axios from "./axios.customize";

const URL = "api/v1/ecommerce/payment";

export const paymentApi = {
  // Thêm order
  createPayment(orderCode: string) {
    return axios.post(`${URL}/${orderCode}`);
  },
  // Tạo đơn hàng VNPay
  createVnPayPayment(order: any) {
    return axios.post(`${URL}/vnpay`, order).then((res) => res.data);
  },
  // Tạo đơn hàng Momo
  createMomoPayment(order: any) {
    return axios.post(`${URL}/momo`, order).then((res) => res.data);
  },
  // Xác thực thanh toán VNPay
  ProcessPaymentResponse(queryParams: any) {
    console.log("Processing payment response with query params:", queryParams);

    return axios
      .get(`${URL}/vnpay-return`, { params: queryParams })
      .then((res) => res.data);
  },
  // lấy thông tin thanh toán theo mã đơn hàng
  getPaymentByOrderId(orderId: string) {
    return axios.get(`${URL}/${orderId}`).then((res) => res.data);
  },
};

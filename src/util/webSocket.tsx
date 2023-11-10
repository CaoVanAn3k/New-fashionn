// import { updateCart } from '../redux/Cart/cart';
// import { useAppDispatch } from '../redux/store';
// import { io } from 'socket.io-client';
// export const socket = new w3cwebsocket('wss://localhost:8087', 'ws');
// const socket = io('http://localhost:8088');
// socket.on('connect', () => {
//     console.log('Connected to WebSocket');
// });
// const updateCartByUserName = (userName: string) => {
//     socket.emit('/cart/updateCart', userName);
// };
// socket.on('/topic/cart', (response) => {
//     // Xử lý thông báo cập nhật giỏ hàng
//     const dispatch = useAppDispatch();
//     dispatch(updateCart(response));
// });
// socket.on('disconnect', () => {
//     console.log('disconnect to WebSocket');
// });
// const WebSocket = {
//     updateCartByUserName,
//     socket,
// };

export default WebSocket;

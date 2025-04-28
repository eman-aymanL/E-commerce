import { useContext, useEffect, useState } from "react";
import { authContext } from './../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartContext } from './../../Context/CartContext';

export default function AllOrders() {
  const { userData } = useContext(authContext);
  const { cartId } = useContext(cartContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData) {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
        .then((res) => {
          setOrders(res.data);
          const savedConfirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || {};
          setConfirmedOrders(savedConfirmedOrders);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [userData]);

  function handleConfirm(orderId) {
    const updated = { ...confirmedOrders, [orderId]: true };
    setConfirmedOrders(updated);
    localStorage.setItem("confirmedOrders", JSON.stringify(updated));
  }

  return (
    <div className="mx-auto p-8 min-h-screen bg-gray-50" id="hero">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        <i className="text-cyan-700 fa-2 mx-3 fa-solid fa-bag-shopping"></i> My Orders
      </h2>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order, index) => {
            const isConfirmed = confirmedOrders[order._id];
            return (
              <div
                key={order._id}
                className={`transition-shadow duration-300 rounded-xl p-6 border ${
                  isConfirmed
                    ? 'bg-gray-300 text-gray-500 pointer-events-none'
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <h3 className="text-lg font-bold text-cyan-700 mb-3">Order #{index + 1}</h3>
                <p className="mb-2"><span className="font-semibold">Date of order:</span> {order.createdAt.split("T")[0]}</p>
                <p className="mb-2"><span className="font-semibold">Address:</span> {order.shippingAddress.city}</p>
                <p className="mb-2"><span className="font-semibold">Order details:</span> {order.shippingAddress.details}</p>
                <p className="mb-2"><span className="font-semibold">Phone:</span> {order.shippingAddress.phone}</p>
                <p className="font-semibold text-lg">
                  Total Price: <span className="text-green-600">${order.totalOrderPrice}</span>
                </p>

                <button
                  className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold text-white ${
                    isConfirmed ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-800'
                  }`}
                  disabled={isConfirmed}
                  onClick={() => handleConfirm(order._id)}
                >
                  {isConfirmed ? 'Received' : 'Recieved'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Loading orders...</p>
      )}

      {message && <h3 className="text-green-600 text-center mt-6 text-2xl">{message}</h3>}
    </div>
  );
}

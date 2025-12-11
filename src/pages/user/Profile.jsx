import React, { useEffect, useState } from "react";
import userService from "../../services/user/UserService";
import OrderService from "../../services/order/OrderService";
import UserCard from "../../components/card/UserCard";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import OrderHistory from "../../components/card/OrderHistory";
import { contactData } from "./data/UserData";
import { getUserIdFromToken } from "../../utils/JwtUtil";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("profile");
  const [orders, setOrders] = useState([]);

  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();
      setProfile(res);
    } catch (err) {
      console.error("Error cargando perfil", err);
    }
  };

  const loadOrders = async () => {
    try {
      const userId = getUserIdFromToken();
      
      if (!userId) {
        console.error("Error: No se pudo obtener el userId del token");
        setOrders([]);
        return;
      }

      const res = await OrderService.getAllOrders();
      
      if (!res.data || !Array.isArray(res.data)) {
        console.warn("Error: La respuesta no contiene un array de órdenes");
        setOrders([]);
        return;
      }
      const userIdStr = String(userId);
      const userOrders = res.data.filter(order => {
        const orderUserId = order.user?.id || order.userId;
        const orderUserIdStr = String(orderUserId);

        return orderUserIdStr === userIdStr;
      });

      setOrders(userOrders);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile && view === "orders") {
      loadOrders();
    }
  }, [view, profile]);

  if (!profile) return <p className="text-white">Cargando...</p>;

  return (
    <ProfileLayout 
      onChangeView={setView} 
      currentView={view}
    >
      {view === "profile" && (
        <UserCard profile={profile} fields={contactData} reloadProfile={loadProfile} />
      )}

      {view === "orders" && (
        <OrderHistory orders={orders} />
      )}
    </ProfileLayout>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import userService from "../../services/user/UserService";
import OrderService from "../../services/order/OrderService";
import UserCard from "../../components/card/UserCard";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import OrderHistory from "../../components/card/OrderHistory";
import { contactData } from "./data/UserData";

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
      const res = await OrderService.getAllOrders();
      const userOrders = res.data.filter(o => o.userId === profile.id);
      setOrders(userOrders);
    } catch (err) {
      console.error("Error cargando pedidos", err);
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

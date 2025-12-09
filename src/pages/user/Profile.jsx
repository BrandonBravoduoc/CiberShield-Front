import React, { useEffect, useState } from "react";
import userService from "../../services/user/UserService";
import UserCard from "../../components/card/UserCard";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import { contactData } from "./data/UserData";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();
      setProfile(res);
    } catch (err) {
      console.error("Error cargando perfil", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) return <p className="text-white">Cargando...</p>;

  return (
    <ProfileLayout>
      <UserCard
        profile={profile}
        fields={contactData}
        reloadProfile={loadProfile}
      />
    </ProfileLayout>
  );
};

export default Profile;

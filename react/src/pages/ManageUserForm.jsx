/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function ManageUserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // If we are in "Editing" mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then((response) => {
          setLoading(false);
          setUser(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return <div>ManageUserForm</div>;
}

export default ManageUserForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config.js';

export default function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/chat/getUserProfile`, {
          withCredentials: true
        });
        setAllUsers(response.data.allUser);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

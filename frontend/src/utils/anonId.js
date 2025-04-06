// src/utils/anonId.js
import { getAuth } from "firebase/auth";

export const getUserId = () => {
  const authUser = getAuth().currentUser;
  if (authUser) return authUser.uid;

  let anonId = localStorage.getItem("anon_id");
  if (!anonId) {
    anonId = "anon_" + Math.random().toString(36).substring(2, 12);
    localStorage.setItem("anon_id", anonId);
  }
  return anonId;
};
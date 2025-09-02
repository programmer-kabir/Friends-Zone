"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export { toast };

export default function ToastProvider() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}

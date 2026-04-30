import React from "react";
import { FaSpinner } from "react-icons/fa6";

export default function loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-50">
      <FaSpinner className="animate-spin text-5xl text-global" />
    </div>
  );
}

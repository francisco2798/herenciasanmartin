"use client";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "123") {
      document.cookie = "admin-auth=true; path=/";
      window.location.href = "/admin";
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleLogin} className="bg-primary text-white px-4 py-2">
        Entrar
      </button>
    </div>
  );
}
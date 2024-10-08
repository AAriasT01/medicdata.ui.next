"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { LoginUser } from "@/services/users";

import { LoginFormValidator } from "@/utils/utils";

import ErrorListNotification from "@/components/ErrorListNotification";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameU, setName] = useState("");
  const [warningMessage, setWarningMessage] = useState([]);

  // Limpiar localStorage
  useEffect(() => {
    console.log("Cleaning localStorage");
    localStorage.removeItem("token");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const warnings = LoginFormValidator(email, password, "nombre");

    if (warnings.length === 0) {
      LoginUser({
        email: email,
        password: password,
        name: nameU,
      })
        .then((response) => {
          if (response.error) {
            setWarningMessage([response.error]);
          } else {
            if (response.activo === 0) {
              router.push("/login/activate"); // Redirigir a /login/activate si activo es 0
            } else {
              localStorage.setItem("token", response.idToken);
              localStorage.setItem("userEmail", email);
              router.push("/");
            }
          }
        })
        .catch((error) => {
          setWarningMessage([
            "Network response was not ok",
            "User or password incorrect",
          ]);
        });
    } else {
      setWarningMessage(warnings);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-green-200 to-blue-200">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="bg-white py-12 px-4 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6 pb-10">
            <div className="flex justify-center mb-3">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.333 0 2.667-.444 4-1.333C17.333 8.444 18 7.778 18 7c0-1.333-.444-2-1.333-2.667C16 3.778 15.333 3 14.667 3h-5.334C8.667 3 8 3.778 7.333 4.333 6.444 5.111 6 5.778 6 7c0 .778.667 1.444 2 2.667C9.333 10.556 10.667 11 12 11zm0 0c-2.667 0-5.333.667-8 2-1.333.667-2 1.778-2 3.333C2 17.778 2.889 18 4 18h16c1.111 0 2-.222 2-1.667 0-1.556-.667-2.667-2-3.333-2.667-1.333-5.333-2-8-2z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Inicio de Sesión
            </h2>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-7">
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m4-4v8m-9 4h18"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="ml-2 bg-gray-100 border-none outline-none w-full"
                />
              </div>
            </div>
            <div className="mb-9">
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.333 0 2.667-.444 4-1.333C17.333 8.444 18 7.778 18 7c0-1.333-.444-2-1.333-2.667C16 3.778 15.333 3 14.667 3h-5.334C8.667 3 8 3.778 7.333 4.333 6.444 5.111 6 5.778 6 7c0 .778.667 1.444 2 2.667C9.333 10.556 10.667 11 12 11zm0 0c-2.667 0-5.333.667-8 2-1.333.667-2 1.778-2 3.333C2 17.778 2.889 18 4 18h16c1.111 0 2-.222 2-1.667 0-1.556-.667-2.667-2-3.333-2.667-1.333-5.333-2-8-2z"
                  ></path>
                </svg>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="ml-2 bg-gray-100 border-none outline-none w-full"
                />
              </div>
            </div>
            {warningMessage.length > 0 && (
              <div className="text-red-500 text-center mb-4">
                {warningMessage.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Iniciar sesión
            </button>
            <div className="flex justify-between items-center mt-9 text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" /> Permanecer Conectado
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

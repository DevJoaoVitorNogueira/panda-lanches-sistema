import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import api from "../../../axiosConfig";

interface Client {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
}

export const SeeLogin = (): JSX.Element => {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data } = await api.get(`client=get/${id}`);
        setClient(data.data);
      } catch (err) {
        setMessage("Erro ao carregar cliente.");
        console.error("Erro ao carregar cliente:", err);
      }
    };

    fetchClient();
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <div className="flex items-center justify-between w-full max-w-6xl mb-6">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 font-bold flex items-center"
          >
            Voltar
          </button>
        </div>
        <h1 className="text-xl lg:text-3xl font-bold mb-6">
          Detalhes do Cliente
        </h1>
        {message && (
          <div
            className={`mb-4 p-4 border-2 rounded ${
              message.includes("sucesso")
                ? "bg-green-200 border-green-400 text-green-800"
                : "bg-red-200 border-red-400 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        {client ? (
          <div className="border-2 border-black bg-white p-4 rounded shadow-md w-full max-w-4xl">
            <p className="font-bold">
              Primeiro Nome: <span className="font-normal">{client.name}</span>
            </p>
            <p className="font-bold">
              Último Nome:{" "}
              <span className="font-normal">{client.last_name}</span>
            </p>
            <p className="font-bold">
              Email: <span className="font-normal">{client.email}</span>
            </p>
            <p className="font-bold">
              Telefone: <span className="font-normal">{client.phone}</span>
            </p>
            <p className="font-bold">
              Data de Nascimento:{" "}
              <span className="font-normal">{client.date}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Nenhum cliente encontrado</p>
        )}
      </main>
    </div>
  );
};

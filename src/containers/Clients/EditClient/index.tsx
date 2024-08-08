import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";
import Header from "../../../components/Header";

interface Client {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
}

export const EditClient = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [client, setClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Client>({
    id: "",
    name: "",
    last_name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data } = await api.get(`/client`);
        setClient(data.data);
        setFormData(data.data);
      } catch (err) {
        setMessage("Erro ao carregar cliente.");
        console.error("Erro ao carregar cliente:", err);
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/client/${id}`, formData);
      setMessage("Cliente atualizado com sucesso.");
      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch (err) {
      setMessage("Erro ao atualizar cliente.");
      console.error("Erro ao atualizar cliente:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">Editar Cliente</h1>
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
        {client && (
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <label className="block mb-2">
              Nome:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Último Nome:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Telefone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Data de Nascimento:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
            >
              Atualizar Cliente
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

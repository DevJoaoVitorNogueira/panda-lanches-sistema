import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../axiosConfig";
import { Link } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
}

export const ClientsList = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/client");

      setClients(data.data);
    } catch (err) {
      setMessage("Erro ao carregar clientes.");
      console.error("Erro ao carregar clientes:", err);
    }
  };

  const handleDelete = async (clientId: string) => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      try {
        await api.delete(`/client/${clientId}`);
      } catch (err) {
        setMessage("Cliente deletado com sucesso.");
        window.location.reload();

        console.error("Erro ao deletar cliente:", err);
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">
          Listagem de clientes
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
        <div className="flex flex-col sm:flex-row items-center mb-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Nome/Email/Telefone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border-2 border-black rounded flex-grow"
          />
          <button
            // onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded flex items-center"
          >
            Pesquisar
            <EditIcon className="ml-1" />
          </button>
        </div>
        <div className="w-full flex flex-col items-center gap-4 max-w-6xl md:px-24 lg:px-44">
          {clients.length > 0 ? (
            clients.map((client) => (
              <div
                key={client.id}
                className="border-2 border-black bg-white p-4 rounded shadow-md w-full"
              >
                <p className="font-bold">
                  Primeiro Nome:{" "}
                  <span className="font-normal">{client.name}</span>
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
                <section className="flex flex-col sm:flex-row items-center gap-2 mt-4">
                  <Link
                    to={`/client/${client.id}`}
                    className="bg-yellow-400 rounded-lg w-full sm:w-1/2 font-bold flex items-center justify-center"
                  >
                    Editar cadastro
                    <EditIcon className="text-yellow-600 ml-1" />
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="bg-red-500 rounded-lg w-full sm:w-1/2 font-bold flex items-center justify-center"
                  >
                    Deletar Cadastro
                    <DeleteIcon className="text-red-700 ml-1" />
                  </button>
                </section>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              Nenhum cliente encontrado
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

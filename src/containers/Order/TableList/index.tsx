import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";

interface Table {
  table: string;
  available: string;
}

const TableItem = ({ table, available }: Table) => {
  const availabilityClass =
    available === "disponivel"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  return (
    <li
      className={`border-b border-gray-300 py-3 px-4 last:border-b-0 rounded mb-2 ${availabilityClass}`}
    >
      <div className="flex justify-between items-center">
        <span>Mesa {table}</span>
        <span className={`font-bold`}>{available}</span>
      </div>
    </li>
  );
};

export const TableList = (): JSX.Element => {
  const [tables, setTables] = useState<Table[]>([]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/pedidos");
  };

  const fetchTables = async () => {
    try {
      const { data } = await api.get("/table");

      setTables(data.table);
    } catch (err) {
      setMessage("Erro ao carregar mesas, tente novamente");
      console.error("Erro ao carregar mesas:", err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-4 md:p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-7">Lista de Mesas</h1>

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

        <ul className="w-full max-w-md bg-white p-4 md:p-6 border-2 border-black rounded-lg shadow-lg">
          {tables.length > 0 ? (
            tables.map((table) => (
              <TableItem
                key={table.table}
                table={table.table}
                available={table.available}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Nenhuma mesa cadastrada</p>
          )}
        </ul>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-red-500 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded flex items-center text-lg hover:bg-red-600 transition duration-300"
          >
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
};

import React, { useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";

export const RegisterTable = (): JSX.Element => {
  const [tableNumber, setTableNumber] = useState("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/pedidos");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setMessage("Carregando informações...");

      const data = await api.post("/table", {
        table: tableNumber,
      });

      setMessage("A mesa foi cadastrada com sucesso");
      setTableNumber(""); // Limpa o campo após o cadastro

      return data;
    } catch (err) {
      setMessage("Erro ao cadastrar a mesa, tente novamente");
      console.error("Erro ao cadastrar mesa:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-7">Cadastrar Mesa</h1>

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

        <form
          noValidate
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white p-6 border-2 border-black rounded-lg shadow-lg"
        >
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Número da Mesa:</label>
            <input
              type="text"
              placeholder="Digite o número da mesa"
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-3 rounded flex items-center text-lg hover:bg-green-600 transition duration-300"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white font-bold px-6 py-3 rounded flex items-center text-lg hover:bg-red-600 transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

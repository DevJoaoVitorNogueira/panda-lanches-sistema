import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";
import { useState } from "react";

export const RegisterExpenses = (): JSX.Element => {
  const [name, setName] = useState<string>(" ");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>(" ");
  const navigate = useNavigate();

  const buttonBack = () => {
    navigate("/financas");
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();

    try {
      const { data } = await api.post("spending", {
        name: name,
        amount: amount,
        description: description,
      });

      navigate("/gastos");
      return data;
    } catch (err) {
      return err;
    }
  };
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-20 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7 lg:mb-12">
          Cadastrar Gastos
        </h1>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
        >
          <label className="mb-4">
            <span className="block text-gray-700 font-bold mb-2">Despesa:</span>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(evt) => setName(evt.target.value)}
            />
          </label>
          <label className="mb-4">
            <span className="block text-gray-700 font-bold mb-2">Valor:</span>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(evt) => setAmount(Number(evt.target.value))}
            />
          </label>
          <label className="mb-6">
            <span className="block text-gray-700 font-bold mb-2">
              Descrição:
            </span>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Cadastrar
          </button>
          <button
            onClick={buttonBack}
            className="w-full mt-5 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition ease-in-out duration-300"
          >
            Sair
          </button>
        </form>
      </main>
    </div>
  );
};

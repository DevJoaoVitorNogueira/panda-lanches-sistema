import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../axiosConfig";
import { useState, useEffect } from "react";

export const EditSpends = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const fetchSpend = async () => {
    try {
      const { data } = await api.get(`spending/${id}`);
      setName(data.name);
      setAmount(data.amount);
      setDescription(data.description);
    } catch (err) {
      console.error("Erro ao buscar gasto:", err);
    }
  };

  useEffect(() => {
    fetchSpend();
  }, [id]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      await api.put(`spending/${id}`, {
        name,
        amount,
        description,
      });

      navigate("/gastos");
    } catch (err) {
      console.error("Erro ao atualizar gasto:", err);
    }
  };

  const buttonBack = () => {
    navigate("/gastos");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-20 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7 lg:mb-12">
          Editar Gasto
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
              value={name}
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(evt) => setName(evt.target.value)}
            />
          </label>
          <label className="mb-4">
            <span className="block text-gray-700 font-bold mb-2">Valor:</span>
            <input
              type="number"
              value={amount}
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
              value={description}
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={buttonBack}
            className="w-full mt-5 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition ease-in-out duration-300"
          >
            Voltar
          </button>
        </form>
      </main>
    </div>
  );
};

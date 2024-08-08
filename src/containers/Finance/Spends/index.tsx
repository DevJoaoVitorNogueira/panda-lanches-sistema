import Header from "../../../components/Header";
import api from "../../../axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Spends = (): JSX.Element => {
  const [spends, setSpends] = useState<any[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpends = async () => {
      try {
        const { data } = await api.get("spending");
        setSpends(data.data);
      } catch (err) {
        console.error("Erro ao buscar gastos:", err);
      }
    };

    fetchSpends();
  }, []);

  const handleDelete = async (spendId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este gasto?")) {
      try {
        await api.delete(`/spending/${spendId}`);
        setSpends(spends?.filter((spend) => spend.id !== spendId));
        alert("Gasto excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir gasto:", err);
        alert("Erro ao excluir gasto.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Gastos</h1>
        <div className="flex flex-col space-y-4">
          {spends?.map((spend) => (
            <div
              key={spend.id}
              className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-gray-700">
                  {spend.name}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-spends/${spend.id}`)}
                    className="bg-yellow-500 text-white font-bold py-1 px-2 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                    title="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(spend.id)}
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded-md shadow hover:bg-red-600 transition duration-300"
                    title="Excluir"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-600">
                BRL ${spend.amount}
              </p>
              <p className="text-gray-600">{spend.description}</p>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/financas")}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-red-600 transition duration-300"
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

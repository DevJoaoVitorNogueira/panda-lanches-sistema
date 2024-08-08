import api from "../../../axiosConfig";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

export const Uppers = (): JSX.Element => {
  const [uppers, setUppers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUppers = async () => {
      try {
        const { data } = await api.get("/order");
        setUppers(data.order);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
      }
    };

    fetchUppers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Header />
      <main className="flex-1 mt-6 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Pedidos</h1>
        {uppers.length > 0 ? (
          uppers.map((upper) => (
            <div
              key={upper.id}
              className="border border-gray-300 rounded-md mb-4 p-4 shadow-sm bg-gray-50"
            >
              {upper.payment_control === "concluido" && (
                <div>
                  <p className="font-semibold text-gray-700">ID: {upper.id}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
                    <p className="font-bold text-gray-900">
                      Total do Pedido: R$ {upper.total}
                    </p>
                    <p className="font-bold text-green-500">
                      Pagamento: {upper.payment_control}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Nenhum pedido encontrado.</p>
        )}
      </main>

      <div className="flex justify-center items-center mt-6 mb-4">
        <button
          onClick={() => navigate("/financas")}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

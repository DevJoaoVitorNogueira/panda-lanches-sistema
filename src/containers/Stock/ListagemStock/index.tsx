import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";
import { Header } from "../../../components/Header";
import { Link } from "react-router-dom";

interface StockItem {
  id: string;
  name: string;
  data_validation: string;
  unity: string;
  data_purchased: string;
  price: string;
  supplier: string;
  locale_storage: string;
  observation: string;
  unity_measurement: string;
  measurement: string;
}

export const ListagemStock = (): JSX.Element => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const fetchStockItems = async () => {
    try {
      const { data } = await api.get("/stock");
      setStockItems(data.allStock);
    } catch (err) {
      setMessage("Erro ao carregar itens de estoque.");
      console.error("Erro ao carregar itens de estoque:", err);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (window.confirm("Tem certeza que deseja APAGAR esse item")) {
      try {
        await api.delete(`/stock/${itemId}`);
        // Atualiza a lista de itens após a exclusão
        setStockItems(stockItems.filter((item) => item.id !== itemId));
        setMessage("O item foi deletado com sucesso");
      } catch (err) {
        setMessage("Erro ao deletar o item.");
        console.error("Erro ao deletar o item:", err);
      }
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col items-center min-w-screen max-w-6xl p-5 bg-gray-400 shadow-md rounded">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">
          Listagem de Estoque
        </h1>
        {message && (
          <div className="mb-4 p-4 bg-red-200 border-2 border-red-400 text-red-800 rounded">
            {message}
          </div>
        )}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Nome
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Data de Validação
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Unidade
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Data de Compra
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Preço
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Fornecedor
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Armazenagem
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Observação
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Unidade de Medida
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Medida
                </th>
                <th className="px-2 py-2 text-left text-xs lg:text-sm font-medium text-gray-900">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockItems.length > 0 ? (
                stockItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-2 py-2 text-xs lg:text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.data_validation}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.unity}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.data_purchased}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.price}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.supplier}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.locale_storage}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.observation}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.unity_measurement}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      {item.measurement}
                    </td>
                    <td className="px-2 py-2 text-xs lg:text-sm text-gray-500">
                      <Link
                        to={`/stock/${item.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs lg:text-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs lg:text-sm"
                      >
                        Apagar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    Nenhum item encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleBack}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700 text-xs lg:text-sm"
        >
          Voltar
        </button>
      </main>
    </div>
  );
};

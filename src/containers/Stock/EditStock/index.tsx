import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../axiosConfig";
import { Header } from "../../../components/Header";

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

export const EditStock = (): JSX.Element => {
  const [stockItem, setStockItem] = useState<StockItem | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchStockItem = async () => {
    try {
      const { data } = await api.get(`/stock/${id}`);
      console.log(data);
      setStockItem(data);
    } catch (err) {
      setMessage("Erro ao carregar item de estoque.");
      console.error("Erro ao carregar item de estoque:", err);
    }
  };

  useEffect(() => {
    fetchStockItem();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stockItem) return;

    try {
      await api.put(`/stock/${id}`, stockItem);
      setMessage("Item de estoque atualizado com sucesso.");
    } catch (err) {
      setMessage("Erro ao atualizar item de estoque.");
      console.error("Erro ao atualizar item de estoque:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockItem({
      ...stockItem!,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-200">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-5 bg-white shadow-md rounded"
      >
        <label className="mb-2 text-gray-800">
          Nome do produto <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={stockItem?.name || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          type="text"
          placeholder="Digite o nome do produto"
        />

        <label className="mb-2 text-gray-800">
          Data de Validação <span className="text-red-500">*</span>
        </label>
        <input
          name="data_validation"
          value={stockItem?.data_validation || ""}
          onChange={handleChange}
          type="date"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: 12/04/2025"
        />

        <label className="mb-2 text-gray-800">
          Unidade ou Kilogramas <span className="text-red-500">*</span>
        </label>
        <input
          name="unity"
          value={stockItem?.unity || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          type="number"
          placeholder="ex: 10 un ou 1000 gramas"
        />

        <label className="mb-2 text-gray-800">
          Data de Compra <span className="text-red-500">*</span>
        </label>
        <input
          name="data_purchased"
          value={stockItem?.data_purchased || ""}
          onChange={handleChange}
          type="date"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Digite a data de compra"
        />

        <label className="mb-2 text-gray-800">
          Preço <span className="text-red-500">*</span>
        </label>
        <input
          name="price"
          value={stockItem?.price || ""}
          onChange={handleChange}
          type="number"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: 10,90"
        />

        <label className="mb-2 text-gray-800">
          Fornecedor ou Local de Compra <span className="text-red-500">*</span>
        </label>
        <input
          name="supplier"
          value={stockItem?.supplier || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Digite o local ou fornecedor do produto"
        />

        <label className="mb-2 text-gray-800">
          Local de Armazenagem <span className="text-red-500">*</span>
        </label>
        <input
          name="locale_storage"
          value={stockItem?.locale_storage || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: Geladeira, Armário 1"
        />

        <label className="mb-2 text-gray-800">
          Observação <span className="text-red-500">*</span>
        </label>
        <input
          name="observation"
          value={stockItem?.observation || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Opcional"
        />

        <label className="mb-2 text-gray-800">
          Unidade de Medida <span className="text-red-500">*</span>
        </label>
        <input
          name="unity_measurement"
          value={stockItem?.unity_measurement || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: g ou un"
        />

        <label className="mb-2 text-gray-800">
          Medida <span className="text-red-500">*</span>
        </label>
        <input
          name="measurement"
          value={stockItem?.measurement || ""}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: l, ml, un"
        />

        <p className="text-center text-gray-800">{message}</p>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Atualizar
        </button>

        <button
          onClick={handleBack}
          type="button"
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

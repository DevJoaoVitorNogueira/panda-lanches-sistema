import { useState, useEffect } from "react";
import api from "../../../axiosConfig";

export const AddIngredient = () => {
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>("");
  const [selectedStock, setSelectedStock] = useState<any>("");
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    const fetchProductsAndStock = async () => {
      try {
        const productResponse = await api.get("product");
        setProducts(productResponse.data.data);

        const stockResponse = await api.get("stock");
        setStock(stockResponse.data.allStock);
      } catch (error) {
        setMessage("Erro ao carregar produtos ou estoque.");
      }
    };

    fetchProductsAndStock();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProduct === "" || selectedStock === "" || quantity === 0) {
      setMessage("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      await api.post("add-ingredient", {
        id_product: selectedProduct,
        id_ingredient: selectedStock,
        quantity: Number(quantity),
      });
      setMessage("Ingrediente adicionado com sucesso.");
    } catch (error) {
      console.log(error);
      setMessage("Erro ao adicionar o ingrediente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-200">
      <h1 className="text-2xl mb-10">Coloque os Ingredientes</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-5 bg-white shadow-md rounded"
      >
        <label className="mb-2 text-gray-800">
          Produto <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label className="mb-2 text-gray-800">
          Ingrediente <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">Selecione um ingrediente</option>
          {stock.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>

        <label className="mb-2 text-gray-800">
          Quantidade <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mb-4 p-2 border rounded"
          min="1"
        />

        <p className="text-center text-gray-800">{message}</p>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Sair
        </button>
      </form>
    </div>
  );
};

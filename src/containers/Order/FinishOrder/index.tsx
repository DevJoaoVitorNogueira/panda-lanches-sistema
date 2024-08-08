import Header from "../../../components/Header";
import InputMask from "react-input-mask";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../../axiosConfig";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  quantity: number;
}
interface Gift {
  name: string;
  quantity: number;
}

export const FinishOrder = (): JSX.Element => {
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totalValue, setTotalValue] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string>("");
  const [order, setOrder] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([
    { name: "", quantity: 1 },
  ]);
  const [gifts, setGifts] = useState<Gift[]>([{ name: "", quantity: 1 }]);

  const navigate = useNavigate();

  const buttonBack = () => {
    navigate("/pedidos");
  };

  //Atualiza um campo específico (field) de um produto específico (index) na lista de produtos.
  //Copia a lista de produtos (newProducts), modifica o valor do campo e atualiza o estado com a nova lista.
  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newProducts = [...products];
    newProducts[index][field as keyof Product] = value as never;
    setProducts(newProducts);
  };

  //adiciona um campo noivo
  const addProductField = () => {
    setProducts([...products, { name: "", quantity: 1 }]);
  };

  const handleGiftChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newGifts = [...gifts];
    newGifts[index][field as keyof Gift] = value as never;
    setGifts(newGifts);
  };

  const addGiftField = () => {
    setGifts([...gifts, { name: "", quantity: 1 }]);
  };

  const fetchOrder = async () => {
    try {
      const response = await api.get("/order");
      setOrder(response.data);
    } catch (err) {
      console.error("Erro ao finalizar pedido", err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      setMessage("Carregando informações...");

      const data = await api.post("/order/add", {});
      setMessage("O Pedido foi finalizado com sucesso");
      fetchOrder();

      return data;
    } catch (err) {
      setMessage("Erro ao finalizar pedido, tente novamente");
      return err;
    }
  };
  return (
    <div className="min-h-screen w-full bg-gray-400 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-7">
          Finalizar Pedido
        </h1>
        <form
          className="w-full max-w-4xl bg-white p-6 md:p-8 lg:p-10 border-2 border-black rounded-lg shadow-lg"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Produtos:</label>
            {products.map((product, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  placeholder="Produto"
                  className="w-3/4 px-4 py-3 border-2 border-black rounded text-lg mr-2"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  className="w-1/4 px-4 py-3 border-2 border-black rounded text-lg"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-2"
              onClick={addProductField}
            >
              Adicionar Produto
            </button>
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Brindes:</label>
            {gifts.map((gift, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  placeholder="Brinde"
                  className="w-3/4 px-4 py-3 border-2 border-black rounded text-lg mr-2"
                  value={gift.name}
                  onChange={(e) =>
                    handleGiftChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  className="w-1/4 px-4 py-3 border-2 border-black rounded text-lg"
                  value={gift.quantity}
                  onChange={(e) =>
                    handleGiftChange(index, "quantity", Number(e.target.value))
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-2"
              onClick={addGiftField}
            >
              Adicionar Brinde
            </button>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Status do Pagamento:</label>
            <select
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="pending">Pendente</option>
              <option value="completed">Concluído</option>
            </select>
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Telefone do Cliente:</label>
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Digite o telefone"
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Descrição (opcional):</label>
            <textarea
              placeholder="Digite a descrição do pedido"
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-3 rounded flex items-center text-lg hover:bg-green-600 transition duration-300"
            >
              Finalizar Pedido
              <SaveIcon className="ml-2" />
            </button>
            <button
              onClick={buttonBack}
              type="button"
              className="bg-red-500 text-white font-bold px-6 py-3 rounded flex items-center text-lg hover:bg-red-600 transition duration-300"
            >
              Sair
              <CancelIcon className="ml-2" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

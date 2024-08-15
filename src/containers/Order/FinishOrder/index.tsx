import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export const FinishOrder = (): JSX.Element => {
  const { id } = useParams();
  const [paymentControl, setPaymentControl] = useState("a pagar");
  const [typePayment, setTypePayment] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [gifts, setGifts] = useState<any[]>([]);
  const [giftQuantity, setGiftQuantity] = useState<number>(0);
  const [selectedGift, setSelectedGift] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const { data } = await api.get("product");
        setGifts(data.data);
      } catch (error) {
        console.error("Error fetching gifts", error);
      }
    };

    fetchGifts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      await api.put(`order/${id}`, {
        payment_control: paymentControl,
        type_payment: typePayment,
        phone,
        email: mail,
        gift_id: selectedGift,
        gift_quantity: giftQuantity,
      });
      setMessage("Pedido finalizado com sucesso!");
      setTimeout(() => navigate("/pedidos"), 2000); // Aguarda 2 segundos antes de navegar
    } catch (error) {
      console.error("Error submitting order", error);
      setMessage("Erro ao finalizar pedido.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">Finalizar Pedido</h1>

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
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white border-2 border-black p-6 rounded shadow-lg"
        >
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">
              Selecione um brinde (opcional)
            </label>
            <select
              value={selectedGift}
              onChange={(e) => setSelectedGift(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded"
            >
              <option value="">Selecione um brinde</option>
              {gifts.map((gift: any) => (
                <option key={gift.id} value={gift.id}>
                  {gift.name}
                </option>
              ))}
            </select>
            <input
              className="mt-2 px-4 py-2 border-2 border-black rounded"
              value={giftQuantity}
              type="number"
              onChange={(e) => setGiftQuantity(Number(e.target.value))}
              min="0"
              placeholder="Quantidade"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">Controle de Pagamento</label>
            <select
              value={paymentControl}
              onChange={(e) => setPaymentControl(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded"
            >
              <option value="a pagar">a pagar</option>
              <option value="concluido">concluído</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">Tipo de Pagamento</label>
            <select
              value={typePayment}
              onChange={(e) => setTypePayment(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded"
            >
              <option value="">Selecione um tipo</option>
              <option value="pix">pix</option>
              <option value="credit">crédito</option>
              <option value="debit">débito</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">Email (opcional)</label>
            <input
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              placeholder="Digite o email"
              className="px-4 py-2 border-2 border-black rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">Telefone (opcional)</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Digite o telefone"
              className="px-4 py-2 border-2 border-black rounded"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-green-600 transition duration-300"
            >
              Fechar pedido
              <SaveIcon className="ml-2" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-red-600 transition duration-300"
            >
              Cancelar
              <CancelIcon className="ml-2" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

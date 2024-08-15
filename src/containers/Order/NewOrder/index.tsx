import Header from "../../../components/Header";
import InputMask from "react-input-mask";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";

export const NewOrder = (): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("local");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const { data } = await api.post("order", {
        email: email,
        phone: phone,
        local_order: orderType,
        table: tableNumber,
        tx_delivery: deliveryFee,
        description: description,
      });

      setMessage("Pedido realizado!");

      await navigate(`/listapedidos`);

      return data;
    } catch (err: any) {
      setMessage(err.response.data.msg);
      return err;
    }
  };

  const navigate = useNavigate();

  const buttonRegisterClient = () => {
    navigate("/loginclientes");
  };
  const buttonBack = () => {
    navigate("/pedidos");
  };

  return (
    <div className="min-h-screen w-full bg-gray-400 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-7">
          Criar Novo Pedido
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white p-6 md:p-8 lg:p-10 border-2 border-black rounded-lg shadow-lg"
        >
          <div className="flex flex-col mb-6">
            <div className="flex justify-center">
              {message !== "" && (
                <h3
                  className={
                    message !== "Pedido realizado!"
                      ? "border-2 rounded-md bg-red-300 border-red-500 text-center w-auto p-2 mb-2 text-white font-bold"
                      : "border-2 rounded-md bg-green-300 border-green-500 text-center w-auto p-2 mb-2 text-white font-bold"
                  }
                >
                  {message}
                </h3>
              )}
            </div>
            <label className="font-bold mb-2">O Cliente possui cadastro?</label>
            <select
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={isRegistered ? "nao" : "sim"}
              onChange={(e) => setIsRegistered(e.target.value === "nao")}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          {isRegistered && (
            <div className=" w-28 mb-6 rounded font-bold bg-green-500  flex justify-center">
              <button onClick={buttonRegisterClient} className="">
                Cadastrar
              </button>
            </div>
          )}
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Email (opcional):</label>
            <input
              type="email"
              placeholder="Digite o email"
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Telefone (opcional):</label>
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Digite o telefone"
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-bold mb-2">Tipo de Pedido:</label>
            <select
              className="w-full px-4 py-3 border-2 border-black rounded text-lg"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="local">Local</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          {orderType === "local" && (
            <div className="flex flex-col mb-6">
              <label className="font-bold mb-2">Número da Mesa:</label>
              <input
                type="text"
                placeholder="Digite o número da mesa"
                className="w-full px-4 py-3 border-2 border-black rounded text-lg"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          )}
          {orderType === "delivery" && (
            <div className="flex flex-col mb-6">
              <label className="font-bold mb-2">Taxa de Entrega:</label>
              <InputMask
                mask="999,99"
                placeholder="Digite a taxa de entrega"
                className="w-full px-4 py-3 border-2 border-black rounded text-lg"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
              />
            </div>
          )}
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
              Fazer Pedido
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

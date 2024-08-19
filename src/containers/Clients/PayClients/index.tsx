import Header from "../../../components/Header";
import api from "../../../axiosConfig";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const PayClient = (): JSX.Element => {
  const [client, setClient] = useState<any[]>([]);
  const [order, setOrder] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("client");
        setClient(data.data);

        const orderResponse = await api.get("order");
        setOrder(orderResponse.data.order);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleStatusPayer = async (id: string) => {
    setProcessingId(id);

    try {
      await api.put(`order/pay/${id}`); // Corrigido a URL

      setMessage("O pagamento foi concluído!");

      setTimeout(() => {
        setMessage(null);
        setProcessingId(null);
      }, 2000);

      await window.location.reload();
    } catch (err) {
      console.error(err);
      setMessage("Erro ao concluir o pagamento.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <main className="flex-1 flex  items-center  flex-col mt-10 p-6">
        <div className="flex items-center justify-between w-full max-w-6xl mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 font-bold flex items-center"
          >
            <ArrowBackIcon className="mr-2" />
            Voltar
          </button>
          <h1 className="text-xl lg:text-3xl font-bold mx-auto">
            Cadastros com pagamentos pendentes
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-4 max-w-6xl md:px-24 lg:px-44">
          {order
            .filter((orderClient) => orderClient.payment_control === "a pagar")
            .map((orderClient) => {
              const clientInfo = client.find(
                (c) => c.id === orderClient.client_id
              );

              return clientInfo ? (
                <div
                  key={orderClient.id}
                  className="border-2 border-black bg-white p-4 rounded shadow-md w-full"
                >
                  <p className="font-bold">
                    Nome do Devedor:{" "}
                    <span className="font-normal">{clientInfo.name}</span>
                  </p>
                  <p className="font-bold">
                    Email:{" "}
                    <span className="font-normal">{clientInfo.email}</span>
                  </p>
                  <p className="font-bold">
                    Telefone:{" "}
                    <span className="font-normal">{clientInfo.phone}</span>
                  </p>
                  <p className="font-bold">
                    Valor a pagar:{" "}
                    <span className="font-normal">{orderClient.total}</span>{" "}
                  </p>
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleStatusPayer(orderClient.id)}
                      className="bg-black text-white w-32 font-bold rounded mt-4"
                    >
                      Finalizar dívida
                    </button>
                    {processingId === orderClient.id && message && (
                      <p className="text-white font-bold text-green-400 mt-2">
                        {message}
                      </p>
                    )}
                  </div>
                </div>
              ) : null;
            })}
        </div>
      </main>
    </div>
  );
};

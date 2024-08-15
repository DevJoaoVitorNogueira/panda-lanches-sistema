import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../../../axiosConfig";

export const ListOrder = (): JSX.Element => {
  const [filter, setFilter] = useState("recebido");
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<{ [key: string]: any[] }>({});
  const [openProductIds, setOpenProductIds] = useState<{
    [key: string]: { [itemId: string]: boolean };
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const listFetch = async () => {
      const { data } = await api.get("order");
      setOrders(data.order);
    };

    listFetch();
  }, []);

  const findByProduct = async (
    productId: string,
    orderId: string,
    itemId: string
  ) => {
    if (!products[productId]) {
      const { data } = await api.get(`product/${productId}`);
      setProducts((prev) => ({ ...prev, [productId]: data.product }));
    }
    setOpenProductIds((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: !prev[orderId]?.[itemId],
      },
    }));
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      await api.put(`order=update/${id}`);
      alert("Status atualizado com sucesso!");
      await fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCancelOrder = async (id: string) => {
    if (window.confirm("Deseja cancelar este pedido? 🚨")) {
      try {
        await api.put(`order=cancel/${id}`);
        alert("Pedido cancelado com sucesso!");
        await fetchOrders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchOrders = async () => {
    const { data } = await api.get("order");
    setOrders(data.order);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <div className="flex justify-between items-center py-3 px-6 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          <ArrowBackIcon className="mr-2" />
          Voltar
        </button>
        <div className="flex">
          <button
            onClick={() => setFilter("recebido")}
            className={`px-4 py-2 mx-1 font-bold rounded ${
              filter === "recebido"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            }`}
          >
            Recebido
          </button>
          <button
            onClick={() => setFilter("finalizado")}
            className={`px-4 py-2 mx-1 font-bold rounded ${
              filter === "finalizado"
                ? "bg-green-500 text-white"
                : "bg-white text-green-500 border border-green-500"
            }`}
          >
            Concluído
          </button>
          <button
            onClick={() => setFilter("cancelado")}
            className={`px-4 py-2 mx-1 font-bold rounded ${
              filter === "cancelado"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border border-red-500"
            }`}
          >
            Cancelados
          </button>
        </div>
      </div>
      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">
          Listagem de Pedidos
        </h1>
        <div className="w-full flex flex-col items-center gap-4 max-w-6xl md:px-24 lg:px-44">
          {orders
            .filter((order) => order.status_order === filter)
            .map((order) => (
              <div
                key={order.id}
                className="border-2 border-black bg-white p-4 rounded shadow-md w-full"
              >
                <p className="font-bold">
                  Mesa do Pedido:{" "}
                  <span className="font-normal">{order.table}</span>
                </p>
                <p className="font-bold">
                  Itens do Pedido:
                  <span className="font-normal">
                    {Array.isArray(order.orderItens)
                      ? order.orderItens.map((item: any, index: number) => (
                          <div key={index}>
                            <button
                              onClick={() => {
                                findByProduct(
                                  item.product_id,
                                  order.id,
                                  index.toString()
                                );
                              }}
                              className="text-blue-400"
                            >
                              Produto {index + 1}
                            </button>
                            {openProductIds[order.id]?.[index.toString()] &&
                              products[item.product_id] && (
                                <div>
                                  {products[item.product_id].map((p) => (
                                    <div className="mb-2" key={p.id}>
                                      <ul className="flex flex-col">
                                        <li>Nome: {p.name}</li>
                                        <li>Quantidade: {item.quantity}x</li>
                                        <li>Observação: {item.description}</li>
                                        <li
                                          className={
                                            item.status !== 1
                                              ? "text-red-500 text-bold"
                                              : "text-green-500 text-bold"
                                          }
                                        >
                                          Status:{" "}
                                          {item.status !== 1
                                            ? "preparando"
                                            : "concluido"}
                                        </li>
                                        <button
                                          onClick={() =>
                                            handleUpdateStatus(item.id)
                                          }
                                          className="bg-blue-400 p-1 rounded-md w-32 text-white font-bold"
                                        >
                                          Atualizar Status
                                        </button>
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}
                            <br />
                          </div>
                        ))
                      : "Nenhum item"}
                  </span>
                </p>
                <p className="font-bold">
                  Horário do Pedido:{" "}
                  <span className="font-normal">{order.data_order}</span>
                </p>
                <p className="font-bold">
                  Status: <span className="font-normal">{filter}</span>
                </p>
                <p className="font-bold">
                  Valor do Pedido:
                  <span className="font-normal">{order.total}</span>
                </p>
                <section className="flex flex-col sm:flex-row items-center gap-5 mt-4">
                  <button
                    onClick={() => navigate(`/vercliente/${order.client_id}`)}
                    className="bg-blue-500 rounded-lg w-full sm:w-1/4 font-bold flex items-center justify-center"
                  >
                    Ver Cadastro
                  </button>
                  <button
                    onClick={() => navigate(`/add-item/${order.id}`)}
                    className="bg-yellow-500 rounded-lg w-full sm:w-1/4 font-bold flex items-center justify-center"
                  >
                    Acrescentar item
                  </button>
                  <button
                    onClick={() => handleUpdateCancelOrder(order.id)}
                    className="bg-red-500 rounded-lg w-full sm:w-1/4 font-bold flex items-center justify-center"
                  >
                    Cancelar Pedido
                  </button>
                  <button
                    onClick={() => navigate(`/finalizarpedido/${order.id}`)}
                    className="bg-green-500 rounded-lg w-full sm:w-1/4 font-bold flex items-center justify-center"
                  >
                    Finalizar Pedido
                  </button>
                </section>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

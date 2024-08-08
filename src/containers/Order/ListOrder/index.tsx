import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";

export const ListOrder = (): JSX.Element => {
  const [filter, setFilter] = useState("Andamento");
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <div className="flex justify-center py-3 mt-20">
        <button
          onClick={() => setFilter("Andamento")}
          className={`px-4 py-2 mx-1 font-bold rounded ${
            filter === "Andamento"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border border-blue-500"
          }`}
        >
          Recebido
        </button>
        <button
          onClick={() => setFilter("Concluído")}
          className={`px-4 py-2 mx-1 font-bold rounded ${
            filter === "Concluído"
              ? "bg-green-500 text-white"
              : "bg-white text-green-500 border border-green-500"
          }`}
        >
          Concluído
        </button>
        <button
          onClick={() => setFilter("Encerrado")}
          className={`px-4 py-2 mx-1 font-bold rounded ${
            filter === "Encerrado"
              ? "bg-red-500 text-white"
              : "bg-white text-red-500 border border-red-500"
          }`}
        >
          Encerrado
        </button>
      </div>
      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">
          Listagem de Pedidos
        </h1>
        <div className="w-full flex flex-col items-center gap-4 max-w-6xl md:px-24 lg:px-44">
          {orders?.map((order) => (
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
                Status: <span className="font-normal"> {filter}</span>
              </p>
              <p className="font-bold">
                Valor do Pedido:
                <span className="font-normal">{order.totalPrice}</span>
              </p>

              <section className="flex flex-col sm:flex-row items-center gap-5 mt-4">
                <button className="bg-blue-500 rounded-lg w-full sm:w-1/2 font-bold flex items-center justify-center">
                  Ver Cadastro
                </button>
                <button
                  onClick={() => navigate(`/add-item/${order.id}`)}
                  className="bg-yellow-500 rounded-lg w-full sm:w-1/2 font-bold flex items-center justify-center"
                >
                  Acrescentar item
                </button>
              </section>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

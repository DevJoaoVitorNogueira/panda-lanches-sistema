import React from "react";
import { Header } from "../../components/Header";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TableChartIcon from "@mui/icons-material/TableChart"; // Ícone para "Cadastrar Mesa"
import EventNoteIcon from "@mui/icons-material/EventNote"; // Ícone para "Listagem de Mesas"
import { useNavigate } from "react-router-dom";

export const HomeOrder = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonListOrders = () => {
    navigate("/listapedidos");
  };

  const buttonNewOrder = () => {
    navigate("/novopedido");
  };

  const buttonRegisterTable = () => {
    navigate("/cadastrarmesa");
  };

  const buttonListTables = () => {
    navigate("/listagemesas");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-20 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7 lg:mb-20">
          Gestão de Pedidos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14">
          <button
            onClick={buttonListOrders}
            className="flex flex-col items-center p-6 sm:p-8 lg:p-12 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <ListAltIcon className="text-black mb-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" />
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
              Lista de Pedidos
            </span>
          </button>

          <button
            onClick={buttonNewOrder}
            className="flex flex-col items-center p-6 sm:p-8 lg:p-12 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <AddShoppingCartIcon className="text-black mb-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" />
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
              Novo Pedido
            </span>
          </button>

          <button
            onClick={buttonRegisterTable}
            className="flex flex-col items-center p-6 sm:p-8 lg:p-12 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <TableChartIcon className="text-black mb-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" />
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
              Cadastrar Mesa
            </span>
          </button>

          <button
            onClick={buttonListTables}
            className="flex flex-col items-center p-6 sm:p-8 lg:p-12 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <EventNoteIcon className="text-black mb-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" />
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
              Listagem de Mesas
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

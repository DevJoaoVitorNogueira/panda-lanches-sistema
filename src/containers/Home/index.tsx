import React from "react";
import { Header } from "../../components/Header";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonStock = () => {
    navigate("/estoque");
  };
  const buttonOrders = () => {
    navigate("/pedidos");
  };
  const buttonClients = () => {
    navigate("/clientes");
  };

  const buttonFinance = () => {
    navigate("/financas");
  };
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-20 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7 lg:mb-12">
          Gestões de controle
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 lg:gap-12">
          <button
            onClick={buttonStock}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <InventoryIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Gestão de Estoque
            </span>
          </button>

          <button
            onClick={buttonOrders}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <ListAltIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Gestão de Pedidos
            </span>
          </button>

          <button
            onClick={buttonClients}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <PersonIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Gestão de Clientes
            </span>
          </button>

          <button
            onClick={buttonFinance}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <AttachMoneyIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Gestão de Finanças
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

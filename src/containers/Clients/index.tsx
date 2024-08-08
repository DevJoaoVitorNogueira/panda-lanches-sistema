import React from "react";
import { Header } from "../../components/Header";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

export const HomeClients = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonListClients = () => {
    navigate("/listaclientes");
  };

  const buttonLoginClients = () => {
    navigate("/loginclientes");
  };

  const buttonClientsForPay = () => {
    navigate("/clientesapagar");
  };
  return (
    <div className="flex flex-col h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-20 items-center p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7 lg:mb-20">
          Gestão de Clientes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-14">
          <button
            onClick={buttonLoginClients}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <PersonAddIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold">
              Cadastro de Clientes
            </span>
          </button>

          <button
            onClick={buttonListClients}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <ListIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold">
              Lista de Clientes
            </span>
          </button>

          <button
            onClick={buttonClientsForPay}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
          >
            <PaymentIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold">
              Clientes a Pagar
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

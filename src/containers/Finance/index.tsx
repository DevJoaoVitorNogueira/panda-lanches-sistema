import React from "react";
import { Header } from "../../components/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

export const Finance = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonRegisterExpense = () => {
    navigate("/cadastrodegastos");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col items-center mt-10 p-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-7">
          Gestão de Finanças
        </h1>

        <div className="flex flex-col sm:flex-row items-center mb-4 w-full max-w-3xl gap-4">
          <button
            onClick={buttonRegisterExpense}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300 flex-grow"
          >
            <AddCircleOutlineIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Cadastrar Gastos
            </span>
          </button>

          <button
            onClick={() => navigate("/lucros")}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300 flex-grow"
          >
            <ListAltIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Listagem de Lucros
            </span>
          </button>

          <button
            onClick={() => navigate("/gastos")}
            className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300 flex-grow"
          >
            <NotificationsIcon className="text-black mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
              Lembrete de Gastos
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

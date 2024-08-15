import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";

export const Stock = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonRegisterStock = () => {
    navigate("/registroestoque");
  };

  const listagemDeStock = () => {
    navigate("/listagemestoque");
  };

  const buttonRegisterProducts = () => {
    navigate("/cadastrarprodutos");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen items-center bg-gray-400">
        <main className="flex-1 flex flex-col mt-20 items-center p-6">
          <div className="flex flex-col gap-6">
            <button
              onClick={buttonRegisterStock}
              className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2">
                Cadastro de itens
              </span>
              <ShoppingCartIcon className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            </button>

            <button
              onClick={listagemDeStock}
              className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2">
                Ver Estoque
              </span>
              <ListAltIcon className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            </button>

            <button
              onClick={buttonRegisterProducts}
              className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2">
                Cadastrar Produtos
              </span>
              <AddCircleIcon className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            </button>
            <button
              onClick={() => navigate("/add-ingredient")}
              className="flex flex-col items-center p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-400 border-2 border-black text-black shadow-md hover:bg-gray-700 transition ease-in-out duration-300"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2">
                Cadastrar Ingredientes do Produto
              </span>
              <AddCircleIcon className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

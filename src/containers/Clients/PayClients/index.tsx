import Header from "../../../components/Header";

export const PayClient = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <main className="flex-1 flex flex-col mt-10 items-center p-6">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold mb-7">
            Cadastros com pagamentos pendentes
          </h1>
          <div className="w-full flex flex-col items-center gap-4 max-w-6xl md:px-24 lg:px-44">
            <div className="border-2 border-black bg-white p-4 rounded shadow-md w-full">
              <p className="font-bold">
                Nome do Devedor: <span className="font-normal"></span>
              </p>

              <p className="font-bold">
                Email: <span className="font-normal"></span>
              </p>
              <p className="font-bold">
                Telefone: <span className="font-normal"></span>
              </p>
              <p className="font-bold">
                Valor a pagar: <span className="font-normal"></span>
              </p>
              <div className="">
                <button className="bg-black text-white w-32 font-bold rounded mt-4">
                  Ver cadastro
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

import { useState, useEffect } from "react";
import api from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

export const RegisterProducts = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [observation, setObservation] = useState<string>("");
  const [categorie, setCategorie] = useState<any[]>();
  const [categorieSelected, setCategorieSelected] = useState<any>();
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    try {
      setMessage("Carregando informações...");

      const data = await api.post("product", {
        name: name,
        price: price,
        description: observation,
        category_id: categorieSelected,
      });

      setMessage("Produto foi adicionado com sucesso!");
      setTimeout(() => setMessage(""), 2000);

      await navigate("/add-ingredient");
      return data;
    } catch (err) {
      setMessage("Erro, tente novamente!");
      console.log(categorieSelected);
      return err;
    }
  };

  useEffect(() => {
    const categorieFetch = async () => {
      const { data } = await api.get("category");

      console.log(data.categorie);
      setCategorie(data.categorie);
    };

    categorieFetch();
  });

  const navigate = useNavigate();

  const buttonBackRegisterStock = () => {
    navigate("/estoque");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-200">
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-md p-5 bg-white shadow-md rounded"
      >
        <label className="mb-2 text-gray-800">
          Nome do produto <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setName(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          type="text"
          placeholder="Digite o nome do produto"
        />
        <label className="mb-2 text-gray-800">
          Preço <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setPrice(Number(evt.target.value))}
          type="number"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: 10,90"
        />
        <label className="mb-2 text-gray-800">
          Descrição <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setObservation(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Opcional"
        />
        <label className="mb-2 text-gray-800">
          Categoria <span className="text-red-500">*</span>
        </label>
        <select onChange={(e) => setCategorieSelected(e.target.value)}>
          {categorie?.map((c) => (
            <option key={c.id + 1} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <p className="text-center text-gray-800">{message}</p>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>

        <button
          onClick={buttonBackRegisterStock}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Sair
        </button>
      </form>
    </div>
  );
};

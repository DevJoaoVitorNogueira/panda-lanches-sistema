import { useState } from "react";
import api from "../../../axiosConfig";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";

export const RegisterStock = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [validate, setValidate] = useState<string>("");
  const [unity, setUnity] = useState<number>(0);
  const [dateLoc, setDateLoc] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [supply, setSupply] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const [unityMeasurement, setUnityMeasurement] = useState<string>("");
  const [measurement, setMeasurement] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    try {
      setMessage("Carregando informações...");

      const data = await api.post("stock", {
        name: name.trim(),
        data_validation: validate.trim(),
        unity: unity,
        data_purchased: dateLoc.trim(),
        price: price,
        supplier: supply.trim(),
        locale_storage: storage.trim(),
        observation: observation.trim(),
        unity_measurement: unityMeasurement.trim(),
        measurement: measurement.trim(),
      });

      setMessage("Produto foi adicionado com sucesso!");
      setTimeout(() => setMessage(""), 2000);
      return data;
    } catch (err) {
      setMessage("Erro, tente novamente!");
      return err;
    }
  };

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
          Data de vencimento <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: 12/04/2025"
          onChange={(evt) => setValidate(evt.target.value)}
        />

        <label className="mb-2 text-gray-800">
          Unidade ou Kilogramas <span className="text-red-500">*</span>
        </label>
        <input
          className="mb-4 p-2 border border-gray-400 rounded"
          type="number"
          placeholder="ex: 10 un ou 1000 gramas"
          onChange={(evt) => setUnity(Number(evt.target.value))}
        />

        <label className="mb-2 text-gray-800">
          Data de locação do produto <span className="text-red-500">*</span>
        </label>
        <InputMask
          mask="9999/99/99"
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Digite o dia atual"
          onChange={(evt) => setDateLoc(evt.target.value)}
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
          Fornecedor ou Local de compra <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setSupply(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Digite o local ou fornecedor do produto"
        />

        <label className="mb-2 text-gray-800">
          Local de armazenagem do produto{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setStorage(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: Geladeira, Armario 1"
        />

        <label className="mb-2 text-gray-800">
          Observação <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setObservation(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="Opcional"
        />

        <label className="mb-2 text-gray-800">
          Unidade de medida <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setUnityMeasurement(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: g ou un"
        />

        <label className="mb-2 text-gray-800">
          Medida <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(evt) => setMeasurement(evt.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded"
          placeholder="ex: l, ml, un"
        />

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

import React, { useState } from "react";
import { Header } from "../../../components/Header";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../../axiosConfig";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

export const LoginClients = (): JSX.Element => {
  const [state, setState] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [clients, setClients] = useState<any[]>([]);

  const handleState = () => setState(!state);

  const navigate = useNavigate();

  const buttonHome = () => {
    navigate(-1);
  };

  const fetchClients = async () => {
    try {
      const response = await api.get("clients");
      setClients(response.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  };
  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    try {
      setMessage("Carregando informações...");

      const data = await api.post("client", {
        name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        date: birthDate,
      });

      setMessage("O Cliente foi cadastrado com sucesso");
      fetchClients(); // Atualiza a lista de clientes

      return data;
    } catch (err) {
      setMessage("Erro ao cadastrar o cliente, tente novamente");
      return err;
    }
  };

  return (
    <>
      {!state && (
        <div className="flex flex-col min-h-screen w-full bg-gray-400">
          <Header />
          <main className="flex-1 flex flex-col mt-10 items-center p-6">
            <h1 className="text-xl lg:text-3xl font-bold mb-7">
              Cadastro de Clientes
            </h1>

            {message && (
              <div className="mb-4 p-4 bg-green-200 border-2 border-green-400 text-green-800 rounded">
                {message}
              </div>
            )}

            <form
              noValidate
              onSubmit={onSubmit}
              className="w-full max-w-3xl border-2 border-black p-6 rounded shadow-md bg-white"
            >
              <div className="flex flex-col mb-4">
                <label className="font-bold mb-2">Primeiro Nome:</label>
                <input
                  type="text"
                  onChange={(evt) => setFirstName(evt.target.value)}
                  placeholder="Digite o primeiro nome"
                  value={firstName}
                  className="px-4 py-2 border-2 border-black rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-bold mb-2">Último Nome:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(evt) => setLastName(evt.target.value)}
                  placeholder="Digite o último nome"
                  className="px-4 py-2 border-2 border-black rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-bold mb-2">Email:</label>
                <input
                  type="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                  placeholder="Digite o email"
                  value={email}
                  className="px-4 py-2 border-2 border-black rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-bold mb-2">Telefone:</label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={phone}
                  placeholder="Digite o telefone"
                  onChange={(evt) => setPhone(evt.target.value)}
                  className="px-4 py-2 border-2 border-black rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-bold mb-2">Data de Nascimento:</label>
                <input
                  type="date"
                  value={birthDate}
                  placeholder="DD/MM/AAAA"
                  onChange={(evt) => setBirthDate(evt.target.value)}
                  className="px-4 py-2 border-2 border-black rounded"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold px-4 py-2 rounded flex items-center"
                >
                  Cadastrar
                  <SaveIcon className="ml-1" />
                </button>
                <button
                  onClick={buttonHome}
                  type="button"
                  className="bg-red-500 text-white font-bold px-4 py-2 rounded flex items-center"
                >
                  Sair
                  <CancelIcon className="ml-1" />
                </button>
              </div>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

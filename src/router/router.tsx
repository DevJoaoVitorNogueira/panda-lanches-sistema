import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Stock,
  HomeClients,
  HomeOrder,
  ListOrder,
  ClientsList,
  LoginClients,
  PayClient,
  RegisterStock,
  NewOrder,
  Finance,
  RegisterExpenses,
  FinishOrder,
  RegisterTable,
  TableList,
  Spends,
  EditClient,
  Uppers,
  ListagemStock,
  AddItem,
  EditStock,
  EditSpends,
  RegisterProducts,
} from "../containers";

export const Routers = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estoque" element={<Stock />} />
        <Route path="/clientes" element={<HomeClients />} />
        <Route path="/pedidos" element={<HomeOrder />} />
        <Route path="/listapedidos" element={<ListOrder />} />
        <Route path="/listaclientes" element={<ClientsList />} />
        <Route path="/loginclientes" element={<LoginClients />} />
        <Route path="/clientesapagar" element={<PayClient />} />
        <Route path="/registroestoque" element={<RegisterStock />} />
        <Route path="/novopedido" element={<NewOrder />} />
        <Route path="/financas" element={<Finance />} />
        <Route path="/cadastrodegastos" element={<RegisterExpenses />} />
        <Route path="/finalizarpedido" element={<FinishOrder />} />
        <Route path="/cadastrarmesa" element={<RegisterTable />} />
        <Route path="/listagemesas" element={<TableList />} />
        <Route path="/gastos" element={<Spends />} />
        <Route path="/client/:id" element={<EditClient />} />
        <Route path="/lucros" element={<Uppers />} />
        <Route path="/listagemestoque" element={<ListagemStock />} />
        <Route path="/add-item/:id" element={<AddItem />} />
        <Route path="/stock/:id" element={<EditStock />} />
        <Route path="/edit-spends/:id" element={<EditSpends />} />
        <Route path="cadastrarprodutos" element={<RegisterProducts />} />
      </Routes>
    </Router>
  );
};

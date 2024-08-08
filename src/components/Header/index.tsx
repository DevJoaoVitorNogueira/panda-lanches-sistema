import React, { useState, useRef, useEffect } from "react";
import pandaLogo from "../../assets/pandaLogo.png";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const buttonClickOrder = () => {
    navigate("/pedidos");
  };

  const buttonClickClients = () => {
    navigate("/clientes");
  };

  const buttonClickStock = () => {
    navigate("/estoque");
  };

  const buttonHome = () => {
    navigate("/");
  };

  const buttonFinance = () => {
    navigate("/financas");
  };
  return (
    <div>
      <header className="bg-gray-400 text-white p-4 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center space-x-2">
          <img
            onClick={buttonHome}
            src={pandaLogo}
            alt="Logo"
            className="h-8 w-8"
          />
        </div>

        <div className="text-center flex-1">
          <span className="font-bold text-black text-lg">
            Sistema Panda Lanches
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <DensityMediumIcon
            className=" text-black h-6 w-6 cursor-pointer"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-200 text-black font-bold rounded-lg shadow-lg border border-gray-200">
              <ul>
                <li
                  onClick={buttonClickClients}
                  className="flex items-center p-3 hover:bg-gray-300 cursor-pointer"
                >
                  <PersonIcon className="mr-2" />
                  Gestão de Clientes
                </li>
                <li
                  onClick={buttonClickStock}
                  className="flex items-center p-3 hover:bg-gray-300 cursor-pointer"
                >
                  <InventoryIcon className="mr-2" />
                  Gestão de Estoque
                </li>
                <li
                  onClick={buttonClickOrder}
                  className="flex items-center p-3 hover:bg-gray-300 cursor-pointer"
                >
                  <ListAltIcon className="mr-2" />
                  Gestão de Pedidos
                </li>
                <li
                  onClick={buttonFinance}
                  className="flex items-center p-3 hover:bg-gray-300 cursor-pointer"
                >
                  <AttachMoneyIcon className="mr-2" />
                  Gestão de Finanças
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <hr className="border-t-2 border-black mt-16" />
    </div>
  );
};

export default Header;

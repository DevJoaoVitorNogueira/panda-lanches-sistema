import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../axiosConfig";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../../components/Header";

export const AddItem = (): JSX.Element => {
  const [product, setProduct] = useState<any[]>();
  const [category, setCategory] = useState<any[]>();
  const [position, setPosition] = useState<number>(1);
  const [productId, setProductId] = useState<string | any>();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [description, setDescription] = useState<string>();
  const [selectedDescription, setSelectedDescription] =
    useState<boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    const productsFetch = async () => {
      try {
        const { data } = await api.get("/product");

        setProduct(data.data);
      } catch (err) {
        return err;
      }
    };

    const categoryFetch = async () => {
      try {
        const { data } = await api.get("/category");

        setCategory(data.categorie);
      } catch (err) {
        return err;
      }
    };

    productsFetch();
    categoryFetch();
  }, []);

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + change,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      const { data } = await api.post("/order/add", {
        order_id: id,
        product_id: productId,
        quantity: quantities[productId] || 1,
        description: description,
      });

      window.location.reload();
      return data;
    } catch (err) {
      return err;
    }
  };

  const handleCloseDescriptionArea = () => {
    setSelectedDescription(!selectedDescription);
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <h1 className="text-center font-bold text-2xl">Adicione um Item</h1>
      <div className="flex p-2 mt-10 font-bold gap-2">
        {category?.map((c) => (
          <button
            key={c.id}
            className={position === c.id ? "underline" : ""}
            onClick={() => setPosition(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="p-2 mt-10">
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          {product?.map(
            (p) =>
              position === p.category_id && (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  key={p.id}
                  className="bg-slate-200 h-auto w-auto"
                >
                  <h2 className="font-bold text-center">{p.name}</h2>
                  <div className="mt-2 p-2">
                    <p className="font-bold">${p.price}</p>
                    <p>{p.description}</p>
                  </div>

                  <div className="flex justify-center py-2 gap-2">
                    <button type="button" onClick={handleCloseDescriptionArea}>
                      <EditIcon />
                    </button>
                    <button
                      type="submit"
                      className="bg-green-400 p-1 rounded-md text-white font-bold hover:scale-105 ml-2"
                      onClick={() => {
                        setProductId(p.id);
                      }}
                    >
                      Adicionar a mesa
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(p.id, 1)}
                      >
                        +
                      </button>
                      <p>{quantities[p.id] || 0}</p>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(p.id, -1)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </form>
              )
          )}
        </div>

        {selectedDescription && (
          <div className="absolute left-10 h-96 w-[300px] top-52 flex flex-col  items-center bg-white">
            <textarea
              onChange={(evt) => setDescription(evt.target.value)}
              className="border-2 border-slate-400 h-72 w-[290px] mt-2"
            ></textarea>
            <button
              className="mt-10 bg-green-400 text-white font-bold p-2 rounded-md"
              onClick={handleCloseDescriptionArea}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

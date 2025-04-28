import axios from "axios";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";
import { cartContext } from './../../Context/CartContext';
import Swal from 'sweetalert2'; 
import { LanguageContext } from "../LanguageContext/LanguageContext";
export default function Products() {

  const { addProductToCart } = useContext(cartContext);
  const { language } = useContext(LanguageContext);


  function getAllProducts2() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  async function handleAddProduct(id) {
    const res = await addProductToCart(id);
    Swal.fire({
      title: res ? "Success!" : "Error!",
      text: res 
      ? (language === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Item added successfully!')
      : (language === 'ar' ? 'قم بتسجيل الدخول أولاً' : 'You have to login first!'),
      icon: res ? "success" : "error",
      toast: true,   
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts2,
  });

  const allProducts = data?.data.data;

  if (isLoading) return <LoaderScreen />;
  if (isError) return <h2 className="text-center text-red-600">Error occurred</h2>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-5">
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
          {allProducts?.map((product) => (
            <Link
              to={`/productDetails/${product._id}`}
              key={product._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative group"
            >
              <img src={product.imageCover} alt="title" className="w-full object-cover rounded-lg" />
              <h2 className="font-semibold text-lg mt-2">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.category.name}</p>

              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold text-lg text-cyan-600 dark:text-cyan-400">
                  {product.priceAfterDiscount ? `${product.priceAfterDiscount} EGP` : `${product.price} EGP`}
                </p>
                {product.priceAfterDiscount && <p className="line-through text-red-500">{product.price} EGP</p>}
              </div>

              <p className="text-sm text-yellow-500 mt-1"><i className="fa-solid fa-star"></i> {product.ratingsAverage}</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddProduct(product._id);
                }}
                className="absolute top-3 right-3 bg-cyan-700 hover:bg-green-500 text-white p-3 rounded-lg shadow-md transform scale-0 group-hover:scale-100 transition-all"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

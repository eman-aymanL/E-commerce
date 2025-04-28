import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import axios from 'axios';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import { cartContext } from './../../Context/CartContext';
import Swal from 'sweetalert2'; 
import { LanguageContext } from '../LanguageContext/LanguageContext';

export default function CategoryDetails() {
  const { id: categoryId } = useParams();
  const { language } = useContext(LanguageContext);
  const { addProductToCart } = useContext(cartContext);

  function getCategoryProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryProducts', categoryId],
    queryFn: () => getCategoryProducts(),
    enabled: !!categoryId,
  });

  const products = data?.data?.data;

  async function handleAddToCart(id, e) {
    e.preventDefault(); 
    const res = await addProductToCart(id);
    if (res) {
      Swal.fire({
        title: "Success!",
        text: language === 'ar' ? 'تم اضافة المنتج بنجاح' : 'Item added successfully!' ,
        icon: "success",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: language === 'ar' ? 'قم بتسجيل الدخول اولا': 'You have to login first!' ,
        icon: "error",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        showConfirmButton: false,
      });
    }
  }

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">Products in this Category</h1>

        {products?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative group"
              >
                <Link to={`/productDetails/${product._id}`}>
                  <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
                  <h2 className="font-semibold text-lg mt-2">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.category?.name}</p>

                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-bold text-lg text-cyan-600 dark:text-cyan-400">
                      {product.priceAfterDiscount ? `${product.priceAfterDiscount} EGP` : `${product.price} EGP`}
                    </p>
                    {product.priceAfterDiscount && <p className="line-through text-red-500">{product.price} EGP</p>}
                  </div>

                  <p className="text-sm text-yellow-500 mt-1">
                    <i className="fa-solid fa-star"></i> {product.ratingsAverage}
                  </p>
                </Link>

                <button
                  onClick={(e) => handleAddToCart(product._id, e)}
                  className="absolute top-3 right-3 bg-cyan-700 hover:bg-green-500 text-white p-3 rounded-lg shadow-md transform scale-0 group-hover:scale-100 transition-all"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

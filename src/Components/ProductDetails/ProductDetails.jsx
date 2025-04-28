import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import  { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import { cartContext } from './../../Context/CartContext';
import Swal from 'sweetalert2'; 
import { LanguageContext } from '../LanguageContext/LanguageContext';


export default function ProductDetails() {
  const{addProductToCart}=useContext(cartContext)
  const { language } = useContext(LanguageContext);

  const { id } = useParams();

  async function handleAddToCart(){
    const res =await addProductToCart(id)
    if(res){          
        Swal.fire({
            title: "Success!",
            text: language === 'ar' ? 'تم اضافة المنتج بنجاح' : 'Item added successfully!' ,
            icon: "success",
            toast: true,
            position: "bottom-end",
            timer: 5000,
            showConfirmButton: false,
          });

    }else{
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

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getProductDetails,
  });

  const productDtailsObj = data?.data.data;
  

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <h2 className="text-center text-red-500 mt-10 text-lg">Error occurred</h2>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <div>
            <img
              src={productDtailsObj.imageCover}
              alt={productDtailsObj.title}
              className="w-full h-96 object-contain rounded-xl shadow-md"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{productDtailsObj.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{productDtailsObj.description}</p>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            ${productDtailsObj.price}
            </span>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300">Quantity: {productDtailsObj.quantity}</h5>

            <button
            onClick={handleAddToCart}
              className="bg-cyan-700 hover:bg-green-500 text-white py-3 px-6 rounded-xl shadow-md transition duration-300 w-full"
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

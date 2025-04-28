import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeSlider from './../HomeSlider/HomeSlider';
import { useQuery } from '@tanstack/react-query';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import { cartContext } from './../../Context/CartContext';
import Swal from 'sweetalert2'; 
import { LanguageContext } from '../LanguageContext/LanguageContext';

export default function Home() {
  const { language} = useContext(LanguageContext);
  const{addProductToCart}=useContext(cartContext)
  const [pageNumber, setPageNumber] = useState(1);


  async function handleAddProduct(id){
    const res= await addProductToCart(id)
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

  function getAllProducts2({ queryKey }) {
    const [_key, page] = queryKey;
    return axios.get('https://ecommerce.routemisr.com/api/v1/products', 
      {
      params: { page }
    });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['getAllProducts2', pageNumber],
    queryFn: getAllProducts2
  });

  const allProducts = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <h2 className="text-center text-red-500 mt-10 text-lg">  {language === 'ar' ? 'يوجد خطأ' : 'Error occurred'}
</h2>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-5">
          <HomeSlider />
          <CategoriesSlider/>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8 px-5">
          {allProducts?.map((product) => (
            <Link
              to={`/productDetails/${product._id}`}
              key={product._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative group"
            >
              <img src={product.imageCover} alt="title" className="w-full object-cover rounded-lg" />
              <h2 className="font-semibold text-lg mt-2">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.category.name}</p>

              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold text-lg text-cyan-600 dark:text-cyan-400">
                  {product.priceAfterDiscount ? `${product.priceAfterDiscount} EGP` : `${product.price} EGP`}
                </p>
                {product.priceAfterDiscount && (
                  <p className="line-through text-red-500">{product.price} EGP</p>
                )}
              </div>

              <p className="text-sm text-yellow-500 mt-1">
                <i className="fa-solid fa-star"></i> {product.ratingsAverage}
              </p>

              <button
                onClick={(e)=>{
                  e.preventDefault()
                  handleAddProduct(product._id)}}
                className="absolute top-3 right-3 bg-cyan-700 hover:bg-green-500 text-white p-3 rounded-lg shadow-md transform scale-0 group-hover:scale-100 transition-all"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <button
            onClick={() => setPageNumber(1)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md ${
              pageNumber === 1 ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            1
          </button>
          <button
            onClick={() => setPageNumber(2)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md ${
              pageNumber === 2 ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
}

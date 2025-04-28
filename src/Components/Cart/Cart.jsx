import  { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import LoaderScreen from './../LoaderScreen/LoaderScreen';
   
import Swal from 'sweetalert2'; 
import { LanguageContext } from '../LanguageContext/LanguageContext';
import EmptyCart from '../EmptyCart/EmptyCart';

export default function Cart() {
  const{totalCartPrice,products,updateCount, removeItemFeomCart, clearCart }=useContext(cartContext)
  const { language} = useContext(LanguageContext);
 

  
  async function handleChangeCount(id, newCount) {
    const res = await updateCount(id, newCount);
    Swal.fire({
      title: res ? "Success!" : "Error!",
      text: res 
      ? (language === 'ar' ? 'تم تحديث العربة بنجاح' : 'Cart updated successfully!')
      : (language === 'ar' ? 'لم يتم تحديث العربة بنجاح' : 'Failed to update Cart!'),
      icon: res ? "success" : "error",
      toast: true,
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
  }

  async function handleDelete(id) {
    const isSuccess = await removeItemFeomCart(id);
    Swal.fire({
      title: isSuccess ? "Success!" : "Error!",
      text: res 
      ? (language === 'ar' ? 'تم مسح المنتج بنجاح' : 'Item removed successfully!')
      : (language === 'ar' ? 'لم يتم مسح المنتج بنجاح' : 'Failed to remove the Item!'),
      icon: isSuccess ? "success" : "error",
      toast: true,
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
   
  }

  if(!products){
    return  <LoaderScreen/>
  }

  async function handleClearCart() {
    const isSuccess = await clearCart();
    if (isSuccess) {
      

      Swal.fire({
        title: "",
        text: "Cart is empty",
        icon: "success",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        showConfirmButton: false,
      });

    }
  }

  return (
    <div className='bg-gray-200 dark:bg-gray-900'>
      <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-5"></h1>

      {products?.length === 0 ? (
       <EmptyCart/>
      ) : ( 
        <>
          <h2 className="text-lg font-semibold text-black dark:text-gray-400">{language =='ar' ? 'اجمالي سعر عربة التسوق ' :"Total Cart Price"}: <span className="text-cyan-600">{totalCartPrice} EGP</span></h2>
          <button onClick={handleClearCart} className="bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition-all mt-3">{language =='ar' ? "مسح عربة التسوق" :"Clear the Cart"}</button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-5 py-3">{language =='ar' ? "المنتج" :"Product"}</th>
                  <th className="px-5 py-3">{language =='ar' ? "الاسم" :"Name"}</th>
                  <th className="px-5 py-3">{language =='ar' ? "الكمية" :"Quantity"}</th>
                  <th className="px-5 py-3">{language =='ar' ? "السعر" :"Price"}</th>
                  <th className="px-5 py-3">{language =='ar' ? "إجراء" :"Action"}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded-md" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleChangeCount(product.product._id, product.count - 1)}><i className="fas fa-minus fa-2x p-1 text-lg  flex items-center justify-center text-dark-500 border border-green-500 rounded-full  hover:bg-cyan-900 active:bg-green-700 transition-all"></i>
                      </button>

                      <input
                        type="number"
                        value={product.count}
                        className="w-14 h-10 text-center border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        readOnly
                      />

                      <button
                        onClick={() => handleChangeCount(product.product._id, product.count + 1)}><i className="fas fa-plus fa-2x p-1 text-lg  flex items-center justify-center text-dark-500 border border-green-500 rounded-full  hover:bg-cyan-900 active:bg-green-700 transition-all"></i>
                      </button>
                      
                    </div>
                  </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(product.product._id)} className="text-red-600 dark:text-red-500 hover:underline">{language =='ar' ? "مسح" :"Remove"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/order">
            <button className="bg-cyan-900 text-white text-lg font-semibold py-2 px-5 w-full mt-5 rounded-md shadow-md hover:bg-green-500 transition-all">{language === 'ar' ? 'الذهاب الي الدفع' : 'Proceed to Checkout'}</button>
          </Link>

        </>
      )}
    </div>
    </div>
  )
}

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../LanguageContext/LanguageContext'
export default function EmptyCart() {
    const { language} = useContext(LanguageContext);
  return (
    
    <div className="text-center py-10">
<i className="fa-solid fa-cart-shopping text-black dark:text-gray-200 mb-10 text-[10rem]"></i>
<h2 className="text-xl  text-gray-600 dark:text-gray-300">{language == 'ar' ? 'عربة التسوق فارغة' : 'Your cart is empty'}</h2>
    <p className=" text-gray-500 dark:text-gray-400 mb-8">{language == 'ar' ? 'ابدأ التسوق الآن وأضف بعض المنتجات المذهلة' : 'Start shopping now and add some amazing products!'}</p>
    <Link to="/" className="bg-cyan-950 text-white p-3 rounded-md shadow-md hover:bg-green-500 transition-all">{language=='ar' ? 'الذهاب للتسوق' : 'Go to Shop'}</Link>
  </div>
  )
}
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../LanguageContext/LanguageContext'

export default function Footer() {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="bg-cyan-600 dark:bg-cyan-900 text-white dark:text-gray-300 p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4">
            {language === 'ar' ? 'من نحن' : 'About Us'}
          </h3>
          <p className="dark:text-gray-400">
            {language === 'ar'
              ? 'مرحبًا بك في متجرنا الإلكتروني! نحن نوفر منتجات عالية الجودة بأفضل الأسعار.'
              : 'Welcome to our e-commerce store! We provide high-quality products with the best deals.'}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">
            {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="hover:text-gray-300 dark:hover:text-gray-400">
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-300 dark:hover:text-gray-400">
                {language === 'ar' ? 'المنتجات' : 'Products'}
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-gray-300 dark:hover:text-gray-400">
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">
            {language === 'ar' ? 'اشترك معنا' : 'Subscribe'}
          </h3>
          <p className="dark:text-gray-400 mb-4">
            {language === 'ar'
              ? 'احصل على آخر العروض والتحديثات من متجرنا.'
              : 'Get updates on our latest offers and deals.'}
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              className="p-2 rounded-l bg-white text-black dark:bg-gray-800 dark:text-white w-full"
            />
            <button className="bg-gray-900 dark:bg-gray-700 p-2 rounded-r hover:bg-gray-800 dark:hover:bg-gray-600 transition">
              {language === 'ar' ? 'اشترك' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center space-x-5">
        <i className="fa-brands fa-facebook text-2xl cursor-pointer me-3 hover:text-gray-300 dark:hover:text-gray-400"></i>
        <i className="fa-brands fa-twitter text-2xl cursor-pointer hover:text-gray-300 dark:hover:text-gray-400"></i>
        <i className="fa-brands fa-instagram text-2xl cursor-pointer hover:text-gray-300 dark:hover:text-gray-400"></i>
        <i className="fa-brands fa-linkedin text-2xl cursor-pointer hover:text-gray-300 dark:hover:text-gray-400"></i>
      </div>

      <div className="text-center mt-5 text-gray-200 dark:text-gray-300 text-sm">
        {language === 'ar'
          ? '2025 جميع الحقوق محفوظة.'
          : '2025 FreshCart. All rights reserved.'}
      </div>
    </footer>
  )
}

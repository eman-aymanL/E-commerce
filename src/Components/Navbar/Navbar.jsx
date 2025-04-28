import logo from '../../assets/freshcart-logo-cropped.svg'
import { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from './../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';
import { LanguageContext } from '../LanguageContext/LanguageContext';

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { userToken, setuserToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  function handleLogOut() {
    localStorage.removeItem('tkn');
    setuserToken(null);
    navigate('/login');
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <nav className="z-50 p-5 bg-cyan-600 dark:bg-cyan-900 text-gray-200 dark:text-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to='/home'>
            <img src={logo} className="h-6 " alt="fresh cart Logo" />
          </Link>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {userToken && (
              <Link to="/cart">
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-2xl cursor-pointer"></i>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {numOfCartItems}
                  </span>
                </div>
              </Link>
            )}
            <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="text-sm px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 transition"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>

            
            <button
                onClick={toggleDarkMode}
                  className="text-2xl transition duration-500 ease-in-out hover:rotate-180"
                >
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-yellow-400 drop-shadow-sm animate-pulse"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-blue-200 drop-shadow-sm"></i>
                  )}
                </button>



            {!userToken && (
              <NavLink to='/login' className="block py-2 px-3 text-white rounded-sm hover:text-gray-400 transition-colors duration-300 md:p-0 dark:text-white dark:hover:text-gray-400">
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </NavLink>
            )}
            {userToken && (
              <button onClick={handleLogOut} className="py-2 px-4 hover:text-red-600 text-white text-sm font-medium transition duration-300 shadow-sm hover:shadow-md">
                {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            )}
          </div>
        </div>
      </nav>

      <nav className="z-50 p-3 bg-cyan-900 dark:bg-cyan-950 text-gray-200 dark:text-white">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex m-auto flex-row font-medium mt-0 space-x-2 sm:space-x-3 md:space-x-6 lg:space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <NavLink to="/home" className={({ isActive }) => `p-3 rounded-[10px] hover:text-gray-300 ${isActive ? 'bg-black/20' : ''}`}>{language==='ar' ?'الرئيسية':'Home'}</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({ isActive }) => `p-3 rounded-[10px] hover:text-gray-300 ${isActive ? 'bg-black/20' : ''}`}>{language==='ar' ?'الفئات':'Categories'}</NavLink>
              </li>
              <li>
                <NavLink to="/brands" className={({ isActive }) => `p-3 rounded-[10px] hover:text-gray-300 ${isActive ? 'bg-black/20' : ''}`}>{language === 'ar' ? 'الماركات' : 'Brands'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => `p-3 rounded-[10px] hover:text-gray-300 ${isActive ? 'bg-black/20' : ''}`}>{language === 'ar' ? 'المنتجات' : 'Products'}
                </NavLink>
              </li>
              <li>
                {userToken && (
                  <NavLink to="/allorders" className={({ isActive }) => `p-3 rounded-[10px] hover:text-gray-300 ${isActive ? 'bg-black/20' : ''}`}>{language === 'ar' ? 'طلباتي' : 'My orders'}</NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

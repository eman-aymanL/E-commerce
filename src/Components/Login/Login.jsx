import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import * as yup from 'yup'
import { authContext } from './../../Context/AuthContext';
import {loginTexts} from './LoginTexts'
import { LanguageContext } from '../LanguageContext/LanguageContext';
import clsx from 'clsx';


const user={
  email:'',
  password:'',
}

export default function Login() {
  const {setuserToken} = useContext(authContext)
  const { language } = useContext(LanguageContext);

  
  const t = loginTexts[language];

  function loginUser(values){
    setisClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    .then(function(x){
      localStorage.setItem('tkn',x.data.token)      
      setuserToken(x.data.token)
      setisSuccess(true)
      setisClicked(false)
      setTimeout(() => {
        navigate('/home')
      }, 2000);
      
    }).catch(function(x){
      setErrorMessage(x.response.data.message)
      setisClicked(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);
    })
    
  }
  
  const navigate =useNavigate()
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [isSuccess, setisSuccess] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const [isClicked, setisClicked] = useState(false)
  
  const togglePassword = () => {
    setshowPassword(!showPassword)
  }


  const registerFormik = useFormik({
    initialValues:user,
    onSubmit:loginUser,
    validationSchema: yup.object().shape({

      email: yup
        .string()
        .email(t.invalidEmail)
        .required(t.emailRequired),

    
      password: yup
        .string()
        .required(t.passwordRequired)
        .min(6, t.minPassword)
        .max(12, t.maxPassword),
    
  
    })
    

  })
  return (
    <div id='hero' className='lazy-bg min-h-screen dark:bg-gray-900 flex items-center justify-center p-5'>
         <div className=' bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md'>
         
         {ErrorMessage ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"role="alert">
          <span className="sr-only">Info</span>
           <div><span className="font-medium">{ErrorMessage}</span></div>
          </div> : ''}

          {isSuccess ? <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"role="alert">
          <span className="sr-only">Info</span>
           <div><span className="font-medium">{t.welcome}</span></div>
          </div> : ''}



      
        <h2 className='text-center dark:text-white bg-cyan-600 p-3 rounded-md m-5 text-white'>Login Now</h2>
        <form className="max-w-md mx-auto " onSubmit={registerFormik.handleSubmit}>
  
  
 
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-700
 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{t.email}</label>
      {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-2 text-sm text-red-600 dark:text-red-400">
    {registerFormik.errors.email}
  </div> : ''}
  </div>
  
  <div className="relative z-0 w-full mb-5 group">
  <span
    className={clsx(
      'absolute right-3 top-3 text-gray-600 cursor-pointer z-10',
      {
        'left-3 right-auto': language === 'ar',
      }
    )}
    onClick={togglePassword}
  >
    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
  </span>

  <input
    type={showPassword ? 'text' : 'password'}
    value={registerFormik.values.password}
    onBlur={registerFormik.handleBlur}
    onChange={registerFormik.handleChange}
    name="password"
    id="password"
    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer"
    placeholder=" "
    required
  />

  <label
    htmlFor="password"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    {t.password}
  </label>

  {registerFormik.errors.password && registerFormik.touched.password ? (
    <div className="p-2 text-sm text-red-600 dark:text-red-400">
      {registerFormik.errors.password}
    </div>
  ) : (
    ''
  )}
</div>


  
  <button type="submit" className="text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">
    {  !isClicked ? 'Login' :<ThreeDots
  visible={true}
  height="20"
  width="30"
  color="#fff"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />}



 </button>

  <p className='justify-center flex mt-5 dark:text-white'>{t.noAccount}<Link to='/register' className='text-cyan-700 mx-2'> {t.register}</Link></p>
 
</form>
    </div>
       </div>
  )
}
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import { LanguageContext } from '../LanguageContext/LanguageContext';
import { RegisterTexts } from './RegisterTexts';
import * as yup from 'yup'
import clsx from 'clsx';


const user={
  name:'',
  email:'',
  password:'',
  rePassword:'',
  phone:'',
}
export default function Register() {
 
  const { language } = useContext(LanguageContext);
  const texts = RegisterTexts[language];
 
  function registerUser(values){
    setisClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .then(function(){
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
  const [showPassword2, setshowPassword2] = useState(false)
  const togglePassword2 = () => {
    setshowPassword2(!showPassword2)
  }

  const registerFormik = useFormik({
    initialValues:user,
    onSubmit:registerUser,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(texts.requiredName)
        .min(3, texts.minName)
        .max(16, texts.maxName),
    
      email: yup
        .string()
        .email(texts.invalidEmail)
        .required(texts.requiredEmail),
    
        phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
    
      password: yup
        .string()
        .required(texts.requiredPassword)
        .min(6, texts.minPassword)
        .max(12, texts.maxPassword),
    
      rePassword: yup
        .string()
        .required(texts.confirmRequired)
        .oneOf([yup.ref('password')], texts.passwordNotMatch)
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
           <div><span className="font-medium">Congratulations!</span></div>
          </div> : ''}



      
        <h2 className='text-center dark:text-white bg-cyan-600 p-3 rounded-md m-5 text-white'>{texts.title}</h2>
        <form className="max-w-md mx-auto " onSubmit={registerFormik.handleSubmit}>
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-border-cyan-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{texts.name}</label>
      {registerFormik.errors.name && registerFormik.touched.name ? <div className="p-2 text-sm text-red-600 dark:text-red-400">
    {registerFormik.errors.name}
  </div> : ''}

  </div>
  
  <div className="relative z-0 w-full mb-5 group">
  <input
    type={showPassword ? 'text' : 'password'}
    value={registerFormik.values.password}
    onBlur={registerFormik.handleBlur}
    onChange={registerFormik.handleChange}
    name="password"
    id="password"
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer"
    placeholder=" "
    required
  />

  <div className="absolute top-2 text-gray-600 cursor-pointer flex items-center"
    style={{
      [language === 'ar' ? 'left' : 'right']: '12px'
    }}
  >
    <i 
      className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
      onClick={togglePassword}
    ></i>
  </div>

  <label
    htmlFor="password"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-border-cyan-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    {texts.password}
  </label>

  {registerFormik.errors.password && registerFormik.touched.password && (
    <div className="p-2 text-sm text-red-600 dark:text-red-400">
      {registerFormik.errors.password}
    </div>
  )}
</div>


  
<div className="relative z-0 w-full mb-5 group">
  <input
    type={showPassword2 ? 'text' : 'password'}
    value={registerFormik.values.rePassword}
    onBlur={registerFormik.handleBlur}
    onChange={registerFormik.handleChange}
    name="rePassword"
    id="rePassword"
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer"
    placeholder=" "
    required
  />

  <div className="absolute top-2 text-gray-600 cursor-pointer flex items-center"
    style={{
      [language === 'ar' ? 'left' : 'right']: '12px'
    }}
  >
    <i 
      className={`fa ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'}`} 
      onClick={togglePassword2}
    ></i>
  </div>

  <label
    htmlFor="rePassword"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-border-cyan-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    {texts.confirmPassword}
  </label>

  {registerFormik.errors.rePassword && registerFormik.touched.rePassword && (
    <div className="p-2 text-sm text-red-600 dark:text-red-400">
      {registerFormik.errors.rePassword}
    </div>
  )}
</div>

  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cyan-700 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-border-cyan-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{texts.phone}</label>
      {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="p-2 text-sm text-red-600 dark:text-red-400">
    {registerFormik.errors.phone}
  </div> : ''}
  </div>
  
  <button type="submit" className="text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">
    {  !isClicked ? texts.btn:<ThreeDots
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

  <p className='justify-center flex mt-5 dark:text-white'>{texts.account} <Link to='/login' className='text-cyan-700 mx-2'>{texts.btn}</Link></p>
 
</form>
    </div>
       </div>
  )
}
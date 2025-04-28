import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext/LanguageContext'

export default function Notfound() {
  const { language} = useContext(LanguageContext);
  return (
    <div className='h-screen bg-gray-200 dark:bg-gray-900 dark:text-white'>
      <div className='text-center p-10 flex-col content-center h-screen'>
      <h1 className='text-5xl '>{language=='ar' ? "لم يتم العثور " : "Not Found"} </h1>
      <h2 className='text-2xl mt-4'>{language=='ar' ? "هذه الصفحة غير موجودة" : "This page doesn’t exist"} </h2>
      <i className="fa-solid fa-xmark text-red-600 mb-10 text-[10rem]"></i>

      
            </div>
    </div>
  )
}
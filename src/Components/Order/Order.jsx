import axios from 'axios'
import { useContext, useState } from 'react';
import { cartContext } from './../../Context/CartContext';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 


export default function Order() {    

    const [isCash, setIsCash] = useState(true)
    const {cartId , resetValues} = useContext(cartContext)
    const navigate = useNavigate()
    const formikObj =useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
            },
        onSubmit : function(values){
            if(isCash){
                createCasOrder(values)
            }else{
                checkout(values)
            }
        }
    })

   function createCasOrder(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        shippingAddress: values
    },{
        headers:{
            token : localStorage.getItem('tkn')
        }
    })
    .then(function(resp){
        if(resp.data.status === 'success'){
            Swal.fire({
                title: "",
                text: "Order successfully created!",
                icon: "success",
                toast: true,
                position: "bottom-end",
                timer: 5000,
                showConfirmButton: false,
            });
            
            setTimeout(() => {
                navigate('/allorders') 
            }, 2000);

            resetValues();
        }
    })
    .catch(function(){
        Swal.fire({
                title: "Error!",
                text: "You have to add products to your cart first!",
                icon: "error",
                toast: true,
                position: "bottom-end",
                timer: 5000,
                showConfirmButton: false,
              })
    })
}

function checkout(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
      shippingAddress:values
    },{
      headers:{
        token: localStorage.getItem('tkn')
      },
      params:{
        url: "http://localhost:5173"
      }
    }).then(({data})=>{
        window.open(data.session.url,"_self")
        
    })
  }

  return (
    <div id='hero' className='lazy-bg min-h-screen dark:bg-gray-900 flex items-center justify-center p-5'>
        <div className=' bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md'>
        <form onSubmit={formikObj.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-900 dark:focus:border-cyan-900" required />
        </div>
        <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-900 dark:focus:border-cyan-900" required />
        </div>
        <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-900 dark:focus:border-cyan-900" required />
        </div>

        <button onClick={()=>setIsCash(true)} type="submit" className="me-4 text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-cyan-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-900 dark:hover:bg-cyan-900 dark:focus:ring-cyan-900 mb-3">pay cash</button>
       
       
       
        <button onClick={()=>setIsCash(false)} type="submit" className="text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-cyan-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-900 dark:hover:bg-cyan-900 dark:focus:ring-cyan-900">pay online</button>
       
       
        </form>
        </div>
        

        

    </div>

  )
}

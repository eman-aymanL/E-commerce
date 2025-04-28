import axios from 'axios'
import  { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext'


export const cartContext=createContext()

export default function CartContextProvider({children}) {
    const{userToken}=useContext(authContext)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [products, setproducts] = useState(null)
    const [cartId, setCartId] = useState(null)
    
    async function addProductToCart(id){
        const res =await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId:id,
        },{
            headers:{
                token:userToken
            }
        }).then(function(res){
            setCartId(res.data.cartId)
            getUserCart()
            // setnumOfCartItems(res.data.numOfCartItems)
            // setproducts(res.data.data.products)
            // settotalCartPrice(res.data.data.totalCartPrice)
            return true
            
        }).catch(function(err){
            console.log('err',err);
            return false
        })
        return res;
    }

    function getUserCart(){
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token: userToken
            }
        }).then(function(resp){
            setnumOfCartItems(resp.data.numOfCartItems)
            setproducts(resp.data.data.products)
            settotalCartPrice(resp.data.data.totalCartPrice)
            setCartId(resp.data.cartId)
            
        }).catch(function(err){
            console.log(err);
            
        })
    }
    useEffect(() => {
      if(userToken){
        getUserCart()
      }

    }, [userToken])
    

    async function updateCount(id,newCount){
        const res =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            "count": newCount
        },
        {
            headers:{
                token: userToken
            }
        }
    )
    .then(function(resp){
        setnumOfCartItems(resp.data.numOfCartItems)
        settotalCartPrice(resp.data.data.totalCartPrice)
        setproducts(resp.data.data.products)
        return true
    })
    .catch(function(err){
        console.log('err',err)
        return false
    })
    return res
    }


    async function removeItemFeomCart(id){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
            headers:{token: userToken}
        })
        .then(function(resp){
            setnumOfCartItems(resp.data.numOfCartItems)
            settotalCartPrice(resp.data.data.totalCartPrice)
            setproducts(resp.data.data.products)
            return true
            
        }).catch(function(err){
            console.log('err',err);
            return false
        })
        return res
    }

    async function clearCart() {
        const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{
            headers:{token: userToken}
        })
        .then(function(resp){
            setnumOfCartItems('0')
            settotalCartPrice('0')
            setproducts(null)
            console.log(resp.data);
            getUserCart()
            
            return true
            
        }).catch(function(err){
            console.log('err',err);
            return false
        })
        return res
    }

    function resetValues(){
        settotalCartPrice(0)
        setproducts(null)
        setCartId(null)
        getUserCart()
    }



  return (
    <cartContext.Provider value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        products,
        updateCount,
        removeItemFeomCart,
        clearCart,
        cartId,
        resetValues,
    }}>
        {children}
    </cartContext.Provider>
  )
}

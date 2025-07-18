import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategories() {
    const res=useQuery({
        queryKey:'[getAllCategories]',
        queryFn:getAllCategories
      })
    
      function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }

    
  return res;
}

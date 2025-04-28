import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import { Link } from 'react-router-dom';

export default function Brands() {
  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['getAllBrands'],
    queryFn: getAllBrands,
  });


  const allBrands = data?.data?.data; 

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center">
  <div className="container mx-auto p-5">
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
      {allBrands?.map((brand) => (
        <Link to={`/brandsDetails/${brand._id}`} key={brand._id}>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="mt-2 font-semibold text-gray-800 dark:text-gray-200">{brand.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
}

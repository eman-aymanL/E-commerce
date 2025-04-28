import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import { Link } from 'react-router-dom'
import useCategories from '../CustomHooks/useCategories'

export default function CategoriesPage() {
  const { data, isLoading, isError } = useCategories();
  const allCategories = data?.data.data;

  if (isError) {
    return <h2 className="text-center text-red-500 mt-10 text-lg">Error occurred</h2>;
  }

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className='bg-gray-100 min-h-screen dark:bg-gray-900'>
      <div className="container mx-auto p-8">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allCategories?.map((category) => (
            <Link to={`/categoryDetails/${category._id}`} key={category._id}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <h2 className="mt-3 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoaderScreen from './../LoaderScreen/LoaderScreen';
import useCategories from '../CustomHooks/useCategories';

export default function CategoriesSlider() {

  const {data,isLoading,isError}=useCategories()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const allCategories=data?.data.data


  if (isLoading) {
    return <LoaderScreen/>;
  }

  if (isError) {
    return <h2 className="text-center text-lg font-semibold text-red-500">Error loading categories</h2>;
  }

  return (
    <div className="mb-10">
      <Slider {...settings}>
        {allCategories?.map((category) => (
          <div key={category._id}>
            <div className="w-full h-64 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

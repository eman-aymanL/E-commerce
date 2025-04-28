import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/grocery-banner.png'
import img2 from '../../assets/slider-image-1.jpeg' 
import img3 from '../../assets/slider-2.jpeg'
import img4 from '../../assets/banner-4.jpeg'
import img5 from '../../assets/slider-image-2.jpeg'
import img6 from '../../assets/slider-image-3.jpeg'

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000,
        arrows:false
      };
      return (
        <div className="px-5 mb-10 flex w-full">
          <Slider {...settings} className="w-full">
            <div>
              <img src={img2} alt="food" className="w-full h-72 object-cover rounded-lg" />
            </div>
            <div>
              <img src={img3} alt="food" className="w-full h-72 object-cover rounded-lg" />
            </div>
            <div>
              <img src={img4} alt="food" className="w-full h-72 object-cover rounded-lg" />
            </div>
            <div>
              <img src={img6} alt="food" className="w-full h-72 object-cover rounded-lg" />
            </div>
            <div>
              <img src={img5} alt="food" className="w-full h-72 object-cover rounded-lg" />
            </div>
          </Slider>
        </div>
      );
    }

import Slider from "react-slick";
import image1 from './../../assets/images/slider/image1.webp'
import image2 from './../../assets/images/slider/image2.webp'
import image3 from './../../assets/images/slider/image3.webp'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true, 
    };

    return (
        <div className="w-full h-[500px]">
            <Slider {...settings}>
                <div>
                    <img src={image1} alt="Slide 1" className="w-full h-5/6 object-cover" />
                </div>
                <div>
                    <img src={image2} alt="Slide 2" className="w-full h-5/6 object-cover" />
                </div>
                <div>
                    <img src={image3} alt="Slide 3" className="w-full h-5/6 object-cover" />
                </div>
            </Slider>
        </div>
    );
};

export default Banner;
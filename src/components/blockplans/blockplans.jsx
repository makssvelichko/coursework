import './blockplans.css'
import photo_plans1 from './../../img/photo/Section2.png'
import photo_plans2 from './../../img/photo/Section1.png'
import photo_plans3 from './../../img/photo/Section.png'
import photo_plans4 from './../../img/photo/Section (1).png'
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Blockplans = () => {
    return (<div className='conteiner_blockplans'>
        <div>
            <p className='text_plans'>Плани підписки для тебе</p>
        <div className='carusel'>
            <Carousel className='my-carousel' responsive={responsive} arrows infinite={true}>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans1' src={photo_plans1} alt="Plan 1" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>1 МІСЯЦЬ</p>
                            <p className='image-text-plans2'>640 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><a className='start_plan' href="#!">Почати</a></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans2' src={photo_plans2} alt="Plan 2" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>6 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>1632 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><a className='start_plan' href="#!">Почати</a></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans3' src={photo_plans3} alt="Plan 3" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>6 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>2496 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><a className='start_plan' href="#!">Почати</a></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans4' src={photo_plans4} alt="Plan 4" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>12 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>3840 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><a className='start_plan' href="#!">Почати</a></p>
                        </div>
                </div>
            </Carousel>
        </div>
        </div>
    </div>);
}
 
export default Blockplans;
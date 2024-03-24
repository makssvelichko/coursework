import './mainprograms.css'
import photoprograms1 from './../../img/photo/Link1.1.png'
import photoprograms2 from './../../img/photo/Link1.2.png'
import photoprograms3 from './../../img/photo/Link1.3.png'

const Mainprograms = () => {
    return (<section className="mainprograms">
        <div className="conteinerprograms">
            <div className="contentprograms">
                <div className='text_programs'>
                    Програми
                </div>
                <div className='programs_card'>
                    <ul>
                        <li>
                            <a href="#!">
                                <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={photoprograms1} alt="card1" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Beginner</p>
                                        <div>
                                            <p className='image-text2'>Beginner program</p>
                                            <p className='image-text3'>4568 likes - 56 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li><a href="#!">
                        <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={photoprograms2} alt="card2" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Intermediate</p>
                                        <div>
                                            <p className='image-text2'>Intermediate program</p>
                                            <p className='image-text3'>6901 likes - 123 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li><a href="#!">
                        <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={photoprograms3} alt="card3" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Advanced</p>
                                        <div>
                                            <p className='image-text2'>Advanced program</p>
                                            <p className='image-text3'>3863 likes - 52 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='programs_btn'>
                    <a href="#!">Всі програми</a>
                </div>
            </div>
        </div>
    </section>);
}
 
export default Mainprograms;
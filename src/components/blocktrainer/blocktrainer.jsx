import './blocktrainer.css'
import trainer_inst from './../../img/logo/Rectangle 41.png'
import trainer_telega from './../../img/logo/Rectangle 40.png'
import trainer_youtube from './../../img/logo/Rectangle 42.png'
import photo_trainer from './../../img/photo/Rectangle 32.png'

const Blocktrainer = () => {
    return (<section className="blocktrainer">
        <div className="conteiner">
            <div className='block_trainer'>
                <ul className='ul1'>
                    <li>
                        <div className='list_trainer'>
                            <p className='artem'>Кругляк Артем, 18</p>
                            <ul>
                                <li>● Досвід у спорті 6+ років</li>
                                <li>● Сертифікований тренер FitLab, Coursera</li>
                                <li>● Сертифікований інструктор тренажерної зали</li>
                                <li>● 100+ годин навчання</li>
                                <li>● Працює тренером в @energy.ostroh</li>
                                <li>● Мотивує та вчить розумінню дисципліни та спорту</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className='middle_trainer'>
                            <p className='bold_text_trainer'>Тренер</p>
                            <div>
                                <p className='middle_trainer_text'>Дізнатися більше можна тут</p>
                                <ul className='social_network'>
                                    <li>
                                        <a href="https://www.instagram.com/t.kruhliak?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                                            <img className='inst' src={trainer_inst} alt="inst" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/kaisteam" target="_blank" rel="noopener noreferrer">
                                            <img className='telega' src={trainer_telega} alt="telega" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/@KA1WAY" target="_blank" rel="noopener noreferrer">
                                            <img className='youtube' src={trainer_youtube} alt="youtube" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='photo_trainer_block'>
                            <img className='photo_trainer' src={photo_trainer} alt="trainer" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>);
}
 
export default Blocktrainer;
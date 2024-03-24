import './start.css'
import photo1 from './../../img/photo/workouts-library-36a4ef01f5bc38a1bf26ab7d6d246bc85fc7e0f4cb6b59c2eba30d24d6924e2f.jpg.png'

const Start = () => {
    return (<section className="start">
        <div className="conteiner">
            <div className='start_line'>
            <div className='start_photo'>
                <img src={photo1} alt="photo" />
            </div>
            <div className='textblock'>
                <ul>
                    <li className='li_one'>Різні рівні підготовки</li>
                    <li className='li_two'>Тренування будь-де та відео уроки для тебе</li>
                    <li className='li_p'>.</li>
                    <li className='btn_start'><a href="#!" className='btn_a'>Почати</a></li>
                </ul>
            </div>
            </div>
        </div>
    </section>);
}
 
export default Start;
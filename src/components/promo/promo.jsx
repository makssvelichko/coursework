import './promo.css'
import photo1 from './../../img/photo/Section0.png'

const Promo = () => {
    return (<section className="promo">
        <div className="conteiner">
            <div className="content">
                <div className="img">
                    <img src={photo1} alt="img" />
                    <div className="text">
                        <p className='toptext'>Почни зміни вже зараз</p>
                        <p className='bottomtext'>Побудуй форму своєї мрії</p>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}
 
export default Promo;
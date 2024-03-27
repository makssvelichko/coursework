import Footer from '../components/footer/footer';
import HeaderLogin from '../components/header_login/header_login';
import './../styles/login.css'

const Login = () => {
    return ( 
        <>
        <HeaderLogin/>
        <div className='login'>
            Login
        </div>
        <Footer/>
        </>
     );
}
 
export default Login;
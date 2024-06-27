import '../styles/pages/footer.css'
import { TiSocialFacebook,  TiSocialGithub,TiSocialLinkedin} from "react-icons/ti";


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="foter-content">
            <div className="footer-content-left">
                <img src={'/images/t-logo.jpg'}/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum omnis saepe possimus temporibus quasi tempore, provident, fugiat explicabo sint, aliquid dolorem ad et optio nulla quaerat numquam. Ut, dignissimos voluptatum?</p>
                <div className="footer-social-icons">
                    <span>{<TiSocialFacebook />} </span>
                    <span> {<TiSocialLinkedin/>}</span>
                    <span> {<TiSocialGithub/>} </span>
                </div>
            </div>
            <div className="footer-content-middle">
                <h2>company</h2>
                <ul>
                    <li>home</li>
                    <li>delivery</li>
                    <li>about us</li>
                    <li>privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>get in touch</h2>
                <ul>
                    <li>+251-9 40 13 78 55</li>
                    <li>mechuriachn@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p >copyright2024 @ tinsu.com-allrights reserved</p>
    </div>
  )
}

export default Footer

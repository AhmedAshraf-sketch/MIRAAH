import logo from '../images/Miraah.png'
import '../css/Header.css'

function Header () {
return (
    <header id="hd">
        <img id="logo" src={logo} alt="Miraah logo" />
    </header>
)
}

export default Header
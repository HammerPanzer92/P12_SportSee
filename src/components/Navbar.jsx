import logo from "/logo.png";

function Navbar(){
    return(
        <nav>
            <img src={logo} alt="Logo de SportSee"/>
            <p>Acceuil</p>
            <p>Profil</p>
            <p>Réglage</p>
            <p>Communauté</p>
        </nav>
    );
}

export default Navbar;
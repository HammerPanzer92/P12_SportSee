import logo from "/logo.png";

function Navbar() {
  return (
    <nav>
      <img src={logo} alt="Logo de SportSee" />
      <div className="link-container">
        <p>Acceuil</p>
        <p>Profil</p>
        <p>Réglage</p>
        <p>Communauté</p>
      </div>
    </nav>
  );
}

export default Navbar;

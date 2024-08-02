import iconOne from "/Icon_1.png";
import iconTwo from "/Icon_2.png";
import iconThree from "/Icon_3.png";
import iconFour from "/Icon_4.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="icon_container">
        <div className="sidebar_icon">
          <img src={iconOne} alt="Méditation" />
        </div>
        <div className="sidebar_icon">
          <img src={iconTwo} alt="Natation" />
        </div>
        <div className="sidebar_icon">
          <img src={iconThree} alt="Cyclisme" />
        </div>
        <div className="sidebar_icon">
          <img src={iconFour} alt="Musculation" />
        </div>
      </div>
      <p className="copyright">Copiryght, SportSee 2020</p>
    </div>
  );
}

export default Sidebar;

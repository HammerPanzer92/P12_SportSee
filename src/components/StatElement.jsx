export function StatElement(props){

    console.log("STAT ELEMENT PROPS");
    console.log(props);

    var imgSrc = "/";
    var name = "";

    switch(props.type){
        case "calorieCount":
            imgSrc += "cal_icon.svg";
            name = "Calories";
            break;
        case "proteinCount":
            imgSrc += "protein_icon.svg";
            name = "Proteines";
            break;
        case "carbohydrateCount":
            imgSrc += "glucide_icon.svg";
            name = "Glucides";
            break;
        case "lipidCount":
            imgSrc += "burger_icon.png";
            name = "Lipides";
            break;
        default:
            break;
    }

    return (
        <div className={'stat_div ' + props.type}>
            <div className="stat_icon">
                <img src={imgSrc} alt={props.type}/>
            </div>
            <div className="stat_info">
                <p className="stat_quantity">{props.quantity}{props.type === "calorieCount" ? "kCal" : "g"}</p>
                <p className="stat_name">{name}</p>
            </div>
        </div>
    );
}
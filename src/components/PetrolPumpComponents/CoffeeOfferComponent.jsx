import SmallFrame from "../commons/SmallFrame";
import data from "./data.json";
import { useSceneObject } from "../../context/SceneObjectContext";

const CoffeeOfferComponent = () => {
  const { showCoffee } = useSceneObject();

  const handleButtonClick = (e) => {
    e.stopPropagation();
    showCoffee();
  };

  return (
    <SmallFrame

        padding="2rem"
        overlayTop="49.2%"
        blackBandWidth="96%"
        blackBandHeight="90%"
        overlayLeft="49.5%"
        overlayBorderRadius="2rem"
      title={data.coffeeOffer.title}
      description=" "
      rowStyle={{ fontSize: '0.7rem' ,fontWeight: 'lighter'}}
      keyPointStyle={{ fontSize: '0.7rem',fontWeight: 'lighter' }}
      titleStyle={{ fontSize: '1rem' }}
      descriptionStyle={{ fontSize: '1rem' }}
      rowLabelStyle={{ fontSize: '0.8rem' }}
      rowValueStyle={{ fontSize: '0.8rem' }}
      buttonStyle={{ fontSize: '0.8rem' ,
        fontWeight: 'lighter',
        color: '#909097f1',
        backgroundColor: '#ffffffff',
      }}
      buttonText="Offer details"
      disabled={true}
      showButton={true}
  
    />
  );
};

export default CoffeeOfferComponent;

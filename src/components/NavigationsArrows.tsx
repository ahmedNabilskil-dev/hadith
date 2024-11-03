import { IonButton, IonIcon, IonRow } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import "./NavigationArrows.css"; // Make sure to create this CSS file

const NavigationArrows: React.FC<{
  onPrev: () => void;
  onNext: () => void;
}> = ({ onPrev, onNext }) => {
  return (
    <IonRow
      className="navigation-arrows ion-justify-content-between ion-align-items-center ion-padding"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "0",
        right: "0",
        zIndex: 10,
      }}
    >
      <IonButton onClick={onPrev} className="arrow-button">
        <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
      </IonButton>
      <IonButton onClick={onNext} className="arrow-button">
        <IonIcon icon={chevronBackOutline} className="arrow-icon" />
      </IonButton>
    </IonRow>
  );
};

export default NavigationArrows;

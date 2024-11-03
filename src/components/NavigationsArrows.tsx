import { IonButton, IonIcon, IonRow } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";

const NavigationArrows: React.FC<{
  onPrev: () => void;
  onNext: () => void;
}> = ({ onPrev, onNext }) => {
  return (
    <IonRow
      className="ion-justify-content-between ion-align-items-center ion-padding"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "0",
        right: "0",
        zIndex: 10,
      }}
    >
      <IonButton onClick={onPrev} color="success" shape="round" size="large">
        <IonIcon icon={chevronBackOutline} slot="icon-only" />
      </IonButton>
      <IonButton onClick={onNext} color="success" shape="round" size="large">
        <IonIcon icon={chevronForwardOutline} slot="icon-only" />
      </IonButton>
    </IonRow>
  );
};

export default NavigationArrows;

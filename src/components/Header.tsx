import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

const Header: React.FC<{
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}> = ({ title, showBackButton = false, onBack }) => (
  <IonHeader>
    <IonToolbar>
      {showBackButton && (
        <IonButtons slot="start">
          <IonButton onClick={onBack}>
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonButtons>
      )}
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;

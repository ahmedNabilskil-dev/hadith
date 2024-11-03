import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
} from "@ionic/react";

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start"></IonButtons>
        <IonTitle className="ion-text-center">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;

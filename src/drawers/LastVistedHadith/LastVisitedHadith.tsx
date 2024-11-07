import React from "react";
import { IonButton, IonContent, IonText, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./DrawerContent.css";
import { DrawerProps } from "../../Providers/DrawerProvider";

interface LastVisitedHadithDrwProps extends DrawerProps {
  lastHadithId: number; // ID of the last visited Hadith
}

const LastVisitedHadithDrw: React.FC<LastVisitedHadithDrwProps> = ({
  onClose,
  lastHadithId,
}) => {
  const history = useHistory();

  const handleContinueReading = () => {
    history.push(`/hadith/${lastHadithId}`);
    onClose(); // Close the drawer after navigating
  };

  return (
    <IonContent className="drawer-content">
      <IonToolbar className="drawer-header">
        <IonText className="drawer-title">Continue Reading?</IonText>
      </IonToolbar>
      <IonText className="drawer-message">
        Do you want to continue reading from where you last left off?
      </IonText>
      <div className="drawer-buttons">
        <IonButton expand="block" color="medium" onClick={onClose}>
          No, Thanks
        </IonButton>
        <IonButton
          expand="block"
          color="primary"
          onClick={handleContinueReading}
        >
          Yes, Continue
        </IonButton>
      </div>
    </IonContent>
  );
};

export default LastVisitedHadithDrw;

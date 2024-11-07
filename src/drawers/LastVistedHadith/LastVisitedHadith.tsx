import React from "react";
import { IonButton, IonText, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./LastVisitedHadith.css";
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
    <div className="drawer-content">
      <IonToolbar className="drawer-header">
        <IonText className="drawer-title">متابعة القراءة؟</IonText>
      </IonToolbar>
      <IonText className="drawer-message">
        هل تريد متابعة القراءة من حيث توقفت آخر مرة؟
      </IonText>
      <div className="drawer-buttons">
        <IonButton expand="block" color="medium" onClick={onClose}>
          لا، شكرًا
        </IonButton>
        <IonButton
          expand="block"
          color="primary"
          onClick={handleContinueReading}
        >
          نعم، متابعة
        </IonButton>
      </div>
    </div>
  );
};

export default LastVisitedHadithDrw;

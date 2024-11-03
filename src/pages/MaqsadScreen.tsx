import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMaqsad } from "../Providers/SystemProvider";
import "./MaqsadScreen.css";

interface MaqsadScreenProps {}

const MaqsadScreen: React.FC<MaqsadScreenProps> = () => {
  const { maqsads, loading } = useMaqsad();
  const history = useHistory();

  const handleNavigation = (maqsadId: number) => {
    history.push(`/books/${maqsadId}`);
  };

  if (loading) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner name="crescent" />
        <IonText>Loading Maqsads...</IonText>
      </div>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">المقاصد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            {maqsads?.map((maqsad) => (
              <IonCol size="6" key={maqsad._id}>
                <IonCard
                  button
                  onClick={() => handleNavigation(maqsad._id)}
                  className="maqsad-card"
                >
                  <IonCardContent className="ion-text-center">
                    <IonImg
                      src={maqsad.icon}
                      className="maqsad-icon"
                      style={{
                        borderRadius: "50%",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                        width: "50px",
                        height: "50px",
                        marginBottom: "10px",
                      }}
                    />
                    <IonText className="maqsad-title">{maqsad.title}</IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MaqsadScreen;

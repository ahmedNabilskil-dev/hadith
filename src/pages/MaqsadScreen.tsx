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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMaqsad } from "../Providers/SystemProvider";

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
      </div>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maqsads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding ion-margin-top">
          <IonRow className="ion-justify-content-center">
            {maqsads?.map((maqsad) => (
              <IonCol
                size="6"
                key={maqsad._id}
                className="ion-align-items-center ion-margin-bottom"
              >
                <IonButton
                  fill="clear"
                  expand="block"
                  onClick={() => handleNavigation(maqsad._id)}
                  className="ion-text-center ion-padding ion-no-shadow"
                >
                  <div
                    className="ion-text-center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IonImg
                      src={maqsad.icon}
                      className="maqsad-icon"
                      style={{
                        marginBottom: "8px",
                        width: "60px",
                        height: "60px",
                      }}
                    />
                    <IonText className="ion-text-center ion-font-bold">
                      {maqsad.title}
                    </IonText>
                  </div>
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MaqsadScreen;

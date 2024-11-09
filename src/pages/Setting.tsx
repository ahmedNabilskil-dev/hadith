import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { heart,alert } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Setting.css";

const settingScreen: React.FC = () => {
  const history = useHistory();

  const settings = [
    {name:"المفضله",Icon:heart,route:'/fav'},
    {name:"الملاحظات",Icon:alert,route:'/notes'},
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">المذيد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            {settings?.map((setting,i) => (
              <IonCol size="8" key={i}>
                <IonCard
                  button
                  onClick={() => history.push(setting.route)}
                  className="setting-card"
                >
                  <IonCardContent style={{display:'flex',flexDirection:'column',alignItems:"center"}} className="ion-text-center">
                  <IonIcon size="large" className="setting-icon"
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        marginBottom: "20px",
                      }} icon= {setting.Icon} />
                    <IonText className="setting-title">{setting.name}</IonText>
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

export default settingScreen;

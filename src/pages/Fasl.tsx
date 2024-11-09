import {
    IonButton,
    IonIcon,
    IonContent,
    IonText,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSpinner,
  } from "@ionic/react";
  import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
  import { useHistory, useParams } from "react-router-dom";
  import { useMaqsad } from "../Providers/SystemProvider";
  import { useLocation } from 'react-router-dom';
  
  interface FaslScreenProps {}
  
  const FaslScreen: React.FC<FaslScreenProps> = () => {
    const location = useLocation();

    // Create a function to parse query parameters
    const getQueryParams = (query:string) => {
      return new URLSearchParams(query);
    };
  
    // Get the query parameters from the URL
    const queryParams = getQueryParams(location.search);
    const bookId = queryParams.get('bookId');
    const maqsadId = queryParams.get('maqsadId');
    const { maqsads, loading } = useMaqsad();
    const history = useHistory();
  
    const fasls =
      maqsads.find((maqsad)=>maqsad._id.toString()==maqsadId)?.ketab.find((ket)=>ket._id.toString()==bookId)?.fasls|| [];
  
    const handleBack = () => history.goBack();
    const handleBookClick = (faslId: number) => {
      history.push(`/categories?bookId=${bookId}&faslId=${faslId}`);
    };
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot="start" onClick={handleBack}>
              <IonIcon icon={chevronForwardOutline} />
            </IonButton>
            <IonTitle className="ion-text-center">الفصول</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          {loading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner name="crescent" />
              <IonText>جارٍ تحميل الفصول...</IonText>
            </div>
          ) : (
            fasls.map((fasl) => (
              <IonButton
                key={fasl._id}
                fill="clear" // Change to clear button style to match Maqsad design
                expand="block"
                onClick={() => handleBookClick(fasl._id)}
                className="book-button" // Custom class for additional styling
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className="button-content"
                >
                  <IonText className="book-title">{fasl.name}</IonText>
                  <IonIcon icon={chevronBackOutline} className="book-icon" />
                </div>
              </IonButton>
            ))
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default FaslScreen;
  
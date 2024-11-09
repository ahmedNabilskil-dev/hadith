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
import { MaqsadI } from "../interfaces/Maqsad";

interface BooksScreenProps {}

const BooksScreen: React.FC<BooksScreenProps> = () => {
  const { maqsadId } = useParams<{ maqsadId: string }>();
  const { maqsads, loading } = useMaqsad();
  const history = useHistory();

  const books =
    maqsads.find((maqsad) => maqsad._id.toString() === maqsadId)?.ketab || [];

  const handleBack = () => history.goBack();
  const handleBookClick = (book: MaqsadI['ketab'][number]) => {
    if(book.fasls[0]._id){
    
      history.push(`/fasls?bookId=${book._id}&maqsadId=${maqsadId}`);
    }else{
      history.push(`/categories?bookId=${book._id}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={handleBack}>
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
          <IonTitle className="ion-text-center">الكتب</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <IonText>جارٍ تحميل الكتب...</IonText>
          </div>
        ) : (
          books.map((book) => (
            <IonButton
              key={book._id}
              fill="clear" // Change to clear button style to match Maqsad design
              expand="block"
              onClick={() => handleBookClick(book)}
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
                <IonText className="book-title">{book.title}</IonText>
                <IonIcon icon={chevronBackOutline} className="book-icon" />
              </div>
            </IonButton>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default BooksScreen;

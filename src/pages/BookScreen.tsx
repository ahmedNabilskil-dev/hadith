import {
  IonButton,
  IonIcon,
  IonContent,
  IonText,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { useMaqsad } from "../Providers/SystemProvider";

interface BooksScreenProps {}

const BooksScreen: React.FC<BooksScreenProps> = () => {
  const { maqsadId } = useParams<{ maqsadId: string }>();
  const { maqsads, loading } = useMaqsad();
  const history = useHistory();

  // Find books under the selected maqsad
  const books =
    maqsads.find((maqsad) => maqsad._id.toString() == maqsadId)?.ketab || [];

  const handleBookClick = (bookId: number) => {
    history.push(`/categories/${bookId}`); // Navigate to categories screen with bookId
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Books</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-margin-top">
        {books.map((book) => (
          <IonButton
            key={book._id}
            fill="clear"
            expand="block"
            onClick={() => handleBookClick(book._id)}
            className="ion-justify-content-between ion-align-items-center ion-text-right ion-padding ion-margin-vertical"
          >
            <IonText className="text-lg font-semibold">{book.title}</IonText>
            <IonIcon
              icon={chevronBackOutline}
              slot="end"
              className="ion-icon"
            />
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default BooksScreen;

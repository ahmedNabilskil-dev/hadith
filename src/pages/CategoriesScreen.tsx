import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { chevronBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { basePath } from "../common/env";

interface BooksScreenProps {}

const CategoriesScreen: React.FC<BooksScreenProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const history = useHistory();

  const [categories, setCategories] = useState<
    { category_name: string; category_id: number; hadith_no: number }[]
  >([]);
  const fetchCategories = async () => {
    const res = await axios.get(`${basePath}/hadiths/categories/${bookId}`);
    setCategories(res.data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, [bookId]);

  const handleBookClick = (firstHadith: number) => {
    history.push(`/hadith/${firstHadith}`); // Navigate to categories screen with bookId
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-margin-top">
        {categories.map((category) => (
          <IonButton
            key={category.category_id}
            fill="clear"
            expand="block"
            onClick={() => handleBookClick(category.hadith_no)}
            className="ion-justify-content-between ion-align-items-center ion-text-right ion-padding ion-margin-vertical"
          >
            <IonText className="text-lg font-semibold">
              {category.category_name}
            </IonText>
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

export default CategoriesScreen;

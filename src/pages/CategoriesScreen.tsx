import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { basePath } from "../common/env";
import "./Categories.css";
interface CategoriesScreenProps {}

const CategoriesScreen: React.FC<CategoriesScreenProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const history = useHistory();

  const [categories, setCategories] = useState<
    { category_name: string; category_id: number; hadith_no: number }[]
  >([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${basePath}/hadiths/categories/${bookId}`);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [bookId]);

  const handleBack = () => history.goBack();
  const handleBookClick = (firstHadith: number) => {
    history.push(`/hadith/${firstHadith}`); // Navigate to hadith screen with firstHadith
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
        {categories.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <IonText>جارٍ تحميل الفصول...</IonText>
          </div>
        ) : (
          categories.map((category) => (
            <IonButton
              key={category.category_id}
              fill="clear" // Use solid fill for a contained button
              expand="full" // Full width for button
              onClick={() => handleBookClick(category.hadith_no)}
              className="category-button" // Custom class for styling
            >
              <div className="button-content">
                <IonText className="category-title">
                  {category.category_name}
                </IonText>
                <IonIcon icon={chevronBackOutline} className="category-icon" />
              </div>
            </IonButton>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default CategoriesScreen;

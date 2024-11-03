import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import FootnotesSection from "../components/Footnotes";
import HadithCard from "../components/HadithCard";
import NavigationArrows from "../components/NavigationsArrows";
import { useHadiths } from "../hooks/useHadiths";
import "./BookScreen.css";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface HadithScreenV2Props {}

const HadithScreen: React.FC<HadithScreenV2Props> = () => {
  const { firstHadith } = useParams<{ firstHadith: string }>();
  const { hadiths, goToNextHadith, goToPrevHadith } = useHadiths(
    Number(firstHadith)
  );

  const takhreej = hadiths[hadiths.length - 1]?.takhreej;
  const footnotes = hadiths.flatMap((hadith) => hadith.footnotes);
  const history = useHistory();
  const handleBack = () => history.goBack();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={handleBack}>
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
          <IonTitle className="ion-text-center">الحديث</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {hadiths.length > 0 && (
          <IonCard className="ion-margin-bottom">
            <IonCardContent>
              <IonText color="primary">
                <h2 className="ion-text-center text-lg font-bold">
                  {hadiths[0].category_name}
                </h2>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}
        {hadiths.map((hadith, index) => (
          <HadithCard key={index} hadith={hadith} />
        ))}
        {(footnotes.length > 0 || takhreej) && (
          <FootnotesSection footnotes={footnotes} takhreej={takhreej} />
        )}
        <NavigationArrows onPrev={goToPrevHadith} onNext={goToNextHadith} />
        <div style={{ height: 80 }}></div>
      </IonContent>
    </IonPage>
  );
};

export default HadithScreen;

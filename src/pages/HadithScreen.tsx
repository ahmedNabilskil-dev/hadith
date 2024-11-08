import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
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
import { heartOutline, chevronForwardOutline,heart, createOutline } from "ionicons/icons";
import axios from "axios";
import { basePath } from "../common/env";
import { useEffect, useState } from "react";
import { useDrawer } from "../Providers/DrawerProvider";
import AddNote from "../drawers/Notes/Notes";

interface HadithScreenV2Props {}

const HadithScreen: React.FC<HadithScreenV2Props> = () => {
  const { firstHadith } = useParams<{ firstHadith: string }>();
  const { hadiths, goToNextHadith, goToPrevHadith } = useHadiths(
    Number(firstHadith)
    );
    const [isFav,SetIsVaf] = useState(hadiths[0]?.addedToFav)


  const takhreej = hadiths[hadiths.length - 1]?.takhreej;
  const footnotes = hadiths.flatMap((hadith) => hadith.footnotes);
  const history = useHistory();
  const handleBack = () => history.goBack();

 const {addDrawer} = useDrawer()

  const handleAddToFav =async ()=>{
    SetIsVaf(!isFav)
   await axios.post(`${basePath}/hadiths/add-to-fav`,undefined,{params:{id:hadiths[0]?._id}});
  }

  useEffect(()=>{
    localStorage.setItem('last-visited-hadith',hadiths[0]?.hadith_no)
    SetIsVaf(hadiths[0]?.addedToFav)
  },[hadiths])

  const openAddNoteDrawer=()=>{
    addDrawer({Component:AddNote,isOpen:true,props:{hadith:hadiths[0]}})
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={handleBack}>
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
          <IonTitle className="ion-text-center">الحديث</IonTitle>
          <IonButton fill={"clear"} slot="end" onClick={handleAddToFav}>
            <IonIcon size="large" style={{color:'red'}} icon= { 
              isFav?heart: heartOutline} />
          </IonButton>
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
        <IonFab style={{ top: '20px', left: '20px' }} slot="fixed">
          <IonFabButton color="primary" onClick={openAddNoteDrawer}>
            <IonIcon icon={createOutline} />
          </IonFabButton>
        </IonFab>
        <div style={{ height: 80 }}></div>
      </IonContent>
    </IonPage>
  );
};

export default HadithScreen;

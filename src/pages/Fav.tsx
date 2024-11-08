import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { basePath } from "../common/env";
import { chevronForwardOutline } from "ionicons/icons";
  
  const FavoriteHadithPage: React.FC = () => {
    const history = useHistory();
    const [favs, setFavs] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0); // Keep track of the current page
    const [hasMore, setHasMore] = useState<boolean>(true); // Flag to check if more data is available
    const limit = 10; // Set the limit to 10 items per page
  
    useEffect(() => {
      const fetchFavs = async () => {
        const res = await axios.get(`${basePath}/hadiths/fav`, {
          params: { page, limit },
        });
        if (res.data) {
          // Append the new favorites to the existing list
          setFavs((prev) => [...prev, ...res.data]);
  
          // Check if the number of fetched items is less than the limit (no more items)
          setHasMore(res.data.length === limit); // If less than limit, set hasMore to false
        }
      };
      fetchFavs();
    }, [page]); // Trigger when the page number changes
  
    const loadData = (event: any) => {
      if (hasMore) {
        setPage((prev) => prev + 1); // Increment the page to fetch more items
         event.target.complete(); // End the infinite scroll animation
      } else {
         event.target.disabled = true; // Disable the scroll when no more data is available
      }
    };
    const handleBack = () => history.goBack();
  
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={handleBack}>
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
          <IonTitle className="ion-text-center">المفضله</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonGrid>
            <IonRow>
              {favs.map((hadith: any) => (
                <IonCol size="12" key={hadith._id}>
                  <IonCard
                    button
                    onClick={() => history.push(`/hadith/${hadith.hadith_no}`)}
                    className="setting-card"
                  >
                    <IonCardContent>
                      <IonText className="hadith-number ion-text-bold">
                        رقم الحديث: {hadith.hadith_no}
                      </IonText>
                      <p className="hadith-text">{hadith.hadith_text}</p>
                      <div className="breadcrumb-container">
                        <IonText className="breadcrumb">
                          {hadith.maqsad_name} / {hadith.ketab_name} / {hadith.category_name}
                        </IonText>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
  
          {/* Infinite Scroll Component */}
          <IonInfiniteScroll
            threshold="100px"
            onIonInfinite={loadData}
            disabled={!hasMore}
          >
            <IonInfiniteScrollContent
              loadingText="Loading more favorites..."
            />
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  };
  
  export default FavoriteHadithPage;
  
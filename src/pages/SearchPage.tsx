import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./SearchPage.css";
import axios from "axios";
import { basePath } from "../common/env";
import { useHistory } from "react-router";

const SearchPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const searchHadiths = async (newSearch = false) => {
    if (newSearch) {
      setResults([]);
      setPage(0);
      setHasMore(true);
    }

    setLoading(true);

    // Mock API call: Replace with actual search function
    setTimeout(async () => {
      const res = await axios.get(`${basePath}/hadiths`,{
        params:{page,searchKeyword}
      });
      const fetchedResults = res.data.hadiths
      if (fetchedResults.length === 0) {
        setHasMore(false);
      } else {
        setResults((prevResults) => [...prevResults, ...fetchedResults]);
        setPage((prevPage) => prevPage + 1);
      }
      setLoading(false);
    }, 1000);
  };

  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle className="custom-title">🔍 البحث</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        {/* Fixed Search Bar and Clear Button */}
        <div className="fixed-header">
          <IonSearchbar
            className="custom-searchbar"
            value={searchKeyword}
            onIonChange={(e) => setSearchKeyword(e.detail.value!)}
            placeholder="ابحث عن حديث..."
            debounce={800}
            onIonInput={() => searchHadiths(true)}
          />
          <IonButton
            expand="block"
            fill="solid"
            color="tertiary"
            onClick={() => {
              setResults([]);
              setSearchKeyword("");
              setHasMore(false);
            }}
            className="clear-button"
          >
            امسح نتائج البحث
          </IonButton>
        </div>

        {/* Results List */}
        <IonGrid>
            <IonRow>
              {results.map((hadith: any) => (
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

        {/* Infinite Scroll */}
        <IonInfiniteScroll
          onIonInfinite={(e) => {
            searchHadiths();
            (e.target as HTMLIonInfiniteScrollElement).complete();
          }}
          disabled={!hasMore}
        >
          <IonInfiniteScrollContent loadingSpinner="bubbles" />
        </IonInfiniteScroll>

        {/* Loading Spinner */}
        {loading && (
          <div className="spinner-container">
            <IonSpinner className="custom-spinner" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;

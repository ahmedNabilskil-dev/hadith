import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { bookOutline, chevronForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { basePath } from "../../common/env";
import "./NotePage.css"; // Custom CSS file for beautiful styling
import { useHistory, useLocation } from "react-router";

interface Note {
  _id: any;
  title: string;
  content: string;
  hadith_no: string;
  createdAt: Date;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch notes from the server
  const fetchNotes = async (page: number) => {
    try {
      const response = await axios.get(`${basePath}/hadiths/notes`, { params: { page, limit: 10 } });
      const newNotes = response.data;
      if (newNotes.length < 10) {
        setHasMore(false); // No more notes to load
      }
      setNotes((prevNotes) => [...prevNotes, ...newNotes]);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Load more notes when the user scrolls
  const loadMoreNotes = (event: any) => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchNotes(nextPage).then(() => event.target.complete());
      return nextPage;
    });
  };

  const location = useLocation();  // To detect navigation changes

  useEffect(() => {
    // Reset the notes and refetch on page visit
    setNotes([]);
    setPage(0);
    setHasMore(true);
    fetchNotes(0); // Start from page 0
  }, [location]);  // This will trigger every time the location changes

  const history = useHistory();
  const handleBack = () => history.goBack();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={handleBack}>
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
          <IonTitle className="ion-text-center">ملاحظاتى</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding notes-content">
        <IonList>
          {notes.map((note, i) => (
            <IonItem key={i} className="note-item" onClick={() => history.push(`/hadith/${note.hadith_no}`)}>
              <IonThumbnail slot="start" className="note-thumbnail">
                <IonIcon icon={bookOutline} />
              </IonThumbnail>
              <IonLabel>
                <h2 className="note-title">{note.title}</h2>
                <p className="note-content-preview">{note.content}</p>
                <IonText color="medium" className="note-date">
                  رقم الحديث {note.hadith_no}
                </IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Infinite Scroll */}
        <IonInfiniteScroll threshold="100px" disabled={!hasMore} onIonInfinite={loadMoreNotes}>
          <IonInfiniteScrollContent loadingText="جاري تحميل المزيد..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default NotesPage;

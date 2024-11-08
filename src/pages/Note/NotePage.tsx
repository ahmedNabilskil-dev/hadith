import {
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
import { bookOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { basePath } from "../../common/env";
import "./NotePage.css"; // Custom CSS file for beautiful styling

interface Note {
  _id: any;
  title: string;
  content: string;
  hadith_no: string;
  createdAt:Date
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch notes from the server
  const fetchNotes = async (page: number) => {
    try {
      const response = await axios.get(`${basePath}/hadiths/notes`, { params: { page,limit:10 } });
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

  useEffect(() => {
    fetchNotes(page);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="notes-title">ملاحظاتي</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding notes-content">
        <IonList>
          {notes.map((note,i) => (
            <IonItem key={i} className="note-item">
              <IonThumbnail slot="start" className="note-thumbnail">
                <IonIcon icon={bookOutline} />
              </IonThumbnail>
              <IonLabel>
                <h2 className="note-title">{note.title}</h2>
                <p className="note-content-preview">
                  {note.content}
                </p>
                <IonText color="medium" className="note-date">
                  رقم الحديث {note.hadith_no}
                </IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Infinite Scroll */}
        <IonInfiniteScroll
          threshold="100px"
          disabled={!hasMore}
          onIonInfinite={loadMoreNotes}
        >
          <IonInfiniteScrollContent loadingText="جاري تحميل المزيد..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default NotesPage;

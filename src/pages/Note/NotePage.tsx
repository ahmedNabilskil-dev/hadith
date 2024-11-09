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
  IonAlert,
  IonSpinner, // Import IonSpinner for loading indicator
} from "@ionic/react";
import { bookOutline, chevronForwardOutline, createOutline, trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { basePath } from "../../common/env";
import "./NotePage.css"; // Custom CSS file for beautiful styling
import { useHistory, useLocation } from "react-router";
import { useDrawer } from "../../Providers/DrawerProvider";
import AddNote from "../../drawers/Notes/Notes";

interface Note {
  _id: any;
  title: string;
  content: string;
  hadith_no: string;
  createdAt: Date;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [_, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete action
  const [deleteSuccess, setDeleteSuccess] = useState(false); // To track successful deletion

  const { addDrawer } = useDrawer();
  const location = useLocation(); // To detect navigation changes
  const history = useHistory();

  // Fetch notes from the server
  const fetchNotes = async (page: number, fromStart: boolean = false) => {
    try {
      const response = await axios.get(`${basePath}/hadiths/notes`, { params: { page, limit: 10 } });
      const newNotes = response.data;
      if (newNotes.length < 10) {
        setHasMore(false); // No more notes to load
      }
      fromStart ? setNotes(newNotes) : setNotes((prevNotes) => [...prevNotes, ...newNotes]);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Load more notes when the user scrolls
  const loadMoreNotes = async (event: any) => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchNotes(nextPage).then(() => event.target.complete());
      return nextPage;
    });
  };

  useEffect(() => {
    // Reset the notes and refetch on page visit
    setNotes([]);
    setPage(0);
    setHasMore(true);
    fetchNotes(0); // Start from page 0
  }, [location]); // This will trigger every time the location changes

  const handleBack = () => history.goBack();

  // Handle note edit
  const handleEdit = (note: Note) => {
    addDrawer({
      Component: AddNote,
      isOpen: true,
      props: {
        hadith: note,
        reload: () => {
          fetchNotes(0, true);
        },
      },
    });
  };

  // Handle note delete
  const openDeleteDialog = (note: Note) => {
    setNoteToDelete(note);
  };

  useEffect(() => {
    if (noteToDelete) {
      setShowDeleteAlert(true);
    } else {
      setShowDeleteAlert(false);
    }
  }, [noteToDelete]);

  // Handle note delete
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${basePath}/hadiths/note/${noteToDelete?._id}`);
      setDeleteSuccess(true); // Set delete success to true
      fetchNotes(0, true); // Reload notes
    } catch (error) {
      console.error("Error deleting note:", error);
      setDeleteSuccess(false); // If there's an error, set delete success to false
    } finally {
      setDeleteLoading(false); // Reset loading state
      setNoteToDelete(null); // Close the delete dialog
    }
  };

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
              <div className="note-actions">
                <IonButton fill="clear" onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(note);
                }}>
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={(e) => {
                  e.stopPropagation();
                  openDeleteDialog(note);
                }}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </div>
            </IonItem>
          ))}
        </IonList>

        {/* Delete Confirmation Alert */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => {
            if (!deleteLoading) {
              setShowDeleteAlert(false);
            }
          }}
          header={"احذف الملاحظه"}
          message={"هل تريد حدف هذه الملاحظه"}
          buttons={[
            {
              text: "الغاء",
              role: "cancel",
              handler: () => {
                if (!deleteLoading) {
                  setNoteToDelete(null);
                }
              },
            },
            {
              text: "حذف",
              handler: () => {
                if (!deleteLoading) {
                  handleDelete();
                }
              },
            },
          ]}
        >
          {/* Show loading spinner during deletion */}
          {deleteLoading && <IonSpinner slot="end" />}
        </IonAlert>

        {/* Infinite Scroll */}
        <IonInfiniteScroll threshold="100px" disabled={!hasMore} onIonInfinite={loadMoreNotes}>
          <IonInfiniteScrollContent loadingText="جاري تحميل المزيد..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default NotesPage;

import React, { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonTextarea, IonText, IonLoading, IonToast } from "@ionic/react";
import axios from "axios";
import { basePath } from "../../common/env";
import "./Notes.css";

interface AddNoteProps {
  onClose: () => void;
  hadith: any;
  reload?:()=>void
}

const AddNote: React.FC<AddNoteProps> = ({ onClose, hadith,reload }) => {
  const [noteTitle, setNoteTitle] = useState(hadith.title||"");
  const [noteContent, setNoteContent] = useState(hadith.content||"");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddNote = async () => {
    const trimmedTitle = noteTitle.trim();
    const trimmedContent = noteContent.trim();

    if (trimmedTitle && trimmedContent) {
      setLoading(true);
      try {
      hadith.title ?
      await axios.put(
        `${basePath}/hadiths/edit-note/${hadith._id}`,
        { title: trimmedTitle, content: trimmedContent, hadith_no: hadith.hadith_no },
      )
      :  await axios.post(
          `${basePath}/hadiths/add-note`,
          { title: trimmedTitle, content: trimmedContent, hadith_no: hadith.hadith_no },
          { params: { id: hadith._id } }
        );
        setLoading(false);
        setShowToast(true);
        onClose();
        reload && reload()
      } catch (error) {
        setLoading(false);
        console.error("Error adding note:", error);
        alert("حدث خطأ أثناء إضافة الملاحظة. حاول مرة أخرى.");
      }
    } else {
      alert("يرجى ملء كلا الحقلين!");
    }
  };

  return (
    <div className="add-note-container" role="dialog" aria-labelledby="add-note-title">
      <IonText id="add-note-title" className="add-note-title">
        {hadith.title?"تعديل الملاحظه":"إضافة ملاحظة"}
      </IonText>
      <IonItem className="note-input-item">
        <IonInput
          id="note-title"
          value={noteTitle}
          placeholder="اكتب عنوان الملاحظة"
          onIonChange={(e) => setNoteTitle(e.detail.value!)}
          className="note-input"
          clearInput
          required
        />
      </IonItem>
      <IonItem className="note-input-item">
        <IonTextarea
          id="note-content"
          value={noteContent}
          placeholder="اكتب محتوى الملاحظة"
          onIonChange={(e) => setNoteContent(e.detail.value!)}
          className="note-textarea"
          autoGrow
          required
        />
      </IonItem>
      <IonButton expand="block" color="primary" onClick={handleAddNote} className="add-note-button">
      {hadith.title?"تعديل الملاحظه":"إضافة ملاحظة"}
      </IonButton>

      {/* Loading Spinner */}
      <IonLoading isOpen={loading} message="جارٍ إضافة الملاحظة..." />

      {/* Success Toast */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="تم إضافة الملاحظة بنجاح!"
        duration={2000}
        color="success"
      />
    </div>
  );
};

export default AddNote;

import { IonCard, IonCardContent, IonText } from "@ionic/react";
import "./HadithCard.css"; // Make sure to create this CSS file

const HadithCard: React.FC<{ hadith: any }> = ({ hadith }) => {
  function parseTextWithLinks(text: string) {
    return text.replace(/{\[(\d+)]}/g, (match, number) => {
      const _ = `#ref${number}`;
      return `${match}`;
    });
  }

  return (
    <IonCard className="hadith-card ion-margin-bottom">
      <IonCardContent>
        {/* Hadith Number */}
        <IonText color="primary" className="text-lg font-bold">
          <div className="ion-text-start">{`حديث رقم: ${hadith.hadith_no}`}</div>
        </IonText>

        {/* Hadith Text */}
        <div
          className="ion-text-start ion-margin-top hadith-text"
          dangerouslySetInnerHTML={{
            __html: parseTextWithLinks(hadith.hadith_text),
          }}
        ></div>

        {/* Reference and Hukm */}
        <div
          className="ion-margin-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IonText color="medium" className="text-sm">
            {hadith.reference}
          </IonText>
          <IonText color="success" className="font-semibold text-sm">
            {hadith.hukm}
          </IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default HadithCard;

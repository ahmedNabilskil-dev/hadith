import { IonCard, IonCardContent, IonText } from "@ionic/react";

const HadithCard: React.FC<{ hadith: any }> = ({ hadith }) => {
  function parseTextWithLinks(text: string) {
    return text.replace(/{\[(\d+)]}/g, (match, number) => {
      const anchorLink = `#ref${number}`;
      return `<a href="${anchorLink}">${match}</a>`;
    });
  }

  return (
    <IonCard className="ion-margin-bottom">
      <IonCardContent>
        {/* Hadith Number */}
        <IonText color="primary" className="text-lg font-bold">
          <div className="ion-text-end">{`حديث رقم: ${hadith.hadith_no}`}</div>
        </IonText>

        {/* Hadith Text */}
        <div
          className="ion-text-end ion-margin-top"
          dangerouslySetInnerHTML={{
            __html: parseTextWithLinks(hadith.hadith_text),
          }}
        ></div>

        {/* Reference and Hukm */}
        <div className="ion-margin-top ion-text-end text-sm">
          <IonText color="medium">{hadith.reference}</IonText>
          <IonText color="success" className="font-semibold">
            {hadith.hukm}
          </IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default HadithCard;

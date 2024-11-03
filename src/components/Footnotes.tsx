import { IonCard, IonCardContent, IonText } from "@ionic/react";

const FootnotesSection: React.FC<{ footnotes: any[]; takhreej: string }> = ({
  footnotes = [],
  takhreej = "",
}) => {
  return (
    <IonCard className="ion-margin-top">
      <IonCardContent>
        {footnotes.length > 0 && (
          <IonText color="primary">
            <h3 className="ion-text-end font-bold text-lg">الشرح والفوائد</h3>
          </IonText>
        )}
        {footnotes.map((footnote, i) => (
          <IonText
            className="ion-text-end text-gray-700"
            key={i}
            id={`ref${i}`}
          >
            <p>
              {`{[${i + 1}]}`} {footnote.footnotes}
            </p>
          </IonText>
        ))}
        {takhreej && (
          <IonText color="primary" className="ion-margin-top">
            <h4 className="ion-text-end font-bold">التخريج</h4>
            <p className="ion-text-end text-gray-700">{takhreej}</p>
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default FootnotesSection;

import React, { useRef } from "react";
import { IonContent, IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import "./BottomDrawer.css";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = async () => {
    const drawer = drawerRef.current;
    if (drawer) {
      drawer.style.transform = isOpen ? "translateY(0)" : "translateY(100%)";
      drawer.style.transition = "transform 0.3s ease-in-out";
    }
  };

  React.useEffect(() => {
    toggleDrawer();
  }, [isOpen]);

  return (
    <div
      className={`drawer-overlay ${isOpen ? "visible" : ""}`}
      onClick={onClose}
    >
      <div
        className="bottom-drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <IonButton fill="clear" onClick={onClose}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </div>
        <IonContent className="drawer-content">{children}</IonContent>
      </div>
    </div>
  );
};

export default BottomDrawer;

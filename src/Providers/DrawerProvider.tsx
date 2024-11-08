import { createContext, useContext, useEffect, useState } from "react";
import BottomDrawer from "../components/BottomDrawer/BottomDrawer";
import axios from "axios";
import { basePath } from "../common/env";
import LastVisitedHadithDrw from "../drawers/LastVistedHadith/LastVisitedHadith";

// DrawerProps interface to ensure every component has onClose
export interface DrawerProps {
  onClose: () => void;
}

// Generic DrawerType without `onClose` in props
interface DrawerType<Props> {
  Component: React.FC<Props & DrawerProps>; // The component with props that include DrawerProps
  props?: Omit<Props, keyof DrawerProps>; // Props without `onClose`
  isOpen: boolean; // Track if this specific drawer is open
}

// Context types
interface DrawerContextType {
  addDrawer: <Props>(drawer: DrawerType<Props>) => void;
  closeDrawer: (index: number) => void; // Close a specific drawer
}

// Create context
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

// Provider component
export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawers, setDrawers] = useState<DrawerType<any>[]>([]);

  // Function to add a drawer and open it
  const addDrawer = <Props,>(drawer: DrawerType<Props>) => {
    setDrawers((prev) => [...prev, { ...drawer, isOpen: true }]);
  };

  // Function to close a specific drawer with animation
  const closeDrawer = (index: number) => {
    setDrawers((prev) => {
      const newDrawers = [...prev];
      newDrawers[index].isOpen = false; // Close this specific drawer
      setTimeout(() => {
        // Remove the drawer after the animation
        setDrawers((prev) => prev.filter((_, i) => i !== index));
      }, 300); // Adjust the timeout to match your animation duration
      return newDrawers;
    });
  };

  useEffect(() => {
    const fetchLastVisitedHadith = async () => {
    const last = localStorage.getItem('last-visited-hadith')
      if (last) {
        addDrawer({
          Component: LastVisitedHadithDrw,
          props: { lastHadithId: Number(last) },
          isOpen: true, // Set the initial state as open
        });
      }
    };
    fetchLastVisitedHadith();
  }, []);

  return (
    <DrawerContext.Provider value={{ addDrawer, closeDrawer }}>
      {children}
      {drawers.map((drawer, index) => (
        <BottomDrawer
          key={index}
          isOpen={drawer.isOpen}
          onClose={() => closeDrawer(index)} // Pass the index to close the correct drawer
        >
          {/* Render the drawer component and inject `onClose` automatically */}
          <drawer.Component
            {...drawer.props}
            onClose={() => closeDrawer(index)}
          />
        </BottomDrawer>
      ))}
    </DrawerContext.Provider>
  );
};

// Custom hook for using Drawer context
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

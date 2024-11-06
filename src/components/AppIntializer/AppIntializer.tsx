import { FC, useEffect, useContext, useRef } from "react";
import { Toast } from "@capacitor/toast";
import { SqliteServiceContext, StorageServiceContext } from "../../App";
import InitializeAppService from "../../database/intializeAppService";

interface AppInitializerProps {
  children: any;
}

const AppInitializer: FC<AppInitializerProps> = ({ children }) => {
  const ref = useRef(false);
  const sqliteService = useContext(SqliteServiceContext);
  const storageService = useContext(StorageServiceContext);
  const initializeAppService = new InitializeAppService(
    sqliteService,
    storageService
  );
  useEffect(() => {
    const initApp = async (): Promise<void> => {
      try {
        const appInit = await initializeAppService.initializeApp();
        return;
      } catch (error: any) {
        const msg = error.message ? error.message : error;
        Toast.show({
          text: `${msg}`,
          duration: "long",
        });
      }
    };
    if (ref.current === false) {
      initApp();
      ref.current = true;
    }
  }, []);

  return <>{children}</>;
};

export default AppInitializer;

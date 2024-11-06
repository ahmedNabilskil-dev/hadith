import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// Import realistic icons from ionicons
import { bookOutline, searchOutline, settingsOutline } from "ionicons/icons";

import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import MaqsadScreen from "./pages/MaqsadScreen";
import { MaqsadProvider } from "./Providers/SystemProvider";
import BooksScreen from "./pages/BookScreen";
import CategoriesScreen from "./pages/CategoriesScreen";
import HadithScreen from "./pages/HadithScreen";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css"; // Create this CSS file for custom styles
import { Capacitor } from "@capacitor/core";
import React from "react";
import sqliteService from "./database/sqliteService";
import StorageService from "./database/storageService";
import { dbVersionService } from "./database/dbVersion";
import AppInitializer from "./components/AppIntializer/AppIntializer";

export const platform = Capacitor.getPlatform();

// Singleton Services
export const SqliteServiceContext = React.createContext(sqliteService);
export const DbVersionServiceContext = React.createContext(dbVersionService);
export const StorageServiceContext = React.createContext(
  new StorageService(sqliteService, dbVersionService)
);

setupIonicReact();

const App: React.FC = () => (
  <SqliteServiceContext.Provider value={sqliteService}>
    <DbVersionServiceContext.Provider value={dbVersionService}>
      <StorageServiceContext.Provider
        value={new StorageService(sqliteService, dbVersionService)}
      >
        <AppInitializer>
          <IonApp style={{ direction: "rtl" }}>
            <MaqsadProvider>
              <IonReactRouter>
                <IonTabs>
                  <IonRouterOutlet>
                    <Route exact path="/maqsad" component={MaqsadScreen} />
                    <Route
                      exact
                      path="/books/:maqsadId"
                      component={BooksScreen}
                    />
                    <Route
                      exact
                      path="/categories/:bookId"
                      component={CategoriesScreen}
                    />
                    <Route
                      exact
                      path="/hadith/:firstHadith"
                      component={HadithScreen}
                    />
                    <Redirect exact from="/" to="/maqsad" />
                    <Route exact path="/tab2" component={Tab2} />
                    <Route exact path="/tab3" component={Tab3} />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom" className="custom-tab-bar">
                    <IonTabButton tab="Maqsads" href="/maqsad">
                      <IonIcon aria-hidden="true" icon={bookOutline} />
                      <IonLabel>Maqsads</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                      <IonIcon aria-hidden="true" icon={searchOutline} />
                      <IonLabel>Search</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                      <IonIcon aria-hidden="true" icon={settingsOutline} />
                      <IonLabel>Settings</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>
            </MaqsadProvider>
          </IonApp>
        </AppInitializer>
      </StorageServiceContext.Provider>
    </DbVersionServiceContext.Provider>
  </SqliteServiceContext.Provider>
);

export default App;

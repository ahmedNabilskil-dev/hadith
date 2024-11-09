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
import { Redirect, Route } from "react-router-dom";

// Import realistic icons from ionicons
import { bookOutline, searchOutline,ellipsisHorizontal } from "ionicons/icons";

import { MaqsadProvider } from "./Providers/SystemProvider";
import BooksScreen from "./pages/BookScreen";
import CategoriesScreen from "./pages/CategoriesScreen";
import HadithScreen from "./pages/HadithScreen";
import MaqsadScreen from "./pages/MaqsadScreen";
import Settings from "./pages/Setting";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import { Capacitor } from "@capacitor/core";
import React from "react";
import "./App.css"; // Create this CSS file for custom styles
import { DrawerProvider } from "./Providers/DrawerProvider";
import FaslScreen from "./pages/Fasl";
import FavoriteHadiths from "./pages/Fav";
import NotesPage from "./pages/Note/NotePage";
import SearchPage from "./pages/SearchPage";
import "./theme/variables.css";

export const platform = Capacitor.getPlatform();

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp style={{ direction: "rtl" }}>
      <MaqsadProvider>
        <IonReactRouter>
          <DrawerProvider>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/maqsad" component={MaqsadScreen} />
                <Route exact path="/books/:maqsadId" component={BooksScreen} />
                <Route exact path="/fav" component={FavoriteHadiths} />
                <Route exact path="/notes" component={NotesPage} />
                <Route
                  exact
                  path="/fasls"
                  component={FaslScreen}
                />
                <Route
                  exact
                  path="/categories"
                  component={CategoriesScreen}
                />
                <Route
                  exact
                  path="/hadith/:firstHadith"
                  component={HadithScreen}
                />
                <Redirect exact from="/" to="/maqsad" />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/settings" component={Settings} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom" className="custom-tab-bar">
                <IonTabButton tab="Maqsads" href="/maqsad">
                  <IonIcon aria-hidden="true" icon={bookOutline} />
                  <IonLabel>المقاصد</IonLabel>
                </IonTabButton>
                <IonTabButton tab="search" href="/search">
                  <IonIcon aria-hidden="true" icon={searchOutline} />
                  <IonLabel>البحث</IonLabel>
                </IonTabButton>
                <IonTabButton tab="settings" href="/settings">
                  <IonIcon aria-hidden="true" icon={ellipsisHorizontal} />
                  <IonLabel>المذيد</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </DrawerProvider>
        </IonReactRouter>
      </MaqsadProvider>
    </IonApp>
  );
};

export default App;

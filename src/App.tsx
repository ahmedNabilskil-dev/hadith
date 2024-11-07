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
import { bookOutline, searchOutline, settingsOutline } from "ionicons/icons";

import BooksScreen from "./pages/BookScreen";
import CategoriesScreen from "./pages/CategoriesScreen";
import HadithScreen from "./pages/HadithScreen";
import MaqsadScreen from "./pages/MaqsadScreen";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { MaqsadProvider } from "./Providers/SystemProvider";
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
import React, { useEffect, useState } from "react";
import "./App.css"; // Create this CSS file for custom styles
import { DrawerProvider } from "./Providers/DrawerProvider";
import "./theme/variables.css";
import { basePath } from "./common/env";
import axios from "axios";

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
          </DrawerProvider>
        </IonReactRouter>
      </MaqsadProvider>
    </IonApp>
  );
};

export default App;

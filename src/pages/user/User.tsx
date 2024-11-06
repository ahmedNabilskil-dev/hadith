import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Toast } from "@capacitor/toast";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  platform,
  SqliteServiceContext,
  StorageServiceContext,
} from "../../App";
import { useQuerySQLite } from "../../hooks/useQuerySql";
import "./UsersPage.css";

const UsersPage: React.FC = () => {
  const ref = useRef(false);
  const dbNameRef = useRef("");
  const isInitComplete = useRef(false);
  const [db, setDb] = useState<SQLiteDBConnection | null>(null);
  const sqliteServ = useContext(SqliteServiceContext);
  const storageServ = useContext(StorageServiceContext);

  const openDatabase = () => {
    try {
      const dbUsersName = storageServ.getDatabaseName();
      dbNameRef.current = dbUsersName;
      const version = storageServ.getDatabaseVersion();

      sqliteServ.openDatabase(dbUsersName, version, false).then((database) => {
        setDb(database);
        ref.current = true;
      });
    } catch (error) {
      const msg = `Error open database:: ${error}`;
      console.error(msg);
      Toast.show({
        text: `${msg}`,
        duration: "long",
      });
    }
  };

  useIonViewWillEnter(() => {
    const initSubscription = storageServ.isInitCompleted.subscribe((value) => {
      isInitComplete.current = value;
      if (isInitComplete.current === true) {
        const dbUsersName = storageServ.getDatabaseName();
        if (ref.current === false) {
          if (platform === "web") {
            window.addEventListener("beforeunload", (event) => {
              sqliteServ
                .closeDatabase(dbNameRef.current, false)
                .then(() => {
                  ref.current = false;
                })
                .catch((error) => {
                  const msg = `Error close database:: ${error}`;
                  console.error(msg);
                  Toast.show({
                    text: `${msg}`,
                    duration: "long",
                  });
                });
            });
            customElements
              .whenDefined("jeep-sqlite")
              .then(() => {
                openDatabase();
              })
              .catch((error) => {
                const msg = `Error open database:: ${error}`;
                console.log(`msg`);
                Toast.show({
                  text: `${msg}`,
                  duration: "long",
                });
              });
          } else {
            openDatabase();
          }
        }
      }
    });

    return () => {
      initSubscription.unsubscribe();
    };
  }, [storageServ]);

  useIonViewWillLeave(() => {
    sqliteServ
      .closeDatabase(dbNameRef.current, false)
      .then(() => {
        ref.current = false;
      })
      .catch((error) => {
        const msg = `Error close database:: ${error}`;
        console.error(msg);
        Toast.show({
          text: `${msg}`,
          duration: "long",
        });
      });
  });
  useEffect(() => {
    // Fetch users from the database using useQuerySQLite hook

    if (isInitComplete.current === true && db) {
      const stmt = "SELECT * FROM users";
      const values: any[] = [];
      const fetchData = useQuerySQLite(db, stmt, values);
      fetchData()
        .then((fetchedUserData) => {})
        .catch((error) => {
          const msg = `Error fetching user data: ${error}`;
          console.error(msg);
          Toast.show({
            text: `${msg}`,
            duration: "long",
          });
        });
    }
  }, [db]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Managing Users</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="home" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default UsersPage;

import { platform } from "../App";
import { BehaviorSubject } from "rxjs";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { ISQLiteService } from "./sqliteService";
import { IDbVersionService } from "./dbVersion";
import { UserUpgradeStatements } from "../upgrades/user.upgrade.statement";

export interface IStorageService {
  initializeDatabase(): Promise<void>;
  getDatabaseName(): string;
  getDatabaseVersion(): number;
}
class StorageService implements IStorageService {
  versionUpgrades = UserUpgradeStatements;
  loadToVersion =
    UserUpgradeStatements[UserUpgradeStatements.length - 1].toVersion;
  db!: SQLiteDBConnection;
  database: string = "myuserdb";
  sqliteServ!: ISQLiteService;
  dbVerServ!: IDbVersionService;
  isInitCompleted = new BehaviorSubject(false);

  constructor(
    sqliteService: ISQLiteService,
    dbVersionService: IDbVersionService
  ) {
    this.sqliteServ = sqliteService;
    this.dbVerServ = dbVersionService;
  }

  getDatabaseName(): string {
    return this.database;
  }
  getDatabaseVersion(): number {
    return this.loadToVersion;
  }
  async initializeDatabase(): Promise<void> {
    // create upgrade statements
    try {
      await this.sqliteServ.addUpgradeStatement({
        database: this.database,
        upgrade: this.versionUpgrades,
      });
      this.db = await this.sqliteServ.openDatabase(
        this.database,
        this.loadToVersion,
        false
      );
      const isData = await this.db.query("select * from sqlite_sequence");
      if (isData.values!.length === 0) {
        // create database initial users if any
      }

      this.dbVerServ.setDbVersion(this.database, this.loadToVersion);
      if (platform === "web") {
        await this.sqliteServ.saveToStore(this.database);
      }
      this.isInitCompleted.next(true);
    } catch (error: any) {
      const msg = error.message ? error.message : error;
      throw new Error(`storageService.initializeDatabase: ${msg}`);
    }
  }
}
export default StorageService;

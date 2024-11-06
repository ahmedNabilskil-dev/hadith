import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.yourapp",
  appName: "Hadith",
  webDir: "www",
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabases", // only for iOS
    },
  },
};

export default config;

import { createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createWhitelistFilter } from "redux-persist-transform-filter";

const migrations = {};

const appFilter = createWhitelistFilter("app", ["token", "me"]);

export default {
  key: "root",
  version: 1,
  storage,
  whitelist: ["app"],
  transform: [appFilter],
  migrate: createMigrate(migrations, { debug: false }),
  stateReconciler: autoMergeLevel2,
};

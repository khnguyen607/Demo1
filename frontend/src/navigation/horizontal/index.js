import dashboard from "./dashboard";
import appsAndPages from "./apps-and-pages";
import others from "./others";
import chartsAndMaps from "./charts-and-maps";
import uiElements from "./ui-elements";
import formAndTable from "./forms-and-table";

import reports from "./reports";
import settings from "./settings";

// Array of sections
export default [
  ...dashboard,
  ...reports,
  ...settings,
  ...appsAndPages,
  ...uiElements,
  ...formAndTable,
  ...chartsAndMaps,
  ...others,
];

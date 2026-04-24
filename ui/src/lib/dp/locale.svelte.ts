import {persistedState} from "svelte-persisted-state";

export type AppLocales = "de" | "en" | "fr" | "es" | "pl"

export const appLocale = persistedState<AppLocales>(
  "appLocale",
  "en",
  {
    storage: "local",
    syncTabs: true,
  }
);

import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { history, persistor, store } from "./store/configureStore";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./contexts/theme/provider";

const Providers: FC = ({ children }) => (
  <ThemeProvider>
    <ReduxProvider store={store}>
      <Router history={history}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>{children}</React.StrictMode>
        </PersistGate>
      </Router>
    </ReduxProvider>
  </ThemeProvider>
);

export default Providers;

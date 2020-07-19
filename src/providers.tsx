import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { history, persistor, store } from "./store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./contexts/theme/provider";

const Providers: FC = ({ children }) => (
  <ThemeProvider>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>{children}</React.StrictMode>
        </PersistGate>
      </ConnectedRouter>
    </ReduxProvider>
  </ThemeProvider>
);

export default Providers;

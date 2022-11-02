// import 'antd/dist/antd.css';
import '../styles/globals.css';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import mission from '../reducers/mission';

// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Navbar from '../components/Navbar';

const reducers = combineReducers({ user, mission });
const persistConfig = {
  key: 'beOnTime',
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
const router = useRouter();

let component = (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);
if (router.asPath == '/') {
  component = <Component {...pageProps} />;
}
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>BeOnTime</title>
        </Head>
        <ChakraProvider>
          {component}
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

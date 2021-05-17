import { Provider } from "next-auth/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;

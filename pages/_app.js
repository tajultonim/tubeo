import "../styles/globals.css";
import "../styles.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className=" ">
        <Component {...pageProps} />
      </div>
      
    </>
  );
}

export default MyApp;

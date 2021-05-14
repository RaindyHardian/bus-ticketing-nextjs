import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children, home }) {
  if (home) {
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

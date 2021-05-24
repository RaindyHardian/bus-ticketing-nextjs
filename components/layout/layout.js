import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./Sidebar";
import styles from "./layout.module.css";

function Layout({ children, home, admin }) {
  if (home) {
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  } else if (admin) {
    return (
      <div className={styles.adminLayout}>
        <div>
          <Sidebar />
        </div>
        <div className={styles.adminContent}>{children}</div>
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

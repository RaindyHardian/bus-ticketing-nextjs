import Navbar from "./navbar";

function Layout({ children, home }) {
  if (home) {
    return (
      <div>
        {children}
      </div>
    );
  } else {
    return (
      <div>
        <Navbar/>
        {children}
      </div>
    );
  }
}

export default Layout;

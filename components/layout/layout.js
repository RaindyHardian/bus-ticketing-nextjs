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
        {children}
      </div>
    );
  }
}

export default Layout;

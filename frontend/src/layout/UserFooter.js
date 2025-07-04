function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        All rights reserved &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
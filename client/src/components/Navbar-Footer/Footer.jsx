const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <div className="footer bg-dark p-3 text-center">
    <p className="fw-light text-white m-0 p-0">&copy; {currentYear} FitPal</p>
  </div>;
};

export default Footer;

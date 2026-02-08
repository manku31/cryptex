const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cryptex. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by{" "}
            <span className="font-semibold text-foreground">
              Prashant Singh
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

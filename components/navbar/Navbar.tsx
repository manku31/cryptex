import ModeToggle from "./ModeToggle";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between p-4">
        <div className="text-lg font-bold">Cryptex</div>
        <div className="space-x-4">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

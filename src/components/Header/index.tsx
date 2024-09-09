import Link from "next/link";
import Image from "next/image";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2">
        <div className="flex items-center ">
          <Link className="block " href="/">
            <Image
              width={32}
              height={32}
              src="/images/black_house_group_inc_logo.jpeg"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import {
  HeartIcon,
  PlusCircleIcon as PlusSquareIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 h-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold font-sans tracking-tight">
              Post&Pray
            </span>
          </Link>

          {/* Search */}
          <div className="hidden sm:block flex-1 max-w-xs mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-100 text-sm border-transparent focus:bg-transparent focus:border-gray-300 focus:ring-0 block w-full pl-10 py-1.5 rounded-md outline-none"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link href="/">
              <HomeIcon className="h-7 w-7 text-gray-900 cursor-pointer hover:scale-105 transition-transform" />
            </Link>
            <Link href="/newPost">
              <PlusSquareIcon className="h-7 w-7 text-gray-900 cursor-pointer hover:scale-105 transition-transform" />
            </Link>
            <HeartIcon className="h-7 w-7 text-gray-900 cursor-pointer hover:scale-105 transition-transform" />
            <div className="h-7 w-7 rounded-full bg-gray-200 overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-gray-300">
              <img
                src="https://ui-avatars.com/api/?name=User&background=random"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

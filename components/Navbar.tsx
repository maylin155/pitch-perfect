import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TbLogout } from "react-icons/tb";


const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl text-black-400 font-changa">PITCHPERFECT</span>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="flex items-center">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-8 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex items-center">
                  <span className="max-sm:hidden">Logout</span>
                  <TbLogout className="size-8 text-red-500 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className="flex items-center">
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name || ""} />
                  <AvatarFallback className="flex items-center">AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
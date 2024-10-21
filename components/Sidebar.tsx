import Link from "next/link";
import { Home, Upload, Bot, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={`
      ${open ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:static
    `}
    >
      <div className="flex justify-between items-center p-4 lg:p-6">
        <h2 className="text-2xl font-semibold text-gray-800">NutrIA</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="mt-6">
        <SidebarLink
          href="/dashboard"
          icon={Home}
          onClick={() => setOpen(false)}
        >
          Início
        </SidebarLink>
        <SidebarLink
          href="/dashboard/upload"
          icon={Upload}
          onClick={() => setOpen(false)}
        >
          Carregar arquivos
        </SidebarLink>
        <SidebarLink
          href="/dashboard/chat"
          icon={Bot}
          onClick={() => setOpen(false)}
        >
          NutriGPT
        </SidebarLink>
        <SidebarLink
          href="/"
          icon={LogOut}
          onClick={() => {
            signOut();
            setOpen(false);
          }}
        >
          Sair
        </SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  onClick,
  children,
}: {
  href: string;
  icon: React.ElementType;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{children}</span>
    </Link>
  );
}

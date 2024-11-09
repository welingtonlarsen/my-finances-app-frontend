import { Home, Menu, CircleDollarSign, Receipt, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserMenu } from './user-menu';
import UpgradeCard from './upgrade-card';
import { useState } from 'react';

type TProps = {
  onLogout: () => void;
};

export function Layout({ onLogout }: TProps) {
  const navigate = useNavigate();

  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0);

  const navItems = [
    {
      icon: <CreditCard className="h-4 w-4" />,
      title: 'Expenses',
      path: '/expenses',
    },
    {
      icon: <Receipt className="h-4 w-4" />,
      title: 'Bills',
      path: '/bills',
    },
    {
      icon: <Receipt className="h-4 w-4" />,
      title: 'Independência',
      path: '/independencia-financeira',
    },
  ];

  const onSelectItem = (selectedIndex: number, path: string) => {
    setActiveNavItemIndex(selectedIndex);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Fixed sidebar for desktop */}
      <div className="fixed inset-y-0 left-0 z-10 hidden w-[220px] flex-col border-r bg-background lg:w-[280px] md:flex">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <button className="flex items-center gap-2 font-semibold">
              <CircleDollarSign className="h-6 w-6" />
              <span className="">My finances</span>
            </button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onSelectItem(index, item.path)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${index === activeNavItemIndex && 'bg-muted'}`}
                >
                  {item.icon}
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
          <div className="m-4">
            <UpgradeCard />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:pl-[220px] lg:pl-[280px]">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {/* Side nav for mobile */}
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <button className="flex items-center gap-2 text-lg font-semibold">
                  <CircleDollarSign className="h-6 w-6" />
                  <span>My finances</span>
                </button>
                <button className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                  <Home className="h-5 w-5" />
                  Variable expenses
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="ml-auto">
            <UserMenu onLogout={onLogout} />
          </div>
        </header>

        {/* Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-screen-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

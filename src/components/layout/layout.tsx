import { Home, Menu, CircleDollarSign, Receipt, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Outlet } from 'react-router-dom';
import { UserMenu } from './user-menu';
import UpgradeCard from './upgrade-card';

type TProps = {
  onLogout: () => void;
};

export function Layout({ onLogout }: TProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Side nav for desktop */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <button className="flex items-center gap-2 font-semibold">
              <CircleDollarSign className="h-6 w-6" />
              <span className="">My finances</span>
            </button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
              <button className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                <CreditCard className="h-4 w-4" />
                Expenses
              </button>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary hover:bg-muted">
                <Receipt className="h-4 w-4" />
                Bills
              </button>
            </nav>
          </div>
          <div className="m-4">
            <UpgradeCard />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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

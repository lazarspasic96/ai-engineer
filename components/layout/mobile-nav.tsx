'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import type { NavSection } from '@/lib/content';

interface MobileNavProps {
  navigation: NavSection[];
}

export function MobileNav({ navigation }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 pr-0">
        <SheetTitle className="px-4 text-lg font-semibold">Navigation</SheetTitle>
        <div className="mt-4 overflow-y-auto px-2" onClick={() => setOpen(false)}>
          <SidebarNav navigation={navigation} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

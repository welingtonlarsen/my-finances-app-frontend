'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpgradeCard() {
  return (
    <Card>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>Unlock new features and get unlimited access to our support team.</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full" disabled={true}>
          Available in a few weeks!
        </Button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your hotel settings and preferences</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <CardTitle>Hotel Information</CardTitle>
          </div>
          <CardDescription>Update your hotel details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input id="hotelName" placeholder="Grand Hotel" defaultValue="Grand Hotel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" defaultValue="123 Main Street, City" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 234 567 8900" defaultValue="+1 234 567 8900" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="info@hotel.com" defaultValue="info@grandhotel.com" />
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

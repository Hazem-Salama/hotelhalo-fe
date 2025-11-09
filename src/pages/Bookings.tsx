import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, LogIn, LogOut, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "reserved" | "checked-in" | "checked-out";
  totalAmount: number;
}

const initialBookings: Booking[] = [
  {
    id: "1",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    roomNumber: "101",
    checkIn: "2025-11-06",
    checkOut: "2025-11-08",
    status: "checked-in",
    totalAmount: 240,
  },
  {
    id: "2",
    guestName: "Jane Smith",
    guestEmail: "jane@example.com",
    roomNumber: "205",
    checkIn: "2025-11-07",
    checkOut: "2025-11-10",
    status: "reserved",
    totalAmount: 540,
  },
  {
    id: "3",
    guestName: "Mike Johnson",
    guestEmail: "mike@example.com",
    roomNumber: "312",
    checkIn: "2025-11-05",
    checkOut: "2025-11-07",
    status: "checked-in",
    totalAmount: 560,
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Booking>>({
    guestName: "",
    guestEmail: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
    status: "reserved",
    totalAmount: 0,
  });

  const handleAddBooking = () => {
    if (!formData.guestName || !formData.roomNumber || !formData.checkIn || !formData.checkOut) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      guestName: formData.guestName!,
      guestEmail: formData.guestEmail!,
      roomNumber: formData.roomNumber!,
      checkIn: formData.checkIn!,
      checkOut: formData.checkOut!,
      status: formData.status as Booking["status"],
      totalAmount: formData.totalAmount!,
    };

    setBookings([...bookings, newBooking]);
    setIsAddDialogOpen(false);
    setFormData({
      guestName: "",
      guestEmail: "",
      roomNumber: "",
      checkIn: "",
      checkOut: "",
      status: "reserved",
      totalAmount: 0,
    });
    toast.success("Booking created successfully");
  };

  const handleCheckIn = (id: string) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: "checked-in" as const } : booking
    ));
    toast.success("Guest checked in successfully");
  };

  const handleCheckOut = (id: string) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: "checked-out" as const } : booking
    ));
    toast.success("Guest checked out successfully");
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "reserved":
        return "bg-primary/10 text-primary";
      case "checked-in":
        return "bg-success/10 text-success";
      case "checked-out":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bookings</h1>
          <p className="text-muted-foreground">Manage reservations and check-ins/outs</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>Enter the booking details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  placeholder="John Doe"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestEmail">Guest Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  placeholder="101"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkIn">Check-In Date</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-Out Date</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount ($)</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  placeholder="240"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <Button onClick={handleAddBooking} className="w-full bg-gradient-primary">
              Create Booking
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{booking.guestName}</CardTitle>
                  <CardDescription>{booking.guestEmail}</CardDescription>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status === "checked-in" ? "Checked In" : booking.status === "checked-out" ? "Checked Out" : "Reserved"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Room</p>
                    <p className="font-semibold text-foreground">{booking.roomNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <LogIn className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Check-In</p>
                    <p className="font-semibold text-foreground">{booking.checkIn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Check-Out</p>
                    <p className="font-semibold text-foreground">{booking.checkOut}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold text-foreground">${booking.totalAmount}</p>
                </div>
                <div className="flex gap-2">
                  {booking.status === "reserved" && (
                    <Button
                      onClick={() => handleCheckIn(booking.id)}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Check In
                    </Button>
                  )}
                  {booking.status === "checked-in" && (
                    <Button
                      onClick={() => handleCheckOut(booking.id)}
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Check Out
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookings;

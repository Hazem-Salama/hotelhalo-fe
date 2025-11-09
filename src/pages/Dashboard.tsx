import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Users, Calendar, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Total Rooms",
    value: "48",
    icon: Hotel,
    description: "32 available",
    trend: "+2 this month",
  },
  {
    title: "Occupancy Rate",
    value: "78%",
    icon: Users,
    description: "38 rooms occupied",
    trend: "+5% from last month",
  },
  {
    title: "Bookings Today",
    value: "12",
    icon: Calendar,
    description: "8 check-ins, 4 check-outs",
    trend: "Normal activity",
  },
  {
    title: "Revenue (Month)",
    value: "$45,280",
    icon: DollarSign,
    description: "Target: $50,000",
    trend: "+12% from last month",
  },
];

const recentBookings = [
  { id: "1", guest: "John Doe", room: "101", status: "Checked In", checkIn: "2025-11-06", checkOut: "2025-11-08" },
  { id: "2", guest: "Jane Smith", room: "205", status: "Reserved", checkIn: "2025-11-07", checkOut: "2025-11-10" },
  { id: "3", guest: "Mike Johnson", room: "312", status: "Checked In", checkIn: "2025-11-05", checkOut: "2025-11-07" },
  { id: "4", guest: "Sarah Williams", room: "108", status: "Reserved", checkIn: "2025-11-08", checkOut: "2025-11-12" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your hotel overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground mb-1">{stat.description}</p>
                <p className="text-xs text-primary font-medium">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check-In</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{booking.guest}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.room}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "Checked In"
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{booking.checkIn}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{booking.checkOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

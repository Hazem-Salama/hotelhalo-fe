import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Users, Calendar, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms.toString(),
      icon: Hotel,
      description: `${stats.availableRooms} available`,
      trend: `${stats.occupiedRooms} occupied`,
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: Users,
      description: `${stats.occupiedRooms} rooms occupied`,
      trend: `${stats.availableRooms} available`,
    },
    {
      title: "Bookings Today",
      value: stats.bookingsToday.toString(),
      icon: Calendar,
      description: `${stats.checkInsToday} check-ins, ${stats.checkOutsToday} check-outs`,
      trend: "Today's activity",
    },
    {
      title: "Revenue (Month)",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "Current month",
      trend: "Total bookings revenue",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your hotel overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
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
                {stats.recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{booking.guest}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.room}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "checked-in"
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {booking.status === "checked-in" ? "Checked In" : booking.status === "checked-out" ? "Checked Out" : "Reserved"}
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Bed } from "lucide-react";
import { toast } from "sonner";

interface Room {
  id: string;
  number: string;
  type: string;
  status: "available" | "occupied" | "maintenance";
  price: number;
  capacity: number;
}

const initialRooms: Room[] = [
  { id: "1", number: "101", type: "Standard", status: "available", price: 120, capacity: 2 },
  { id: "2", number: "102", type: "Standard", status: "occupied", price: 120, capacity: 2 },
  { id: "3", number: "201", type: "Deluxe", status: "available", price: 180, capacity: 3 },
  { id: "4", number: "202", type: "Deluxe", status: "available", price: 180, capacity: 3 },
  { id: "5", number: "301", type: "Suite", status: "occupied", price: 280, capacity: 4 },
  { id: "6", number: "302", type: "Suite", status: "maintenance", price: 280, capacity: 4 },
];

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<Partial<Room>>({
    number: "",
    type: "Standard",
    status: "available",
    price: 0,
    capacity: 2,
  });

  const handleAddRoom = () => {
    if (!formData.number || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      number: formData.number!,
      type: formData.type!,
      status: formData.status as Room["status"],
      price: formData.price!,
      capacity: formData.capacity!,
    };

    setRooms([...rooms, newRoom]);
    setIsAddDialogOpen(false);
    setFormData({ number: "", type: "Standard", status: "available", price: 0, capacity: 2 });
    toast.success("Room added successfully");
  };

  const handleUpdateRoom = () => {
    if (!editingRoom || !formData.number || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setRooms(rooms.map(room => 
      room.id === editingRoom.id 
        ? { ...room, ...formData } as Room
        : room
    ));
    setEditingRoom(null);
    setFormData({ number: "", type: "Standard", status: "available", price: 0, capacity: 2 });
    toast.success("Room updated successfully");
  };

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
    toast.success("Room deleted successfully");
  };

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "available":
        return "bg-success/10 text-success";
      case "occupied":
        return "bg-destructive/10 text-destructive";
      case "maintenance":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Rooms Management</h1>
          <p className="text-muted-foreground">Manage your hotel rooms and pricing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Enter the details for the new room</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="number">Room Number</Label>
                <Input
                  id="number"
                  placeholder="101"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Night ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="120"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="2"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Room["status"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddRoom} className="w-full bg-gradient-primary">
              Add Room
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Room {room.number}</CardTitle>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
              <CardDescription>{room.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-foreground">${room.price}/night</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="font-semibold text-foreground">{room.capacity} guests</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Dialog open={editingRoom?.id === room.id} onOpenChange={(open) => {
                    if (open) {
                      setEditingRoom(room);
                      setFormData(room);
                    } else {
                      setEditingRoom(null);
                      setFormData({ number: "", type: "Standard", status: "available", price: 0, capacity: 2 });
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                        <DialogDescription>Update the room details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-number">Room Number</Label>
                          <Input
                            id="edit-number"
                            value={formData.number}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-type">Room Type</Label>
                          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Deluxe">Deluxe</SelectItem>
                              <SelectItem value="Suite">Suite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-price">Price per Night ($)</Label>
                          <Input
                            id="edit-price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-capacity">Capacity</Label>
                          <Input
                            id="edit-capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-status">Status</Label>
                          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Room["status"] })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="occupied">Occupied</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleUpdateRoom} className="w-full bg-gradient-primary">
                        Update Room
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rooms;

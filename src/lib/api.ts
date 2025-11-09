const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5188/api';

export const api = {
  // Rooms
  getRooms: async () => {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  createRoom: async (room: any) => {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(room),
    });
    if (!response.ok) throw new Error('Failed to create room');
    return response.json();
  },

  updateRoom: async (id: string, room: any) => {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(room),
    });
    if (!response.ok) throw new Error('Failed to update room');
    return response.status === 204 ? null : response.json();
  },

  deleteRoom: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete room');
    return response.status === 204 ? null : response.json();
  },

  // Bookings
  getBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  createBooking: async (booking: any) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }
    return response.json();
  },

  updateBookingStatus: async (id: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update booking status');
    return response.status === 204 ? null : response.json();
  },

  deleteBooking: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete booking');
    return response.status === 204 ? null : response.json();
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },

  // Hotel Settings
  getHotelSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/hotel/settings`);
    if (!response.ok) throw new Error('Failed to fetch hotel settings');
    return response.json();
  },

  updateHotelSettings: async (id: string, settings: any) => {
    const response = await fetch(`${API_BASE_URL}/hotel/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update hotel settings');
    return response.json();
  },
};

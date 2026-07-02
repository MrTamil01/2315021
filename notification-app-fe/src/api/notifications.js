const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchNotifications() {
  const response = await fetch(`${API_BASE_URL}/notifications`);

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return response.json();
}

export async function markNotificationRead(id) {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to update notification');
  }

  return response.json();
}

export async function deleteNotification(id) {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete notification');
  }

  return response.json();
}

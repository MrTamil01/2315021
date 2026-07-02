import { Box, Card, CardContent, CardActions, Chip, Typography, Button, Stack } from "@mui/material";

export function NotificationCard({ notification, onMarkRead, onDelete }) {
  const priorityColor = notification.priority === 3 ? "error" : notification.priority === 2 ? "warning" : "default";

  return (
    <Card variant="outlined" sx={{ borderLeft: notification.read ? 0 : 4, borderColor: notification.read ? "divider" : "primary.main" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {notification.category} • {notification.read ? "Read" : "Unread"}
            </Typography>
          </Box>
          <Chip label={notification.priority === 3 ? "Urgent" : notification.priority === 2 ? "Important" : "Normal"} color={priorityColor} size="small" />
        </Stack>
        <Typography variant="body1" sx={{ mt: 1.5 }}>
          {notification.message}
        </Typography>
      </CardContent>
      <CardActions>
        {!notification.read && (
          <Button size="small" onClick={() => onMarkRead(notification.id)}>
            Mark as read
          </Button>
        )}
        <Button size="small" color="error" onClick={() => onDelete(notification.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

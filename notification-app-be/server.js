const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const Log = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const notifications = [
  {
    id: 1,
    title: 'Placement Update',
    message: 'Your placement interview has been scheduled for tomorrow.',
    category: 'Placement',
    read: false,
    priority: 2,
  },
  {
    id: 2,
    title: 'Result Released',
    message: 'Your aptitude test result is now available.',
    category: 'Result',
    read: false,
    priority: 3,
  },
  {
    id: 3,
    title: 'Campus Event',
    message: 'Join the coding workshop this Friday.',
    category: 'Event',
    read: true,
    priority: 1,
  },
];

app.get('/api/notifications', (req, res) => {
  res.json({
    notifications,
    total: notifications.length,
    totalPages: 1,
  });
});

app.patch('/api/notifications/:id/read', (req, res) => {
  const notification = notifications.find((item) => item.id === Number(req.params.id));

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notification.read = true;
  return res.json(notification);
});

app.delete('/api/notifications/:id', (req, res) => {
  const index = notifications.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notifications.splice(index, 1);
  return res.json({ success: true });
});

app.listen(PORT, async () => {
  try {
    await Log('backend', 'info', 'server', {
      message: `Backend running on port ${PORT}`,
      port: PORT,
    });
  } catch (error) {
    // Ignore logging failures so startup is unaffected.
  }
});

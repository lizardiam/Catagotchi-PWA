const express = require('express');
const router = express.Router();
const webPush = require('web-push');

// vapid keys
const vapidPublicKey = 'BEjhM6DDoUxspPqxIGOX8WZCQ7-Pw3ZOOrxHfWpPZyDpbgTj5xZb1Ei22wz62FbtskApfsfYgoEyutbCFBBajkE';
const vapidPrivateKey = 'if6Pyjuax2Q8fdDrW_9K_AASSp-zqp_WkxQIR6_N-7A';
webPush.setVapidDetails(
  'mailto:vapid@catagotchi.com',
  vapidPublicKey,
  vapidPrivateKey
);

let subscriptions = [];

router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription); // Consider saving this in a persistent database
  res.status(201).json({ message: 'Subscription added.' });
});

router.post('/notify', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification.',
      icon: '/browser/assets/icons/icon-512x512.png',
    },
  };

  const promises = subscriptions.map(sub => webPush.sendNotification(sub, JSON.stringify(notificationPayload))
    .catch(err => console.error("Error sending notification, error is: ", err)));

  Promise.all(promises).then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

module.exports = router;

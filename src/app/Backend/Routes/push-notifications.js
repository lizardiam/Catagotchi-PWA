const express = require('express');
const router = express.Router();
const webPush = require('web-push');
const model = require('../Models/subscription-model');

// vapid keys
const vapidPublicKey = 'BEjhM6DDoUxspPqxIGOX8WZCQ7-Pw3ZOOrxHfWpPZyDpbgTj5xZb1Ei22wz62FbtskApfsfYgoEyutbCFBBajkE';
const vapidPrivateKey = 'if6Pyjuax2Q8fdDrW_9K_AASSp-zqp_WkxQIR6_N-7A';
webPush.setVapidDetails(
  'mailto:vapid@catagotchi.com',
  vapidPublicKey,
  vapidPrivateKey
);


router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const userid = req.session.userid;

  console.log(subscription);

  if (!userid) {
    // If there's no userid in session
    return res.status(401).json({ message: 'Unauthorized - User must be logged in to subscribe.' });
  }

  model.addSubscription(userid, subscription);
  res.status(201).json({ message: 'Subscription added.' });
  });

router.post('/notify', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'Running low...',
      body: 'Your cat is getting quite unhappy. Come take care of it!',
      icon: '/browser/assets/icons/icon-512x512.png',
    },
  };

  const subscriptions = model.getSubscriptions();

  const promises = subscriptions.map(sub => webPush.sendNotification(sub, JSON.stringify(notificationPayload))
    .catch(err => console.error("Error sending notification, error is: ", err)));

  Promise.all(promises).then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

module.exports = router;

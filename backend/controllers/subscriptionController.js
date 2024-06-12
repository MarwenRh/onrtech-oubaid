import { Subscription } from "../models/SubscriptionModel.js";
import sendEmail from "../utils/SendEmail.js";

// Subscribe a new user
export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  try {
    let subscription = await Subscription.findOne({ email });
    if (subscription) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed." });
    }

    subscription = { email };
    await Subscription.create(subscription);

    const subject = "Welcome to our Newsletter - Onrtech";
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@onrtech.com";
    const template = "subscription";
    // const name = user.name;
    // const link = resetUrl;

    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template
      // name,
      // link
    );

    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all subscriptions
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res
      .status(200)
      .json({ count: subscriptions.length, subscriptions: subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Unsubscribe a user
// export const unsubscribeUser = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const subscription = await Subscription.findOneAndDelete({ email });
//     if (!subscription) {
//       return res.status(404).json({ message: "Subscription not found" });
//     }

//     res.status(200).json({ message: "Unsubscription successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

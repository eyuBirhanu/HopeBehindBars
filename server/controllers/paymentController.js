const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { amount, frequency } = req.body;

  const unitAmount = Math.round(parseFloat(amount) * 100);
  if (isNaN(unitAmount) || unitAmount < 50) {
    return res.status(400).json({ error: 'Invalid donation amount.' });
  }

  const sessionData = {
    payment_method_types: ['card', 'paypal'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: frequency === 'monthly' ? 'Monthly Donation' : 'One-Time Donation',
          description: 'Thank you for supporting Hope Behind Bars!',
        },
        unit_amount: unitAmount,
        recurring: frequency === 'monthly' ? { interval: 'month' } : undefined,
      },
      quantity: 1,
    }],
    mode: frequency === 'monthly' ? 'subscription' : 'payment',
    success_url: `${process.env.CLIENT_URL}/donation-success`, 
    cancel_url: `${process.env.CLIENT_URL}/`,
  };

  try {
    const session = await stripe.checkout.sessions.create(sessionData);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.userMessage || 'Failed to create Stripe session.' });
  }
};
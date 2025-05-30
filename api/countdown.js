let countdownTarget = Date.now() + 60 * 24 * 60 * 60 * 1000; // default 60 days

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ targetTime: countdownTarget });
  }

  if (req.method === 'POST') {
    try {
      const { targetTime } = req.body;
      if (!targetTime || isNaN(targetTime)) {
        return res.status(400).json({ error: "Invalid targetTime" });
      }
      countdownTarget = Number(targetTime);
      return res.status(200).json({ success: true, targetTime: countdownTarget });
    } catch (e) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

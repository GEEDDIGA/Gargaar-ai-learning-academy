import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { topic, level, language } = req.body;

      // Simple course generation logic
      const course = {
        title: `${topic} - ${level}`,
        language: language || 'so',
        lessons: [
          {
            title: `Cashar 1: Hordhac ${topic}`,
            content: `Waxaan ku soo dhawaynayaa casharkan ku saabsan ${topic}. Heerkan waa ${level}.`,
            quiz: [
              {
                question: `Maxay tahay ${topic}?`,
                options: ['Jawaab A', 'Jawaab B', 'Jawaab C', 'Jawaab D'],
                correct: 0
              }
            ]
          },
          {
            title: `Cashar 2: Faahfaahin ${topic}`,
            content: `Casharkan waxaan si qoto dheer u baranayaa ${topic}.`,
            quiz: [
              {
                question: `Sidee loo isticmaala ${topic}?`,
                options: ['Hab A', 'Hab B', 'Hab C', 'Hab D'],
                correct: 1
              }
            ]
          },
          {
            title: `Cashar 3: Tusaalayaal ${topic}`,
            content: `Halkan waxaan arki doonaa tusaalayaal ${topic} ku saabsan.`,
            quiz: [
              {
                question: `Maxay ka mid yihiin faa'iidooyinka ${topic}?`,
                options: ['Faa'iido A', 'Faa'iido B', 'Faa'iido C', 'Faa'iido D'],
                correct: 2
              }
            ]
          }
        ]
      };

      return res.status(200).json(course);
    } catch (error) {
      console.error('Error generating course:', error);
      return res.status(500).json({ 
        error: 'Failed to generate course',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

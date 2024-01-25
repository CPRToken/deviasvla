import { NextApiRequest, NextApiResponse } from  'next/types';
import { sendScheduledEmails } from './schedule';
import cron from 'node-cron';

// Schedule the function to run every hour
cron.schedule('0 * * * *', sendScheduledEmails);

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('Cron job is running.');
};

export default handler;

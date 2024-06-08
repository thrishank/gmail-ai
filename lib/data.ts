export const emailDataBody = {
  snippet: '',
  payload: {
    headers: [
      {
        name: '',
        value: '',
      },
    ],
    body: {
      data: '',
    },
    parts: [
      {
        mimeType: '',
        body: {
          data: '',
        },
      },
    ],
  },
};

export let intailPrompt = `Classify the following emails into one of these six categories:
Important : Emails that are personal or work-related and require immediate attention.
Promotions: Emails related to sales, discounts, and marketing campaigns.
Social    : Emails from social networks, friends, and family.
Marketing : Emails related to marketing, newsletters, and notifications.
Spam      : Unwanted or unsolicited emails.
General   : If none of the above are matched, use General.
            Your answer should be just one word from the above for each email.
            Here are the emails:`;

export const colors = {
  Important: 'border-green-500 text-green-500',
  Social: 'border-blue-500 text-blue-500',
  Promotions: 'border-[#800080] text-[#800080]',
  Marketing: 'border-yellow-500 text-yellow-500',
  Spam: 'border-red-500 text-red-500',
  General: 'border-gray-500 text-gray-500',
  '': 'none',
};

import { google, calendar_v3 } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

let oauth2Client: any = null;

function getOAuthClient() {
  if (oauth2Client) return oauth2Client;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Google OAuth credentials are not set. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.');
  }

  oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  return oauth2Client;
}

export async function createGoogleMeetRoom(
  summary: string,
  description: string,
  startTimeIso: string,
  endTimeIso: string,
  attendeeEmails: string[]
): Promise<string> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const attendees = attendeeEmails
    .filter((email) => !!email)
    .map((email) => ({ email }));

  const event: calendar_v3.Schema$Event = {
    summary,
    description,
    start: {
      dateTime: startTimeIso,
      timeZone: 'Africa/Nairobi',
    },
    end: {
      dateTime: endTimeIso,
      timeZone: 'Africa/Nairobi',
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `nursefiti-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'none', // We send our own custom emails
    });

    const hangoutLink = res.data.hangoutLink;
    if (!hangoutLink) {
      throw new Error('Google API did not return a hangoutLink');
    }

    return hangoutLink;
  } catch (error: any) {
    console.error('[google-meet] Failed to create event:', error.message || error);
    throw new Error('Failed to create Google Meet room');
  }
}

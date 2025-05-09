export const API_ENDPOINTS = {
  BASE_URL: process.env.API_ENDPOINT,
};
export const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY!,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!,
  response_type: 'code',
  scope: process.env.NEXT_PUBLIC_COGNITO_SCOPE!,
};

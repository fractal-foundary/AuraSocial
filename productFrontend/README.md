# Sakshi
* scrollbar on every page of website.
* 

# API Endpoints
This section contains all the api endpoints that are currently being used to fetch some kind of data from the django backend server.

1. **GET** `/api/user/token/` ----> used to fetch/generate the jwt access_token and refresh_token.
2. **GET** `/api/user/token/refresh/` ----> used to refresh the jwt access_token using the previously generated refresh_token.
3. **POST** `/api/user/token/verify/` ----> used to verify the validity of jwt tokens.
4. **GET** `/social_accounts/twitter_auth_url` ----> fetch the twitter authentication url.
5. **REDIRECT** `/social_accounts/twitter_oauth2/login/callback/` ----> twitter callback url from the twitter dashboard, to redirect on the twitter authentication page.
6. **POST** `/api/user/register/` ----> to register the new user into the application.
7. **POST** `/api/user/profile/update/` ----> to update the profile of the user.
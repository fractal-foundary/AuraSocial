# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# API Endpoints
This section contains all the api endpoints that are currently being used to fetch some kind of data from the django backend server.

1. **GET** `/api/token/` ----> used to fetch/generate the jwt access_token and refresh_token.
2. **GET** `/api/token/refresh/` ----> used to refresh the jwt access_token using the previously generated refresh_token.
3. **POST** `/api/token/verify/` ----> used to verify the validity of jwt tokens.
4. **GET** `/api/social_accounts/twitter_auth_url` ----> fetch the twitter authentication url.
5. **REDIRECT** `/api/social_accounts/twitter_oauth2/login/callback/` ----> twitter callback url from the twitter dashboard, to redirect on the twitter authentication page.
6. **POST** `/api/user/register/` ----> to register the new user into the application.
7. **POST** `/api/user/profile/update/` ----> to update the profile of the user.
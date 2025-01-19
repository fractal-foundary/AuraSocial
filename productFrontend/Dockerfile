
FROM node:20-alpine as build

WORKDIR /app/frontend
COPY package*.json /app/frontend/
RUN npm install

COPY . /app/frontend/
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
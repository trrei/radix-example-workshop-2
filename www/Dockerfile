# build environment
FROM keaaa/www-workshop-base:latest as build
WORKDIR /app
COPY . /app
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# ENV MOCK_ECHO_API=true ECHO_API_URL=http://echo:3001/api/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
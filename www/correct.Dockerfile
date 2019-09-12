# build stage
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install react-scripts@3.1.1 -g --silent
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# ENV MOCK_ECHO_API=true ECHO_API_URL=http://echo:3001/api/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
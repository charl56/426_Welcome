#####
##### Docker multi-stage build : Node.js build image
#####
FROM node:lts-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# Copy project files and restore as distinct layers
COPY package.json ./
# COPY package-lock.json ./

# install project dependencies
RUN yarn install

# Copy everything else for build
COPY src/ ./src
COPY public/ ./public

# Args
ARG VITE_FRONT_URI=$VITE_FRONT_URI 
ARG VITE_FRONT_URL=$VITE_FRONT_URL

# build app for production with minification
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

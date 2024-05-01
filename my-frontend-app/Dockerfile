# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app/
COPY .. /app

COPY ./public /app/

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

# Install app dependencies
RUN mkdir /.npm && chown -R 1001:0 /.npm

RUN npm install

RUN npm run build
# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
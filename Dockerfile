
# Use official Node.js Alpine image
FROM node:18.14.2-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy all source files into working directory
COPY ./ ./

# Install all dependencies including 'devDependencies'
RUN npm install

# Run linting
RUN npm run lint

# Run tests
RUN npm test

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the command in "package.scripts.start:prod" to start the app
CMD ["npm", "run", "start:prod"]


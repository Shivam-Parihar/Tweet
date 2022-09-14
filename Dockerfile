# FROM node:alpine
# WORKDIR '/app'

# COPY package.json
# RUN npm install
# COPY ..
# CMD ["npm","start"]
FROM node:13.12.0-alpine
WORKDIR /my-tweet-app-React-master v1
ENV PATH = "./node_modules/.bin:$PATH"
# COPY package.json ./
# COPY package-lock.json ./
COPY . .
# RUN npm install --silent
# RUN npm install react-scripts@^2.1.8 -g --silent
RUN npm run build

CMD ["npm", "start"]
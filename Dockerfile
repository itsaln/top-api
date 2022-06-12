FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
RUN npm run build
RUN npm run prune --production
CMD ["node", "./dist/main.js"]

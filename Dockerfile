FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm run install
ADD . .
RUN yarn build
# RUN npm run prune --production
CMD ["node", "./dist/main.js"]

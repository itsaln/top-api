FROM node
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn build
#RUN npm run prune --production
CMD ["node", "./dist/main.js"]

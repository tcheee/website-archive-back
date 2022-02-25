FROM node:16

WORKDIR /workspace

COPY package.json /workspace/
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
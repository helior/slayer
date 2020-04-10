FROM node:12

WORKDIR /usr/src/slayer
COPY package.json .
COPY package-lock.json .

ARG name
ENV name=${name}

RUN npm install

CMD ["npm", "start"]

COPY . .

# docker build --build-arg name=Helior --tag slayer-service:dev .
# docker run --publish 8000:3000 --detach -e name=Calhoun slayer-service:dev

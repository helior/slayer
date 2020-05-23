FROM node:12

WORKDIR /usr/src/slayer
COPY package.json .
COPY package-lock.json .

EXPOSE 8080
# ARG name
# ENV name=${name}

RUN npm install

CMD ["npm", "start"]

COPY . .

## Build-time env vars
# docker build --build-arg name=DefaultHelior --tag slayer-service:dev .

## Run-time env vars
# docker run --publish 8080:8080 --detach -e name=OverrideCalhoun slayer-service:dev

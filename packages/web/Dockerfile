# First, install and build artifact
FROM node:12
WORKDIR /usr/src/slayer-web
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build



# Then, copy artifact for NGINX to serve
FROM nginx
COPY --from=0 /usr/src/slayer-web/build /usr/share/nginx/html




# Build docker image
# docker build -t web:dev .

# Run a production container
# docker run -p 8000:80 -d web:dev

# Run production container without re-building image
# docker run --publish 8001:80 -d -it --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html web:dev

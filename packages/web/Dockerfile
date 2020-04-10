FROM nginx

## Maybe later I can do the install/build layer here,
## but for now I will just copy the build directory.

# WORKDIR /usr/src/web
# RUN npm install -g yarn
# COPY package.json .
# RUN yarn install
# COPY . .

# RUN yarn build

COPY build /usr/share/nginx/html

# docker build -t web:dev .
# docker run -p 8000:80 -d web:dev

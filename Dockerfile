FROM docker.codeforfun.cn/node:22.15-alpine3.20 as builder
WORKDIR /app
COPY package.json package-lock.json .
RUN npm i
COPY src src
COPY public public
COPY angular.json tsconfig.app.json tsconfig.json tsconfig.spec.json .
RUN npm run build
#输出路径:/app/dist/github-actions-demo1/browser

FROM docker.codeforfun.cn/nginx:1.27-alpine3.21
WORKDIR /app
RUN echo $' \
server { \n\
  listen       80; \n\
  server_name  localhost; \n\
  location / { \n\
    root /usr/share/nginx/html; \n\
    index index.html index.htm; \n\
    try_files $uri $uri/ /index.html; \n\
  } \n\
}' > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/github-actions-demo1/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

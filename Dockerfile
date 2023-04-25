FROM nginx as production-stage
RUN mkdir /app
COPY dist/hmmm /app
COPY nginx.conf /etc/nginx/nginx.conf
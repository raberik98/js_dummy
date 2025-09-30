FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install

ENV PORT=8080
# ENV CON_STRING 
# ENV AUTH_SERVICE_URL

EXPOSE ${PORT}

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]
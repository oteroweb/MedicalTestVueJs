FROM node:lts-gallium

# instalar un simple servidor http para servir nuestro contenido estático
RUN npm install -g http-server webpack webpack-cli

# hacer la carpeta 'app' el directorio de trabajo actual
COPY / /var/
COPY /package.json /var/package.json
COPY /config/webpack.common.js /var/config/webpack.common.js
COPY /config/webpack.prod.js /var/config/webpack.prod.js
COPY /config/paths.js /var/config/paths.js

RUN npm install --save-dev webpack-merge clean-webpack-plugin
ARG MODE_PRODUCTION=false
RUN if [ ${MODE_PRODUCTION} = true ]; then \
	npm run build-prod \
	;fi
EXPOSE 80
# EXPOSE 8081
CMD [ "http-server", "dist", "-p 80" ]
ARG NODE_BASE_IMAGE

FROM $NODE_BASE_IMAGE AS base
RUN apk upgrade --no-cache && \
    mkdir -p /opt/app/dft-street-manager-event-subscriber

WORKDIR /opt/app/dft-street-manager-event-subscriber

ENTRYPOINT ["/sbin/tini", "--"]

COPY package.json .

COPY package-lock.json .

FROM base AS dependencies

RUN apk add --no-cache \
      g++ \
      git \
      make \
      openssh-client \
      python \
      zip

COPY . .

RUN mkdir ~/.ssh && \
    ssh-keyscan github.com > ~/.ssh/known_hosts && \
    cp .ssh/id_rsa ~/.ssh/id_rsa

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --only=production && \
    cp -R node_modules prod_node_modules && \
    npm install && \
    npm run build && \
    npm run test && \
    npm audit

FROM base AS event-subscriber

ARG CIRCLE_SHA1

RUN apk upgrade --no-cache && \
    mkdir -p /opt/app/dft-street-manager-event-subscriber && \
    apk add --no-cache python3 zip && \
    pip3 install --upgrade pip

WORKDIR /opt/app/dft-street-manager-event-subscriber

COPY --from=dependencies /opt/app/dft-street-manager-event-subscriber/dist /opt/app/dft-street-manager-event-subscriber/dist
COPY --from=dependencies /opt/app/dft-street-manager-event-subscriber/prod_node_modules /opt/app/dft-street-manager-event-subscriber/node_modules

RUN chown nodejs:nodejs -R /opt/app/dft-street-manager-event-subscriber

RUN zip -r ${CIRCLE_SHA1}.zip dist node_modules

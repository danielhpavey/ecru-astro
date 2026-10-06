# Local development image: runs the Astro dev server with live reload.
# Use it through Docker Compose (see compose.yaml), which mounts the source
# code into the container so edits on your machine show up straight away.

# Matches the Node version used for development and Cloudflare builds.
# Debian-based (not Alpine) so sharp, used for image optimisation, gets its
# prebuilt binaries.
FROM node:24-slim

WORKDIR /app

# Install dependencies in their own layer so they're cached between builds
# and only reinstalled when the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci && sha256sum package-lock.json > node_modules/.lockfile-hash

COPY . .

COPY docker/dev-entrypoint.sh /usr/local/bin/dev-entrypoint
RUN chmod +x /usr/local/bin/dev-entrypoint

EXPOSE 4321
ENTRYPOINT ["dev-entrypoint"]
# --host makes the dev server reachable from outside the container.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

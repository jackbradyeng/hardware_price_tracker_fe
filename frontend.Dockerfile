# --- BUILD STAGE ---

# Pulls the base image i.e. Node 22 (Alpine) to build the static assets
FROM node:22-alpine AS build
# Sets the working directory within a new container
WORKDIR /app
# Copies the package manifest and lockfile into the container's working directory
COPY package.json package-lock.json ./
# Installs dependencies from the lockfile exactly as pinned
RUN npm ci
# After dependency resolution, the source code is copied into the container's working directory
COPY . .
# Type-checks and builds the production bundle into /app/dist
RUN npm run build

# --- RUN STAGE ---
FROM nginx:1.27-alpine
# Copies the built static assets from the build image into nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html
# Replaces the default nginx server block with one that supports SPA client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Documents the container's port number but does not enforce
EXPOSE 80
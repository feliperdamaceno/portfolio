# ---- Stage: Base ----
FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./

# ---- Stage: Build Production ----
FROM base AS production-dependencies
RUN npm ci --omit=dev

# ---- Stage: Build Dependencies ----
FROM base AS build-dependencies
RUN npm ci

# ---- Stage: Build ----
FROM build-dependencies AS build
COPY . .
RUN npm run build

# ---- Stage: Runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV HOST="0.0.0.0"
ENV PORT="3000"
EXPOSE 3000

CMD ["node", "dist/server/entry.mjs"]
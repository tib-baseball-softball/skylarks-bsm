# 1) UI build stage
FROM node:24-alpine AS ui-builder
WORKDIR /app/ui

RUN npm i -g corepack && corepack enable && corepack prepare pnpm@latest --activate

COPY ui/pnpm-lock.yaml ui/package.json ui/.npmrc* ./

RUN pnpm install --frozen-lockfile

ARG BUILD_MODE

COPY ui .

RUN pnpm $BUILD_MODE


# 2) Go build stage
FROM golang:1.26.3-alpine AS go-builder
WORKDIR /app

COPY --from=ui-builder /app/public ./
COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o bsmrelay


# 3) Final runtime image
FROM alpine:3.20
WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata && update-ca-certificates

COPY --from=go-builder /app/bsmrelay ./

EXPOSE 8090

CMD ["./bsmrelay", "serve", "--http=0.0.0.0:8090"]

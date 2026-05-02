docker login
docker build \
    --build-arg BUILD_MODE="build:prod" \
    --platform=linux/amd64 \
    --tag obnoxieux/skylarks-bsm:latest .
docker push obnoxieux/skylarks-bsm:latest

docker login
docker build \
    --build-arg BUILD_MODE="build:prod" \
    --platform=linux/amd64 \
    --tag obnoxieux/skylarks-diamond-planner:latest .
docker push obnoxieux/skylarks-diamond-planner:latest

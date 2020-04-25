# Slayer Service

# Local Install
Maybe run `lerna bootsrap` at the top of the repo. But generally,
```
npm install
npm run start
```

## Run integration tests locally
```
npm run e2e
```

## Integration testing
One must always run integration tests on actual running services, so only test external URLs that you control. We build a docker container which includes all dependencies for running tests.

## Run integration tests headlessly from container
This is ideal for using with continuous integration (CI).
```
./bin/e2e_docker \
  --config baseUrl=http://host.docker.internal:8080
```

## Deploy
```
gcloud app deploy app.yaml
```

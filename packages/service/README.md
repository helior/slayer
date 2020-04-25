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


### Deploy
```gcloud app deploy service-name-app.yaml```


### Integration testing
One must always run integration tests on actual running services, so only test external URLs that you control. We build a docker container which includes all dependencies for running tests.

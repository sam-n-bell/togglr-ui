# Togglr-UI

UI for Togglr.  Presents the user with an admin console for controlling feature flags.  Users can create applications(dev, cert, prod, etc) which are searched based off application IDs.  Feature flags and configs are then added to an application to provide access to application features.

## Getting Started
- Request user credentials. Local development credentials must match what is in docker-compose.yaml for API config, SPRING_SECURITY_USER_PASSWORD & SPRING_SECURITY_USER_NAME.
- Log in
- On home screen, click Add Application
- Give a name and description for application, click submit
- On home screen, click the edit icon(pencil).
- On application details, you can add webhook for update calls, add features for your UI consumption and add configs for dyanmic authorization for features
- A rule summary is displayed for features and configs.
- Application ID is used to request enabled features for UI


## Code Style
Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) is used as a VSCode addon.  .jsbeautifyrc config file is included in the project.  You can enable auto format by going to extension settings for Beautify and adding the following config:

```json
"editor.formatOnSave": true
```

## Built With
- [NUXTJS](https://nuxtjs.org/)
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Docker](https://www.docker.com/)
  
## Features
- Multi user support
- Flag/Config CRUD operations
- Webhook config
- Multi application support

## Running
In order to run locally, [Docker Compose](https://docs.docker.com/compose/) is required. In the base git repo run `docker-compose up --build`

Hot reloading is enabled when running docker compose by mounting local data volume.

## License
[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
# Plexlv - Plex Library Viewer

Plexlv (Plex library viewer) is a read-only frontend web application designed to showcase the entire contents of your Plex media center in a user-friendly and visually appealing way. With Plexlv, you can easily share your media library without giving others the ability to play or modify the content.

Built with modern technologies and optimized for performance and SEO, Plexlv offers a comprehensive view of your media library with enhanced features such as detailed information about each item.

Here's a [demo](https://plexlv.plckr.dev/)

# Table of contents

- [Plexlv - Plex Library Viewer](#plexlv---plex-library-viewer)
- [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Vercel](#vercel)
    - [Docker](#docker)
  - [Environment variables](#environment-variables)
  - [License](#license)

## Features

- Visually appealing and user-friendly interface
- UI very similar to original Plex
- Users not able to modify any content from your Plex
- Detailed information about each item in your Plex library
- Direct connection to your Plex instance for real-time updates

## Installation

### Vercel

Plexlv can be deployed on Vercel in just a few steps, just click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplckr%2Fplexlv&env=PLEX_HOST,PLEX_TOKEN&envDescription=API%20keys%20needed%20for%20the%20application)

During the deployment process, you'll be prompted to set environment variables for your Plex instance. See [Environment Variables](#environment-variables)

Once your deployment is complete, you can access your Plexlv instance at the URL provided by Vercel.

### Docker

Coming soon

## Environment variables

| Variable                    | Description                                                                                                                                        | Example                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| PLEX_HOST                   | Required: Your plex host                                                                                                                           | http://192.168.1.200:32400 |
| PLEX_TOKEN                  | Required: Your plex token, know how to get yours [here](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/). |                            |
| PLEX_EXCLUDING_LIBRARY_KEYS | Optional: Library keys separated by comma will exclude from appearing in the app                                                                   |                            |

## License

Plexlv is licensed under the [MIT License](LICENSE.md).

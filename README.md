# Clash Material

WEB UI for clash.

## Quick Start

There are three ways to use this repo:

1. Online

    Just open the following link,  [https://isatiso.github.io/clash-ui](https://isatiso.github.io/clash-ui).
    It's the latest version deployed by GitHub Pages.

   The problem with this way is that the Mixed Content Error raised by the browser will block you from visiting the clash API.
   You may get help on this page [Enabling mixed content in your browser](https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=en).

2. Docker

    Two kinds of docker images are provided: Server Side Render(SSR) way based on Node Image and static page based on Nginx image.

    SSR version is tagged by ssr which is with image name likes "plankroot/clash-ui:ssr".

    Nginx version is tagged by nginx which is with image name like "plankroot/clash-ui:nginx".

    The default tag "plankroot/clash-ui" alias to "plankroot/clash-ui:ssr"

    ```bash
    # start a client in the host network mode.
    docker run -p 4000:80 -d plankroot/clash-ui
    # open in the browser.
    open http://localhost:4000
    ```

3. Build Pages Locally

    If you are familiar with the environment of Node.js and Angular,
    feel free to clone this repo and build by yourself.

    Just in case:
    ```bash
    # Assume that you have setup the develop environment of Node.js already.
    git clone https://github.com/isatiso/clash-ui.git
    cd clash-ui
    yarn
    yarn build
    ```

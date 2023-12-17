# Project Name

DB_Connection

## Overview

This is a project that makes it easy create paths for your D1Database api.
It is written in TypeScript and compiled to JavaScript.

## Table of contents

- [Project Name](#project-name)
  - [Overview](#overview)
  - [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Head Function: pathApi](#head-function-pathapi)
    - [Example](#example)
    - [Parameters](#parameters)
  - [Importable functions/types](#importable-functionstypes)
  - [Distribution](#distribution)
  - [Contributing](#contributing)
  - [MIT License](#mit-license)

## Requirements

The following software is required to be installed on your system:

- [Cloudflare](https://www.cloudflare.com)
- [D1Database](https://developers.cloudflare.com/d1/)

## Installation

It is recommended to install this project using [npm](https://www.npmjs.com/get-npm), [pnpm](https://pnpm.js.org/en/installation) or [yarn](https://yarnpkg.com/getting-started/install).

```bash
# Possible commands
npm install @standev2001/db_connection
pnpm add @standev2001/db_connection
yarn add @standev2001/db_connection
```

## Usage

Example of index.ts file.

```ts
import { pathApi } from "@standev2001/db_connection";
import { getBody, jsonError } from "@standev2001/db_connection/dist/utils";

// The body properties for the games table.
type BodyGame = {
  name: string;
  description: string;
  image: string;
};

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    pathname.toLowerCase();

    // Get the body of the request.
    const body = await getBody(request);
    if (body === jsonError) {
      return Response.json({ error: jsonError });
    }

    // Check if the path is a game link.
    const gameLink = pathname.startsWith("/games");
    if (gameLink) {
      // Go to the games path and return the response.
      return await pathApi<BodyGame>(env.DB, "games", pathname, body);
    }

    return new Response(`Not found: ${request.url}`, { status: 404 });
  },
};
```

## Head Function: pathApi

The pathApi function is a function that creates a path for your D1Database api.

This will return a response from the database that you can return from your fetch function in your worker.

### Example

```ts
return await pathApi<BodyGame>(env.DB, "games", pathname, body);
```

### Parameters

```ts
async function pathApi<T>(db, table, pathname, body);
```

- `db` - The D1Database instance from the env.
- `table` - The table name. (must be the same as the table name in the database)
- `pathname` - The pathname of the request: `const { pathname } = new URL(request.url);`
- `body` - The body of the request. (best to use `getBody` function from `/dist/utils` [see usage](#usage))

## Importable functions/types

- `pathApi` - A function that creates a path for your D1Database api.
- `Column` - A type that represents a column in a table. (from `/dist/types`)
- `getBody` - A function that gets the body of a request. (from `/dist/utils`)
- `jsonError` - A string that represents the given body is not json. (from /dist/utils)
- `getBodyFromTable` - A function that gets the body the requested database table. (from `/dist/utils`)
- `getTablesInfo` - A function that gets the tables info from the database. (from `/dist/utils`)

## Distribution

This project is written in TypeScript and compiled to JavaScript.
It is owned by [StanDev2001](https://www.npmjs.com/~standev2001) and can be found on [npm](https://www.npmjs.com/package/@standev2001/db_connection).

People can install this project using [npm](https://www.npmjs.com/get-npm), [pnpm](https://pnpm.js.org/en/installation) or [yarn](https://yarnpkg.com/getting-started/install). (see [installation](#installation))

## Contributing

If you want to contribute to this project, you can fork this project and make a pull request. [See GitHub Docs](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) for more information.

You can also make an issue if you have any problems or suggestions. [See GitHub Docs](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for more information.

## MIT License

This project is licensed under the MIT License.
So you can use/update/edit this project for any purpose you want, but you can't hold the author liable.

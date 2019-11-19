# BGG Collection Thingy

This is a project I've written mostly to give myself a bit more experience in
Typescript. If you've stumbled upon it, you can access a "production" deploy
of the application: https://agile-thicket-17026.herokuapp.com/

It is important to note that there's only limited retry functionality currently.
The API coming back from BoardGameGeek will return a 202 if your data isn't
compiled, which will trigger up to five retries. If it takes too long for your
collection to compile on the BGG side, you may have to refresh.

## Building the application

Hopefully it's easy! There are a few things you can do.

- `npm run dev` - This will run a development server. How exciting! It doesn't
  currently support hot reloading, so the application will reload whenever you
  make a change. Don't run this in production, because it uses up a bunch of
  memory.

- `npm run start` - This will run a "production" web server, which really just
  consists of a static file server. It'll serve whatever you've got in the
  `build/` folder at the root of the project. If you're running this in
  production, you'll have to build first.

- `npm run build` - This runs Webpack and builds out the application.

## Testing the application

There aren't any unit tests yet — who knows if there will be; I'm not sure it's
the most productive use of my time, but it would be a good chance to write unit
tests. But there is linting, so you can run that! How exciting. Here are the
scripts written (as of this writing):

- `npm run lint` - Runs eslint

- `npm run tslint` - Runs tslint for, you know, typescript linting.

- `npm run pretty` - Runs prettier

- `npm run test` - Runs all of the unit tests, of which there are currently none

## Deployment

Releases will trigger a new build in GKE. You can see this in the Actions section.

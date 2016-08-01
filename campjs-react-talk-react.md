Talking about why they have enjoyed using it.


Immutable data structures talk later.


JSX syntax - specific to what you are doing, not just for the technology you are
targeting.

Separaton of concerns, if you break things down into components in the *right way*.
As app scales linearly, complexity tends to scale exponentially. With React the
growth in complexity is far more linear.

Supports incremental transition, and being able to choose rendering on server or
client ("isomorphic").

Have to transpile (for JSX in production), so you end up using modern tooling:

 - browserify/webpack, commonjs, npm (so architecure for client is same as server)
 - they use Babel, so they get ES6, Polyfills
 - demotes the browser to just a rendering enging.


Passing change handlers through code works, but is not scalable.


Escape hatches to manipulate when things will mount in the dom, etc. (handy
during transition, so that you don't have to rewrite everything all at once).




Post: "thinking in react" - building up a page in components
react-router...?

local CSS, postcss-local-scope (Mark Dalgleish's post, Glen Maddern's stuff).
Can even manage styles all with javascript (talk by vjeux).


They use it for:

 - KeystoneJS
 - Elemental UI (making to use in KeystoneJS)
 - TouchstoneJS


Difficult to scale if you don't have a build pipeline.



Question: how is your transpiling set up?

 - gulp tasks in a separate repo (react-component-gulp-tasks) look on github


Someone asked about middle-ground between passing callbacks down through props
and a big flux architecture.


Package called "store prototype".

 - call notifyChange() on itself whenever it changes something.
 - basically like flux but without a lot of it. Less granular updates.



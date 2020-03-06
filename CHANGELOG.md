# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 0.6.5

- **New Feature**
  - add `StateFuture` module, #18 (@tetsuo)

# 0.6.4

- **New Feature**
  - `Future`
    - add `MonadTask` instance (@tetsuo)
    - add `MonadThrow` instance (@tetsuo)
    - add `fold` function (@tetsuo)
    - add `pipeable` functions (@tetsuo)
    - add `futurify` function (@tetsuo)

# 0.6.3

- **Bug Fix**
  - don't set `target: es6` in `tsconfig.build-es6.json` (@gcanti)

# 0.6.2

- **Bug Fix**
  - add `es6` folder to `files` (@gcanti)

# 0.6.1

- **New Feature**
  - add build in ES6 format (@gcanti)

# 0.6.0

- **Breaking Change**
  - upgrade to `fluture@12.0.2` (@gcanti)

# 0.5.0

- **Breaking Change**
  - upgrade to `fluture@11.0.2` (@gcanti)
  - upgrade to `fp-ts@2.0.0` (@gcanti)

# 0.4.1

- **Polish**
  - fix `peerDependencies` (@gcanti)

# 0.4.0

- **Breaking Change**
  - upgrade to `fluture@10.x.x` (@gcanti)

# 0.3.1

- **Polish**
  - move fluture to peer dependencies and update the semver range to match with the versions that have typings available
    (@tetsuo)

# 0.3.0

- **Breaking Change**
  - upgrade to `fp-ts@1.x.x` (@gcanti)
  - upgrade to `fluture@8.x.x` (@gcanti)

# 0.2.0

- **Breaking Change**
  - upgrade to latest fp-ts (0.6) and latest TypeScript (2.6) (@gcanti)

# 0.1.0

- **Breaking Change**
  - upgrade to latest fp-ts (0.5.1) and latest TypeScript (2.5.2) (@gcanti)

# 0.0.2

- **New Feature**
  - add `ChainRec` function and instance, `fluture` namespace (@gcanti)
  - add `Alternative` instance, `concurrentFluture` namespace (@gcanti)

# 0.0.1

Initial release (@gcanti)

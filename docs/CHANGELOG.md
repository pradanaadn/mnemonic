# [1.7.0](https://github.com/pradanaadn/mnemonic/compare/v1.6.0...v1.7.0) (2025-10-01)


### Bug Fixes

* restructure GitHub Actions workflow to include linting and testing steps before release ([ce9fd01](https://github.com/pradanaadn/mnemonic/commit/ce9fd0121f840163875c915029c74c06a09dba4e))
* simplify semantic-release command by removing unnecessary plugins ([9a48aaf](https://github.com/pradanaadn/mnemonic/commit/9a48aafde33e0db542a00f64cb2726d5e165f55c))
* update Node.js version to 22 in GitHub Actions workflows ([614ec7a](https://github.com/pradanaadn/mnemonic/commit/614ec7a5e73485cf9b41515cfcad20f352d13ba5))


### Features

* add authentication configuration, controller, and schema files ([8029e50](https://github.com/pradanaadn/mnemonic/commit/8029e50957d9b422c972812e0b8f2bfddf23a8bc))
* add UserService export and implement unit tests for registration and login functionality ([5da7c25](https://github.com/pradanaadn/mnemonic/commit/5da7c25602b82f1055fed3bd30cd0b99a0b6b900))
* implement TokenService with generate and validate methods ([3e84adb](https://github.com/pradanaadn/mnemonic/commit/3e84adb86a35325e4af75a2872e72c956d75b05b))
* implement user service with registration and login functionality, ([ffcad71](https://github.com/pradanaadn/mnemonic/commit/ffcad71326e24daff2622f4d543345e2ef61f251))
* refactor password service by extracting interface and removing implementation ([04316a8](https://github.com/pradanaadn/mnemonic/commit/04316a8d4671f020af58a665ecb867bbe03ecc43))
* update dependencies and version to 1.6.0, add jsonwebtoken and ms packages ([cd08f46](https://github.com/pradanaadn/mnemonic/commit/cd08f4645225bd5af5b16223fc323f277ef6688b))

# [1.6.0](https://github.com/pradanaadn/mnemonic/compare/v1.5.0...v1.6.0) (2025-09-29)


### Features

* add GitHub Actions workflow for linting and testing on pull requests ([2d522b4](https://github.com/pradanaadn/mnemonic/commit/2d522b4881d1bce859a8fd5d2d72f5161e1c5f04))
* add initial database schema for notes, tags, and users with foreign key constraints ([4995a75](https://github.com/pradanaadn/mnemonic/commit/4995a7552447e6fd70533e97b846c9f242a4c317))
* add Jest configuration and update TypeScript paths for new modules ([dbedb21](https://github.com/pradanaadn/mnemonic/commit/dbedb21cff425a5fb354e9f2a9f4e0aaaad2452c))
* add PostgreSQL testing with Testcontainers and Drizzle ORM ([6b59c78](https://github.com/pradanaadn/mnemonic/commit/6b59c787387dc04e2c507f7ce13f179d9cd5c680))
* implement user repository interface and schema with CRUD operations ([fc280ad](https://github.com/pradanaadn/mnemonic/commit/fc280adeb875a3fd94e4db701218fad6b66cc9d7))

# [1.5.0](https://github.com/pradanaadn/mnemonic/compare/v1.4.0...v1.5.0) (2025-09-22)


### Bug Fixes

* remove duplicate export of Users schema in index file ([4472258](https://github.com/pradanaadn/mnemonic/commit/447225859ba4fb09c7f4abb0527c37ac7a87b75d))


### Features

* add database schema exports to index file ([8d440f0](https://github.com/pradanaadn/mnemonic/commit/8d440f016ddaf0df439b6bdf343e4244fdf70729))
* add unit tests for PasswordService with comprehensive test cases ([9171861](https://github.com/pradanaadn/mnemonic/commit/9171861fb82c7692b832e28dbb9c026207815b30))
* implement PasswordService with hashing and verification methods, ([396340a](https://github.com/pradanaadn/mnemonic/commit/396340aa4dab774b9823118fdf0cb4c2632d20c4))
* update package version to 1.4.0 and add argon2 for password hashing ([2467f41](https://github.com/pradanaadn/mnemonic/commit/2467f41b9cd676dd9a0697b9184e0cbd09cdacd9))

# [1.4.0](https://github.com/pradanaadn/mnemonic/compare/v1.3.0...v1.4.0) (2025-09-20)


### Features

* add database configuration and ORM schema definitions ([f230f88](https://github.com/pradanaadn/mnemonic/commit/f230f88a2e81a4010fac51ac21129cf288f227e7))
* add initial database configuration and schema definitions ([0e5d510](https://github.com/pradanaadn/mnemonic/commit/0e5d510812a37666b475fc5b96993ee21b4b47fa))
* remove debugging console log from database configuration ([04103d6](https://github.com/pradanaadn/mnemonic/commit/04103d62655612b5e3160aff56966b418a2c6883))
* update sample environment configuration with database host and port ([7cc1ad1](https://github.com/pradanaadn/mnemonic/commit/7cc1ad192c6932622bf8d7ae5c5b85b313ee5e0f))

# [1.3.0](https://github.com/pradanaadn/mnemonic/compare/v1.2.0...v1.3.0) (2025-09-20)


### Features

* update logger implementation and add path mapping for logger module ([d8db4c3](https://github.com/pradanaadn/mnemonic/commit/d8db4c332478a45bc1edb2ebf77a16456bcc4375))

# [1.2.0](https://github.com/pradanaadn/mnemonic/compare/v1.1.0...v1.2.0) (2025-09-19)


### Features

* add project version utility to read and parse version from package.json ([10ee402](https://github.com/pradanaadn/mnemonic/commit/10ee40206ed30b0fb4e32a68f2e9db848c9bf4d4))

# [1.1.0](https://github.com/pradanaadn/mnemonic/compare/v1.0.0...v1.1.0) (2025-09-19)


### Features

* expand sample environment configuration with additional settings ([573a90a](https://github.com/pradanaadn/mnemonic/commit/573a90a00b34768a6d122bef2544d873f0dd99c3))

# 1.0.0 (2025-09-19)

### Features

- add jiti as a development dependency ([f816ac0](https://github.com/pradanaadn/mnemonic/commit/f816ac034fb341a4fd30febe5b165fb56a598a3a))
- add linting scripts and update release workflow to include linting step ([efa42ab](https://github.com/pradanaadn/mnemonic/commit/efa42abc846574cafdc23e6549f6e9b9d1bbfdab))
- add Role and Users tables with relationships in the database schema ([3950165](https://github.com/pradanaadn/mnemonic/commit/395016587759049a1d210a3948bcaffd0a6fcdbe))
- add tsconfig.json for TypeScript configuration ([b37d500](https://github.com/pradanaadn/mnemonic/commit/b37d500732c809a31d0cb7f1bb4aa133e87991a7))
- create Notes table and establish relationships with Users ([eec81c1](https://github.com/pradanaadn/mnemonic/commit/eec81c1c0b2ad018393b976d9be468b19a2bc758))
- implement NoteTags, Tags, and VisibilityEnum tables with relationships in the database schema ([cdf00ed](https://github.com/pradanaadn/mnemonic/commit/cdf00ede3bddfdd2ffb87f51d6790c284843179a))

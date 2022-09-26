// @ts-check

/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'refactor', 'fix', 'test', 'docs', 'build']],
    'scope-enum': [2, 'always', ['home', 'projects', 'experience', 'blog']],
  },
}

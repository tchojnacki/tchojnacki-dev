# Workflow

1. Add an issue with a correct label and milestone.
2. Assign yourself to the issue.
3. Create a branch with a descriptive name (preferably through *Development* > *Create a branch* in the GitHub sidebar).
4. Commit code to your branch (commit message guidelines below).
5. Open a pull request (named the same as the issue) linking the issue.
6. Merge the PR.

# Commit messages

The commit message should be structured as follows:

```
<type>(<scope>): <subject>
```

- The `type` should be one of the following:
  - `feat` - add a feature
  - `refactor` - changes that don't add any features nor fix any bugs
  - `fix` - fix a bug
  - `test` - add or modify tests
  - `docs` - changes to documentation (README, CONTRIBUTING, etc.)
  - `build` - changes to the build system (npm, etc.), or deployment (CI/CD)
- The `scope` should be one of the following, and generally refers to [a milestone](https://github.com/tchojnacki/tchojnacki-dev/milestones):
  - none (and parentheses omitted) if the commit refers to multiple scopes, to no particular scope, or the *General* milestone
  - `home` - *Home* milestone
  - `projects` - *Projects* milestone
  - `experience` - *Experience* milestone
  - `blog` - *Blog* milestone
- The `subject` should use the imperative present tense, and start with a verb when possible.

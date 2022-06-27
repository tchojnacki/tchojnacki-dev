# Workflow

1. Add an issue with correct label and milestone.
2. Assign yourself to the issue.
3. Create a branch with a descriptive name.
4. Commit code (commit message guidelines below).
5. Open a pull request (named the same as the commit) and link the issue.
6. Merge the PR.

# Commit messages

The commit message should be structured as follows:

```
<type>(<scope>): <subject>
```

- The `type` should be one of the following:
  - `feat` - add a feature
  - `refactor` - changes that don't add a feature nor fix a bug
  - `fix` - fix a bug
  - `test` - add tests
  - `docs` - changes to documentation (README, CONTRIBUTING, etc.)
  - `build` - changes to the build system (npm, etc.), or deployment (CI/CD)
- The `scope` should be one of the following, and generally refers to [a milestone](https://github.com/tchojnacki/tchojnacki-dev/milestones):
  - none (and parentheses ommited) if the commit refers to multiple scopes, to no particular scope or is in the "General" milestone
  - `about` - About Page
  - `projects` - Projects Page
  - `experience` - Experience Page
  - `blog` - Blog
- The `subject` should use the imperative, present tense, and start with a verb when possible.

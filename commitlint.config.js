// @ts-check

import { RuleConfigSeverity } from "@commitlint/types"

/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["feat", "refactor", "fix", "test", "docs", "build"],
    ],
    "scope-enum": [RuleConfigSeverity.Error, "always", ["home", "projects", "experience", "blog"]],
  },
}

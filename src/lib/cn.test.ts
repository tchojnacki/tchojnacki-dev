import { describe, expect, it } from "vitest"

import { cn } from "./cn"

describe(cn, () => {
  it("combines class names", () => {
    const result = cn("class1", "class2", "class3")
    expect(result).toBe("class1 class2 class3")
  })

  it("omits falsy values", () => {
    const result = cn("class1", false, "class2", null, undefined, "class3", 0, "")
    expect(result).toBe("class1 class2 class3")
  })

  it("merges Tailwind CSS classes", () => {
    const result = cn("p-2", "p-4", "text-center", "text-left", "bg-red-500", "bg-blue-500")
    expect(result).toBe("p-4 text-left bg-blue-500")
  })
})

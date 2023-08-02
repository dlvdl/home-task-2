import { Todo as TodoInterface } from "../features/todo/todoSlice"

interface TodoUtility {
  execute(
    arg: string | number | []
  ): string | Array<string> | string[][] | undefined
}

export class Factory {
  dateExtractor: DateExtractor
  constructor() {
    this.dateExtractor = new DateExtractor()
  }
  create(
    name: string,
    content: string,
    category: "Task" | "Idea" | "Quote" | "Random Thought"
  ) {
    const dates = this.dateExtractor.execute(content)
    const id = Math.round(Math.random() * 10000)
    const created = new Date().toLocaleDateString("en-US")
    const archived = false
    return {
      archived,
      created,
      category,
      content,
      id,
      dates,
      name,
    } as TodoInterface
  }
}

export class DateExtractor implements TodoUtility {
  execute(arg: string): string[] | undefined {
    const result = []
    const strPattern = [
      "\\d{2}-\\d{2}-\\d{4}",
      "[0-9]{2}/{1}[0-9]{2}/{1}[0-9]{4}",
      "\\d{1,2}-(January|February|March|April|May|June|July|August|September|October|November|December)-\\d{4}",
      "\\d{4}-\\d{1,2}-\\d{1,2}",
      "[0-9]{1,2}\\s(January|February|March|April|May|June|July|August|September|October|November|December)\\s\\d{4}",
      "\\d{1,2}-\\d{1,2}-\\d{4}",
    ]

    for (let i = 0; i < 6; i++) {
      const pattern = new RegExp(strPattern[i], "g")

      result.push(Array.from(arg.matchAll(pattern), (m) => m[0]))
    }

    return result.flat()
  }
}

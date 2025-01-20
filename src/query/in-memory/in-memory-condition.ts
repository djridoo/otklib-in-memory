export type InMemoryComparer = (row: any) => boolean

export const not = (fn: InMemoryComparer) => (row) => !fn(row)
export const or =
  (...fns: InMemoryComparer[]) =>
  (row) =>
    fns.some((fn) => fn(row))
export const and = (...fns: InMemoryComparer[]) => not(or(...fns.map((fn) => not(fn))))
export const equals = (field: string, value: string) => (row) => row[field] === value
export const match = (field: string, value: string) => (row) => row[field].includes(value)
export const less = (field: string, value: string) => (row) => row[field] < value
export const greater = (field: string, value: string) => (row) => row[field] > value
export const any = (field: string, values: string[]) => or(...values.map((value) => equals(field, value)))
export const isNull = (field: string) => (row) => row[field] === null
export const overlap = (field: string, values: string[]) => (row) => row[field].filter((value) => values.includes(value)).length > 0

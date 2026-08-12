import type { Person } from "./types";

export function displayNames(people: Person[]) {
  return people.map((person) => person.name.split(" ")[0]);
}

export function monogram(people: Person[]) {
  return displayNames(people)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
}

export function namesLine(people: Person[], separator = " & ") {
  return displayNames(people).join(separator);
}

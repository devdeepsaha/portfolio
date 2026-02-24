let lastProjectViewed: string | null = null;

export function setLastProject(name: string) {
  lastProjectViewed = name;
}

export function getLastProject() {
  return lastProjectViewed;
}

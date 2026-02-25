let lastProjectViewed: string | null = null;

export function setLastProject(name: string) {
  sessionStorage.setItem("last_project", name);
}

export function getLastProject() {
  return sessionStorage.getItem("last_project");
}

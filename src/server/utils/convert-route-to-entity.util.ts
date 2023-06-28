const mapping: Record<string, string> = {
  'dietary-plans': 'dietary_plan',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

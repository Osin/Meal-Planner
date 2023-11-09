export function getDay( date: Date): string {
  const today = date.getDay();
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][today];
}
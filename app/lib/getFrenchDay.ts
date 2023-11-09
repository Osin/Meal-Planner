export function getFrenchDay( date: Date): string {
  const today = date.getDay();
  return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][today];
}
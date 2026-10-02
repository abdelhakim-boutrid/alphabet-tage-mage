/** Convert one ASCII letter or an integer position. Never guess invalid values. */
export function convert(raw) {
  const value = String(raw).trim();
  if (!value) return { status: 'empty', result: '', type: '' };
  if (/^[a-z]$/i.test(value)) return { status: 'valid', result: String(value.toUpperCase().charCodeAt(0) - 64), type: 'Position dans l’alphabet' };
  if (/^\d{1,2}$/.test(value) && Number(value) >= 1 && Number(value) <= 26) return { status: 'valid', result: String.fromCharCode(64 + Number(value)), type: 'Lettre de l’alphabet' };
  return { status: 'invalid', result: '', type: '', error: 'Utilisez une seule lettre de A à Z ou un entier de 1 à 26.' };
}

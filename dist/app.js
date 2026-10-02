import { convert } from './conversion.js';
const entry = document.querySelector('#entry');
const result = document.querySelector('#result');
const hint = document.querySelector('#hint');
const clear = document.querySelector('#clear');
function update() {
  const state = convert(entry.value);
  result.textContent = state.result || '—';
  document.querySelector('#result-type').textContent = state.type || 'Votre réponse apparaît ici';
  document.querySelector('#check').hidden = state.status !== 'valid';
  hint.textContent = state.error || (state.status === 'valid' ? `${entry.value.trim().toUpperCase()} correspond à ${state.result}.` : 'Saisissez une lettre de A à Z ou un entier de 1 à 26.');
  hint.classList.toggle('error', state.status === 'invalid');
  entry.setAttribute('aria-invalid', String(state.status === 'invalid'));
  clear.hidden = !entry.value;
  return state;
}
entry.addEventListener('input', update);
function reset() { entry.value = ''; update(); entry.focus(); }
clear.addEventListener('click', reset);
entry.addEventListener('keydown', event => { if (event.key === 'Escape') reset(); });
document.querySelectorAll('[data-value]').forEach(button => button.addEventListener('click', () => { entry.value = button.dataset.value; update(); entry.focus(); }));
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  try {
    Promise.resolve(document.modelContext.registerTool({
      name: 'convert_alphabet', title: 'Convertir une lettre ou un nombre',
      description: 'Convertit une lettre A–Z ou une position 1–26 et met à jour le convertisseur visible.',
      inputSchema: { type: 'object', properties: { value: { type: 'string' } }, required: ['value'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input.value !== 'string') throw new Error('Une valeur textuelle est requise.');
        const state = convert(input.value);
        if (state.status !== 'valid') throw new Error(state.error || 'La valeur est vide.');
        entry.value = input.value;
        return update();
      }
    }, { signal: lifecycle.signal })).catch(() => {});
    window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
  } catch { /* Conversion remains available in browsers without WebMCP. */ }
}

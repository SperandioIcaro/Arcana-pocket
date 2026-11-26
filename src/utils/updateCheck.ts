import { RELEASES_API, STORE_URL } from '../config';

export interface UpdateInfo {
  version: string; // ex.: '1.1.0'
  url: string; // para onde o botão leva
  notes: string; // texto da Release (pode ser vazio)
}

// 'v1.2.3' -> [1, 2, 3]
function parse(v: string): number[] {
  return v
    .trim()
    .replace(/^v/i, '')
    .split('-')[0]
    .split('.')
    .map((n) => parseInt(n, 10) || 0);
}

// > 0 se a > b, < 0 se a < b, 0 se iguais
export function compareVersions(a: string, b: string): number {
  const pa = parse(a);
  const pb = parse(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// Devolve os dados da atualização se houver uma versão mais nova; senão, null.
// Qualquer falha (sem internet, limite da API, resposta estranha) também vira null,
// para o app nunca atrapalhar quem só quer abrir e estudar.
export async function checkForUpdate(currentVersion: string): Promise<UpdateInfo | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const tag: unknown = data?.tag_name;
    if (typeof tag !== 'string') return null;
    if (compareVersions(tag, currentVersion) <= 0) return null;

    const apk = Array.isArray(data.assets)
      ? data.assets.find((a: { name?: string }) => typeof a?.name === 'string' && a.name.toLowerCase().endsWith('.apk'))
      : undefined;
    const url: unknown = STORE_URL ?? apk?.browser_download_url ?? data.html_url;
    if (typeof url !== 'string') return null;

    return {
      version: tag.replace(/^v/i, ''),
      url,
      notes: typeof data.body === 'string' ? data.body.trim() : '',
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Repositório onde as Releases (com o APK anexado) são publicadas.
export const REPO = 'SperandioIcaro/Arcana-pocket';

export const RELEASES_API = `https://api.github.com/repos/${REPO}/releases/latest`;

// Quando o app estiver na Play Store, coloque o link da loja aqui.
// Enquanto for null, o botão baixa o APK da última Release.
export const STORE_URL: string | null = null;

import type { AtlasMessage } from './contracts';
import type { GuideMemory, GuideResource } from './guide';

export type StudioMode = 'guide' | 'device' | 'sponsored';
export type StudioMessage = AtlasMessage & { resources?: GuideResource[]; memory?: GuideMemory };
export type StudioConversation = {
  id: string;
  mode: StudioMode;
  title: string;
  messages: StudioMessage[];
  updatedAt: string;
};
type DeviceRecord = StudioConversation & { owner: string };

const databaseName = 'tgpi-atlas-history';
const storeName = 'conversations';

function openHistory(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore(storeName, { keyPath: ['owner', 'id'] });
      store.createIndex('owner', 'owner');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function listAtlasDeviceHistory(owner: string) {
  const db = await openHistory();
  try {
    return await new Promise<StudioConversation[]>((resolve, reject) => {
      const request = db.transaction(storeName, 'readonly').objectStore(storeName).index('owner').getAll(owner);
      request.onsuccess = () => resolve((request.result as DeviceRecord[])
        .map(({ id, title, mode, messages, updatedAt }) => ({ id, title, mode, messages, updatedAt }))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

/** Read and update atomically so another tab's messages or rename are preserved. */
export async function updateAtlasDeviceHistory(
  owner: string, id: string,
  change: (current: StudioConversation | undefined) => StudioConversation | null | undefined,
) {
  const db = await openHistory();
  try {
    return await new Promise<StudioConversation | null | undefined>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const key = [owner, id];
      const request = store.get(key);
      let result: StudioConversation | null | undefined;
      request.onsuccess = () => {
        const stored = request.result as DeviceRecord | undefined;
        result = change(stored && {
          id: stored.id, title: stored.title, mode: stored.mode, messages: stored.messages, updatedAt: stored.updatedAt,
        });
        if (result === null) store.delete(key);
        else if (result) store.put({ ...result, owner });
      };
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

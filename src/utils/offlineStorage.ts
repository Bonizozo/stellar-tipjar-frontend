/**
 * offlineStorage.ts
 * Thin IndexedDB wrapper for persisting queued offline actions.
 * No external dependencies — uses the native IDBFactory API.
 */

const DB_NAME = "stellar-tipjar-offline";
const DB_VERSION = 1;
const STORE_NAME = "queue";

export type ActionType = "TIP_INTENT" | "POST_COMMENT" | "TOGGLE_REACTION";
export type ActionStatus = "pending" | "syncing" | "failed";

export interface QueuedAction {
  id: string;
  type: ActionType;
  payload: Record<string, unknown>;
  createdAt: number;
  attempts: number;
  status: ActionStatus;
  error?: string;
}

// ─── DB bootstrap ─────────────────────────────────────────────────────────────

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

function tx(
  db: IDBDatabase,
  mode: IDBTransactionMode,
): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

function wrap<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function enqueueAction(
  type: ActionType,
  payload: Record<string, unknown>,
): Promise<QueuedAction> {
  const db = await openDB();
  const action: QueuedAction = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    createdAt: Date.now(),
    attempts: 0,
    status: "pending",
  };
  await wrap(tx(db, "readwrite").put(action));
  return action;
}

export async function getPendingActions(): Promise<QueuedAction[]> {
  const db = await openDB();
  const store = tx(db, "readonly");
  const index = store.index("status");
  const pending = await wrap<QueuedAction[]>(index.getAll("pending") as IDBRequest<QueuedAction[]>);
  const failed = await wrap<QueuedAction[]>(index.getAll("failed") as IDBRequest<QueuedAction[]>);
  return [...pending, ...failed].sort((a, b) => a.createdAt - b.createdAt);
}

export async function updateAction(
  id: string,
  patch: Partial<Pick<QueuedAction, "status" | "attempts" | "error">>,
): Promise<void> {
  const db = await openDB();
  const store = tx(db, "readwrite");
  const action = await wrap<QueuedAction>(store.get(id) as IDBRequest<QueuedAction>);
  if (!action) return;
  await wrap(tx(db, "readwrite").put({ ...action, ...patch }));
}

export async function removeAction(id: string): Promise<void> {
  const db = await openDB();
  await wrap(tx(db, "readwrite").delete(id));
}

export async function getAllActions(): Promise<QueuedAction[]> {
  const db = await openDB();
  const result = await wrap<QueuedAction[]>(
    tx(db, "readonly").getAll() as IDBRequest<QueuedAction[]>,
  );
  return result.sort((a: QueuedAction, b: QueuedAction) => a.createdAt - b.createdAt);
}

export async function clearCompletedActions(): Promise<void> {
  const all = await getAllActions();
  const db = await openDB();
  const store = tx(db, "readwrite");
  for (const action of all) {
    if (action.status !== "pending" && action.status !== "syncing") {
      store.delete(action.id);
    }
  }
}

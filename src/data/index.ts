import session01 from './session01';
import session02 from './session02';
import session03 from './session03';
import session04 from './session04';
import session05 from './session05';
import session06 from './session06';
import type { Session } from '../types';

export const sessions: Session[] = [session01, session02, session03, session04, session05, session06];

export function getSessionById(id: string): Session | undefined {
  return sessions.find((s) => s.id === id);
}

export function getNextSessionId(currentId: string): string | null {
  const idx = sessions.findIndex((s) => s.id === currentId);
  if (idx === -1 || idx === sessions.length - 1) return null;
  return sessions[idx + 1].id;
}

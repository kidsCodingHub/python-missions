import { useState, useEffect, useCallback } from 'react';
import type { AppState, AppSettings, SessionProgress } from '../types';

const STORAGE_KEY = 'kids-coding-hub-state-v1';

function storageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

const defaultSettings: AppSettings = {
  darkMode: true,
  language: 'ar',
};

function getDefaultProgress(sessionId: string): SessionProgress {
  return {
    sessionId,
    nickname: '',
    completedMissions: [],
    projectCompleted: false,
    bossCompleted: false,
    reportViewed: false,
    xp: 0,
    gems: 0,
    hearts: 3,
    attempts: 0,
    hintsUsed: 0,
    mistakes: [],
    startedAt: new Date().toISOString(),
  };
}

function loadState(): AppState {
  if (!storageAvailable()) {
    return { settings: defaultSettings, progress: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { settings: defaultSettings, progress: {} };
    }
    const parsed = JSON.parse(raw) as AppState;
    return {
      settings: { ...defaultSettings, ...parsed.settings },
      progress: parsed.progress || {},
      lastSessionId: parsed.lastSessionId,
    };
  } catch {
    return { settings: defaultSettings, progress: {} };
  }
}

function saveState(state: AppState) {
  if (!storageAvailable()) {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export function useProgress() {
  const [state, setState] = useState<AppState>(loadState);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    saveState(state);
    if (!storageReady) setStorageReady(true);
  }, [state, storageReady]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveState(state);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state]);

  const getSessionProgress = useCallback(
    (sessionId: string): SessionProgress => {
      return state.progress[sessionId] || getDefaultProgress(sessionId);
    },
    [state.progress]
  );

  const updateSessionProgress = useCallback(
    (sessionId: string, updater: (prev: SessionProgress) => SessionProgress) => {
      setState((prev) => {
        const current = prev.progress[sessionId] || getDefaultProgress(sessionId);
        return {
          ...prev,
          lastSessionId: sessionId,
          progress: {
            ...prev.progress,
            [sessionId]: updater(current),
          },
        };
      });
    },
    []
  );

  const setNickname = useCallback(
    (sessionId: string, nickname: string) => {
      updateSessionProgress(sessionId, (prev) => ({ ...prev, nickname }));
    },
    [updateSessionProgress]
  );

  const completeMission = useCallback(
    (sessionId: string, missionId: string, xpEarned: number, gemsEarned: number) => {
      updateSessionProgress(sessionId, (prev) => {
        if (prev.completedMissions.includes(missionId)) {
          return { ...prev, lastMissionId: missionId };
        }
        return {
          ...prev,
          completedMissions: [...prev.completedMissions, missionId],
          xp: prev.xp + xpEarned,
          gems: prev.gems + gemsEarned,
          lastMissionId: missionId,
        };
      });
    },
    [updateSessionProgress]
  );

  const recordAttempt = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, (prev) => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
    },
    [updateSessionProgress]
  );

  const useHint = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, (prev) => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
      }));
    },
    [updateSessionProgress]
  );

  const recordMistake = useCallback(
    (sessionId: string, concept: string) => {
      updateSessionProgress(sessionId, (prev) => {
        if (prev.mistakes.includes(concept)) return prev;
        return { ...prev, mistakes: [...prev.mistakes, concept] };
      });
    },
    [updateSessionProgress]
  );

  const loseHeart = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, (prev) => ({
        ...prev,
        hearts: Math.max(0, prev.hearts - 1),
      }));
    },
    [updateSessionProgress]
  );

  const completeProject = useCallback(
    (sessionId: string, code: string) => {
      updateSessionProgress(sessionId, (prev) => ({
        ...prev,
        projectCompleted: true,
        projectCode: code,
        xp: prev.projectCompleted ? prev.xp : prev.xp + 50,
        gems: prev.projectCompleted ? prev.gems : prev.gems + 10,
      }));
    },
    [updateSessionProgress]
  );

  const completeBoss = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, (prev) => ({
        ...prev,
        bossCompleted: true,
        xp: prev.bossCompleted ? prev.xp : prev.xp + 100,
        gems: prev.bossCompleted ? prev.gems : prev.gems + 25,
        completedAt: prev.completedAt || new Date().toISOString(),
      }));
    },
    [updateSessionProgress]
  );

  const viewReport = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, (prev) => ({ ...prev, reportViewed: true }));
    },
    [updateSessionProgress]
  );

  const resetSession = useCallback(
    (sessionId: string) => {
      updateSessionProgress(sessionId, () => getDefaultProgress(sessionId));
    },
    [updateSessionProgress]
  );

  return {
    state,
    lastSessionId: state.lastSessionId,
    getSessionProgress,
    setNickname,
    completeMission,
    recordAttempt,
    useHint,
    recordMistake,
    loseHeart,
    completeProject,
    completeBoss,
    viewReport,
    resetSession,
  };
}

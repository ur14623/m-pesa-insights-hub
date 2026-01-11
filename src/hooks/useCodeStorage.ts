import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface CodeEntry {
  id: string;
  userId: string;
  title: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export function useCodeStorage() {
  const { user } = useAuth();
  const [codes, setCodes] = useState<CodeEntry[]>([]);

  useEffect(() => {
    if (user) {
      loadUserCodes();
    } else {
      setCodes([]);
    }
  }, [user]);

  const loadUserCodes = () => {
    const allCodes = JSON.parse(localStorage.getItem('playwright-codes') || '[]');
    const userCodes = allCodes.filter((c: CodeEntry) => c.userId === user?.id);
    setCodes(userCodes.sort((a: CodeEntry, b: CodeEntry) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  };

  const saveCode = (title: string, code: string): CodeEntry => {
    if (!user) throw new Error('Must be logged in to save code');
    
    const allCodes = JSON.parse(localStorage.getItem('playwright-codes') || '[]');
    const newEntry: CodeEntry = {
      id: crypto.randomUUID(),
      userId: user.id,
      title,
      code,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    allCodes.push(newEntry);
    localStorage.setItem('playwright-codes', JSON.stringify(allCodes));
    loadUserCodes();
    return newEntry;
  };

  const updateCode = (id: string, title: string, code: string): CodeEntry | null => {
    if (!user) throw new Error('Must be logged in to update code');
    
    const allCodes = JSON.parse(localStorage.getItem('playwright-codes') || '[]');
    const index = allCodes.findIndex((c: CodeEntry) => c.id === id && c.userId === user.id);
    
    if (index === -1) return null;
    
    allCodes[index] = {
      ...allCodes[index],
      title,
      code,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('playwright-codes', JSON.stringify(allCodes));
    loadUserCodes();
    return allCodes[index];
  };

  const deleteCode = (id: string): boolean => {
    if (!user) throw new Error('Must be logged in to delete code');
    
    const allCodes = JSON.parse(localStorage.getItem('playwright-codes') || '[]');
    const filtered = allCodes.filter((c: CodeEntry) => !(c.id === id && c.userId === user.id));
    
    if (filtered.length === allCodes.length) return false;
    
    localStorage.setItem('playwright-codes', JSON.stringify(filtered));
    loadUserCodes();
    return true;
  };

  const getCodeById = (id: string): CodeEntry | null => {
    return codes.find(c => c.id === id) || null;
  };

  return { codes, saveCode, updateCode, deleteCode, getCodeById };
}

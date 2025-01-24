import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  }

  getItem<T>(key: string): T | null {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue) as T;
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
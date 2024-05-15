import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveKeyValue(key: string, value: any) {
    // use this to store key and value in @localStorage
    let stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
  }

  getParsedValue(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return '';
  }
}

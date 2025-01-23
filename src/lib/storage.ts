/* eslint-disable no-console */
type StorageItem<T> = {
  expiry?: number; // Unix timestamp in milliseconds
  value: T;
};

export class LocalStorageHandler {
  constructor(private prefix: string = 'app_') {}

  /**
   * Checks if localStorage is available
   */
  static isAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  get<T>(key: string): null | T {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      // Check if item has expired
      if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
        this.remove(key);
        return null;
      }

      return parsedItem.value;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Cleans up all expired items in localStorage
   */
  purgeExpired(): void {
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            const parsedItem: StorageItem<unknown> = JSON.parse(item);
            if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error purging expired items:', error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  set<T>(key: string, value: T, expiryInMinutes?: number): void {
    const item: StorageItem<T> = {
      value,
      ...(expiryInMinutes && {
        expiry: Date.now() + expiryInMinutes * 60 * 1_000,
      }),
    };

    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }
}

// Create a singleton instance
export const storage = new LocalStorageHandler('finals_roulette_app');

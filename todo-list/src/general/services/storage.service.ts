export class StorageService {

    static AddValue(key:string, value:any){
        localStorage.setItem(key, JSON.stringify(value));
    }

    static GetValue(key: string) {
        let value = localStorage.getItem(key);
        if (value) {
            return JSON.stringify(value);
        }
        return value ? JSON.stringify(value) : null;
    }

    static GetValueBy<T>(type: { new(): T; }, key: string): T | null {
        let value = localStorage.getItem(key);
        if (!value) return null;

        let objectValue = JSON.stringify(value);
        return {...new type(), ...{objectValue}};
    }

    static RemoveItem(key: string) {
        localStorage.removeItem(key);
    }

}
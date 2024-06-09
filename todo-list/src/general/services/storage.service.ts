import {defineStore} from "pinia";
import type {ITodo} from "@/general/data-model/ITodo";

export interface TodoState {
    list:ITodo[]
}

export const TODO_LOCAL_STORAGE_KEY = 'TODO_STORAGE_VALUE';

export const todoListStore = defineStore('todoList', {
    state: ():TodoState => ( { list:[] } ),
    actions: {
        addValue(key:string, value:any){
            this.list = value;
            localStorage.setItem(key, JSON.stringify(value));
        },
        getValue(key: string) {
            let value = localStorage.getItem(key);
            if (value) {
                return JSON.stringify(value);
            }
            return value ? JSON.stringify(value) : null;
        },
        getStorage(){
            let value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
            if (value) {
                return JSON.stringify(value);
            }
            return value ? JSON.stringify(value) : [];
        },

        setStorage(){
            localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(this.list));
        },



        getStorageBy<T>(type: { new(): T; }): T | null {
            let value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
            if (!value) return null;

            let objectValue = JSON.stringify(value);
            return {...new type(), ...{objectValue}};
        },

        removeItem(key: string) {
            localStorage.removeItem(key);
        }
    },
});




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
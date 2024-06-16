import {acceptHMRUpdate, defineStore} from "pinia";
import type {ITodo} from "@/general/data-model/ITodo";
import {TodoStatus} from "@/general/data-model/TodoStatus";
import type {Ref} from "vue";

export interface TodoState {
    list:ITodo[]
}

export const TODO_LOCAL_STORAGE_KEY = 'TODO_STORAGE_VALUE';

export const todoListStore = defineStore( {
    id:'todo',
    state: () => ({
        rawItems: [] as ITodo[],
    }),
    getters:{
        items:(state):ITodo[] => state.rawItems
    },
    actions: {
        addItem(todo:{title:string, content:string}){
            let _todo: ITodo = {
                id: Date.now(),
                title: todo.title,
                content: todo.content,
                createdAt: Date.now(),
                status: TodoStatus.PENDING
            }
            this.rawItems.push(_todo);
            this.saveStorage();
            return _todo;
        },
        editItem(todo:Ref<ITodo>) {
            let indexToEdit = this.rawItems.findIndex((t) => t.id == todo.value.id);
            if (indexToEdit == -1) {
                console.log('Todo item not found');
            }
            this.rawItems[indexToEdit] = todo.value;
            this.saveStorage();
            return todo;
        },
        getValue() {
            let value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
            if (value) {
                return JSON.stringify(value);
            }
            return value ? JSON.stringify(value) : null;
        },
        getStorage(){
            let value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
            this.rawItems = value ? JSON.parse(value) as ITodo[] : [];
        },

        saveStorage(){
            localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(this.rawItems));
        },

        getStorageBy<T>(type: { new(): T; }): T | null {
            let value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
            if (!value) return null;

            let objectValue = JSON.stringify(value);
            return {...new type(), ...{objectValue}};
        },

        deleteItem(deleteItem:Ref<ITodo>) {
            this.rawItems = this.rawItems.filter((i:ITodo) => i.id != deleteItem.value.id )
            this.saveStorage();
        },

        removeList() {
            localStorage.removeItem(TODO_LOCAL_STORAGE_KEY);
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
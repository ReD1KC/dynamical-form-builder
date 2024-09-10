import { makeAutoObservable } from "mobx";

type Field = {
    id: string;
    type: string;
    label: string;
    value: any;
};

class FormStore {
    fields: Field[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addField(type: string) {
        const newField: Field = {
            id: Date.now().toString(),
            type,
            label: "",
            value: type === "checkbox" ? false : "",
        };
        this.fields.push(newField);
    }

    removeField(id: string) {
        this.fields = this.fields.filter((field) => field.id !== id);
    }

    updateField(id: string, key: keyof Field, value: any) {
        const field = this.fields.find((field) => field.id === id);
        if (field) {
            field[key] = value;
        }
    }

    submitForm() {
        const isValid = this.fields.every(
            (field) => field.label.trim() !== ""
        );
        if (!isValid) {
            alert("Все поля Label должны быть заполнены -.-");
            return;
        }
        console.log(JSON.stringify(this.fields, null, 2));
    }
}

const formStore = new FormStore();
export default formStore;

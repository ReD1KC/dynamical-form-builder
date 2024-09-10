import { observer } from "mobx-react-lite";
import formStore from "../store/formStore";

export const DynamicFormBuilder = observer(() => {
    const handleAddField = (type: string) => {
        formStore.addField(type);
    };

    const handleRemoveField = (id: string) => {
        formStore.removeField(id);
    };

    const handleSubmit = () => {
        formStore.submitForm();
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-6">
                Dynamic Form Builder
            </h2>
            <div className="mb-6 space-x-4">
                <button
                    onClick={() => handleAddField("text")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Добавить текстовое поле
                </button>
                <button
                    onClick={() => handleAddField("checkbox")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Добавить checkbox
                </button>
                <button
                    onClick={() => handleAddField("dropdown")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Добавить dropdown
                </button>
            </div>
            <form className="w-full max-w-md">
                {formStore.fields.map((field) => (
                    <div
                        key={field.id}
                        className="mb-4 p-4 border border-gray-300 rounded"
                    >
                        <input
                            type="text"
                            placeholder="Label"
                            value={field.label}
                            onChange={(e) =>
                                formStore.updateField(
                                    field.id,
                                    "label",
                                    e.target.value
                                )
                            }
                            required
                            className="mb-2 w-full px-2 py-1 border border-gray-300 rounded"
                        />
                        {field.type === "text" && (
                            <input
                                type="text"
                                placeholder="Text Value"
                                value={field.value}
                                onChange={(e) =>
                                    formStore.updateField(
                                        field.id,
                                        "value",
                                        e.target.value
                                    )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                        )}
                        {field.type === "checkbox" && (
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) =>
                                    formStore.updateField(
                                        field.id,
                                        "value",
                                        e.target.checked
                                    )
                                }
                            />
                        )}
                        {field.type === "dropdown" && (
                            <select
                                value={field.value}
                                onChange={(e) =>
                                    formStore.updateField(
                                        field.id,
                                        "value",
                                        e.target.value
                                    )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded"
                            >
                                <option value="Option 1">
                                    Option 1
                                </option>
                                <option value="Option 2">
                                    Option 2
                                </option>
                            </select>
                        )}
                        <button
                            type="button"
                            onClick={() =>
                                handleRemoveField(field.id)
                            }
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </form>
            <button
                onClick={handleSubmit}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Отправить
            </button>
        </div>
    );
});

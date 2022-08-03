import { SERVER_URL } from "../../variables";

export const submitForm = (callback?: any) => {
    return async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const formData = Object.fromEntries(values.entries());
        try {
            const response = await fetch(SERVER_URL + "auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            return callback(result);
        } catch (error) {
            return callback(error)
        }

    };
};
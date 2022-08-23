// import { getWithExpiry } from "../../helpers/jwt";
// import { SERVER_URL } from "../../variables";

// type ReqOpt = {
//     path: string,
//     method?: string,
//     data?: any,
// }

// export const submitForm = (option: ReqOpt, callback?: any) => {
//     return async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
//         event.preventDefault();
//         const values = new FormData(event.currentTarget);
//         const formData = Object.fromEntries(values.entries());
//         const token = getWithExpiry("token");
//         const dataToAttach = { ...option.data, ...formData }
//         console.log(dataToAttach);

//         try {
//             const response = await fetch(SERVER_URL + option.path, {
//                 method: option.method || 'GET',
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(dataToAttach) || null,
//             });
//             const result = await response.json();
//             console.log(result);

//             return callback(result);
//         } catch (error) {
//             return callback(error)
//         }

//     };
// };

// export const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
//     const values = new FormData(event.currentTarget);
//     const formData = Object.fromEntries(values.entries());
//     return formData
// }



import handler from "../libs/handler-lib";
import { fetchItems } from "../helpers/fetchItems";

export const main = handler(async (event, context) => {
    const result = await fetchItems(event);
    return result;
});
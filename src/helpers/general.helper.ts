import axios, { Method } from "axios";

export const tryRequests = async(url: string, method: Method) => {
    for (let i = 0; i < 5; i++) {
        try {
            const result = await axios.request({method, url});
            return result;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed`);
            if (i < 4) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    console.log('All 5 attempts failed');
    throw new Error();
}
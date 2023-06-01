const API_URL = "https://shodai-backend.glitch.me/items?item=";

export const check = async () => {
    const projectUrl = API_URL;
    const abortController = new AbortController();
    const timeout = 5000;
    const fetchOptions = {
        method: 'HEAD',
        signal: abortController.signal,
    };

    const timeoutId = setTimeout(() => {
        abortController.abort(); // abort the fetch request
        return {status: 408, message: 'Request timed out.'}
    }, timeout);

    try {
        const response = await fetch(projectUrl, fetchOptions);
        if (response.status === 200) {
            return {status: 200, message: 'Project is on!'};
        } else {
            return {status: 404, message: 'Project is off.'};
        }
    } catch (error) {
        console.error("Error occurred: " + error);
        return {status: 500, message: 'Server error.'};
    } finally {
        clearTimeout(timeoutId);
    }


}
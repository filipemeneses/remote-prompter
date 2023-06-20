
import { fetch, ResponseType } from '@tauri-apps/api/http';
import { state } from './state';

export const identifyByIpAddress = async (ipAddress) => {
    const response = await fetch(`http://${ipAddress}/sdapi/v1/sd-models`, {
        method: 'GET',
        responseType: ResponseType.JSON,
        timeout: 1
    })

    const checkpoints = response.data

    state.checkpoints = checkpoints.map(raw => ({
        raw,
        getName() {
            return raw.title
        }
    }))

    return Array.isArray(checkpoints);
}
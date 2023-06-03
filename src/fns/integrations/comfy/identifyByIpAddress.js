
import { fetch, ResponseType } from '@tauri-apps/api/http';

export const identifyByIpAddress = async (ipAddress) => {
    const response = await fetch(`http://${ipAddress}/prompt`, {
        method: 'GET',
        responseType: ResponseType.JSON
    })

    return !!response?.data?.exec_info;
}

import { fetch, ResponseType } from '@tauri-apps/api/http';
import { state } from './state';

export const identifyByIpAddress = async (ipAddress) => {
    const response = await fetch(`http://${ipAddress}/object_info`, {
        method: 'GET',
        responseType: ResponseType.JSON
    })

    const nodesData = response.data

    state.checkpoints = nodesData?.CheckpointLoaderSimple?.input?.required?.ckpt_name[0]

    return !!Object.keys(nodesData || {})?.length;
}
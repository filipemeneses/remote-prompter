import { invokePrompt } from './invokePrompt'
import { identifyByIpAddress } from './identifyByIpAddress'
import { state } from './state'

export default {
    name: 'ComfyUI',
    invokePrompt,
    identifyByIpAddress,
    get checkpoints() {
        return [...state.checkpoints]
    }
}
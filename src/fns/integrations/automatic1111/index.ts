import { invokePrompt } from './invokePrompt'
import { identifyByIpAddress } from './identifyByIpAddress'
import { state } from './state'

export default {
    name: 'AUTOMATIC1111',
    invokePrompt,
    identifyByIpAddress,
    get checkpoints() {
        return [...state.checkpoints]
    },
    get defaults() {
        return {
            get negativePrompt() {
                return "bad_prompt_version2,badhandv4,easynegative"
            }
        }
    },
    supports: []
}
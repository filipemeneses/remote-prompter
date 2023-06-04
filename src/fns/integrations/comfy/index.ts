import { invokePrompt } from './invokePrompt'
import { identifyByIpAddress } from './identifyByIpAddress'
import { state } from './state'

export default {
    name: 'ComfyUI',
    invokePrompt,
    identifyByIpAddress,
    get checkpoints() {
        return [...state.checkpoints]
    },
    get defaults() {
        return {
            get negativePrompt() {
                return "(embedding:bad_prompt_version2:1),(embedding:badhandv4:1),(embedding:easynegative:1)"
            }
        }
    },
    supports: ['checkpoint']
} as Integration
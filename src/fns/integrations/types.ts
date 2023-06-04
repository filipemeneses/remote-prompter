
type Checkpoint = {
    getName: () => string,
    raw: [any]
}
type CheckpointDefaults = {
    negativePrompt: string
}

type PromptArguments = {
    ipAddress: string,
    base64Image: string,

    checkpoint: string,
    positivePrompt: string,
    negativePrompt: string,
    denoise: string | number,
}
type PromptProgressEvent = {
    progressPercentage: Number
    currentValue: Number
    maxValue: Number
}
type PromptResult = {
    generatedImage: string
}
type PromptOnProgressCallback = (PromptProgressEvent) => any
type PromptOnceDoneCallback = (PromptResult) => void
type PromptHandler = {
    onProgress: (callback: PromptOnProgressCallback) => void
    onceDone: (callback: PromptOnceDoneCallback) => void
}

type Feature = 'checkpoint'

type Integration = {
    name: string
    invokePrompt: (PromptArguments) => Promise<PromptHandler>,
    identifyByIpAddress: (ipAddress: string) => Promise<boolean>,
    checkpoints: Checkpoint[],
    defaults: CheckpointDefaults,
    supports: Feature[]
}
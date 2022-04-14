// Rules for filtering videos

const hasUnwantedKeyword = (_, video) => {
    return video.title.includes("and")
}

let unwantedChannels = [
    "Computerphile",
    "Russell Brand",
    "Donut Operator",
    "Destiny",
    "CarrolGo"
]

const hasUnwantedChannelName = (_, video) => {
    return unwantedChannels.some(channel => {
        return video.channel == channel || video.title.includes(channel);
    }) 
}

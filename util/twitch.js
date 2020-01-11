module.exports.resolver = async (target) => {
    try {
        const {data} = await sc.Utils.api.bot(`/twitch/resolve/${target}`);
        return data;
    } catch (err) {
        if (err.response && err.response.status === 404) return false;
        throw new Error(err);
    }
};

module.exports.resolveid = async (target) => {
    try {
        const {data} = await sc.Utils.api.bot(`/twitch/resolve/${target}?id=1`);
        return data;
    } catch (err) {
        if (err.response && err.response.status === 404) return false;
        throw new Error(err);
    }
};

module.exports.bot = async (username) => {
    try {
        const {data} = await sc.Utils.api.bot(`/twitch/bot/${username}`);
        return data;
    } catch (err) {
        if (err.response && err.response.status === 404) return false;
        throw new Error(err);
    }
};

module.exports.stream = async (username) => {
    try {
        const {data} = await sc.Utils.api.bot(`/twitch/stream/${username}`);
        return data;
    } catch (err) {
        if (err.response && err.response.status === 404) return false;
        throw new Error(err);
    }
};

module.exports.inchat = async (channel, username) => {
    const {status, data} = await sc.Utils.api.tmi(`/group/user/${channel.toLowerCase()}/chatters`);
    if (status === 200) {
        const all = Object.keys(data['chatters'])
            .flatMap((e) => data['chatters'][e]);
        if (all.includes(username.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports.chatters = async (channel) => {
    const {status, data} = await sc.Utils.api.tmi(`/group/user/${channel.toLowerCase()}/chatters`);
    if (status === 200) {
        const all = Object.keys(data['chatters'])
            .flatMap((e) => data['chatters'][e]);
        return all;
    }
};

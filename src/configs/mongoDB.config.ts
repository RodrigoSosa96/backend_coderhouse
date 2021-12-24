const config = {
    localUrl:  process.env.MONGO_LOCAL_URL,
    atlasUrl: process.env.MONGO_ATLAS_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

export default config;

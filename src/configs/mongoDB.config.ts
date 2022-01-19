const config = {
    url:  process.env.MONGO_URL || "mongodb://localhost:27017/",
    options: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    },
};

export default config;

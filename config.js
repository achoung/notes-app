const config = {
    // NOTE: Adding these production configs here as a quick fix solution in case I run out of time.
    // Normally, I would pass in credentials and tokens as environment variables (e.g. "process.env.MONGO_DB_URL") on the server
    // directly or have them stored/fetched in some cloud key/value storage like AWS Secrets Manager.
    production: {
        JWT_TOKEN_SECRET: 'achoung',
        MONGO_DB_URL:
            'mongodb+srv://achoung:achoung123@notesdb.eqjjx.mongodb.net/notes?retryWrites=true&w=majority',
    },
    development: {
        JWT_TOKEN_SECRET: 'achoung',
        MONGO_DB_URL:
            'mongodb+srv://achoung:achoung123@notesdb.eqjjx.mongodb.net/notes?retryWrites=true&w=majority',
    },
};

function get(env) {
    return config[env] || config.development;
}

module.exports = { get };

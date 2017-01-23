module.exports = {
    environment: process.env.ENVIRONMENT || "dev",
    mongo_url: process.env.MONGODB_URI || 'mongodb://',
    port: int(process.env.PORT) || 5000,
    google_api_key: process.env.GOOGLE_API_KEY || '',
    jwt_secret: 'cualquiercosaparaelsecreto'
}

function bool(str) {
    if (str == void 0) return false
    return str.toLowerCase() === 'true'
}

function int(str) {
    if (!str) return 0
    return parseInt(str, 10)
}

function float(str) {
    if (!str) return 0
    return parseFloat(str, 10)
}

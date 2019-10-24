const HttpResponseCodes = {
    success: 200,
    duplicate: 302,
    error: 400,
    not_found: 404,
}
const ISettingType = {
    premium: 1,
    user: 2
}
const IImageTypes = {
    profile: 1,
    product: 2
}
module.exports = ISettingType;

module.exports = HttpResponseCodes;


// const uri = "mongodb://localhost:27017/billingsolutions";
// module.exports = uri
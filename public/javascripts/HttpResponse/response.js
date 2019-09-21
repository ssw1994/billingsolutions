class HttpResponse {
    constructor(msg, data, error) {
        this.data = data;
        this.msg = msg;
        this.errorCode = error;
    }

}

module.exports = HttpResponse;
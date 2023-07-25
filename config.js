// This is the configuration file for the link shortener.

const config = {
    app: {
        http_port: 3000, // Port for http server
        http_domain: "http://localhost/", // Host for http response
        token_size: 5, // Size of the token (usually 3-10) (http://localhost/XXXXX)
        token_chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // Characters to use for the token
    }
};

module.exports = config;

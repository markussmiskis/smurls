# SMURLS
SMURLS is a *super-minimal-url-shortener*

## Installation

1. Clone the source code
```bash
git clone https://github.com/markussmiskis/smurls.git
```

2. Fill out `config.js` with the necessary options

3. Run the app
```bash
node main.js
```

## Usage

To recieve a link, send a POST request to the server: `(default) http://localhost:3000`
```bash
curl http://localhost:3000 -d "https://example.com"
```

This can be incorporated into an `html` file for easy use, as seen in `example.html`

## TODO
1. Add MySQL database support (soon)
2. Option for urls to expire

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

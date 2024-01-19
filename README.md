# Wikism

> Discriminating against all.

## Usage

### Online

Visit [https://idkhow2type.github.io/wikism/](https://idkhow2type.github.io/wikism/) to use the application.

### Offline

1. Clone the repository
2. Run a web server in the root directory
3. Visit the web server in a browser

## Contributing

The file `ism.json` contains all words that end in -ism. The format is as follows:

```json
"word": {
    "desc": "...",
    "freq": "...",
}
```

The `desc` field should be the "supposed" plural form of the root word. By default, this field is empty. The application will try to guess the plural form of the root word if this field is empty. However, this is not always accurate, resulting in mistakes like:

-   `racism` -> `racs`
-   `mechanism` -> `mechans`
-   `feminism` -> `femins`

To contribute, find a word that is not accurate and add what you believe should be the "supposedly" correct plural form to the `desc` field. For example:

-   `racism` -> `races`
-   `mechanism` -> `mechanics`
-   `feminism` -> `females`

Once you have made your changes, submit a pull request.

## Acknowledgements

The list of words was taken from [https://www.kilgarriff.co.uk/](https://www.kilgarriff.co.uk/bnc-readme.html).

## License

idk how lisences work. Do whatever you want with this. Credit if you're feeling nice.

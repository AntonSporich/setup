'article aside footer header nav section'.replace(/\w+/g, function (n) {
    document.createElement(n)
});

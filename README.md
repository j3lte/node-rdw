node-rdw
===========

[![NPM](https://nodei.co/npm/node-rdw.png?downloads=true&stars=true)](https://nodei.co/npm/node-rdw/)

NodeJS module to access the RDW Database, searching for Dutch license plate info

```js
var RDWSearch = require('node-rdw'),
    rdwSearch = new RDWSearch();

// NORMAL SEARCH WITH CALLBACK
rdwSearch.searchPlate('71ZXK6', function (err, data) {
    if (err) {
        console.log(err);
        return false;
    }

    console.log(JSON.stringify(data, true, 4));
});

// SEARCH USING PROMISES
rdwSearch
    .searchPlateDeferred('71ZXK6')
    .then(function (data) {
        // succes
        console.log(JSON.stringify(data, true, 4));
    })
    .fail(function (err) {
        console.log(err);
    });
```

This module searches for Dutch license plate information. It returns either null (no vehicle found) or an object with the information in it. The database comes from the [Azure Marketplace](http://datamarket.azure.com/dataset/opendata.rdw/vrtg.open.data#schema), more information (in Dutch) can be found [here](http://www.rdw.nl/Zakelijk/Paginas/Open-data.aspx).

Update August, 2014. Thanks to [tvr3000](https://github.com/tvr3000) for reminding me that this service can also output JSON. Previous version parsed XML.

## Features

* searchPlate : Search a license plate. Plate number is without dashes (So, searching for "71-ZXK-6" === "71ZXK6")
* searchPlateDeferred : Search a license plate, Promise style

## Bugs / issues

Please, if you find any bugs, or are a way better developer than I am (as in, you are thinking 'spaghetti' when looking at my code), feel free to create an issue or provide me with some pull requests!

## License

Copyright (c) 2013-2013 J.W. Lagendijk &lt;jwlagendijk@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

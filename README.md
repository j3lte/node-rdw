node-rdw
===========

NodeJS module to access the RDW Database, searching for Dutch license plate info

```js
var RDW = require('node-rdw'),
    rdwSearch = new RDW();

rdwSearch.searchPlate("1122XX", function (err, data) {
    if (err) {
        console.log(err);
        return false;
    }

    console.log(JSON.stringify(data, true, 4));
});

```

This module searches for Dutch license plate information. It returns either null (no vehicle found) or an object with the information in it. The database comes from the [Azure Marketplace](http://datamarket.azure.com/dataset/opendata.rdw/vrtg.open.data#schema), more information (in Dutch) can be found [here](http://www.rdw.nl/Zakelijk/Paginas/Open-data.aspx).

Unfortunately the service does not output JSON, so I parse the ATOM10 XML output and create a JSON object.

## Features

* searchPlate : Search a license plate. Plate number is without dashes (So, searching for "11-22-XX" === "1122XX")

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

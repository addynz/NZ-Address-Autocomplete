# Addy's Address Autocomplete

https://www.addy.co.nz/

Addy's Address Autocomplete will suggest New Zealand street addresses while you type.  

This repository contains lightweight and simple code samples for calling the address RESTful API, validating addresses against the 
NZ Postal Address File (PAF) and LINZ databases, from a HTML and JavaScript address capture form.

![Addy Address Autocomplete](https://github.com/addynz/NZ-Address-Autocomplete/blob/master/MobileDevices.png)

Addy's service use intelligent fuzzy matching for addresses. This means that if a typo, invalid suburb or partially correct address is entered, customers can still find the right delivery or billing address because the addresses are validated against actual delivery point data from official address sources, including the New Zealand Postal Address File (PAF).

## Benefits

- Reduce friction and increase conversion rates with a fast checkout process 
- Create a delightful checkout experience for repeated business
- Deliver to the right address, the first time
- Verify and validate address details in real-time

## Get Started

Create a free account <https://www.addy.co.nz/signup> to get an API key.

1) Include addycomplete.min.css in your page, via the usual tags:

```html
<link rel="stylesheet" href="addycomplete.min.css" />
```

2) Include addycomplete.min.js at the bottom of the page, before closing the body tag:

```html
<script src="addycomplete.min.js?key=YOUR-ADDY-KEY&callback=initAddy" async defer></script>
```
Replace YOUR-ADDY-KEY with your own Addy API Key. 

Define the fields and options that will be called by the initAddy callback function once the script has loaded.

```javascript
function initAddy() {
    var addyComplete = new AddyComplete(document.getElementById("address1"));
    addyComplete.fields = {
        address1: document.getElementById("address1"),
        address2: document.getElementById("address2"),
        suburb: document.getElementById("suburb"),
        city: document.getElementById("city"),
        postcode: document.getElementById("postcode")
    }
}
```

Live demo and documentation: <https://www.addy.co.nz/nz-address-autocomplete-example>

## Awesomplete Extension

Addy's autocomplete code is based on the awesomplete <https://github.com/LeaVerou/awesomplete> (MIT License) 
widget by extending it to call Addy's RESTful API address service.

## Prices
Addy's address autocomplete widget is free of charge; download and install it at no cost.  Just setup an account with Addy to get your 1,500 free completed address lookups per month.  If you require additional address transactions, simply pay as you go. See: https://www.addy.co.nz/pricing

## Links

Official Addy site: <https://www.addy.co.nz/>

RESTful API Documentation: <https://www.addy.co.nz/address-search-and-postcode-api>

All Documentation: <https://www.addy.co.nz/documentation>

Frequently Asked Questions: <https://www.addy.co.nz/frequently-asked-questions>

## License

The NZ-Address-Autocomplete code is released under the MIT License, 
which has the same license as awesomplete <https://github.com/LeaVerou/awesomplete>.

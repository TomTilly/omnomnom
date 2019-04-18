# About

Basic recipe website

## Issues to fix

- ~~Stretched images on recipes page on XS tier~~
- ~~Cards are different sizes on recipes page~~
- Full sized images on recipes page creates slow load
- File uploads not working, body-parser doesn't handle multipart/form-data encoding needed for file upload. Changed to image url temporarily
- ~~Ingredients should go on seperate lines in the textarea on the edit form~~
- Flash messages not showing on `res.redirect('back')`
- `res.redirect('back')` not working (?)
- ~~App throws error when a nonexistant id is given for :id and :commentID URL parameters for recipe and comment routes. Database doesn't return a document and app doesn't work as intended.~~
- Recipe show route: when recipes don't have a valid image url to load, somehow a 'Recipe Not Found' error is thrown and somehow the page still loads correctly. So the code is somehow going through both branches of the if statement. This also sometimes leads to a flash error message being shown on the next page click, but not always.

## Media Query Reference

Extra small devices (portrait phones, less than 576px)
No media query for `xs` since this is the default in Bootstrap

Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
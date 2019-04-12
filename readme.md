# About

Basic recipe website

## Issues to fix

- Stretched images on recipes page on XS tier
- Cards are different sizes on recipes page
- Full sized images on recipes page creates slow load
- File uploads not working, body-parser doesn't handle multipart/form-data encoding needed for file upload. Changed to image url temporarily
- ~~Ingredients should go on seperate lines in the textarea on the edit form~~
- Portrait images too narrow on show page
- Flash messages not showing on `res.redirect('back')`

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
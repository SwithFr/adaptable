# Adaptable

Simple library to add responsive classes based on elements widths instead of window. 

# Installation

`npm install @swith/adaptable --save`

or 

`yarn add @swith/adaptable`

# Usage

First, define some breakpoints for your elements
```html
<div class="my-block" data-adaptable="850-600-350"></div>
<div class="my-second-block" data-adaptable="500-200"></div>
```

Then, add css classes to add some styles when your elements are smaller than the breakpoint.

```css
/** first block */
.my-block.ae-850 { background-color: red; }
.my-block.ae-600 { background-color: blue; }
.my-block.ae-350 { background-color: green; }
/** second block */
.my-second-block.ae-500 { background-color: yellow; }
.my-second-block.ae-200 { background-color: orange; }
```

Finally, don't forget to import Adaptable and init it;

```javascript
import Adaptable from 'swithfr/adaptable';

Adaptable.adapt();
Adaptable.observe();
```

And that's it ! Adaptable will automatically add an `ae-{breakpointWidth}` class on your element if it's width is smaller than the breakpoint.
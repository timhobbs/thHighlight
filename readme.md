# Highlight Directive
Directive that mimics jQuery highlight behavior.

### Usage
Add `th-highlight` attribute to any element, inlcluding an ng-model property name. When the model value changes, the highlight CSS is triggered.

## Properties
`highlightClass`: The highlight CSS class to apply when highlighting begins.

`fadeClass`: the fade CSS class to apply when highlighting end.

`fadeTimer`: The length of time before the fade CSS class is applied.

### Examples
`<div th-highlight="model.property">{{ model.property }}</div>`

In the above example, whenever the `model.property` value changes, the div will apply the highlight CSS class using the defaults.

```html
<div th-highlight="model.property" highlight-class="hilite">{{ model.property }}</div>
```

In the above example, whenever the `model.property` value changes, the div will use the CSS class `hilite` for highlighting.

```html
<div th-highlight="model.property" highlight-class="hilite" fade-class="inactive">{{ model.property }}</div>
```

In the above example, whenever the `model.property` value changes, the div will use the custom CSS class `hilite` for highlighting and the custom CSS class `inactive` for the fade effect.

```html
<div th-highlight="model.property" fade-timer="3000">{{ model.property }}</div>
```

In the above example, whenever the `model.property` value changes, the div will use the default CSS for highlighting. The highlight effect will use a custom length of 3 seconds.

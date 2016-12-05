block('link')(
    // Default tag
    tag()('span'),

    // If url exists in BEMJSON
    match(function(context, json) {
        return json.url;
    })(
        // Then set a tag
        tag()('a'),
        // and set href HTML attribute
        addAttrs()((context, json) => ({
            href: json.url
        }))
        // P.S. Arrow functions are supported as you can see
    ),

    // If target blank exists in BEMJSON
    match((context, json) => json.target === '_blank')
    // add rel attribute
    .addAttrs()({
        rel: 'noopener'
    }),

    // If "disabled" modifier exist
    match(context => context.mods.disabled)
    // add aria attribute
    .addAttrs()({
        'aria-disabled': 'true'
    })
);

require(['gitbook'], function(gitbook) {

    gitbook.events.bind('start', function(e, config) {
        var opts = config.toolbar;
        
        if (!opts || !opts.buttons) return;

        for (var i = opts.buttons.length - 1; i >= 0; i--) {
            var link = opts.buttons[i];
            gitbook.toolbar.createButton({
                icon: link.icon || "fa fa-external-link",
                label: link.label || "Link",
                position: 'right',
                onClick: function(e) {
                    e.preventDefault();
                    var mapping = {
                        "{{title}}": encodeURIComponent(document.title),
                        "{{url}}": encodeURIComponent(location.href)
                    };
                    var re = RegExp(Object.keys(mapping).join("|"), "g");
                    window.open(link.url.replace(re, function(matched) {
                        return mapping[matched];
                    }));
                }
            });
        }
    });
});

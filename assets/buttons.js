require(['gitbook'], function(gitbook) {

    gitbook.events.bind('start', function(e, config) {
        var opts = config.toolbar || [];

        opts.forEach(function(link) {
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
                    var re = RegExp(Object.keys(mapping).join("|"), "gi");
                    window.open(link.url.replace(re, function(matched) {
                        return mapping[matched];
                    }));
                }
            });
        });
    });
});

window.Library = {};

Library.generateDataTable = function (props) {
    function defaultProps () {
        var defaultProps = {
            language: {},
            options: {},
            id: 'data-table-' + Date.now()
        };

        return $.extend({}, defaultProps, props);
    }

    props = defaultProps();

    function mergedLanguageSettings() {
        var defaultLanguage = {
            emptyTable: 'No data available in table',
            lengthMenu: '<span>Entries per page: </span> _MENU_',
            loadingRecords: 'Loading...',
            info: 'Showing _START_ to _END_ of _TOTAL_',
            infoEmpty: 'Showing 0 to 0 of 0 entries',
            infoFiltered: '(filtered from _MAX_ total entries)',
            processing: 'Processing...',
            search: '<i name="search-icon" class="glyphicon glyphicon-search sb-search-icon"/></i>',
            searchPlaceholder: 'search for...',
            zeroRecords: 'No matching records found'
        };

        return $.extend({}, defaultLanguage, props.language);
    }

    function mergedOptions() {
        const defaultOptions = {
            paging: true,
            sort: true,
            searching: true,
            showInfo: true,
            scrollY: '400',
        };

        return $.extend({}, defaultOptions, props.options);
    }

    function renderHeaders() {
        var headers = '';
        props.headers.map(function (header, i) {
                headers += '<th data-id=' + i +'>' + header + '</th>';
        });
        return headers;
    }

    $(props.container).append('<div class="data-table-component col-md-10 col-md-offset-1">' +
        '<table class="data-table-wrapper table-striped table" id="' + props.id + '">' +
            '<thead>' +
                '<tr class="data-table-headers">' +
                    renderHeaders() +
                '</tr>' +
            '</thead>' +
         '</table>' +
    '</div>');

    var options = mergedOptions();
    var language = mergedLanguageSettings();

    var dom = '<"dt-filter-helper" <"dt-filter dt-filter-right" f> <"right" B> <"dt-table-border dt-table-bg-blue" t> < <"dt-info padding-reset" <"col-md-6 padding-reset" l>';
    if (options.showInfo) {
      dom += 'i>';
    }
    dom += 'p>r>';

    $('#' + props.id).DataTable({
        'language': language,
        'data': props.data,
        'paging': options.paging,
        'searching': options.searching,
        'sort': options.sort,
        'scrollY': options.scrollY,
        'columns': props.columns,
        'dom': dom
    });
};

window.Library = {};

Library.generateDataTable = function (props) {
    function defaultProps () {
        var defaultProps = {
            language: {},
            options: {},
            buttons: [],
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
    
    // <div class="dt-filter-helper">
    //     <div class="dt-filter dt-filter-right"><div></div></div>
    //     <div class="right"><div></div></div>
    //     <div class="dt-table-border dt-table-bg-blue"><div></div></div>
    //     <div>
    //         <div class="dt-info">
    //             <div class="col-md-6"><div></div></div>
    function renderButtons(array) {
        var btn = '';
        $.each(array, function (key, value) {
            btn += '<a class="btn btn-success" href="' + value.path + '">' + value.title + '</a>';
        });
        
        return btn;
    }   

    var dom = '<"dt-filter-container" <"dt-search" f><"dt-buttons">><"dt-table dt-stripe-blue" t><"row dt-info-container" <"col-md-5" l>';

    if (options.showInfo) {
      dom += '<"col-md-2" i>';
    }
    dom += '<"col-md-5" p>>';

    $('#' + props.id).DataTable({
        'language': language,
        'data': props.data,
        'paging': options.paging,
        'searching': options.searching,
        'sort': options.sort,
        'scrollY': options.scrollY,
        'columns': props.columns,
        'dom': dom,
        'fnInitComplete': function (oSettings, JSON) {
            console.log(oSettings, JSON);
            $(props.container + ' .dt-buttons').html(renderButtons(props.buttons));
        }
    });
};

/**
 * Copyright 2014 Intermedix Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied.  See the License for the specific language
 * governing permissions and limitations under the License.
 */


/**
 * Namespace for our demo application.
 */
var App = (function () {

    /**
     * Results object
     */
    var _results = {};

    /**
     * Global timeout function
     */
    var _timer;

    /**
     * Retrieves all responders, then updates the table.
     *
     * @param   void
     * @return  void
     */
    function displayResults() {
        $.ajax({
            type: 'POST',
            url: 'responder_search.php',
            dataType: 'json',
            success: function (data) {
                _results = data;
                _redrawTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error. Check the console for more details.');
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    /**
     * This updates the table, removing old rows and replacing them
     * with the data in _results.
     *
     * @param   void
     * @return  void
     */
    function _redrawTable() {
        if (!_results) {
            return;
        }

        var rows = '';
        for (var i in _results) {
            var responder = _results[i];
            rows += '<tr>' +
            '<td>' + responder.name + '</td>' +
            '<td>' + responder.occupation + '</td>' +
            '<td>' + responder.city + ', ' + responder.state + '</td>' +
            '<td>' + responder.status + '</td>' +
            '</tr>';
        }

        $('#responder_results tbody').html(rows);
    }

    /**
     * Filtering data in _results object
     * @param value
     * @returns {*}
     */
    function filterResults(value) {
        var _fullResults = _results; // Backup data
        var tmp = [];
        // If ajax call without results, but filter is used
        if (!_results) {
            return noResults();
        }

        // On empty search input or default value all in select
        if ((!value.name) && (value.occupation === 'All') && (value.status === 'All')) {
            _results = _fullResults;
            return _redrawTable();
        }
        // Filtering items by conditions
        _results.forEach(function (item) {
            if (_contains(value.name, item.name) && (value.occupation == 'All' || item.occupation === value.occupation) && (value.status == 'All' || item.status === value.status)) {
                tmp.push(item);
            }
        });
        // If results length equal 0
        if (tmp.length === 0) {
            return noResults;
        }
        _results = tmp; // new object for _redrawTable
        _redrawTable();
        _results = _fullResults; // Copying original data back.
    }

    /**
     * Checking searchable val is in string
     * @param val
     * @param str
     * @returns {boolean}
     * @private
     */
    function _contains(val, str) {
        return (str.toLowerCase().search(val.toLowerCase()) != -1);
    }

    /**
     * Printing default text then no data
     */
    function noResults() {
        var row = '<tr>' +
            '<td colspan="4">' +
            '<p class="no-results">No results!</p>' +
            '</td>' +
            '</tr>';
        $('#responder_results tbody').html(row);
    }

    /**
     * Watcher for input events
     */
    function inputDataCollector() {
        $('.input-value').on('keyup change', function () {
            var _nameInput = $('#name-input');
            var _occupationInput = $('#occupation-filter').children(':selected');
            var _availability = $('#availability-filter').children(':selected');
            clearTimeout(_timer);
            _timer = setTimeout(filterResults({
                name: _nameInput.val(),
                occupation: _occupationInput.text(),
                status: _availability.text()
            }), 200);
        });
    }

    /**
     * Expose public methods.
     */
    return {
        displayResults: displayResults,
        inputDataCollector: inputDataCollector,
        _contains: _contains // Just for Qunit test
    };

})();

$(document).ready(function () {
    App.displayResults();
    App.inputDataCollector();
});

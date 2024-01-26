// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
/*
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
    {'base':'AA','letters':'\uA732'},
    {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
    {'base':'AO','letters':'\uA734'},
    {'base':'AU','letters':'\uA736'},
    {'base':'AV','letters':'\uA738\uA73A'},
    {'base':'AY','letters':'\uA73C'},
    {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
    {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
    {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'},
    {'base':'DZ','letters':'\u01F1\u01C4'},
    {'base':'Dz','letters':'\u01F2\u01C5'},
    {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
    {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
    {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
    {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
    {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
    {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
    {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
    {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
    {'base':'LJ','letters':'\u01C7'},
    {'base':'Lj','letters':'\u01C8'},
    {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
    {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
    {'base':'NJ','letters':'\u01CA'},
    {'base':'Nj','letters':'\u01CB'},
    {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
    {'base':'OI','letters':'\u01A2'},
    {'base':'OO','letters':'\uA74E'},
    {'base':'OU','letters':'\u0222'},
    {'base':'OE','letters':'\u008C\u0152'},
    {'base':'oe','letters':'\u009C\u0153'},
    {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
    {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
    {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
    {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
    {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
    {'base':'TZ','letters':'\uA728'},
    {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
    {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
    {'base':'VY','letters':'\uA760'},
    {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
    {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
    {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
    {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
    {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
    {'base':'aa','letters':'\uA733'},
    {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
    {'base':'ao','letters':'\uA735'},
    {'base':'au','letters':'\uA737'},
    {'base':'av','letters':'\uA739\uA73B'},
    {'base':'ay','letters':'\uA73D'},
    {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
    {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
    {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
    {'base':'dz','letters':'\u01F3\u01C6'},
    {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
    {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
    {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
    {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
    {'base':'hv','letters':'\u0195'},
    {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
    {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
    {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
    {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
    {'base':'lj','letters':'\u01C9'},
    {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
    {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
    {'base':'nj','letters':'\u01CC'},
    {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
    {'base':'oi','letters':'\u01A3'},
    {'base':'ou','letters':'\u0223'},
    {'base':'oo','letters':'\uA74F'},
    {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
    {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
    {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
    {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
    {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
    {'base':'tz','letters':'\uA729'},
    {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
    {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
    {'base':'vy','letters':'\uA761'},
    {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
    {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
    {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
    {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
];

var diacriticsMap = {};
for (var i=0; i < defaultDiacriticsRemovalMap .length; i++){
    var letters = defaultDiacriticsRemovalMap [i].letters;
    for (var j=0; j < letters.length ; j++){
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap [i].base;
    }
}

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics (str) {
    return str.replace(/[^\u0000-\u007E]/g, function(a){ 
       return diacriticsMap[a] || a; 
    });
}    
(function ($) {

/* publications - list - sort years in lists */
$(".listitems").each(function() {

    $(this).children('li').sort(sort_li).appendTo(this);
        function sort_li(a, b) {
        return ($(b).data('value')) > ($(a).data('value')) ? 1 : -1;
    }
});

/* publications - year filter - sort years in options */
$("#publyear").append($("#publyear option").remove().sort(function(a, b) {
    var at = $(a).text(), bt = $(b).text();
    return (at > bt)?1:((at < bt)?-1:0);
}));

/* publications - year filter - display only unique values */
var usedNames = {};
$("#publyear option").each(function () {
    if(usedNames[this.text]) {
        $(this).remove();
    } else {
        usedNames[this.text] = this.value;
    }
});

/* publications - year filter main functionality */
$('#publyear').change(function(){
    var selected_option = $('#publyear option:selected').val();
    var year_values = $('.listitems li');
    $(year_values).hide();
    $(year_values).each(function() {if ($(this).attr('data-value') == selected_option) { $(this).show(); }})
    if ($(this).val() == '9999') { $(year_values).show(); }
});

/* publications - hide h3 if empty list */
$("#publications h3").each(function () {
    if ($.trim($(this).next("ul").html())=='') {
        $(this).addClass("empty");
    }

});
})(jQuery);

;(function (window, $, undefined) { ;(function () {
    var VERSION = '2.2.3',
        pluginName = 'datepicker',
        autoInitSelector = '.datepicker-here',
        $body, $datepickersContainer,
        containerBuilt = false,
        baseTemplate = '' +
            '<div class="datepicker">' +
            '<i class="datepicker--pointer"></i>' +
            '<nav class="datepicker--nav"></nav>' +
            '<div class="datepicker--content"></div>' +
            '</div>',
        defaults = {
            classes: '',
            inline: false,
            language: 'cs',
            startDate: new Date(),
            firstDay: '',
            weekends: [6, 0],
            dateFormat: '',
            altField: '',
            altFieldDateFormat: '@',
            toggleSelected: true,
            keyboardNav: true,

            position: 'bottom left',
            offset: 12,

            view: 'days',
            minView: 'days',

            showOtherMonths: true,
            selectOtherMonths: true,
            moveToOtherMonthsOnSelect: true,

            showOtherYears: true,
            selectOtherYears: true,
            moveToOtherYearsOnSelect: true,

            minDate: '',
            maxDate: '',
            disableNavWhenOutOfRange: true,

            multipleDates: false, // Boolean or Number
            multipleDatesSeparator: ',',
            range: false,

            todayButton: false,
            clearButton: false,

            showEvent: 'focus',
            autoClose: true,

            // navigation
            monthsField: 'monthsShort',
            prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
            nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
            navTitles: {
                days: 'MM, <i>yy</i>',
                months: 'yy',
                years: 'yyyy1 - yyyy2'
            },

            // timepicker
            timepicker: false,
            onlyTimepicker: false,
            dateTimeSeparator: ' ',
            timeFormat: '',
            minHours: 0,
            maxHours: 24,
            minMinutes: 0,
            maxMinutes: 59,
            hoursStep: 1,
            minutesStep: 1,

            // events
            onSelect: '',
            onShow: '',
            onHide: '',
            onChangeMonth: '',
            onChangeYear: '',
            onChangeDecade: '',
            onChangeView: '',
            onRenderCell: ''
        },
        hotKeys = {
            'ctrlRight': [17, 39],
            'ctrlUp': [17, 38],
            'ctrlLeft': [17, 37],
            'ctrlDown': [17, 40],
            'shiftRight': [16, 39],
            'shiftUp': [16, 38],
            'shiftLeft': [16, 37],
            'shiftDown': [16, 40],
            'altUp': [18, 38],
            'altRight': [18, 39],
            'altLeft': [18, 37],
            'altDown': [18, 40],
            'ctrlShiftUp': [16, 17, 38]
        },
        datepicker;

    var Datepicker  = function (el, options) {
        this.el = el;
        this.$el = $(el);

        this.opts = $.extend(true, {}, defaults, options, this.$el.data());

        if ($body == undefined) {
            $body = $('body');
        }

        if (!this.opts.startDate) {
            this.opts.startDate = new Date();
        }

        if (this.el.nodeName == 'INPUT') {
            this.elIsInput = true;
        }

        if (this.opts.altField) {
            this.$altField = typeof this.opts.altField == 'string' ? $(this.opts.altField) : this.opts.altField;
        }

        this.inited = false;
        this.visible = false;
        this.silent = false; // Need to prevent unnecessary rendering

        this.currentDate = this.opts.startDate;
        this.currentView = this.opts.view;
        this._createShortCuts();
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.minRange = '';
        this.maxRange = '';
        this._prevOnSelectValue = '';

        this.init()
    };

    datepicker = Datepicker;

    datepicker.prototype = {
        VERSION: VERSION,
        viewIndexes: ['days', 'months', 'years'],

        init: function () {
            if (!containerBuilt && !this.opts.inline && this.elIsInput) {
                this._buildDatepickersContainer();
            }
            this._buildBaseHtml();
            this._defineLocale(this.opts.language);
            this._syncWithMinMaxDates();

            if (this.elIsInput) {
                if (!this.opts.inline) {
                    // Set extra classes for proper transitions
                    this._setPositionClasses(this.opts.position);
                    this._bindEvents()
                }
                if (this.opts.keyboardNav && !this.opts.onlyTimepicker) {
                    this._bindKeyboardEvents();
                }
                this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
                this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            if (this.opts.timepicker) {
                this.timepicker = new $.fn.datepicker.Timepicker(this, this.opts);
                this._bindTimepickerEvents();
            }

            if (this.opts.onlyTimepicker) {
                this.$datepicker.addClass('-only-timepicker-');
            }

            this.views[this.currentView] = new $.fn.datepicker.Body(this, this.currentView, this.opts);
            this.views[this.currentView].show();
            this.nav = new $.fn.datepicker.Navigation(this, this.opts);
            this.view = this.currentView;

            this.$el.on('clickCell.adp', this._onClickCell.bind(this));
            this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this));
            this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this));

            this.inited = true;
        },

        _createShortCuts: function () {
            this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
            this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
        },

        _bindEvents : function () {
            this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
            this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this));
            this.$el.on('blur.adp', this._onBlur.bind(this));
            this.$el.on('keyup.adp', this._onKeyUpGeneral.bind(this));
            $(window).on('resize.adp', this._onResize.bind(this));
            $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
        },

        _bindKeyboardEvents: function () {
            this.$el.on('keydown.adp', this._onKeyDown.bind(this));
            this.$el.on('keyup.adp', this._onKeyUp.bind(this));
            this.$el.on('hotKey.adp', this._onHotKey.bind(this));
        },

        _bindTimepickerEvents: function () {
            this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
        },

        isWeekend: function (day) {
            return this.opts.weekends.indexOf(day) !== -1;
        },

        _defineLocale: function (lang) {
            if (typeof lang == 'string') {
                this.loc = $.fn.datepicker.language[lang];
                if (!this.loc) {
                    console.warn('Can\'t find language "' + lang + '" in Datepicker.language, will use "ru" instead');
                    this.loc = $.extend(true, {}, $.fn.datepicker.language.ru)
                }

                this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, $.fn.datepicker.language[lang])
            } else {
                this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, lang)
            }

            if (this.opts.dateFormat) {
                this.loc.dateFormat = this.opts.dateFormat
            }

            if (this.opts.timeFormat) {
                this.loc.timeFormat = this.opts.timeFormat
            }

            if (this.opts.firstDay !== '') {
                this.loc.firstDay = this.opts.firstDay
            }

            if (this.opts.timepicker) {
                this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator);
            }

            if (this.opts.onlyTimepicker) {
                this.loc.dateFormat = this.loc.timeFormat;
            }

            var boundary = this._getWordBoundaryRegExp;
            if (this.loc.timeFormat.match(boundary('aa')) ||
                this.loc.timeFormat.match(boundary('AA'))
            ) {
               this.ampm = true;
            }
        },

        _buildDatepickersContainer: function () {
            containerBuilt = true;
            $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
            $datepickersContainer = $('#datepickers-container');
        },

        _buildBaseHtml: function () {
            var $appendTarget,
                $inline = $('<div class="datepicker-inline">');

            if(this.el.nodeName == 'INPUT') {
                if (!this.opts.inline) {
                    $appendTarget = $datepickersContainer;
                } else {
                    $appendTarget = $inline.insertAfter(this.$el)
                }
            } else {
                $appendTarget = $inline.appendTo(this.$el)
            }

            this.$datepicker = $(baseTemplate).appendTo($appendTarget);
            this.$content = $('.datepicker--content', this.$datepicker);
            this.$nav = $('.datepicker--nav', this.$datepicker);
        },

        _triggerOnChange: function () {
            if (!this.selectedDates.length) {
                // Prevent from triggering multiple onSelect callback with same argument (empty string) in IE10-11
                if (this._prevOnSelectValue === '') return;
                this._prevOnSelectValue = '';
                return this.opts.onSelect('', '', this);
            }

            var selectedDates = this.selectedDates,
                parsedSelected = datepicker.getParsedDate(selectedDates[0]),
                formattedDates,
                _this = this,
                dates = new Date(
                    parsedSelected.year,
                    parsedSelected.month,
                    parsedSelected.date,
                    parsedSelected.hours,
                    parsedSelected.minutes
                );

                formattedDates = selectedDates.map(function (date) {
                    return _this.formatDate(_this.loc.dateFormat, date)
                }).join(this.opts.multipleDatesSeparator);

            // Create new dates array, to separate it from original selectedDates
            if (this.opts.multipleDates || this.opts.range) {
                dates = selectedDates.map(function(date) {
                    var parsedDate = datepicker.getParsedDate(date);
                    return new Date(
                        parsedDate.year,
                        parsedDate.month,
                        parsedDate.date,
                        parsedDate.hours,
                        parsedDate.minutes
                    );
                })
            }

            this._prevOnSelectValue = formattedDates;
            this.opts.onSelect(formattedDates, dates, this);
        },

        next: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month + 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year + 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year + 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        prev: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month - 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year - 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year - 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        formatDate: function (string, date) {
            date = date || this.date;
            var result = string,
                boundary = this._getWordBoundaryRegExp,
                locale = this.loc,
                leadingZero = datepicker.getLeadingZeroNum,
                decade = datepicker.getDecade(date),
                d = datepicker.getParsedDate(date),
                fullHours = d.fullHours,
                hours = d.hours,
                ampm = string.match(boundary('aa')) || string.match(boundary('AA')),
                dayPeriod = 'am',
                replacer = this._replacer,
                validHours;

            if (this.opts.timepicker && this.timepicker && ampm) {
                validHours = this.timepicker._getValidHoursFromDate(date, ampm);
                fullHours = leadingZero(validHours.hours);
                hours = validHours.hours;
                dayPeriod = validHours.dayPeriod;
            }

            switch (true) {
                case /@/.test(result):
                    result = result.replace(/@/, date.getTime());
                case /aa/.test(result):
                    result = replacer(result, boundary('aa'), dayPeriod);
                case /AA/.test(result):
                    result = replacer(result, boundary('AA'), dayPeriod.toUpperCase());
                case /dd/.test(result):
                    result = replacer(result, boundary('dd'), d.fullDate);
                case /d/.test(result):
                    result = replacer(result, boundary('d'), d.date);
                case /DD/.test(result):
                    result = replacer(result, boundary('DD'), locale.days[d.day]);
                case /D/.test(result):
                    result = replacer(result, boundary('D'), locale.daysShort[d.day]);
                case /mm/.test(result):
                    result = replacer(result, boundary('mm'), d.fullMonth);
                case /m/.test(result):
                    result = replacer(result, boundary('m'), d.month + 1);
                case /MM/.test(result):
                    result = replacer(result, boundary('MM'), this.loc.months[d.month]);
                case /M/.test(result):
                    result = replacer(result, boundary('M'), locale.monthsShort[d.month]);
                case /ii/.test(result):
                    result = replacer(result, boundary('ii'), d.fullMinutes);
                case /i/.test(result):
                    result = replacer(result, boundary('i'), d.minutes);
                case /hh/.test(result):
                    result = replacer(result, boundary('hh'), fullHours);
                case /h/.test(result):
                    result = replacer(result, boundary('h'), hours);
                case /yyyy1/.test(result):
                    result = replacer(result, boundary('yyyy1'), decade[0]);
                case /yyyy2/.test(result):
                    result = replacer(result, boundary('yyyy2'), decade[1]);
                case /yy/.test(result):
                    result = replacer(result, boundary('yy'), d.year);
                case /y/.test(result):
                    result = replacer(result, boundary('y'), d.year.toString().slice(-2));
            }

            return result;
        },

        _replacer: function (str, reg, data) {
            return str.replace(reg, function (match, p1,p2,p3) {
                return p1 + data + p3;
            })
        },

        _getWordBoundaryRegExp: function (sign) {
            var symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

            return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
        },


        selectDate: function (date) {
            var _this = this,
                opts = _this.opts,
                d = _this.parsedDate,
                selectedDates = _this.selectedDates,
                len = selectedDates.length,
                newDate = '';

            if (Array.isArray(date)) {
                date.forEach(function (d) {
                    _this.selectDate(d)
                });
                return;
            }

            if (!(date instanceof Date)) return;

            this.lastSelectedDate = date;

            // Set new time values from Date
            if (this.timepicker) {
                this.timepicker._setTime(date);
            }

            // On this step timepicker will set valid values in it's instance
            _this._trigger('selectDate', date);

            // Set correct time values after timepicker's validation
            // Prevent from setting hours or minutes which values are lesser then `min` value or
            // greater then `max` value
            if (this.timepicker) {
                date.setHours(this.timepicker.hours);
                date.setMinutes(this.timepicker.minutes)
            }

            if (_this.view == 'days') {
                if (date.getMonth() != d.month && opts.moveToOtherMonthsOnSelect) {
                    newDate = new Date(date.getFullYear(), date.getMonth(), 1);
                }
            }

            if (_this.view == 'years') {
                if (date.getFullYear() != d.year && opts.moveToOtherYearsOnSelect) {
                    newDate = new Date(date.getFullYear(), 0, 1);
                }
            }

            if (newDate) {
                _this.silent = true;
                _this.date = newDate;
                _this.silent = false;
                _this.nav._render()
            }

            if (opts.multipleDates && !opts.range) { // Set priority to range functionality
                if (len === opts.multipleDates) return;
                if (!_this._isSelected(date)) {
                    _this.selectedDates.push(date);
                }
            } else if (opts.range) {
                if (len == 2) {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                    _this.maxRange = '';
                } else if (len == 1) {
                    _this.selectedDates.push(date);
                    if (!_this.maxRange){
                        _this.maxRange = date;
                    } else {
                        _this.minRange = date;
                    }
                    // Swap dates if they were selected via dp.selectDate() and second date was smaller then first
                    if (datepicker.bigger(_this.maxRange, _this.minRange)) {
                        _this.maxRange = _this.minRange;
                        _this.minRange = date;
                    }
                    _this.selectedDates = [_this.minRange, _this.maxRange]

                } else {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                }
            } else {
                _this.selectedDates = [date];
            }

            _this._setInputValue();

            if (opts.onSelect) {
                _this._triggerOnChange();
            }

            if (opts.autoClose && !this.timepickerIsActive) {
                if (!opts.multipleDates && !opts.range) {
                    _this.hide();
                } else if (opts.range && _this.selectedDates.length == 2) {
                    _this.hide();
                }
            }

            _this.views[this.currentView]._render()
        },

        removeDate: function (date) {
            var selected = this.selectedDates,
                _this = this;

            if (!(date instanceof Date)) return;

            return selected.some(function (curDate, i) {
                if (datepicker.isSame(curDate, date)) {
                    selected.splice(i, 1);

                    if (!_this.selectedDates.length) {
                        _this.minRange = '';
                        _this.maxRange = '';
                        _this.lastSelectedDate = '';
                    } else {
                        _this.lastSelectedDate = _this.selectedDates[_this.selectedDates.length - 1];
                    }

                    _this.views[_this.currentView]._render();
                    _this._setInputValue();

                    if (_this.opts.onSelect) {
                        _this._triggerOnChange();
                    }

                    return true
                }
            })
        },

        today: function () {
            this.silent = true;
            this.view = this.opts.minView;
            this.silent = false;
            this.date = new Date();

            if (this.opts.todayButton instanceof Date) {
                this.selectDate(this.opts.todayButton)
            }
        },

        clear: function () {
            this.selectedDates = [];
            this.minRange = '';
            this.maxRange = '';
            this.views[this.currentView]._render();
            this._setInputValue();
            if (this.opts.onSelect) {
                this._triggerOnChange()
            }
        },

        /**
         * Updates datepicker options
         * @param {String|Object} param - parameter's name to update. If object then it will extend current options
         * @param {String|Number|Object} [value] - new param value
         */
        update: function (param, value) {
            var len = arguments.length,
                lastSelectedDate = this.lastSelectedDate;

            if (len == 2) {
                this.opts[param] = value;
            } else if (len == 1 && typeof param == 'object') {
                this.opts = $.extend(true, this.opts, param)
            }

            this._createShortCuts();
            this._syncWithMinMaxDates();
            this._defineLocale(this.opts.language);
            this.nav._addButtonsIfNeed();
            if (!this.opts.onlyTimepicker) this.nav._render();
            this.views[this.currentView]._render();

            if (this.elIsInput && !this.opts.inline) {
                this._setPositionClasses(this.opts.position);
                if (this.visible) {
                    this.setPosition(this.opts.position)
                }
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            if (this.opts.onlyTimepicker) {
                this.$datepicker.addClass('-only-timepicker-');
            }

            if (this.opts.timepicker) {
                if (lastSelectedDate) this.timepicker._handleDate(lastSelectedDate);
                this.timepicker._updateRanges();
                this.timepicker._updateCurrentTime();
                // Change hours and minutes if it's values have been changed through min/max hours/minutes
                if (lastSelectedDate) {
                    lastSelectedDate.setHours(this.timepicker.hours);
                    lastSelectedDate.setMinutes(this.timepicker.minutes);
                }
            }

            this._setInputValue();

            return this;
        },

        _syncWithMinMaxDates: function () {
            var curTime = this.date.getTime();
            this.silent = true;
            if (this.minTime > curTime) {
                this.date = this.minDate;
            }

            if (this.maxTime < curTime) {
                this.date = this.maxDate;
            }
            this.silent = false;
        },

        _isSelected: function (checkDate, cellType) {
            var res = false;
            this.selectedDates.some(function (date) {
                if (datepicker.isSame(date, checkDate, cellType)) {
                    res = date;
                    return true;
                }
            });
            return res;
        },

        _setInputValue: function () {
            var _this = this,
                opts = _this.opts,
                format = _this.loc.dateFormat,
                altFormat = opts.altFieldDateFormat,
                value = _this.selectedDates.map(function (date) {
                    return _this.formatDate(format, date)
                }),
                altValues;

            if (opts.altField && _this.$altField.length) {
                altValues = this.selectedDates.map(function (date) {
                    return _this.formatDate(altFormat, date)
                });
                altValues = altValues.join(this.opts.multipleDatesSeparator);
                this.$altField.val(altValues);
            }

            value = value.join(this.opts.multipleDatesSeparator);

            this.$el.val(value)
        },

        /**
         * Check if date is between minDate and maxDate
         * @param date {object} - date object
         * @param type {string} - cell type
         * @returns {boolean}
         * @private
         */
        _isInRange: function (date, type) {
            var time = date.getTime(),
                d = datepicker.getParsedDate(date),
                min = datepicker.getParsedDate(this.minDate),
                max = datepicker.getParsedDate(this.maxDate),
                dMinTime = new Date(d.year, d.month, min.date).getTime(),
                dMaxTime = new Date(d.year, d.month, max.date).getTime(),
                types = {
                    day: time >= this.minTime && time <= this.maxTime,
                    month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
                    year: d.year >= min.year && d.year <= max.year
                };
            return type ? types[type] : types.day
        },

        _getDimensions: function ($el) {
            var offset = $el.offset();

            return {
                width: $el.outerWidth(),
                height: $el.outerHeight(),
                left: offset.left,
                top: offset.top
            }
        },

        _getDateFromCell: function (cell) {
            var curDate = this.parsedDate,
                year = cell.data('year') || curDate.year,
                month = cell.data('month') == undefined ? curDate.month : cell.data('month'),
                date = cell.data('date') || 1;

            return new Date(year, month, date);
        },

        _setPositionClasses: function (pos) {
            pos = pos.split(' ');
            var main = pos[0],
                sec = pos[1],
                classes = 'datepicker -' + main + '-' + sec + '- -from-' + main + '-';

            if (this.visible) classes += ' active';

            this.$datepicker
                .removeAttr('class')
                .addClass(classes);
        },

        setPosition: function (position) {
            position = position || this.opts.position;

            var dims = this._getDimensions(this.$el),
                selfDims = this._getDimensions(this.$datepicker),
                pos = position.split(' '),
                top, left,
                offset = this.opts.offset,
                main = pos[0],
                secondary = pos[1];

            switch (main) {
                case 'top':
                    top = dims.top - selfDims.height - offset;
                    break;
                case 'right':
                    left = dims.left + dims.width + offset;
                    break;
                case 'bottom':
                    top = dims.top + dims.height + offset;
                    break;
                case 'left':
                    left = dims.left - selfDims.width - offset;
                    break;
            }

            switch(secondary) {
                case 'top':
                    top = dims.top;
                    break;
                case 'right':
                    left = dims.left + dims.width - selfDims.width;
                    break;
                case 'bottom':
                    top = dims.top + dims.height - selfDims.height;
                    break;
                case 'left':
                    left = dims.left;
                    break;
                case 'center':
                    if (/left|right/.test(main)) {
                        top = dims.top + dims.height/2 - selfDims.height/2;
                    } else {
                        left = dims.left + dims.width/2 - selfDims.width/2;
                    }
            }

            this.$datepicker
                .css({
                    left: left,
                    top: top
                })
        },

        show: function () {
            var onShow = this.opts.onShow;

            this.setPosition(this.opts.position);
            this.$datepicker.addClass('active');
            this.visible = true;

            if (onShow) {
                this._bindVisionEvents(onShow)
            }
        },

        hide: function () {
            var onHide = this.opts.onHide;

            this.$datepicker
                .removeClass('active')
                .css({
                    left: '-100000px'
                });

            this.focused = '';
            this.keys = [];

            this.inFocus = false;
            this.visible = false;
            this.$el.blur();

            if (onHide) {
                this._bindVisionEvents(onHide)
            }
        },

        down: function (date) {
            this._changeView(date, 'down');
        },

        up: function (date) {
            this._changeView(date, 'up');
        },

        _bindVisionEvents: function (event) {
            this.$datepicker.off('transitionend.dp');
            event(this, false);
            this.$datepicker.one('transitionend.dp', event.bind(this, this, true))
        },

        _changeView: function (date, dir) {
            date = date || this.focused || this.date;

            var nextView = dir == 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
            if (nextView > 2) nextView = 2;
            if (nextView < 0) nextView = 0;

            this.silent = true;
            this.date = new Date(date.getFullYear(), date.getMonth(), 1);
            this.silent = false;
            this.view = this.viewIndexes[nextView];

        },

        _handleHotKey: function (key) {
            var date = datepicker.getParsedDate(this._getFocusedDate()),
                focusedParsed,
                o = this.opts,
                newDate,
                totalDaysInNextMonth,
                monthChanged = false,
                yearChanged = false,
                decadeChanged = false,
                y = date.year,
                m = date.month,
                d = date.date;

            switch (key) {
                case 'ctrlRight':
                case 'ctrlUp':
                    m += 1;
                    monthChanged = true;
                    break;
                case 'ctrlLeft':
                case 'ctrlDown':
                    m -= 1;
                    monthChanged = true;
                    break;
                case 'shiftRight':
                case 'shiftUp':
                    yearChanged = true;
                    y += 1;
                    break;
                case 'shiftLeft':
                case 'shiftDown':
                    yearChanged = true;
                    y -= 1;
                    break;
                case 'altRight':
                case 'altUp':
                    decadeChanged = true;
                    y += 10;
                    break;
                case 'altLeft':
                case 'altDown':
                    decadeChanged = true;
                    y -= 10;
                    break;
                case 'ctrlShiftUp':
                    this.up();
                    break;
            }

            totalDaysInNextMonth = datepicker.getDaysCount(new Date(y,m));
            newDate = new Date(y,m,d);

            // If next month has less days than current, set date to total days in that month
            if (totalDaysInNextMonth < d) d = totalDaysInNextMonth;

            // Check if newDate is in valid range
            if (newDate.getTime() < this.minTime) {
                newDate = this.minDate;
            } else if (newDate.getTime() > this.maxTime) {
                newDate = this.maxDate;
            }

            this.focused = newDate;

            focusedParsed = datepicker.getParsedDate(newDate);
            if (monthChanged && o.onChangeMonth) {
                o.onChangeMonth(focusedParsed.month, focusedParsed.year)
            }
            if (yearChanged && o.onChangeYear) {
                o.onChangeYear(focusedParsed.year)
            }
            if (decadeChanged && o.onChangeDecade) {
                o.onChangeDecade(this.curDecade)
            }
        },

        _registerKey: function (key) {
            var exists = this.keys.some(function (curKey) {
                return curKey == key;
            });

            if (!exists) {
                this.keys.push(key)
            }
        },

        _unRegisterKey: function (key) {
            var index = this.keys.indexOf(key);

            this.keys.splice(index, 1);
        },

        _isHotKeyPressed: function () {
            var currentHotKey,
                found = false,
                _this = this,
                pressedKeys = this.keys.sort();

            for (var hotKey in hotKeys) {
                currentHotKey = hotKeys[hotKey];
                if (pressedKeys.length != currentHotKey.length) continue;

                if (currentHotKey.every(function (key, i) { return key == pressedKeys[i]})) {
                    _this._trigger('hotKey', hotKey);
                    found = true;
                }
            }

            return found;
        },

        _trigger: function (event, args) {
            this.$el.trigger(event, args)
        },

        _focusNextCell: function (keyCode, type) {
            type = type || this.cellType;

            var date = datepicker.getParsedDate(this._getFocusedDate()),
                y = date.year,
                m = date.month,
                d = date.date;

            if (this._isHotKeyPressed()){
                return;
            }

            switch(keyCode) {
                case 37: // left
                    type == 'day' ? (d -= 1) : '';
                    type == 'month' ? (m -= 1) : '';
                    type == 'year' ? (y -= 1) : '';
                    break;
                case 38: // up
                    type == 'day' ? (d -= 7) : '';
                    type == 'month' ? (m -= 3) : '';
                    type == 'year' ? (y -= 4) : '';
                    break;
                case 39: // right
                    type == 'day' ? (d += 1) : '';
                    type == 'month' ? (m += 1) : '';
                    type == 'year' ? (y += 1) : '';
                    break;
                case 40: // down
                    type == 'day' ? (d += 7) : '';
                    type == 'month' ? (m += 3) : '';
                    type == 'year' ? (y += 4) : '';
                    break;
            }

            var nd = new Date(y,m,d);
            if (nd.getTime() < this.minTime) {
                nd = this.minDate;
            } else if (nd.getTime() > this.maxTime) {
                nd = this.maxDate;
            }

            this.focused = nd;

        },

        _getFocusedDate: function () {
            var focused  = this.focused || this.selectedDates[this.selectedDates.length - 1],
                d = this.parsedDate;

            if (!focused) {
                switch (this.view) {
                    case 'days':
                        focused = new Date(d.year, d.month, new Date().getDate());
                        break;
                    case 'months':
                        focused = new Date(d.year, d.month, 1);
                        break;
                    case 'years':
                        focused = new Date(d.year, 0, 1);
                        break;
                }
            }

            return focused;
        },

        _getCell: function (date, type) {
            type = type || this.cellType;

            var d = datepicker.getParsedDate(date),
                selector = '.datepicker--cell[data-year="' + d.year + '"]',
                $cell;

            switch (type) {
                case 'month':
                    selector = '[data-month="' + d.month + '"]';
                    break;
                case 'day':
                    selector += '[data-month="' + d.month + '"][data-date="' + d.date + '"]';
                    break;
            }
            $cell = this.views[this.currentView].$el.find(selector);

            return $cell.length ? $cell : $('');
        },

        destroy: function () {
            var _this = this;
            _this.$el
                .off('.adp')
                .data('datepicker', '');

            _this.selectedDates = [];
            _this.focused = '';
            _this.views = {};
            _this.keys = [];
            _this.minRange = '';
            _this.maxRange = '';

            if (_this.opts.inline || !_this.elIsInput) {
                _this.$datepicker.closest('.datepicker-inline').remove();
            } else {
                _this.$datepicker.remove();
            }
        },

        _handleAlreadySelectedDates: function (alreadySelected, selectedDate) {
            if (this.opts.range) {
                if (!this.opts.toggleSelected) {
                    // Add possibility to select same date when range is true
                    if (this.selectedDates.length != 2) {
                        this._trigger('clickCell', selectedDate);
                    }
                } else {
                    this.removeDate(selectedDate);
                }
            } else if (this.opts.toggleSelected){
                this.removeDate(selectedDate);
            }

            // Change last selected date to be able to change time when clicking on this cell
            if (!this.opts.toggleSelected) {
                this.lastSelectedDate = alreadySelected;
                if (this.opts.timepicker) {
                    this.timepicker._setTime(alreadySelected);
                    this.timepicker.update();
                }
            }
        },

        _onShowEvent: function (e) {
            if (!this.visible) {
                this.show();
            }
        },

        _onBlur: function () {
            if (!this.inFocus && this.visible) {
                this.hide();
            }
        },

        _onMouseDownDatepicker: function (e) {
            this.inFocus = true;
        },

        _onMouseUpDatepicker: function (e) {
            this.inFocus = false;
            e.originalEvent.inFocus = true;
            if (!e.originalEvent.timepickerFocus) this.$el.focus();
        },

        _onKeyUpGeneral: function (e) {
            var val = this.$el.val();

            if (!val) {
                this.clear();
            }
        },

        _onResize: function () {
            if (this.visible) {
                this.setPosition();
            }
        },

        _onMouseUpBody: function (e) {
            if (e.originalEvent.inFocus) return;

            if (this.visible && !this.inFocus) {
                this.hide();
            }
        },

        _onMouseUpEl: function (e) {
            e.originalEvent.inFocus = true;
            setTimeout(this._onKeyUpGeneral.bind(this),4);
        },

        _onKeyDown: function (e) {
            var code = e.which;
            this._registerKey(code);

            // Arrows
            if (code >= 37 && code <= 40) {
                e.preventDefault();
                this._focusNextCell(code);
            }

            // Enter
            if (code == 13) {
                if (this.focused) {
                    if (this._getCell(this.focused).hasClass('-disabled-')) return;
                    if (this.view != this.opts.minView) {
                        this.down()
                    } else {
                        var alreadySelected = this._isSelected(this.focused, this.cellType);

                        if (!alreadySelected) {
                            if (this.timepicker) {
                                this.focused.setHours(this.timepicker.hours);
                                this.focused.setMinutes(this.timepicker.minutes);
                            }
                            this.selectDate(this.focused);
                            return;
                        }
                        this._handleAlreadySelectedDates(alreadySelected, this.focused)
                    }
                }
            }

            // Esc
            if (code == 27) {
                this.hide();
            }
        },

        _onKeyUp: function (e) {
            var code = e.which;
            this._unRegisterKey(code);
        },

        _onHotKey: function (e, hotKey) {
            this._handleHotKey(hotKey);
        },

        _onMouseEnterCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell'),
                date = this._getDateFromCell($cell);

            // Prevent from unnecessary rendering and setting new currentDate
            this.silent = true;

            if (this.focused) {
                this.focused = ''
            }

            $cell.addClass('-focus-');

            this.focused = date;
            this.silent = false;

            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this.focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
                this.views[this.currentView]._update();
            }
        },

        _onMouseLeaveCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell');

            $cell.removeClass('-focus-');

            this.silent = true;
            this.focused = '';
            this.silent = false;
        },

        _onTimeChange: function (e, h, m) {
            var date = new Date(),
                selectedDates = this.selectedDates,
                selected = false;

            if (selectedDates.length) {
                selected = true;
                date = this.lastSelectedDate;
            }

            date.setHours(h);
            date.setMinutes(m);

            if (!selected && !this._getCell(date).hasClass('-disabled-')) {
                this.selectDate(date);
            } else {
                this._setInputValue();
                if (this.opts.onSelect) {
                    this._triggerOnChange();
                }
            }
        },

        _onClickCell: function (e, date) {
            if (this.timepicker) {
                date.setHours(this.timepicker.hours);
                date.setMinutes(this.timepicker.minutes);
            }
            this.selectDate(date);
        },

        set focused(val) {
            if (!val && this.focused) {
                var $cell = this._getCell(this.focused);

                if ($cell.length) {
                    $cell.removeClass('-focus-')
                }
            }
            this._focused = val;
            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this._focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
            }
            if (this.silent) return;
            this.date = val;
        },

        get focused() {
            return this._focused;
        },

        get parsedDate() {
            return datepicker.getParsedDate(this.date);
        },

        set date (val) {
            if (!(val instanceof Date)) return;

            this.currentDate = val;

            if (this.inited && !this.silent) {
                this.views[this.view]._render();
                this.nav._render();
                if (this.visible && this.elIsInput) {
                    this.setPosition();
                }
            }
            return val;
        },

        get date () {
            return this.currentDate
        },

        set view (val) {
            this.viewIndex = this.viewIndexes.indexOf(val);

            if (this.viewIndex < 0) {
                return;
            }

            this.prevView = this.currentView;
            this.currentView = val;

            if (this.inited) {
                if (!this.views[val]) {
                    this.views[val] = new  $.fn.datepicker.Body(this, val, this.opts)
                } else {
                    this.views[val]._render();
                }

                this.views[this.prevView].hide();
                this.views[val].show();
                this.nav._render();

                if (this.opts.onChangeView) {
                    this.opts.onChangeView(val)
                }
                if (this.elIsInput && this.visible) this.setPosition();
            }

            return val
        },

        get view() {
            return this.currentView;
        },

        get cellType() {
            return this.view.substring(0, this.view.length - 1)
        },

        get minTime() {
            var min = datepicker.getParsedDate(this.minDate);
            return new Date(min.year, min.month, min.date).getTime()
        },

        get maxTime() {
            var max = datepicker.getParsedDate(this.maxDate);
            return new Date(max.year, max.month, max.date).getTime()
        },

        get curDecade() {
            return datepicker.getDecade(this.date)
        }
    };

    //  Utils
    // -------------------------------------------------

    datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    datepicker.getParsedDate = function (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
            date: date.getDate(),
            fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            day: date.getDay(),
            hours: date.getHours(),
            fullHours:  date.getHours() < 10 ? '0' + date.getHours() :  date.getHours() ,
            minutes: date.getMinutes(),
            fullMinutes:  date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes()
        }
    };

    datepicker.getDecade = function (date) {
        var firstYear = Math.floor(date.getFullYear() / 10) * 10;

        return [firstYear, firstYear + 9];
    };

    datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
            if (data[match] || data[match] === 0) {
                return data[match]
            }
        });
    };

    datepicker.isSame = function (date1, date2, type) {
        if (!date1 || !date2) return false;
        var d1 = datepicker.getParsedDate(date1),
            d2 = datepicker.getParsedDate(date2),
            _type = type ? type : 'day',

            conditions = {
                day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
                month: d1.month == d2.month && d1.year == d2.year,
                year: d1.year == d2.year
            };

        return conditions[_type];
    };

    datepicker.less = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() < dateCompareTo.getTime();
    };

    datepicker.bigger = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() > dateCompareTo.getTime();
    };

    datepicker.getLeadingZeroNum = function (num) {
        return parseInt(num) < 10 ? '0' + num : num;
    };

    /**
     * Returns copy of date with hours and minutes equals to 0
     * @param date {Date}
     */
    datepicker.resetTime = function (date) {
        if (typeof date != 'object') return;
        date = datepicker.getParsedDate(date);
        return new Date(date.year, date.month, date.date)
    };

    $.fn.datepicker = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this,  pluginName,
                    new Datepicker( this, options ));
            } else {
                var _this = $.data(this, pluginName);

                _this.opts = $.extend(true, _this.opts, options);
                _this.update();
            }
        });
    };

    $.fn.datepicker.Constructor = Datepicker;

    $.fn.datepicker.language = {
        ru: {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
            daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yy',
            timeFormat: 'hh:ii',
            firstDay: 1
        },
        cs: {
            days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
            daysShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
            daysMin: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
            months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
            monthsShort: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
            today: 'Dnes',
            clear: 'Vymazat',
            dateFormat: 'dd.mm.yy',
            timeFormat: 'hh:ii',
            firstDay: 1,
        },
    };

    $(function () {
        $(autoInitSelector).datepicker();
    })

})();

;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days datepicker--body">' +
        '<div class="datepicker--days-names"></div>' +
        '<div class="datepicker--cells datepicker--cells-days"></div>' +
        '</div>',
        months: '' +
        '<div class="datepicker--months datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-months"></div>' +
        '</div>',
        years: '' +
        '<div class="datepicker--years datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-years"></div>' +
        '</div>'
        },
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;
        this.$el = $('');

        if (this.opts.onlyTimepicker) return;
        this.init();
    };

    datepicker.Body.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._render();

            this._bindEvents();
        },

        _bindEvents: function () {
            this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
        },

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days-names', this.$el);
            this.$cells = $('.datepicker--cells', this.$el);
        },

        _getDayNamesHtml: function (firstDay, curDay, html, i) {
            curDay = curDay != undefined ? curDay : firstDay;
            html = html ? html : '';
            i = i != undefined ? i : 0;

            if (i > 7) return html;
            if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);

            html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';

            return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },

        _getCellContents: function (date, type) {
            var classes = "datepicker--cell datepicker--cell-" + type,
                currentDate = new Date(),
                parent = this.d,
                minRange = dp.resetTime(parent.minRange),
                maxRange = dp.resetTime(parent.maxRange),
                opts = parent.opts,
                d = dp.getParsedDate(date),
                render = {},
                html = d.date;

            switch (type) {
                case 'day':
                    if (parent.isWeekend(d.day)) classes += " -weekend-";
                    if (d.month != this.d.parsedDate.month) {
                        classes += " -other-month-";
                        if (!opts.selectOtherMonths) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherMonths) html = '';
                    }
                    break;
                case 'month':
                    html = parent.loc[parent.opts.monthsField][d.month];
                    break;
                case 'year':
                    var decade = parent.curDecade;
                    html = d.year;
                    if (d.year < decade[0] || d.year > decade[1]) {
                        classes += ' -other-decade-';
                        if (!opts.selectOtherYears) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherYears) html = '';
                    }
                    break;
            }

            if (opts.onRenderCell) {
                render = opts.onRenderCell(date, type) || {};
                html = render.html ? render.html : html;
                classes += render.classes ? ' ' + render.classes : '';
            }

            if (opts.range) {
                if (dp.isSame(minRange, date, type)) classes += ' -range-from-';
                if (dp.isSame(maxRange, date, type)) classes += ' -range-to-';

                if (parent.selectedDates.length == 1 && parent.focused) {
                    if (
                        (dp.bigger(minRange, date) && dp.less(parent.focused, date)) ||
                        (dp.less(maxRange, date) && dp.bigger(parent.focused, date)))
                    {
                        classes += ' -in-range-'
                    }

                    if (dp.less(maxRange, date) && dp.isSame(parent.focused, date)) {
                        classes += ' -range-from-'
                    }
                    if (dp.bigger(minRange, date) && dp.isSame(parent.focused, date)) {
                        classes += ' -range-to-'
                    }

                } else if (parent.selectedDates.length == 2) {
                    if (dp.bigger(minRange, date) && dp.less(maxRange, date)) {
                        classes += ' -in-range-'
                    }
                }
            }


            if (dp.isSame(currentDate, date, type)) classes += ' -current-';
            if (parent.focused && dp.isSame(date, parent.focused, type)) classes += ' -focus-';
            if (parent._isSelected(date, type)) classes += ' -selected-';
            if (!parent._isInRange(date, type) || render.disabled) classes += ' -disabled-';

            return {
                html: html,
                classes: classes
            }
        },

        /**
         * Calculates days number to render. Generates days html and returns it.
         * @param {object} date - Date object
         * @returns {string}
         * @private
         */
        _getDaysHtml: function (date) {
            var totalMonthDays = dp.getDaysCount(date),
                firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
                lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
                daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
                daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;

            daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
            daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

            var startDayIndex = -daysFromPevMonth + 1,
                m, y,
                html = '';

            for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
                y = date.getFullYear();
                m = date.getMonth();

                html += this._getDayHtml(new Date(y, m, i))
            }

            return html;
        },

        _getDayHtml: function (date) {
           var content = this._getCellContents(date, 'day');

            return '<div class="' + content.classes + '" ' +
                'data-date="' + date.getDate() + '" ' +
                'data-month="' + date.getMonth() + '" ' +
                'data-year="' + date.getFullYear() + '">' + content.html + '</div>';
        },

        /**
         * Generates months html
         * @param {object} date - date instance
         * @returns {string}
         * @private
         */
        _getMonthsHtml: function (date) {
            var html = '',
                d = dp.getParsedDate(date),
                i = 0;

            while(i < 12) {
                html += this._getMonthHtml(new Date(d.year, i));
                i++
            }

            return html;
        },

        _getMonthHtml: function (date) {
            var content = this._getCellContents(date, 'month');

            return '<div class="' + content.classes + '" data-month="' + date.getMonth() + '">' + content.html + '</div>'
        },

        _getYearsHtml: function (date) {
            var d = dp.getParsedDate(date),
                decade = dp.getDecade(date),
                firstYear = decade[0] - 1,
                html = '',
                i = firstYear;

            for (i; i <= decade[1] + 1; i++) {
                html += this._getYearHtml(new Date(i , 0));
            }

            return html;
        },

        _getYearHtml: function (date) {
            var content = this._getCellContents(date, 'year');

            return '<div class="' + content.classes + '" data-year="' + date.getFullYear() + '">' + content.html + '</div>'
        },

        _renderTypes: {
            days: function () {
                var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
                    days = this._getDaysHtml(this.d.currentDate);

                this.$cells.html(days);
                this.$names.html(dayNames)
            },
            months: function () {
                var html = this._getMonthsHtml(this.d.currentDate);

                this.$cells.html(html)
            },
            years: function () {
                var html = this._getYearsHtml(this.d.currentDate);

                this.$cells.html(html)
            }
        },

        _render: function () {
            if (this.opts.onlyTimepicker) return;
            this._renderTypes[this.type].bind(this)();
        },

        _update: function () {
            var $cells = $('.datepicker--cell', this.$cells),
                _this = this,
                classes,
                $cell,
                date;
            $cells.each(function (cell, i) {
                $cell = $(this);
                date = _this.d._getDateFromCell($(this));
                classes = _this._getCellContents(date, _this.d.cellType);
                $cell.attr('class',classes.classes)
            });
        },

        show: function () {
            if (this.opts.onlyTimepicker) return;
            this.$el.addClass('active');
            this.acitve = true;
        },

        hide: function () {
            this.$el.removeClass('active');
            this.active = false;
        },

        //  Events
        // -------------------------------------------------

        _handleClick: function (el) {
            var date = el.data('date') || 1,
                month = el.data('month') || 0,
                year = el.data('year') || this.d.parsedDate.year,
                dp = this.d;
            // Change view if min view does not reach yet
            if (dp.view != this.opts.minView) {
                dp.down(new Date(year, month, date));
                return;
            }
            // Select date if min view is reached
            var selectedDate = new Date(year, month, date),
                alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);

            if (!alreadySelected) {
                dp._trigger('clickCell', selectedDate);
                return;
            }

            dp._handleAlreadySelectedDates.bind(dp, alreadySelected, selectedDate)();

        },

        _onClickCell: function (e) {
            var $el = $(e.target).closest('.datepicker--cell');

            if ($el.hasClass('-disabled-')) return;

            this._handleClick.bind(this)($el);
        }
    };
})();

;(function () {
    var template = '' +
        '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
        '<div class="datepicker--nav-title">#{title}</div>' +
        '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
        button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;

        this.$buttonsContainer = '';

        this.init();
    };

    datepicker.Navigation.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._bindEvents();
        },

        _bindEvents: function () {
            this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
            this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
            this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
        },

        _buildBaseHtml: function () {
            if (!this.opts.onlyTimepicker) {
                this._render();
            }
            this._addButtonsIfNeed();
        },

        _addButtonsIfNeed: function () {
            if (this.opts.todayButton) {
                this._addButton('today')
            }
            if (this.opts.clearButton) {
                this._addButton('clear')
            }
        },

        _render: function () {
            var title = this._getTitle(this.d.currentDate),
                html = dp.template(template, $.extend({title: title}, this.opts));
            this.d.$nav.html(html);
            if (this.d.view == 'years') {
                $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
            }
            this.setNavStatus();
        },

        _getTitle: function (date) {
            return this.d.formatDate(this.opts.navTitles[this.d.view], date)
        },

        _addButton: function (type) {
            if (!this.$buttonsContainer.length) {
                this._addButtonsContainer();
            }

            var data = {
                    action: type,
                    label: this.d.loc[type]
                },
                html = dp.template(button, data);

            if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
            this.$buttonsContainer.append(html);
        },

        _addButtonsContainer: function () {
            this.d.$datepicker.append(buttonsContainerTemplate);
            this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
        },

        setNavStatus: function () {
            if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;

            var date = this.d.parsedDate,
                m = date.month,
                y = date.year,
                d = date.date;

            switch (this.d.view) {
                case 'days':
                    if (!this.d._isInRange(new Date(y, m-1, 1), 'month')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y, m+1, 1), 'month')) {
                        this._disableNav('next')
                    }
                    break;
                case 'months':
                    if (!this.d._isInRange(new Date(y-1, m, d), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y+1, m, d), 'year')) {
                        this._disableNav('next')
                    }
                    break;
                case 'years':
                    var decade = dp.getDecade(this.d.date);
                    if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
                        this._disableNav('next')
                    }
                    break;
            }
        },

        _disableNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-')
        },

        _activateNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-')
        },

        _onClickNavButton: function (e) {
            var $el = $(e.target).closest('[data-action]'),
                action = $el.data('action');

            this.d[action]();
        },

        _onClickNavTitle: function (e) {
            if ($(e.target).hasClass('-disabled-')) return;

            if (this.d.view == 'days') {
                return this.d.view = 'months'
            }

            this.d.view = 'years';
        }
    }

})();

;(function () {
    var template = '<div class="datepicker--time">' +
        '<div class="datepicker--time-current">' +
        '   <span class="datepicker--time-current-hours">#{hourVisible}</span>' +
        '   <span class="datepicker--time-current-colon">:</span>' +
        '   <span class="datepicker--time-current-minutes">#{minValue}</span>' +
        '</div>' +
        '<div class="datepicker--time-sliders">' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' +
        '   </div>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' +
        '   </div>' +
        '</div>' +
        '</div>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        this.init();
    };

    datepicker.Timepicker.prototype = {
        init: function () {
            var input = 'input';
            this._setTime(this.d.date);
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.d.$el.on('selectDate', this._onSelectDate.bind(this));
            this.$ranges.on(input, this._onChangeRange.bind(this));
            this.$ranges.on('mouseup', this._onMouseUpRange.bind(this));
            this.$ranges.on('mousemove focus ', this._onMouseEnterRange.bind(this));
            this.$ranges.on('mouseout blur', this._onMouseOutRange.bind(this));
        },

        _setTime: function (date) {
            var _date = dp.getParsedDate(date);

            this._handleDate(date);
            this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
            this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
        },

        /**
         * Sets minHours and minMinutes from date (usually it's a minDate)
         * Also changes minMinutes if current hours are bigger then @date hours
         * @param date {Date}
         * @private
         */
        _setMinTimeFromDate: function (date) {
            this.minHours = date.getHours();
            this.minMinutes = date.getMinutes();

            // If, for example, min hours are 10, and current hours are 12,
            // update minMinutes to default value, to be able to choose whole range of values
            if (this.d.lastSelectedDate) {
                if (this.d.lastSelectedDate.getHours() > date.getHours()) {
                    this.minMinutes = this.opts.minMinutes;
                }
            }
        },

        _setMaxTimeFromDate: function (date) {
            this.maxHours = date.getHours();
            this.maxMinutes = date.getMinutes();

            if (this.d.lastSelectedDate) {
                if (this.d.lastSelectedDate.getHours() < date.getHours()) {
                    this.maxMinutes = this.opts.maxMinutes;
                }
            }
        },

        _setDefaultMinMaxTime: function () {
            var maxHours = 23,
                maxMinutes = 59,
                opts = this.opts;

            this.minHours = opts.minHours < 0 || opts.minHours > maxHours ? 0 : opts.minHours;
            this.minMinutes = opts.minMinutes < 0 || opts.minMinutes > maxMinutes ? 0 : opts.minMinutes;
            this.maxHours = opts.maxHours < 0 || opts.maxHours > maxHours ? maxHours : opts.maxHours;
            this.maxMinutes = opts.maxMinutes < 0 || opts.maxMinutes > maxMinutes ? maxMinutes : opts.maxMinutes;
        },

        /**
         * Looks for min/max hours/minutes and if current values
         * are out of range sets valid values.
         * @private
         */
        _validateHoursMinutes: function (date) {
            if (this.hours < this.minHours) {
                this.hours = this.minHours;
            } else if (this.hours > this.maxHours) {
                this.hours = this.maxHours;
            }

            if (this.minutes < this.minMinutes) {
                this.minutes = this.minMinutes;
            } else if (this.minutes > this.maxMinutes) {
                this.minutes = this.maxMinutes;
            }
        },

        _buildHTML: function () {
            var lz = dp.getLeadingZeroNum,
                data = {
                    hourMin: this.minHours,
                    hourMax: lz(this.maxHours),
                    hourStep: this.opts.hoursStep,
                    hourValue: this.hours,
                    hourVisible: lz(this.displayHours),
                    minMin: this.minMinutes,
                    minMax: lz(this.maxMinutes),
                    minStep: this.opts.minutesStep,
                    minValue: lz(this.minutes)
                },
                _template = dp.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
            this.$hours = $('[name="hours"]', this.$timepicker);
            this.$minutes = $('[name="minutes"]', this.$timepicker);
            this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
            this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);

            if (this.d.ampm) {
                this.$ampm = $('<span class="datepicker--time-current-ampm">')
                    .appendTo($('.datepicker--time-current', this.$timepicker))
                    .html(this.dayPeriod);

                this.$timepicker.addClass('-am-pm-');
            }
        },

        _updateCurrentTime: function () {
            var h =  dp.getLeadingZeroNum(this.displayHours),
                m = dp.getLeadingZeroNum(this.minutes);

            this.$hoursText.html(h);
            this.$minutesText.html(m);

            if (this.d.ampm) {
                this.$ampm.html(this.dayPeriod);
            }
        },

        _updateRanges: function () {
            this.$hours.attr({
                min: this.minHours,
                max: this.maxHours
            }).val(this.hours);

            this.$minutes.attr({
                min: this.minMinutes,
                max: this.maxMinutes
            }).val(this.minutes)
        },

        /**
         * Sets minHours, minMinutes etc. from date. If date is not passed, than sets
         * values from options
         * @param [date] {object} - Date object, to get values from
         * @private
         */
        _handleDate: function (date) {
            this._setDefaultMinMaxTime();
            if (date) {
                if (dp.isSame(date, this.d.opts.minDate)) {
                    this._setMinTimeFromDate(this.d.opts.minDate);
                } else if (dp.isSame(date, this.d.opts.maxDate)) {
                    this._setMaxTimeFromDate(this.d.opts.maxDate);
                }
            }

            this._validateHoursMinutes(date);
        },

        update: function () {
            this._updateRanges();
            this._updateCurrentTime();
        },

        /**
         * Calculates valid hour value to display in text input and datepicker's body.
         * @param date {Date|Number} - date or hours
         * @param [ampm] {Boolean} - 12 hours mode
         * @returns {{hours: *, dayPeriod: string}}
         * @private
         */
        _getValidHoursFromDate: function (date, ampm) {
            var d = date,
                hours = date;

            if (date instanceof Date) {
                d = dp.getParsedDate(date);
                hours = d.hours;
            }

            var _ampm = ampm || this.d.ampm,
                dayPeriod = 'am';

            if (_ampm) {
                switch(true) {
                    case hours == 0:
                        hours = 12;
                        break;
                    case hours == 12:
                        dayPeriod = 'pm';
                        break;
                    case hours > 11:
                        hours = hours - 12;
                        dayPeriod = 'pm';
                        break;
                    default:
                        break;
                }
            }

            return {
                hours: hours,
                dayPeriod: dayPeriod
            }
        },

        set hours (val) {
            this._hours = val;

            var displayHours = this._getValidHoursFromDate(val);

            this.displayHours = displayHours.hours;
            this.dayPeriod = displayHours.dayPeriod;
        },

        get hours() {
            return this._hours;
        },

        //  Events
        // -------------------------------------------------

        _onChangeRange: function (e) {
            var $target = $(e.target),
                name = $target.attr('name');

            this.d.timepickerIsActive = true;

            this[name] = $target.val();
            this._updateCurrentTime();
            this.d._trigger('timeChange', [this.hours, this.minutes]);

            this._handleDate(this.d.lastSelectedDate);
            this.update()
        },

        _onSelectDate: function (e, data) {
            this._handleDate(data);
            this.update();
        },

        _onMouseEnterRange: function (e) {
            var name = $(e.target).attr('name');
            $('.datepicker--time-current-' + name, this.$timepicker).addClass('-focus-');
        },

        _onMouseOutRange: function (e) {
            var name = $(e.target).attr('name');
            if (this.d.inFocus) return; // Prevent removing focus when mouse out of range slider
            $('.datepicker--time-current-' + name, this.$timepicker).removeClass('-focus-');
        },

        _onMouseUpRange: function (e) {
            this.d.timepickerIsActive = false;
        }
    };
})();
 })(window, jQuery);

/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.notTop,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});
(function(window, factory) {
    var lazySizes = factory(window, window.document);
    window.lazySizes = lazySizes;
    if(typeof module == 'object' && module.exports){
        module.exports = lazySizes;
    }
}(window, function l(window, document) {
    'use strict';
    /*jshint eqnull:true */
    if(!document.getElementsByClassName){return;}

    var lazysizes, lazySizesConfig;

    var docElem = document.documentElement;

    var Date = window.Date;

    var supportPicture = window.HTMLPictureElement;

    var _addEventListener = 'addEventListener';

    var _getAttribute = 'getAttribute';

    var addEventListener = window[_addEventListener];

    var setTimeout = window.setTimeout;

    var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

    var requestIdleCallback = window.requestIdleCallback;

    var regPicture = /^picture$/i;

    var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

    var regClassCache = {};

    var forEach = Array.prototype.forEach;

    var hasClass = function(ele, cls) {
        if(!regClassCache[cls]){
            regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        }
        return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
    };

    var addClass = function(ele, cls) {
        if (!hasClass(ele, cls)){
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
        }
    };

    var removeClass = function(ele, cls) {
        var reg;
        if ((reg = hasClass(ele,cls))) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
        }
    };

    var addRemoveLoadEvents = function(dom, fn, add){
        var action = add ? _addEventListener : 'removeEventListener';
        if(add){
            addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt){
            dom[action](evt, fn);
        });
    };

    var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
        var event = document.createEvent('CustomEvent');

        if(!detail){
            detail = {};
        }

        detail.instance = lazysizes;

        event.initCustomEvent(name, !noBubbles, !noCancelable, detail);

        elem.dispatchEvent(event);
        return event;
    };

    var updatePolyfill = function (el, full){
        var polyfill;
        if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
            polyfill({reevaluate: true, elements: [el]});
        } else if(full && full.src){
            el.src = full.src;
        }
    };

    var getCSS = function (elem, style){
        return (getComputedStyle(elem, null) || {})[style];
    };

    var getWidth = function(elem, parent, width){
        width = width || elem.offsetWidth;

        while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
            width =  parent.offsetWidth;
            parent = parent.parentNode;
        }

        return width;
    };

    var rAF = (function(){
        var running, waiting;
        var firstFns = [];
        var secondFns = [];
        var fns = firstFns;

        var run = function(){
            var runFns = fns;

            fns = firstFns.length ? secondFns : firstFns;

            running = true;
            waiting = false;

            while(runFns.length){
                runFns.shift()();
            }

            running = false;
        };

        var rafBatch = function(fn, queue){
            if(running && !queue){
                fn.apply(this, arguments);
            } else {
                fns.push(fn);

                if(!waiting){
                    waiting = true;
                    (document.hidden ? setTimeout : requestAnimationFrame)(run);
                }
            }
        };

        rafBatch._lsFlush = run;

        return rafBatch;
    })();

    var rAFIt = function(fn, simple){
        return simple ?
            function() {
                rAF(fn);
            } :
            function(){
                var that = this;
                var args = arguments;
                rAF(function(){
                    fn.apply(that, args);
                });
            }
        ;
    };

    var throttle = function(fn){
        var running;
        var lastTime = 0;
        var gDelay = 125;
        var RIC_DEFAULT_TIMEOUT = 666;
        var rICTimeout = RIC_DEFAULT_TIMEOUT;
        var run = function(){
            running = false;
            lastTime = Date.now();
            fn();
        };
        var idleCallback = requestIdleCallback ?
            function(){
                requestIdleCallback(run, {timeout: rICTimeout});
                if(rICTimeout !== RIC_DEFAULT_TIMEOUT){
                    rICTimeout = RIC_DEFAULT_TIMEOUT;
                }
            }:
            rAFIt(function(){
                setTimeout(run);
            }, true)
        ;

        return function(isPriority){
            var delay;
            if((isPriority = isPriority === true)){
                rICTimeout = 44;
            }

            if(running){
                return;
            }

            running =  true;

            delay = gDelay - (Date.now() - lastTime);

            if(delay < 0){
                delay = 0;
            }

            if(isPriority || (delay < 9 && requestIdleCallback)){
                idleCallback();
            } else {
                setTimeout(idleCallback, delay);
            }
        };
    };

    //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
    var debounce = function(func) {
        var timeout, timestamp;
        var wait = 99;
        var run = function(){
            timeout = null;
            func();
        };
        var later = function() {
            var last = Date.now() - timestamp;

            if (last < wait) {
                setTimeout(later, wait - last);
            } else {
                (requestIdleCallback || run)(run);
            }
        };

        return function() {
            timestamp = Date.now();

            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };


    var loader = (function(){
        var lazyloadElems, preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

        var defaultExpand, preloadExpand, hFac;

        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;

        var supportScroll = ('onscroll' in window) && !(/glebot/.test(navigator.userAgent));

        var shrinkExpand = 0;
        var currentExpand = 0;

        var isLoading = 0;
        var lowRuns = -1;

        var resetPreloading = function(e){
            isLoading--;
            if(e && e.target){
                addRemoveLoadEvents(e.target, resetPreloading);
            }

            if(!e || isLoading < 0 || !e.target){
                isLoading = 0;
            }
        };

        var isNestedVisible = function(elem, elemExpand){
            var outerRect;
            var parent = elem;
            var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;

            while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
                visible = ((getCSS(parent, 'opacity') || 1) > 0);

                if(visible && getCSS(parent, 'overflow') != 'visible'){
                    outerRect = parent.getBoundingClientRect();
                    visible = eLright > outerRect.left &&
                        eLleft < outerRect.right &&
                        eLbottom > outerRect.top - 1 &&
                        eLtop < outerRect.bottom + 1
                    ;
                }
            }

            return visible;
        };

        var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

            if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

                i = 0;

                lowRuns++;

                if(preloadExpand == null){
                    if(!('expand' in lazySizesConfig)){
                        lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
                    }

                    defaultExpand = lazySizesConfig.expand;
                    preloadExpand = defaultExpand * lazySizesConfig.expFactor;
                }

                if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                } else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
                    currentExpand = defaultExpand;
                } else {
                    currentExpand = shrinkExpand;
                }

                for(; i < eLlen; i++){

                    if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

                    if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

                    if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
                        elemExpand = currentExpand;
                    }

                    if(beforeExpandVal !== elemExpand){
                        eLvW = innerWidth + (elemExpand * hFac);
                        elvH = innerHeight + elemExpand;
                        elemNegativeExpand = elemExpand * -1;
                        beforeExpandVal = elemExpand;
                    }

                    rect = lazyloadElems[i].getBoundingClientRect();

                    if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
                        (eLtop = rect.top) <= elvH &&
                        (eLright = rect.right) >= elemNegativeExpand * hFac &&
                        (eLleft = rect.left) <= eLvW &&
                        (eLbottom || eLright || eLleft || eLtop) &&
                        (lazySizesConfig.loadHidden || getCSS(lazyloadElems[i], 'visibility') != 'hidden') &&
                        ((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
                        unveilElement(lazyloadElems[i]);
                        loadedSomething = true;
                        if(isLoading > 9){break;}
                    } else if(!loadedSomething && isCompleted && !autoLoadElem &&
                        isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
                        (preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
                        (preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
                        autoLoadElem = preloadElems[0] || lazyloadElems[i];
                    }
                }

                if(autoLoadElem && !loadedSomething){
                    unveilElement(autoLoadElem);
                }
            }
        };

        var throttledCheckElements = throttle(checkElements);

        var switchLoadingClass = function(e){
            addClass(e.target, lazySizesConfig.loadedClass);
            removeClass(e.target, lazySizesConfig.loadingClass);
            addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
            triggerEvent(e.target, 'lazyloaded');
        };
        var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
        var rafSwitchLoadingClass = function(e){
            rafedSwitchLoadingClass({target: e.target});
        };

        var changeIframeSrc = function(elem, src){
            try {
                elem.contentWindow.location.replace(src);
            } catch(e){
                elem.src = src;
            }
        };

        var handleSources = function(source){
            var customMedia;

            var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

            if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
                source.setAttribute('media', customMedia);
            }

            if(sourceSrcset){
                source.setAttribute('srcset', sourceSrcset);
            }
        };

        var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
            var src, srcset, parent, isPicture, event, firesLoad;

            if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

                if(sizes){
                    if(isAuto){
                        addClass(elem, lazySizesConfig.autosizesClass);
                    } else {
                        elem.setAttribute('sizes', sizes);
                    }
                }

                srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
                src = elem[_getAttribute](lazySizesConfig.srcAttr);

                if(isImg) {
                    parent = elem.parentNode;
                    isPicture = parent && regPicture.test(parent.nodeName || '');
                }

                firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

                event = {target: elem};

                if(firesLoad){
                    addRemoveLoadEvents(elem, resetPreloading, true);
                    clearTimeout(resetPreloadingTimer);
                    resetPreloadingTimer = setTimeout(resetPreloading, 2500);

                    addClass(elem, lazySizesConfig.loadingClass);
                    addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }

                if(isPicture){
                    forEach.call(parent.getElementsByTagName('source'), handleSources);
                }

                if(srcset){
                    elem.setAttribute('srcset', srcset);
                } else if(src && !isPicture){
                    if(regIframe.test(elem.nodeName)){
                        changeIframeSrc(elem, src);
                    } else {
                        elem.src = src;
                    }
                }

                if(isImg && (srcset || isPicture)){
                    updatePolyfill(elem, {src: src});
                }
            }

            if(elem._lazyRace){
                delete elem._lazyRace;
            }
            removeClass(elem, lazySizesConfig.lazyClass);

            rAF(function(){
                if( !firesLoad || (elem.complete && elem.naturalWidth > 1)){
                    if(firesLoad){
                        resetPreloading(event);
                    } else {
                        isLoading--;
                    }
                    switchLoadingClass(event);
                }
            }, true);
        });

        var unveilElement = function (elem){
            var detail;

            var isImg = regImg.test(elem.nodeName);

            //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
            var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
            var isAuto = sizes == 'auto';

            if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass)){return;}

            detail = triggerEvent(elem, 'lazyunveilread').detail;

            if(isAuto){
                 autoSizer.updateElem(elem, true, elem.offsetWidth);
            }

            elem._lazyRace = true;
            isLoading++;

            lazyUnveil(elem, detail, isAuto, sizes, isImg);
        };

        var onload = function(){
            if(isCompleted){return;}
            if(Date.now() - started < 999){
                setTimeout(onload, 999);
                return;
            }
            var afterScroll = debounce(function(){
                lazySizesConfig.loadMode = 3;
                throttledCheckElements();
            });

            isCompleted = true;

            lazySizesConfig.loadMode = 3;

            throttledCheckElements();

            addEventListener('scroll', function(){
                if(lazySizesConfig.loadMode == 3){
                    lazySizesConfig.loadMode = 2;
                }
                afterScroll();
            }, true);
        };

        return {
            _: function(){
                started = Date.now();

                lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass);
                preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
                hFac = lazySizesConfig.hFac;

                addEventListener('scroll', throttledCheckElements, true);

                addEventListener('resize', throttledCheckElements, true);

                if(window.MutationObserver){
                    new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
                } else {
                    docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
                    docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
                    setInterval(throttledCheckElements, 999);
                }

                addEventListener('hashchange', throttledCheckElements, true);

                //, 'fullscreenchange'
                ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
                    document[_addEventListener](name, throttledCheckElements, true);
                });

                if((/d$|^c/.test(document.readyState))){
                    onload();
                } else {
                    addEventListener('load', onload);
                    document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
                    setTimeout(onload, 20000);
                }

                if(lazyloadElems.length){
                    checkElements();
                    rAF._lsFlush();
                } else {
                    throttledCheckElements();
                }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement
        };
    })();


    var autoSizer = (function(){
        var autosizesElems;

        var sizeElement = rAFIt(function(elem, parent, event, width){
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += 'px';

            elem.setAttribute('sizes', width);

            if(regPicture.test(parent.nodeName || '')){
                sources = parent.getElementsByTagName('source');
                for(i = 0, len = sources.length; i < len; i++){
                    sources[i].setAttribute('sizes', width);
                }
            }

            if(!event.detail.dataAttr){
                updatePolyfill(elem, event.detail);
            }
        });
        var getSizeElement = function (elem, dataAttr, width){
            var event;
            var parent = elem.parentNode;

            if(parent){
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

                if(!event.defaultPrevented){
                    width = event.detail.width;

                    if(width && width !== elem._lazysizesWidth){
                        sizeElement(elem, parent, event, width);
                    }
                }
            }
        };

        var updateElementsSizes = function(){
            var i;
            var len = autosizesElems.length;
            if(len){
                i = 0;

                for(; i < len; i++){
                    getSizeElement(autosizesElems[i]);
                }
            }
        };

        var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

        return {
            _: function(){
                autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
                addEventListener('resize', debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
        };
    })();

    var init = function(){
        if(!init.i){
            init.i = true;
            autoSizer._();
            loader._();
        }
    };

    (function(){
        var prop;

        var lazySizesDefaults = {
            lazyClass: 'lazyload',
            loadedClass: 'lazyloaded',
            loadingClass: 'lazyloading',
            preloadClass: 'lazypreload',
            errorClass: 'lazyerror',
            //strictClass: 'lazystrict',
            autosizesClass: 'lazyautosizes',
            srcAttr: 'data-src',
            srcsetAttr: 'data-srcset',
            sizesAttr: 'data-sizes',
            //preloadAfterLoad: false,
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
        };

        lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

        for(prop in lazySizesDefaults){
            if(!(prop in lazySizesConfig)){
                lazySizesConfig[prop] = lazySizesDefaults[prop];
            }
        }

        window.lazySizesConfig = lazySizesConfig;

        setTimeout(function(){
            if(lazySizesConfig.init){
                init();
            }
        });
    })();

    lazysizes = {
        cfg: lazySizesConfig,
        autoSizer: autoSizer,
        loader: loader,
        init: init,
        uP: updatePolyfill,
        aC: addClass,
        rC: removeClass,
        hC: hasClass,
        fire: triggerEvent,
        gW: getWidth,
        rAF: rAF,
    };

    return lazysizes;
}
));
/*! lightgallery - v1.4.0 - 2017-06-04
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2017 Sachin N; Licensed GPLv3 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(['jquery'], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    factory(root["jQuery"]);
  }
}(this, function ($) {

(function() {
    'use strict';

    var defaults = {

        mode: 'lg-slide',

        // Ex : 'ease'
        cssEasing: 'ease',

        //'for jquery animation'
        easing: 'linear',
        speed: 600,
        height: '100%',
        width: '100%',
        addClass: '',
        startClass: 'lg-start-zoom',
        backdropDuration: 150,
        hideBarsDelay: 6000,

        useLeft: false,

        closable: true,
        loop: true,
        escKey: true,
        keyPress: true,
        controls: true,
        slideEndAnimatoin: true,
        hideControlOnEnd: false,
        mousewheel: true,

        getCaptionFromTitleOrAlt: true,

        // .lg-item || '.lg-sub-html'
        appendSubHtmlTo: '.lg-sub-html',

        subHtmlSelectorRelative: false,

        /**
         * @desc number of preload slides
         * will exicute only after the current slide is fully loaded.
         *
         * @ex you clicked on 4th image and if preload = 1 then 3rd slide and 5th
         * slide will be loaded in the background after the 4th slide is fully loaded..
         * if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
         *
         */
        preload: 1,
        showAfterLoad: true,
        selector: '',
        selectWithin: '',
        nextHtml: '',
        prevHtml: '',

        // 0, 1
        index: false,

        iframeMaxWidth: '100%',

        download: true,
        counter: true,
        appendCounterTo: '.lg-toolbar',

        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,

        dynamic: false,
        dynamicEl: [],
        galleryId: 1
    };

    function Plugin(element, options) {

        // Current lightGallery element
        this.el = element;

        // Current jquery element
        this.$el = $(element);

        // lightGallery settings
        this.s = $.extend({}, defaults, options);

        // When using dynamic mode, ensure dynamicEl is an array
        if (this.s.dynamic && this.s.dynamicEl !== 'undefined' && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) {
            throw ('When using dynamic mode, you must also define dynamicEl as an Array.');
        }

        // lightGallery modules
        this.modules = {};

        // false when lightgallery complete first slide;
        this.lGalleryOn = false;

        this.lgBusy = false;

        // Timeout function for hiding controls;
        this.hideBartimeout = false;

        // To determine browser supports for touch events;
        this.isTouch = ('ontouchstart' in document.documentElement);

        // Disable hideControlOnEnd if sildeEndAnimation is true
        if (this.s.slideEndAnimatoin) {
            this.s.hideControlOnEnd = false;
        }

        // Gallery items
        if (this.s.dynamic) {
            this.$items = this.s.dynamicEl;
        } else {
            if (this.s.selector === 'this') {
                this.$items = this.$el;
            } else if (this.s.selector !== '') {
                if (this.s.selectWithin) {
                    this.$items = $(this.s.selectWithin).find(this.s.selector);
                } else {
                    this.$items = this.$el.find($(this.s.selector));
                }
            } else {
                this.$items = this.$el.children();
            }
        }

        // .lg-item
        this.$slide = '';

        // .lg-outer
        this.$outer = '';

        this.init();

        return this;
    }

    Plugin.prototype.init = function() {

        var _this = this;

        // s.preload should not be more than $item.length
        if (_this.s.preload > _this.$items.length) {
            _this.s.preload = _this.$items.length;
        }

        // if dynamic option is enabled execute immediately
        var _hash = window.location.hash;
        if (_hash.indexOf('lg=' + this.s.galleryId) > 0) {

            _this.index = parseInt(_hash.split('&slide=')[1], 10);

            $('body').addClass('lg-from-hash');
            if (!$('body').hasClass('lg-on')) {
                setTimeout(function() {
                    _this.build(_this.index);
                });

                $('body').addClass('lg-on');
            }
        }

        if (_this.s.dynamic) {

            _this.$el.trigger('onBeforeOpen.lg');

            _this.index = _this.s.index || 0;

            // prevent accidental double execution
            if (!$('body').hasClass('lg-on')) {
                setTimeout(function() {
                    _this.build(_this.index);
                    $('body').addClass('lg-on');
                });
            }
        } else {

            // Using different namespace for click because click event should not unbind if selector is same object('this')
            _this.$items.on('click.lgcustom', function(event) {

                // For IE8
                try {
                    event.preventDefault();
                    event.preventDefault();
                } catch (er) {
                    event.returnValue = false;
                }

                _this.$el.trigger('onBeforeOpen.lg');

                _this.index = _this.s.index || _this.$items.index(this);

                // prevent accidental double execution
                if (!$('body').hasClass('lg-on')) {
                    _this.build(_this.index);
                    $('body').addClass('lg-on');
                }
            });
        }

    };

    Plugin.prototype.build = function(index) {

        var _this = this;

        _this.structure();

        // module constructor
        $.each($.fn.lightGallery.modules, function(key) {
            _this.modules[key] = new $.fn.lightGallery.modules[key](_this.el);
        });

        // initiate slide function
        _this.slide(index, false, false, false);

        if (_this.s.keyPress) {
            _this.keyPress();
        }

        if (_this.$items.length > 1) {

            _this.arrow();

            setTimeout(function() {
                _this.enableDrag();
                _this.enableSwipe();
            }, 50);

            if (_this.s.mousewheel) {
                _this.mousewheel();
            }
        } else {
            _this.$slide.on('click.lg', function() {
                _this.$el.trigger('onSlideClick.lg');
            });
        }

        _this.counter();

        _this.closeGallery();

        _this.$el.trigger('onAfterOpen.lg');

        // Hide controllers if mouse doesn't move for some period
        _this.$outer.on('mousemove.lg click.lg touchstart.lg', function() {

            _this.$outer.removeClass('lg-hide-items');

            clearTimeout(_this.hideBartimeout);

            // Timeout will be cleared on each slide movement also
            _this.hideBartimeout = setTimeout(function() {
                _this.$outer.addClass('lg-hide-items');
            }, _this.s.hideBarsDelay);

        });

        _this.$outer.trigger('mousemove.lg');

    };

    Plugin.prototype.structure = function() {
        var list = '';
        var controls = '';
        var i = 0;
        var subHtmlCont = '';
        var template;
        var _this = this;

        $('body').append('<div class="lg-backdrop"></div>');
        $('.lg-backdrop').css('transition-duration', this.s.backdropDuration + 'ms');

        // Create gallery items
        for (i = 0; i < this.$items.length; i++) {
            list += '<div class="lg-item"></div>';
        }

        // Create controlls
        if (this.s.controls && this.$items.length > 1) {
            controls = '<div class="lg-actions">' +
                '<button class="lg-prev lg-icon">' + this.s.prevHtml + '</button>' +
                '<button class="lg-next lg-icon">' + this.s.nextHtml + '</button>' +
                '</div>';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            subHtmlCont = '<div class="lg-sub-html"></div>';
        }

        template = '<div class="lg-outer ' + this.s.addClass + ' ' + this.s.startClass + '">' +
            '<div class="lg" style="width:' + this.s.width + '; height:' + this.s.height + '">' +
            '<div class="lg-inner">' + list + '</div>' +
            '<div class="lg-toolbar lg-group">' +
            '<span class="lg-close lg-icon"></span>' +
            '</div>' +
            controls +
            subHtmlCont +
            '</div>' +
            '</div>';

        $('body').append(template);
        this.$outer = $('.lg-outer');
        this.$slide = this.$outer.find('.lg-item');

        if (this.s.useLeft) {
            this.$outer.addClass('lg-use-left');

            // Set mode lg-slide if use left is true;
            this.s.mode = 'lg-slide';
        } else {
            this.$outer.addClass('lg-use-css3');
        }

        // For fixed height gallery
        _this.setTop();
        $(window).on('resize.lg orientationchange.lg', function() {
            setTimeout(function() {
                _this.setTop();
            }, 100);
        });

        // add class lg-current to remove initial transition
        this.$slide.eq(this.index).addClass('lg-current');

        // add Class for css support and transition mode
        if (this.doCss()) {
            this.$outer.addClass('lg-css3');
        } else {
            this.$outer.addClass('lg-css');

            // Set speed 0 because no animation will happen if browser doesn't support css3
            this.s.speed = 0;
        }

        this.$outer.addClass(this.s.mode);

        if (this.s.enableDrag && this.$items.length > 1) {
            this.$outer.addClass('lg-grab');
        }

        if (this.s.showAfterLoad) {
            this.$outer.addClass('lg-show-after-load');
        }

        if (this.doCss()) {
            var $inner = this.$outer.find('.lg-inner');
            $inner.css('transition-timing-function', this.s.cssEasing);
            $inner.css('transition-duration', this.s.speed + 'ms');
        }

        setTimeout(function() {
            $('.lg-backdrop').addClass('in');
        });

        setTimeout(function() {
            _this.$outer.addClass('lg-visible');
        }, this.s.backdropDuration);

        if (this.s.download) {
            this.$outer.find('.lg-toolbar').append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
        }

        // Store the current scroll top value to scroll back after closing the gallery..
        this.prevScrollTop = $(window).scrollTop();

    };

    // For fixed height gallery
    Plugin.prototype.setTop = function() {
        if (this.s.height !== '100%') {
            var wH = $(window).height();
            var top = (wH - parseInt(this.s.height, 10)) / 2;
            var $lGallery = this.$outer.find('.lg');
            if (wH >= parseInt(this.s.height, 10)) {
                $lGallery.css('top', top + 'px');
            } else {
                $lGallery.css('top', '0px');
            }
        }
    };

    // Find css3 support
    Plugin.prototype.doCss = function() {
        // check for css animation support
        var support = function() {
            var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
            var root = document.documentElement;
            var i = 0;
            for (i = 0; i < transition.length; i++) {
                if (transition[i] in root.style) {
                    return true;
                }
            }
        };

        if (support()) {
            return true;
        }

        return false;
    };

    /**
     *  @desc Check the given src is video
     *  @param {String} src
     *  @return {Object} video type
     *  Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     */
    Plugin.prototype.isVideo = function(src, index) {

        var html;
        if (this.s.dynamic) {
            html = this.s.dynamicEl[index].html;
        } else {
            html = this.$items.eq(index).attr('data-html');
        }

        if (!src) {
            if(html) {
                return {
                    html5: true
                };
            } else {
                console.error('lightGallery :- data-src is not pvovided on slide item ' + (index + 1) + '. Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html');
                return false;
            }
        }

        var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);
        var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        var dailymotion = src.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
        var vk = src.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);

        if (youtube) {
            return {
                youtube: youtube
            };
        } else if (vimeo) {
            return {
                vimeo: vimeo
            };
        } else if (dailymotion) {
            return {
                dailymotion: dailymotion
            };
        } else if (vk) {
            return {
                vk: vk
            };
        }
    };

    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    Plugin.prototype.counter = function() {
        if (this.s.counter) {
            $(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + '</span></div>');
        }
    };

    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.addHtml = function(index) {
        var subHtml = null;
        var subHtmlUrl;
        var $currentEle;
        if (this.s.dynamic) {
            if (this.s.dynamicEl[index].subHtmlUrl) {
                subHtmlUrl = this.s.dynamicEl[index].subHtmlUrl;
            } else {
                subHtml = this.s.dynamicEl[index].subHtml;
            }
        } else {
            $currentEle = this.$items.eq(index);
            if ($currentEle.attr('data-sub-html-url')) {
                subHtmlUrl = $currentEle.attr('data-sub-html-url');
            } else {
                subHtml = $currentEle.attr('data-sub-html');
                if (this.s.getCaptionFromTitleOrAlt && !subHtml) {
                    subHtml = $currentEle.attr('title') || $currentEle.find('img').first().attr('alt');
                }
            }
        }

        if (!subHtmlUrl) {
            if (typeof subHtml !== 'undefined' && subHtml !== null) {

                // get first letter of subhtml
                // if first letter starts with . or # get the html form the jQuery object
                var fL = subHtml.substring(0, 1);
                if (fL === '.' || fL === '#') {
                    if (this.s.subHtmlSelectorRelative && !this.s.dynamic) {
                        subHtml = $currentEle.find(subHtml).html();
                    } else {
                        subHtml = $(subHtml).html();
                    }
                }
            } else {
                subHtml = '';
            }
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {

            if (subHtmlUrl) {
                this.$outer.find(this.s.appendSubHtmlTo).load(subHtmlUrl);
            } else {
                this.$outer.find(this.s.appendSubHtmlTo).html(subHtml);
            }

        } else {

            if (subHtmlUrl) {
                this.$slide.eq(index).load(subHtmlUrl);
            } else {
                this.$slide.eq(index).append(subHtml);
            }
        }

        // Add lg-empty-html class if title doesn't exist
        if (typeof subHtml !== 'undefined' && subHtml !== null) {
            if (subHtml === '') {
                this.$outer.find(this.s.appendSubHtmlTo).addClass('lg-empty-html');
            } else {
                this.$outer.find(this.s.appendSubHtmlTo).removeClass('lg-empty-html');
            }
        }

        this.$el.trigger('onAfterAppendSubHtml.lg', [index]);
    };

    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.preload = function(index) {
        var i = 1;
        var j = 1;
        for (i = 1; i <= this.s.preload; i++) {
            if (i >= this.$items.length - index) {
                break;
            }

            this.loadContent(index + i, false, 0);
        }

        for (j = 1; j <= this.s.preload; j++) {
            if (index - j < 0) {
                break;
            }

            this.loadContent(index - j, false, 0);
        }
    };

    /**
     *  @desc Load slide content into slide.
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     *  @param {Boolean} delay - delay for adding complete class. it is 0 except first time.
     */
    Plugin.prototype.loadContent = function(index, rec, delay) {

        var _this = this;
        var _hasPoster = false;
        var _$img;
        var _src;
        var _poster;
        var _srcset;
        var _sizes;
        var _html;
        var getResponsiveSrc = function(srcItms) {
            var rsWidth = [];
            var rsSrc = [];
            for (var i = 0; i < srcItms.length; i++) {
                var __src = srcItms[i].split(' ');

                // Manage empty space
                if (__src[0] === '') {
                    __src.splice(0, 1);
                }

                rsSrc.push(__src[0]);
                rsWidth.push(__src[1]);
            }

            var wWidth = $(window).width();
            for (var j = 0; j < rsWidth.length; j++) {
                if (parseInt(rsWidth[j], 10) > wWidth) {
                    _src = rsSrc[j];
                    break;
                }
            }
        };

        if (_this.s.dynamic) {

            if (_this.s.dynamicEl[index].poster) {
                _hasPoster = true;
                _poster = _this.s.dynamicEl[index].poster;
            }

            _html = _this.s.dynamicEl[index].html;
            _src = _this.s.dynamicEl[index].src;

            if (_this.s.dynamicEl[index].responsive) {
                var srcDyItms = _this.s.dynamicEl[index].responsive.split(',');
                getResponsiveSrc(srcDyItms);
            }

            _srcset = _this.s.dynamicEl[index].srcset;
            _sizes = _this.s.dynamicEl[index].sizes;

        } else {

            if (_this.$items.eq(index).attr('data-poster')) {
                _hasPoster = true;
                _poster = _this.$items.eq(index).attr('data-poster');
            }

            _html = _this.$items.eq(index).attr('data-html');
            _src = _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src');

            if (_this.$items.eq(index).attr('data-responsive')) {
                var srcItms = _this.$items.eq(index).attr('data-responsive').split(',');
                getResponsiveSrc(srcItms);
            }

            _srcset = _this.$items.eq(index).attr('data-srcset');
            _sizes = _this.$items.eq(index).attr('data-sizes');

        }

        //if (_src || _srcset || _sizes || _poster) {

        var iframe = false;
        if (_this.s.dynamic) {
            if (_this.s.dynamicEl[index].iframe) {
                iframe = true;
            }
        } else {
            if (_this.$items.eq(index).attr('data-iframe') === 'true') {
                iframe = true;
            }
        }

        var _isVideo = _this.isVideo(_src, index);
        if (!_this.$slide.eq(index).hasClass('lg-loaded')) {
            if (iframe) {
                _this.$slide.eq(index).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>');
            } else if (_hasPoster) {
                var videoClass = '';
                if (_isVideo && _isVideo.youtube) {
                    videoClass = 'lg-has-youtube';
                } else if (_isVideo && _isVideo.vimeo) {
                    videoClass = 'lg-has-vimeo';
                } else {
                    videoClass = 'lg-has-html5';
                }

                _this.$slide.eq(index).prepend('<div class="lg-video-cont ' + videoClass + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + _poster + '" /></div></div>');

            } else if (_isVideo) {
                _this.$slide.eq(index).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>');
                _this.$el.trigger('hasVideo.lg', [index, _src, _html]);
            } else {
                _this.$slide.eq(index).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + _src + '" /></div>');
            }

            _this.$el.trigger('onAferAppendSlide.lg', [index]);

            _$img = _this.$slide.eq(index).find('.lg-object');
            if (_sizes) {
                _$img.attr('sizes', _sizes);
            }

            if (_srcset) {
                _$img.attr('srcset', _srcset);
                try {
                    picturefill({
                        elements: [_$img[0]]
                    });
                } catch (e) {
                    console.warn('lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.');
                }
            }

            if (this.s.appendSubHtmlTo !== '.lg-sub-html') {
                _this.addHtml(index);
            }

            _this.$slide.eq(index).addClass('lg-loaded');
        }

        _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {

            // For first time add some delay for displaying the start animation.
            var _speed = 0;

            // Do not change the delay value because it is required for zoom plugin.
            // If gallery opened from direct url (hash) speed value should be 0
            if (delay && !$('body').hasClass('lg-from-hash')) {
                _speed = delay;
            }

            setTimeout(function() {
                _this.$slide.eq(index).addClass('lg-complete');
                _this.$el.trigger('onSlideItemLoad.lg', [index, delay || 0]);
            }, _speed);

        });

        // @todo check load state for html5 videos
        if (_isVideo && _isVideo.html5 && !_hasPoster) {
            _this.$slide.eq(index).addClass('lg-complete');
        }

        if (rec === true) {
            if (!_this.$slide.eq(index).hasClass('lg-complete')) {
                _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {
                    _this.preload(index);
                });
            } else {
                _this.preload(index);
            }
        }

        //}
    };

    /**
    *   @desc slide function for lightgallery
        ** Slide() gets call on start
        ** ** Set lg.on true once slide() function gets called.
        ** Call loadContent() on slide() function inside setTimeout
        ** ** On first slide we do not want any animation like slide of fade
        ** ** So on first slide( if lg.on if false that is first slide) loadContent() should start loading immediately
        ** ** Else loadContent() should wait for the transition to complete.
        ** ** So set timeout s.speed + 50
    <=> ** loadContent() will load slide content in to the particular slide
        ** ** It has recursion (rec) parameter. if rec === true loadContent() will call preload() function.
        ** ** preload will execute only when the previous slide is fully loaded (images iframe)
        ** ** avoid simultaneous image load
    <=> ** Preload() will check for s.preload value and call loadContent() again accoring to preload value
        ** loadContent()  <====> Preload();

    *   @param {Number} index - index of the slide
    *   @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
    *   @param {Boolean} fromThumb - true if slide function called via thumbnail click
    *   @param {String} direction - Direction of the slide(next/prev)
    */
    Plugin.prototype.slide = function(index, fromTouch, fromThumb, direction) {

        var _prevIndex = this.$outer.find('.lg-current').index();
        var _this = this;

        // Prevent if multiple call
        // Required for hsh plugin
        if (_this.lGalleryOn && (_prevIndex === index)) {
            return;
        }

        var _length = this.$slide.length;
        var _time = _this.lGalleryOn ? this.s.speed : 0;

        if (!_this.lgBusy) {

            if (this.s.download) {
                var _src;
                if (_this.s.dynamic) {
                    _src = _this.s.dynamicEl[index].downloadUrl !== false && (_this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src);
                } else {
                    _src = _this.$items.eq(index).attr('data-download-url') !== 'false' && (_this.$items.eq(index).attr('data-download-url') || _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src'));

                }

                if (_src) {
                    $('#lg-download').attr('href', _src);
                    _this.$outer.removeClass('lg-hide-download');
                } else {
                    _this.$outer.addClass('lg-hide-download');
                }
            }

            this.$el.trigger('onBeforeSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);

            _this.lgBusy = true;

            clearTimeout(_this.hideBartimeout);

            // Add title if this.s.appendSubHtmlTo === lg-sub-html
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {

                // wait for slide animation to complete
                setTimeout(function() {
                    _this.addHtml(index);
                }, _time);
            }

            this.arrowDisable(index);

            if (!direction) {
                if (index < _prevIndex) {
                    direction = 'prev';
                } else if (index > _prevIndex) {
                    direction = 'next';
                }
            }

            if (!fromTouch) {

                // remove all transitions
                _this.$outer.addClass('lg-no-trans');

                this.$slide.removeClass('lg-prev-slide lg-next-slide');

                if (direction === 'prev') {

                    //prevslide
                    this.$slide.eq(index).addClass('lg-prev-slide');
                    this.$slide.eq(_prevIndex).addClass('lg-next-slide');
                } else {

                    // next slide
                    this.$slide.eq(index).addClass('lg-next-slide');
                    this.$slide.eq(_prevIndex).addClass('lg-prev-slide');
                }

                // give 50 ms for browser to add/remove class
                setTimeout(function() {
                    _this.$slide.removeClass('lg-current');

                    //_this.$slide.eq(_prevIndex).removeClass('lg-current');
                    _this.$slide.eq(index).addClass('lg-current');

                    // reset all transitions
                    _this.$outer.removeClass('lg-no-trans');
                }, 50);
            } else {

                this.$slide.removeClass('lg-prev-slide lg-current lg-next-slide');
                var touchPrev;
                var touchNext;
                if (_length > 2) {
                    touchPrev = index - 1;
                    touchNext = index + 1;

                    if ((index === 0) && (_prevIndex === _length - 1)) {

                        // next slide
                        touchNext = 0;
                        touchPrev = _length - 1;
                    } else if ((index === _length - 1) && (_prevIndex === 0)) {

                        // prev slide
                        touchNext = 0;
                        touchPrev = _length - 1;
                    }

                } else {
                    touchPrev = 0;
                    touchNext = 1;
                }

                if (direction === 'prev') {
                    _this.$slide.eq(touchNext).addClass('lg-next-slide');
                } else {
                    _this.$slide.eq(touchPrev).addClass('lg-prev-slide');
                }

                _this.$slide.eq(index).addClass('lg-current');
            }

            if (_this.lGalleryOn) {
                setTimeout(function() {
                    _this.loadContent(index, true, 0);
                }, this.s.speed + 50);

                setTimeout(function() {
                    _this.lgBusy = false;
                    _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
                }, this.s.speed);

            } else {
                _this.loadContent(index, true, _this.s.backdropDuration);

                _this.lgBusy = false;
                _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
            }

            _this.lGalleryOn = true;

            if (this.s.counter) {
                $('#lg-counter-current').text(index + 1);
            }

        }

    };

    /**
     *  @desc Go to next slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToNextSlide = function(fromTouch) {
        var _this = this;
        var _loop = _this.s.loop;
        if (fromTouch && _this.$slide.length < 3) {
            _loop = false;
        }

        if (!_this.lgBusy) {
            if ((_this.index + 1) < _this.$slide.length) {
                _this.index++;
                _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                _this.slide(_this.index, fromTouch, false, 'next');
            } else {
                if (_loop) {
                    _this.index = 0;
                    _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                    _this.slide(_this.index, fromTouch, false, 'next');
                } else if (_this.s.slideEndAnimatoin && !fromTouch) {
                    _this.$outer.addClass('lg-right-end');
                    setTimeout(function() {
                        _this.$outer.removeClass('lg-right-end');
                    }, 400);
                }
            }
        }
    };

    /**
     *  @desc Go to previous slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToPrevSlide = function(fromTouch) {
        var _this = this;
        var _loop = _this.s.loop;
        if (fromTouch && _this.$slide.length < 3) {
            _loop = false;
        }

        if (!_this.lgBusy) {
            if (_this.index > 0) {
                _this.index--;
                _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                _this.slide(_this.index, fromTouch, false, 'prev');
            } else {
                if (_loop) {
                    _this.index = _this.$items.length - 1;
                    _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                    _this.slide(_this.index, fromTouch, false, 'prev');
                } else if (_this.s.slideEndAnimatoin && !fromTouch) {
                    _this.$outer.addClass('lg-left-end');
                    setTimeout(function() {
                        _this.$outer.removeClass('lg-left-end');
                    }, 400);
                }
            }
        }
    };

    Plugin.prototype.keyPress = function() {
        var _this = this;
        if (this.$items.length > 1) {
            $(window).on('keyup.lg', function(e) {
                if (_this.$items.length > 1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        _this.goToPrevSlide();
                    }

                    if (e.keyCode === 39) {
                        e.preventDefault();
                        _this.goToNextSlide();
                    }
                }
            });
        }

        $(window).on('keydown.lg', function(e) {
            if (_this.s.escKey === true && e.keyCode === 27) {
                e.preventDefault();
                if (!_this.$outer.hasClass('lg-thumb-open')) {
                    _this.destroy();
                } else {
                    _this.$outer.removeClass('lg-thumb-open');
                }
            }
        });
    };

    Plugin.prototype.arrow = function() {
        var _this = this;
        this.$outer.find('.lg-prev').on('click.lg', function() {
            _this.goToPrevSlide();
        });

        this.$outer.find('.lg-next').on('click.lg', function() {
            _this.goToNextSlide();
        });
    };

    Plugin.prototype.arrowDisable = function(index) {

        // Disable arrows if s.hideControlOnEnd is true
        if (!this.s.loop && this.s.hideControlOnEnd) {
            if ((index + 1) < this.$slide.length) {
                this.$outer.find('.lg-next').removeAttr('disabled').removeClass('disabled');
            } else {
                this.$outer.find('.lg-next').attr('disabled', 'disabled').addClass('disabled');
            }

            if (index > 0) {
                this.$outer.find('.lg-prev').removeAttr('disabled').removeClass('disabled');
            } else {
                this.$outer.find('.lg-prev').attr('disabled', 'disabled').addClass('disabled');
            }
        }
    };

    Plugin.prototype.setTranslate = function($el, xValue, yValue) {
        // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
        if (this.s.useLeft) {
            $el.css('left', xValue);
        } else {
            $el.css({
                transform: 'translate3d(' + (xValue) + 'px, ' + yValue + 'px, 0px)'
            });
        }
    };

    Plugin.prototype.touchMove = function(startCoords, endCoords) {

        var distance = endCoords - startCoords;

        if (Math.abs(distance) > 15) {
            // reset opacity and transition duration
            this.$outer.addClass('lg-dragging');

            // move current slide
            this.setTranslate(this.$slide.eq(this.index), distance, 0);

            // move next and prev slide with current slide
            this.setTranslate($('.lg-prev-slide'), -this.$slide.eq(this.index).width() + distance, 0);
            this.setTranslate($('.lg-next-slide'), this.$slide.eq(this.index).width() + distance, 0);
        }
    };

    Plugin.prototype.touchEnd = function(distance) {
        var _this = this;

        // keep slide animation for any mode while dragg/swipe
        if (_this.s.mode !== 'lg-slide') {
            _this.$outer.addClass('lg-slide');
        }

        this.$slide.not('.lg-current, .lg-prev-slide, .lg-next-slide').css('opacity', '0');

        // set transition duration
        setTimeout(function() {
            _this.$outer.removeClass('lg-dragging');
            if ((distance < 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                _this.goToNextSlide(true);
            } else if ((distance > 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                _this.goToPrevSlide(true);
            } else if (Math.abs(distance) < 5) {

                // Trigger click if distance is less than 5 pix
                _this.$el.trigger('onSlideClick.lg');
            }

            _this.$slide.removeAttr('style');
        });

        // remove slide class once drag/swipe is completed if mode is not slide
        setTimeout(function() {
            if (!_this.$outer.hasClass('lg-dragging') && _this.s.mode !== 'lg-slide') {
                _this.$outer.removeClass('lg-slide');
            }
        }, _this.s.speed + 100);

    };

    Plugin.prototype.enableSwipe = function() {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isMoved = false;

        if (_this.s.enableSwipe && _this.isTouch && _this.doCss()) {

            _this.$slide.on('touchstart.lg', function(e) {
                if (!_this.$outer.hasClass('lg-zoomed') && !_this.lgBusy) {
                    e.preventDefault();
                    _this.manageSwipeClass();
                    startCoords = e.originalEvent.targetTouches[0].pageX;
                }
            });

            _this.$slide.on('touchmove.lg', function(e) {
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    e.preventDefault();
                    endCoords = e.originalEvent.targetTouches[0].pageX;
                    _this.touchMove(startCoords, endCoords);
                    isMoved = true;
                }
            });

            _this.$slide.on('touchend.lg', function() {
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    if (isMoved) {
                        isMoved = false;
                        _this.touchEnd(endCoords - startCoords);
                    } else {
                        _this.$el.trigger('onSlideClick.lg');
                    }
                }
            });
        }

    };

    Plugin.prototype.enableDrag = function() {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isDraging = false;
        var isMoved = false;
        if (_this.s.enableDrag && !_this.isTouch && _this.doCss()) {
            _this.$slide.on('mousedown.lg', function(e) {
                // execute only on .lg-object
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    if ($(e.target).hasClass('lg-object') || $(e.target).hasClass('lg-video-play')) {
                        e.preventDefault();

                        if (!_this.lgBusy) {
                            _this.manageSwipeClass();
                            startCoords = e.pageX;
                            isDraging = true;

                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            _this.$outer.scrollLeft += 1;
                            _this.$outer.scrollLeft -= 1;

                            // *

                            _this.$outer.removeClass('lg-grab').addClass('lg-grabbing');

                            _this.$el.trigger('onDragstart.lg');
                        }

                    }
                }
            });

            $(window).on('mousemove.lg', function(e) {
                if (isDraging) {
                    isMoved = true;
                    endCoords = e.pageX;
                    _this.touchMove(startCoords, endCoords);
                    _this.$el.trigger('onDragmove.lg');
                }
            });

            $(window).on('mouseup.lg', function(e) {
                if (isMoved) {
                    isMoved = false;
                    _this.touchEnd(endCoords - startCoords);
                    _this.$el.trigger('onDragend.lg');
                } else if ($(e.target).hasClass('lg-object') || $(e.target).hasClass('lg-video-play')) {
                    _this.$el.trigger('onSlideClick.lg');
                }

                // Prevent execution on click
                if (isDraging) {
                    isDraging = false;
                    _this.$outer.removeClass('lg-grabbing').addClass('lg-grab');
                }
            });

        }
    };

    Plugin.prototype.manageSwipeClass = function() {
        var _touchNext = this.index + 1;
        var _touchPrev = this.index - 1;
        if (this.s.loop && this.$slide.length > 2) {
            if (this.index === 0) {
                _touchPrev = this.$slide.length - 1;
            } else if (this.index === this.$slide.length - 1) {
                _touchNext = 0;
            }
        }

        this.$slide.removeClass('lg-next-slide lg-prev-slide');
        if (_touchPrev > -1) {
            this.$slide.eq(_touchPrev).addClass('lg-prev-slide');
        }

        this.$slide.eq(_touchNext).addClass('lg-next-slide');
    };

    Plugin.prototype.mousewheel = function() {
        var _this = this;
        _this.$outer.on('mousewheel.lg', function(e) {

            if (!e.deltaY) {
                return;
            }

            if (e.deltaY > 0) {
                _this.goToPrevSlide();
            } else {
                _this.goToNextSlide();
            }

            e.preventDefault();
        });

    };

    Plugin.prototype.closeGallery = function() {

        var _this = this;
        var mousedown = false;
        this.$outer.find('.lg-close').on('click.lg', function() {
            _this.destroy();
        });

        if (_this.s.closable) {

            // If you drag the slide and release outside gallery gets close on chrome
            // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
            _this.$outer.on('mousedown.lg', function(e) {

                if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap')) {
                    mousedown = true;
                } else {
                    mousedown = false;
                }

            });

            _this.$outer.on('mouseup.lg', function(e) {

                if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap') && mousedown) {
                    if (!_this.$outer.hasClass('lg-dragging')) {
                        _this.destroy();
                    }
                }

            });

        }

    };

    Plugin.prototype.destroy = function(d) {

        var _this = this;

        if (!d) {
            _this.$el.trigger('onBeforeClose.lg');
            $(window).scrollTop(_this.prevScrollTop);
        }


        /**
         * if d is false or undefined destroy will only close the gallery
         * plugins instance remains with the element
         *
         * if d is true destroy will completely remove the plugin
         */

        if (d) {
            if (!_this.s.dynamic) {
                // only when not using dynamic mode is $items a jquery collection
                this.$items.off('click.lg click.lgcustom');
            }

            $.removeData(_this.el, 'lightGallery');
        }

        // Unbind all events added by lightGallery
        this.$el.off('.lg.tm');

        // Distroy all lightGallery modules
        $.each($.fn.lightGallery.modules, function(key) {
            if (_this.modules[key]) {
                _this.modules[key].destroy();
            }
        });

        this.lGalleryOn = false;

        clearTimeout(_this.hideBartimeout);
        this.hideBartimeout = false;
        $(window).off('.lg');
        $('body').removeClass('lg-on lg-from-hash');

        if (_this.$outer) {
            _this.$outer.removeClass('lg-visible');
        }

        $('.lg-backdrop').removeClass('in');

        setTimeout(function() {
            if (_this.$outer) {
                _this.$outer.remove();
            }

            $('.lg-backdrop').remove();

            if (!d) {
                _this.$el.trigger('onCloseAfter.lg');
            }

        }, _this.s.backdropDuration + 50);
    };

    $.fn.lightGallery = function(options) {
        return this.each(function() {
            if (!$.data(this, 'lightGallery')) {
                $.data(this, 'lightGallery', new Plugin(this, options));
            } else {
                try {
                    $(this).data('lightGallery').init();
                } catch (err) {
                    console.error('lightGallery has not initiated properly');
                }
            }
        });
    };

    $.fn.lightGallery.modules = {};

})();


}));
/*! lightslider - v1.1.6 - 2016-10-25
* https://github.com/sachinchoolur/lightslider
* Copyright (c) 2016 Sachin N; Licensed MIT */
(function ($, undefined) {
    'use strict';
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        addClass: '',
        mode: 'slide',
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',
        easing: 'linear', //'for jquery animation',//
        speed: 400, //ms'
        auto: false,
        pauseOnHover: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,
        keyPress: false,
        controls: true,
        prevHtml: '',
        nextHtml: '',
        rtl: false,
        adaptiveHeight: false,
        vertical: false,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',
        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        /* jshint ignore:start */
        onBeforeStart: function ($el) {},
        onSliderLoad: function ($el) {},
        onBeforeSlide: function ($el, scene) {},
        onAfterSlide: function ($el, scene) {},
        onBeforeNextSlide: function ($el, scene) {},
        onBeforePrevSlide: function ($el, scene) {}
        /* jshint ignore:end */
    };
    $.fn.lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).lightSlider(options);
            });
            return this;
        }

        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;

        if (settings.mode === 'fade') {
            settings.vertical = false;
        }
        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = (settings.vertical === true) ? 'height' : 'width',
            gutter = (settings.vertical === true) ? 'margin-bottom' : 'margin-right',
            slideValue = 0,
            pagerWidth = 0,
            slideWidth = 0,
            thumbWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};

        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };

        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };

        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            keyPress: function () {
                if (settings.keyPress) {
                    $(document).on('keyup.lightslider', function (e) {
                        if (!$(':focus').is('input, textarea')) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            if (e.keyCode === 37) {
                                $el.goToPrevSlide();
                            } else if (e.keyCode === 39) {
                                $el.goToNextSlide();
                            }
                        }
                    });
                }
            },
            controls: function () {
                if (settings.controls) {
                    $el.after('<div class="lSAction"><a class="lSPrev">' + settings.prevHtml + '</a><a class="lSNext">' + settings.nextHtml + '</a></div>');
                    if (!settings.autoWidth) {
                        if (length <= settings.item) {
                            $slide.find('.lSAction').hide();
                        }
                    } else {
                        if (refresh.calWidth(false) < elSize) {
                            $slide.find('.lSAction').hide();
                        }
                    }
                    $slide.find('.lSAction a').on('click', function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        if ($(this).attr('class') === 'lSPrev') {
                            $el.goToPrevSlide();
                        } else {
                            $el.goToNextSlide();
                        }
                        return false;
                    });
                }
            },
            initialStyle: function () {
                var $this = this;
                if (settings.mode === 'fade') {
                    settings.autoWidth = false;
                    settings.slideEndAnimation = false;
                }
                if (settings.auto) {
                    settings.slideEndAnimation = false;
                }
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                settings.onBeforeStart.call(this, $el);
                refresh.chbreakpoint();
                $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
                $slide = $el.parent('.lSSlideWrapper');
                if (settings.rtl === true) {
                    $slide.parent().addClass('lSrtl');
                }
                if (settings.vertical) {
                    $slide.parent().addClass('vertical');
                    elSize = settings.verticalHeight;
                    $slide.css('height', elSize + 'px');
                } else {
                    elSize = $el.outerWidth();
                }
                $children.addClass('lslide');
                if (settings.loop === true && settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.clone.left').length) {
                                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.clone.right').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.clone.right').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > ($el.find('.lslide').length - tItem); m--) {
                                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('clone')) {
                                $el.find('.clone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.rtl === true && settings.vertical === false) {
                        gutter = 'margin-left';
                    }
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true && settings.mode === 'slide') {
                        if (on === false) {
                            scene = $el.find('.clone.left').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('usingCss');
                }
                refresh.calL();
                if (settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.sSW();
                    if (settings.loop === true) {
                        slideValue = $this.slideValue();
                        this.move($el, slideValue);
                    }
                    if (settings.vertical === false) {
                        this.setHeight($el, false);
                    }

                } else {
                    this.setHeight($el, true);
                    $el.addClass('lSFade');
                    if (!this.doCss()) {
                        $children.fadeOut(0);
                        $children.eq(scene).fadeIn(0);
                    }
                }
                if (settings.loop === true && settings.mode === 'slide') {
                    $children.eq(scene).addClass('active');
                } else {
                    $children.first().addClass('active');
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    thumbWidth = (elSize - ((settings.thumbItem * (settings.thumbMargin)) - settings.thumbMargin)) / settings.thumbItem;
                    var $children = $slide.find('.lslide');
                    var length = $slide.find('.lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (settings.mode === 'slide') {
                            // calculate scene * slide value
                            if (!settings.autoWidth) {
                                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                            } else {
                                v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                            }
                        }
                        var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');
                        if (settings.gallery === true) {
                            pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
                        } else {
                            pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                        }
                        if (settings.mode === 'slide') {
                            if ((v) >= w - elSize - settings.slideMargin) {
                                i = i + 1;
                                var minPgr = 2;
                                if (settings.autoWidth) {
                                    pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                                    minPgr = 1;
                                }
                                if (i < minPgr) {
                                    pagers = null;
                                    $slide.parent().addClass('noPager');
                                } else {
                                    $slide.parent().removeClass('noPager');
                                }
                                break;
                            }
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.lSPager').html(pagers); 
                    if (settings.gallery === true) {
                        if (settings.vertical === true) {
                            // set Gallery thumbnail width
                            $cSouter.find('.lSPager').css('width', settings.vThumbWidth + 'px');
                        }
                        pagerWidth = (i * (settings.thumbMargin + thumbWidth)) + 0.5;
                        $cSouter.find('.lSPager').css({
                            property: pagerWidth + 'px',
                            'transition-duration': settings.speed + 'ms'
                        });
                        if (settings.vertical === true) {
                            $slide.parent().css('padding-right', (settings.vThumbWidth + settings.galleryMargin) + 'px');
                        }
                        $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
                    }
                    var $pager = $cSouter.find('.lSPager').find('li');
                    $pager.first().addClass('active');
                    $pager.on('click', function () {
                        if (settings.loop === true && settings.mode === 'slide') {
                            scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        if (settings.gallery === true) {
                            $this.slideThumb();
                        }
                        return false;
                    });
                };
                if (settings.pager) {
                    var cl = 'lSpg';
                    if (settings.gallery) {
                        cl = 'lSGallery';
                    }
                    $slide.after('<ul class="lSPager ' + cl + '"></ul>');
                    var gMargin = (settings.vertical) ? 'margin-left' : 'margin-top';
                    $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob, fade) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    if (fade) {
                        tH = 0;
                        tP = ((tHT) * 100) / elSize;
                    }
                    ob.css({
                        'height': tH + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.find('img').length) {
                    if ( obj.find('img')[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }   
                    }else{
                        obj.find('img').on('load', function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                if (this.doCss() && settings.mode === 'fade') {
                    $slide.addClass('on');
                }
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                    }
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true && settings.mode === 'slide') {
                        //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
                        if (t === true) {
                            sc = scene - $el.find('.clone.left').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }

                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                    ob.eq(sc).addClass('active');
                } else {
                    ob.removeClass('active');
                    ob.eq(ob.length - 1).addClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                }
            },
            move: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }
                if (this.doCss()) {
                    if (settings.vertical === true) {
                        ob.css({
                            'transform': 'translate3d(0px, ' + (-v) + 'px, 0px)',
                            '-webkit-transform': 'translate3d(0px, ' + (-v) + 'px, 0px)'
                        });
                    } else {
                        ob.css({
                            'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                            '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        });
                    }
                } else {
                    if (settings.vertical === true) {
                        ob.css('position', 'relative').animate({
                            top: -v + 'px'
                        }, settings.speed, settings.easing);
                    } else {
                        ob.css('position', 'relative').animate({
                            left: -v + 'px'
                        }, settings.speed, settings.easing);
                    }
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            fade: function () {
                this.active($children, false);
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        $this.active($children, false);
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true && settings.mode === 'slide') {
                            if (scene >= (length - ($el.find('.clone.left').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.clone.left').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                $slide.find('.lSAction a').addClass('disabled');
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    $this.active($children, false);
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                        $slide.find('.lSAction a').removeClass('disabled');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            slideThumb: function () {
                var position;
                switch (settings.currentPagerPosition) {
                case 'left':
                    position = 0;
                    break;
                case 'middle':
                    position = (elSize / 2) - (thumbWidth / 2);
                    break;
                case 'right':
                    position = elSize - thumbWidth;
                }
                var sc = scene - $el.find('.clone.left').length;
                var $pager = $slide.parent().find('.lSPager');
                if (settings.mode === 'slide' && settings.loop === true) {
                    if (sc >= $pager.children().length) {
                        sc = 0;
                    } else if (sc < 0) {
                        sc = $pager.children().length;
                    }
                }
                var thumbSlide = sc * ((thumbWidth + settings.thumbMargin)) - (position);
                if ((thumbSlide + elSize) > pagerWidth) {
                    thumbSlide = pagerWidth - elSize - settings.thumbMargin;
                }
                if (thumbSlide < 0) {
                    thumbSlide = 0;
                }
                this.move($pager, thumbSlide);
            },
            auto: function () {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },
            pauseOnHover: function(){
                var $this = this;
                if (settings.auto && settings.pauseOnHover) {
                    $slide.on('mouseenter', function(){
                        $(this).addClass('ls-hover');
                        $el.pause();
                        settings.auto = true;
                    });
                    $slide.on('mouseleave',function(){
                        $(this).removeClass('ls-hover');
                        if (!$slide.find('.lightSlider').hasClass('lsGrabbing')) {
                            $this.auto();
                        }
                    });
                }
            },
            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                if (settings.mode === 'slide') {
                    var distance = endCoords - startCoords;
                    var swipeVal = slideValue - distance;
                    if ((swipeVal) >= w - elSize - settings.slideMargin) {
                        if (settings.freeMove === false) {
                            swipeVal = w - elSize - settings.slideMargin;
                        } else {
                            var swipeValT = w - elSize - settings.slideMargin;
                            swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                        }
                    } else if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0;
                        } else {
                            swipeVal = swipeVal / 5;
                        }
                    }
                    this.move($el, swipeVal);
                }
            },

            touchEnd: function (distance) {
                $slide.css('transition-duration', settings.speed + 'ms');
                if (settings.mode === 'slide') {
                    var mxVal = false;
                    var _next = true;
                    slideValue = slideValue - distance;
                    if ((slideValue) > w - elSize - settings.slideMargin) {
                        slideValue = w - elSize - settings.slideMargin;
                        if (settings.autoWidth === false) {
                            mxVal = true;
                        }
                    } else if (slideValue < 0) {
                        slideValue = 0;
                    }
                    var gC = function (next) {
                        var ad = 0;
                        if (!mxVal) {
                            if (next) {
                                ad = 1;
                            }
                        }
                        if (!settings.autoWidth) {
                            var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                            scene = parseInt(num) + ad;
                            if (slideValue >= (w - elSize - settings.slideMargin)) {
                                if (num % 1 !== 0) {
                                    scene++;
                                }
                            }
                        } else {
                            var tW = 0;
                            for (var i = 0; i < $children.length; i++) {
                                tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                                scene = i + ad;
                                if (tW >= slideValue) {
                                    break;
                                }
                            }
                        }
                    };
                    if (distance >= settings.swipeThreshold) {
                        gC(false);
                        _next = false;
                    } else if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false;
                    }
                    $el.mode(_next);
                    this.slideThumb();
                } else {
                    if (distance >= settings.swipeThreshold) {
                        $el.goToPrevSlide();
                    } else if (distance <= -settings.swipeThreshold) {
                        $el.goToNextSlide();
                    }
                }
            },



            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.find('.lightSlider').addClass('lsGrab');
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('lSPrev') && $(e.target).attr('class') !== ('lSNext')) {
                            startCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
                            isDraging = false;
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }

                            $this.touchEnd(distance);

                        }
                    });
                }
            },




            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (settings.vertical === true) {
                            if ((yMovement * 3) > xMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageY, startCoords.pageY);
                        } else {
                            if ((xMovement * 3) > yMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageX, startCoords.pageX);
                        }

                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var distance;
                        if (settings.vertical === true) {
                            distance = endCoords.pageY - startCoords.pageY;
                        } else {
                            distance = endCoords.pageX - startCoords.pageX;
                        }
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {

                    if (settings.enableTouch === true) {
                        $this.enableTouch();
                    }
                    if (settings.enableDrag === true) {
                        $this.enableDrag();
                    }
                }

                $(window).on('focus', function(){
                    $this.auto();
                });
                
                $(window).on('blur', function(){
                    clearInterval(interval);
                });

                $this.pager();
                $this.pauseOnHover();
                $this.controls();
                $this.keyPress();
            }
        };
        plugin.build();
        refresh.init = function () {
            refresh.chbreakpoint();
            if (settings.vertical === true) {
                if (settings.item > 1) {
                    elSize = settings.verticalHeight;
                } else {
                    elSize = $children.outerHeight();
                }
                $slide.css('height', elSize + 'px');
            } else {
                elSize = $slide.outerWidth();
            }
            if (settings.loop === true && settings.mode === 'slide') {
                refresh.clone();
            }
            refresh.calL();
            if (settings.mode === 'slide') {
                $el.removeClass('lSSlide');
            }
            if (settings.mode === 'slide') {
                refresh.calSW();
                refresh.sSW();
            }
            setTimeout(function () {
                if (settings.mode === 'slide') {
                    $el.addClass('lSSlide');
                }
            }, 1000);
            // seems to work but beware
            // if (settings.pager) {
            //     refresh.createPager();
            // }
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (settings.adaptiveHeight === false) {
                if (settings.mode === 'slide') {
                    if (settings.vertical === false) {
                        plugin.setHeight($el, false);
                    }else{
                        plugin.auto();
                    }
                } else {
                    plugin.setHeight($el, true);
                }
            }
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            }
            if (settings.autoWidth === false) {
                if ($children.length <= settings.item) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            } else {
                if ((refresh.calWidth(false) < elSize) && (w !== 0)) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            }
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                settings.onBeforePrevSlide.call(this, $el, scene);
                scene--;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforePrevSlide.call(this, $el, scene);
                    if (settings.mode === 'fade') {
                        var l = (length - 1);
                        scene = parseInt(l / settings.slideMove);
                    }
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('leftEnd');
                    setTimeout(function () {
                        $el.removeClass('leftEnd');
                    }, 400);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            if (settings.mode === 'slide') {
                var _slideValue = plugin.slideValue();
                nextI = _slideValue < w - elSize - settings.slideMargin;
            }
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                settings.onBeforeNextSlide.call(this, $el, scene);
                scene++;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforeNextSlide.call(this, $el, scene);
                    scene = 0;
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('rightEnd');
                    setTimeout(function () {
                        $el.removeClass('rightEnd');
                    }, 400);
                }
            }
        };
        $el.mode = function (_touch) {
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (on === false) {
                if (settings.mode === 'slide') {
                    if (plugin.doCss()) {
                        $el.addClass('lSSlide');
                        if (settings.speed !== '') {
                            $slide.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $slide.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                } else {
                    if (plugin.doCss()) {
                        if (settings.speed !== '') {
                            $el.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $el.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                }
            }
            if (!_touch) {
                settings.onBeforeSlide.call(this, $el, scene);
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            } else {
                plugin.fade();
            }
            if (!$slide.hasClass('ls-hover')) {
                plugin.auto();
            }
            setTimeout(function () {
                if (!_touch) {
                    settings.onAfterSlide.call(this, $el, scene);
                }
            }, settings.speed);
            on = true;
        };
        $el.play = function () {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto();
        };
        $el.pause = function () {
            settings.auto = false;
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.lslide').length,
                    cl = $el.find('.clone.left').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        }; 
        $el.getTotalSlideCount = function () {
            return $slide.find('.lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.clone.left').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
        };
        $el.destroy = function () {
            if ($el.lightSlider) {
                $el.goToPrevSlide = function(){};
                $el.goToNextSlide = function(){};
                $el.mode = function(){};
                $el.play = function(){};
                $el.pause = function(){};
                $el.refresh = function(){};
                $el.getCurrentSlideCount = function(){};
                $el.getTotalSlideCount = function(){};
                $el.goToSlide = function(){}; 
                $el.lightSlider = null;
                refresh = {
                    init : function(){}
                };
                $el.parent().parent().find('.lSAction, .lSPager').remove();
                $el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();
                $el.children().removeAttr('style');
                $children.removeClass('lslide active');
                $el.find('.clone').remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0;
            }

        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 10);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();
            }, 50);
        });
        return this;
    };
}(jQuery));
(function(window, factory) {
    var globalInstall = function(){
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if(typeof module == 'object' && module.exports){
        factory(require('lazysizes'));
    } else if(window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';
    if(!window.addEventListener){return;}

    var regWhite = /\s+/g;
    var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
    var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/;
    var regBgUrlEscape = /\(|\)|'/;
    var allowedBackgroundSize = {contain: 1, cover: 1};
    var proxyWidth = function(elem){
        var width = lazySizes.gW(elem, elem.parentNode);

        if(!elem._lazysizesWidth || width > elem._lazysizesWidth){
            elem._lazysizesWidth = width;
        }
        return elem._lazysizesWidth;
    };
    var getBgSize = function(elem){
        var bgSize;

        bgSize = (getComputedStyle(elem) || {getPropertyValue: function(){}}).getPropertyValue('background-size');

        if(!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]){
            bgSize = elem.style.backgroundSize;
        }

        return bgSize;
    };
    var createPicture = function(sets, elem, img){
        var picture = document.createElement('picture');
        var sizes = elem.getAttribute(lazySizesConfig.sizesAttr);
        var ratio = elem.getAttribute('data-ratio');
        var optimumx = elem.getAttribute('data-optimumx');

        if(elem._lazybgset && elem._lazybgset.parentNode == elem){
            elem.removeChild(elem._lazybgset);
        }

        Object.defineProperty(img, '_lazybgset', {
            value: elem,
            writable: true
        });
        Object.defineProperty(elem, '_lazybgset', {
            value: picture,
            writable: true
        });

        sets = sets.replace(regWhite, ' ').split(regSplitSet);

        picture.style.display = 'none';
        img.className = lazySizesConfig.lazyClass;

        if(sets.length == 1 && !sizes){
            sizes = 'auto';
        }

        sets.forEach(function(set){
            var source = document.createElement('source');

            if(sizes && sizes != 'auto'){
                source.setAttribute('sizes', sizes);
            }

            if(set.match(regSource)){
                source.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1);
                if(RegExp.$2){
                    source.setAttribute('media', lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2);
                }
            }
            picture.appendChild(source);
        });

        if(sizes){
            img.setAttribute(lazySizesConfig.sizesAttr, sizes);
            elem.removeAttribute(lazySizesConfig.sizesAttr);
            elem.removeAttribute('sizes');
        }
        if(optimumx){
            img.setAttribute('data-optimumx', optimumx);
        }
        if(ratio) {
            img.setAttribute('data-ratio', ratio);
        }

        picture.appendChild(img);

        elem.appendChild(picture);
    };

    var proxyLoad = function(e){
        if(!e.target._lazybgset){return;}

        var image = e.target;
        var elem = image._lazybgset;
        var bg = image.currentSrc || image.src;

        if(bg){
            elem.style.backgroundImage = 'url(' + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg ) + ')';
        }

        if(image._lazybgsetLoading){
            lazySizes.fire(elem, '_lazyloaded', {}, false, true);
            delete image._lazybgsetLoading;
        }
    };

    addEventListener('lazybeforeunveil', function(e){
        var set, image, elem;

        if(e.defaultPrevented || !(set = e.target.getAttribute('data-bgset'))){return;}

        elem = e.target;
        image = document.createElement('img');

        image.alt = '';

        image._lazybgsetLoading = true;
        e.detail.firesLoad = true;

        createPicture(set, elem, image);

        setTimeout(function(){
            lazySizes.loader.unveil(image);

            lazySizes.rAF(function(){
                lazySizes.fire(image, '_lazyloaded', {}, true, true);
                if(image.complete) {
                    proxyLoad({target: image});
                }
            });
        });

    });

    document.addEventListener('load', proxyLoad, true);

    window.addEventListener('lazybeforesizes', function(e){
        if(e.detail.instance != lazySizes){return;}
        if(e.target._lazybgset && e.detail.dataAttr){
            var elem = e.target._lazybgset;
            var bgSize = getBgSize(elem);

            if(allowedBackgroundSize[bgSize]){
                e.target._lazysizesParentFit = bgSize;

                lazySizes.rAF(function(){
                    e.target.setAttribute('data-parent-fit', bgSize);
                    if(e.target._lazysizesParentFit){
                        delete e.target._lazysizesParentFit;
                    }
                });
            }
        }
    }, true);

    document.documentElement.addEventListener('lazybeforesizes', function(e){
        if(e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes){return;}
        e.detail.width = proxyWidth(e.target._lazybgset);
    });
}));
(function(window, factory) {
    var globalInstall = function(){
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if(typeof module == 'object' && module.exports){
        factory(require('lazysizes'), require('../fix-ios-sizes/fix-ios-sizes'));
    } else if(window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    /*jshint eqnull:true */
    'use strict';
    var polyfill;
    var config = (lazySizes && lazySizes.cfg) || window.lazySizesConfig;
    var img = document.createElement('img');
    var supportSrcset = ('sizes' in img) && ('srcset' in img);
    var regHDesc = /\s+\d+h/g;
    var fixEdgeHDescriptor = (function(){
        var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
        var forEach = Array.prototype.forEach;

        return function(edgeMatch){
            var img = document.createElement('img');
            var removeHDescriptors = function(source){
                var ratio;
                var srcset = source.getAttribute(lazySizesConfig.srcsetAttr);
                if(srcset){
                    if(srcset.match(regDescriptors)){
                        if(RegExp.$2 == 'w'){
                            ratio = RegExp.$1 / RegExp.$3;
                        } else {
                            ratio = RegExp.$3 / RegExp.$1;
                        }

                        if(ratio){
                            source.setAttribute('data-aspectratio', ratio);
                        }
                    }
                    source.setAttribute(lazySizesConfig.srcsetAttr, srcset.replace(regHDesc, ''));
                }
            };
            var handler = function(e){
                var picture = e.target.parentNode;

                if(picture && picture.nodeName == 'PICTURE'){
                    forEach.call(picture.getElementsByTagName('source'), removeHDescriptors);
                }
                removeHDescriptors(e.target);
            };

            var test = function(){
                if(!!img.currentSrc){
                    document.removeEventListener('lazybeforeunveil', handler);
                }
            };

            if(edgeMatch[1]){
                document.addEventListener('lazybeforeunveil', handler);

                if(true || edgeMatch[1] > 14){
                    img.onload = test;
                    img.onerror = test;

                    img.srcset = 'data:,a 1w 1h';

                    if(img.complete){
                        test();
                    }
                }
            }
        };
    })();


    if(!config){
        config = {};
        window.lazySizesConfig = config;
    }

    if(!config.supportsType){
        config.supportsType = function(type/*, elem*/){
            return !type;
        };
    }

    if(window.picturefill || config.pf){return;}

    if(window.HTMLPictureElement && supportSrcset){

        if(document.msElementsFromPoint){
            fixEdgeHDescriptor(navigator.userAgent.match(/Edge\/(\d+)/));
        }

        config.pf = function(){};
        return;
    }

    config.pf = function(options){
        var i, len;
        if(window.picturefill){return;}
        for(i = 0, len = options.elements.length; i < len; i++){
            polyfill(options.elements[i]);
        }
    };

    // partial polyfill
    polyfill = (function(){
        var ascendingSort = function( a, b ) {
            return a.w - b.w;
        };
        var regPxLength = /^\s*\d+\.*\d*px\s*$/;
        var reduceCandidate = function (srces) {
            var lowerCandidate, bonusFactor;
            var len = srces.length;
            var candidate = srces[len -1];
            var i = 0;

            for(i; i < len;i++){
                candidate = srces[i];
                candidate.d = candidate.w / srces.w;

                if(candidate.d >= srces.d){
                    if(!candidate.cached && (lowerCandidate = srces[i - 1]) &&
                        lowerCandidate.d > srces.d - (0.13 * Math.pow(srces.d, 2.2))){

                        bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);

                        if(lowerCandidate.cached) {
                            lowerCandidate.d += 0.15 * bonusFactor;
                        }

                        if(lowerCandidate.d + ((candidate.d - srces.d) * bonusFactor) > srces.d){
                            candidate = lowerCandidate;
                        }
                    }
                    break;
                }
            }
            return candidate;
        };

        var parseWsrcset = (function(){
            var candidates;
            var regWCandidates = /(([^,\s].[^\s]+)\s+(\d+)w)/g;
            var regMultiple = /\s/;
            var addCandidate = function(match, candidate, url, wDescriptor){
                candidates.push({
                    c: candidate,
                    u: url,
                    w: wDescriptor * 1
                });
            };

            return function(input){
                candidates = [];
                input = input.trim();
                input
                    .replace(regHDesc, '')
                    .replace(regWCandidates, addCandidate)
                ;

                if(!candidates.length && input && !regMultiple.test(input)){
                    candidates.push({
                        c: input,
                        u: input,
                        w: 99
                    });
                }

                return candidates;
            };
        })();

        var runMatchMedia = function(){
            if(runMatchMedia.init){return;}

            runMatchMedia.init = true;
            addEventListener('resize', (function(){
                var timer;
                var matchMediaElems = document.getElementsByClassName('lazymatchmedia');
                var run = function(){
                    var i, len;
                    for(i = 0, len = matchMediaElems.length; i < len; i++){
                        polyfill(matchMediaElems[i]);
                    }
                };

                return function(){
                    clearTimeout(timer);
                    timer = setTimeout(run, 66);
                };
            })());
        };

        var createSrcset = function(elem, isImage){
            var parsedSet;
            var srcSet = elem.getAttribute('srcset') || elem.getAttribute(config.srcsetAttr);

            if(!srcSet && isImage){
                srcSet = !elem._lazypolyfill ?
                    (elem.getAttribute(config.srcAttr) || elem.getAttribute('src')) :
                    elem._lazypolyfill._set
                ;
            }

            if(!elem._lazypolyfill || elem._lazypolyfill._set != srcSet){

                parsedSet = parseWsrcset( srcSet || '' );
                if(isImage && elem.parentNode){
                    parsedSet.isPicture = elem.parentNode.nodeName.toUpperCase() == 'PICTURE';

                    if(parsedSet.isPicture){
                        if(window.matchMedia){
                            lazySizes.aC(elem, 'lazymatchmedia');
                            runMatchMedia();
                        }
                    }
                }

                parsedSet._set = srcSet;
                Object.defineProperty(elem, '_lazypolyfill', {
                    value: parsedSet,
                    writable: true
                });
            }
        };

        var getX = function(elem){
            var dpr = window.devicePixelRatio || 1;
            var optimum = lazySizes.getX && lazySizes.getX(elem);
            return Math.min(optimum || dpr, 2.5, dpr);
        };

        var matchesMedia = function(media){
            if(window.matchMedia){
                matchesMedia = function(media){
                    return !media || (matchMedia(media) || {}).matches;
                };
            } else {
                return !media;
            }

            return matchesMedia(media);
        };

        var getCandidate = function(elem){
            var sources, i, len, media, source, srces, src, width;

            source = elem;
            createSrcset(source, true);
            srces = source._lazypolyfill;

            if(srces.isPicture){
                for(i = 0, sources = elem.parentNode.getElementsByTagName('source'), len = sources.length; i < len; i++){
                    if( config.supportsType(sources[i].getAttribute('type'), elem) && matchesMedia( sources[i].getAttribute('media')) ){
                        source = sources[i];
                        createSrcset(source);
                        srces = source._lazypolyfill;
                        break;
                    }
                }
            }

            if(srces.length > 1){
                width = source.getAttribute('sizes') || '';
                width = regPxLength.test(width) && parseInt(width, 10) || lazySizes.gW(elem, elem.parentNode);
                srces.d = getX(elem);
                if(!srces.src || !srces.w || srces.w < width){
                    srces.w = width;
                    src = reduceCandidate(srces.sort(ascendingSort));
                    srces.src = src;
                } else {
                    src = srces.src;
                }
            } else {
                src = srces[0];
            }

            return src;
        };

        var p = function(elem){
            if(supportSrcset && elem.parentNode && elem.parentNode.nodeName.toUpperCase() != 'PICTURE'){return;}
            var candidate = getCandidate(elem);

            if(candidate && candidate.u && elem._lazypolyfill.cur != candidate.u){
                elem._lazypolyfill.cur = candidate.u;
                candidate.cached = true;
                elem.setAttribute(config.srcAttr, candidate.u);
                elem.setAttribute('src', candidate.u);
            }
        };

        p.parse = parseWsrcset;

        return p;
    })();

    if(config.loadedClass && config.loadingClass){
        (function(){
            var sels = [];
            ['img[sizes$="px"][srcset].', 'picture > img:not([srcset]).'].forEach(function(sel){
                sels.push(sel + config.loadedClass);
                sels.push(sel + config.loadingClass);
            });
            config.pf({
                elements: document.querySelectorAll(sels.join(', '))
            });
        })();

    }
}));
(function ($) {

    ///////////////
    //
    // sticky nav - mobile
    //
    ///////////////

    // grab an element
    var myElement = document.getElementById("jq_header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement);
    // initialise
    headroom.init();



    ///////////////
    //
    // sticky nav - desktop
    //
    ///////////////

    $(window).scroll(function(){
        var winTop = $(window).scrollTop();
        if (winTop >= 30){
          $("#jq_header").addClass("header--squeezed");
          $("#content-wrap").addClass("header-fixed");
        } else {
          $("#jq_header").removeClass("header--squeezed");
          $("#content-wrap").removeClass("header-fixed");
        }
    });



    ///////////////
    //
    // slider
    //
    ///////////////

    var slider = $('.jq_slider').lightSlider({
        item: 1,
        galleryMargin: 0,
        controls: false,
        onSliderLoad: function(el){
            el[0].classList.add("slider__list--loaded");
            setTimeout(function(){
                adjustSliderButtons()
            }, 0)
        }
    });

    // window.addEventListener('resize', function(){
    //     slider.refresh();
    // });

    function adjustSliderButtons() {
        var $navUl = $('.slider').find('ul.lSPager');
        $( $navUl[0].children ).each(function(key, value){
            $(this).css('width', (100/$navUl[0].children.length) + '%' );
            $(this).find('a').html( $( $($('.slider__list')[0].children).get(key) ).data('title') )
        });
    }


    ///////////////
    //
    // no focus on mousedown
    //
    ///////////////

    $("body").on("mousedown", "*", function(e) {
        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") == "none") {
            $(this).css("outline", "none").on("blur", function() {
                $(this).off("blur").css("outline", "");
            });
        }
    });

    ///////////////
    //
    // side nav
    //
    ///////////////

    if ( $('.jq_side-nav').length ) {
        $('.jq_side-navToggle').on('click keypress', function(e){
            if (e.type == 'click' || e.which == 13) {
                // close all open tabs
                $('.jq_side-navSubmenu').not( $(this).siblings('ul') ).slideUp();
                $('.jq_side-navToggle').each(function(){
                    $(this).html() == '–' ? $(this).html('+') : null;
                });
                // clicking on active one, hide it
                if ($(this).siblings('ul').is(':visible')) {
                    $(this).siblings('ul').slideUp();
                    $(this).html('+')
                // open current
                } else {
                    $(this).siblings('ul').slideDown();
                    $(this).html('–')
                }
            }
        });
    }


    $('#jq_side-nav-toggle').click(function(){
        $('.jq_side-nav').slideToggle();
    });


    ///////////////
    //
    // responsive tables
    //
    ///////////////

    $('.body table').each(function(){
        var labels = [];
        var ths = $(this).find('th');
        for (var i = 0; i < ths.length; i++) {
            labels.push( ths[i].innerText );
        }
        var trs = $(this).find('tr');
        for (var i = 0; i < trs.length; i++) {
            var tds = $(trs[i]).find('td');
            for (var j = 0; j < tds.length; j++) {
                if (labels[j]) {
                    tds[j].setAttribute('data-label', labels[j]);
                }
            }
        }
    });


    ///////////////
    //
    // galleries
    //
    ///////////////

    // wait for the lazisizes to take care of images first
    setTimeout(function(){
        var slideGallery = $('.jq_slideGallery').lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            thumbItem: 4,
            slideMargin: 0,
            enableDrag: false,
            slideMargin: 15,
            galleryMargin: 15,
            thumbMargin: 15,
            currentPagerPosition: 'left',
            responsive : [
                {
                    breakpoint:480,
                    settings: {
                        thumbItem: 2
                    }
                }
            ],
            onSliderLoad: function(el) {
                el.lightGallery({
                    selector: '.jq_slideGallery .lslide'
                });
            }
        });
    }, 0);

    $('.jq_gallery').lightGallery({
        thumbnail: true
    });


    //////////
    //
    // print
    //
    //////////

    $('#jq_print').on('click', function(){
        window.print();
    });



    ///////////////
    //
    // switch tabs with arrow keys
    //
    ///////////////

    jQuery('[role="tab"]').on('keydown', function(e) {

        // define current, previous and next (possible) tabs
        // TODO: remove classes
        var $original = jQuery(this);
        var $prev = jQuery(this).parents('.contact__filter__tabs__item').prev().children('[role="tab"]');
        var $next = jQuery(this).parents('.contact__filter__tabs__item').next().children('[role="tab"]');
        var $target;

        // find the direction (prev or next)

        switch (e.keyCode) {
            case 37:
                $target = $prev;
                break;
            case 39:
                $target = $next;
                break;
            default:
                $target = false
                break;
        }

        if ($target.length) {
            $original.attr({
                'tabindex' : '-1',
                'aria-selected' : null,
                'aria-hidden' : true
            });
            $original.next().attr('aria-hidden', true);
            $target.attr({
                'tabindex' : '0',
                'aria-selected' : true,
                'aria-hidden' : false
            }).focus();
            $target.next().attr('aria-hidden', false);
            // switch panel
            $target.prev('input').trigger('click');
        }

    });





    ///////////////
    //
    // filter autosubmit
    //
    ///////////////

    var $exposedViewsWrapper = $('.view-form-autosubmit').parent();
    $.each($exposedViewsWrapper, function() {
        $(this).on('change', '.views-exposed-form input:not(:submit), .views-exposed-form select:not(.shs-select)', (function($view) {
            return function() {
                var $exposedViews = $('.view-form-autosubmit');
                var runBeforeSubmit = $exposedViews.data('run-before-submit');
                var $submit = $view.find('.views-exposed-form input[type="submit"]');

                $('#jq_loader').addClass('loader--open');
                $submit.click();
            };
        })($(this)));
    });




    ///////////////
    //
    // loader
    //
    ///////////////

    $( document ).ajaxStop(function() {
        setTimeout(function(){
            $('#jq_loader').removeClass('loader--open');
        }, 0);
    });


    ///////////////
    //
    // mobile search
    //
    ///////////////

    var $search = $('.header__container > .search-block');
    $search.find('input[type=search]').keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            $search.removeClass('search-block--open');
        }
    });

    $('#jq_search-toggle').on('click', function(){
        $search.addClass('search-block--open').attr('aria-hidden', 'false');
        $search.find('input[type=search]').focus();
        if ( !$('body, html').hasClass('no-scroll') ) {
            $('body, html').addClass('no-scroll');
        }
    });

    $('#jq_search-close').on('click', function(){
        $search.removeClass('search-block--open').attr('aria-hidden', 'true');
        if ( !$('#jq_hamburger').hasClass('menu-is-open') ) {
            $('body, html').removeClass('no-scroll');
        }
    });


    ///////////////
    //
    // cookies
    //
    ///////////////

    if ( !localStorage.getItem('fsvuk_cookies_agreed') ) {
        $('#jq_cookies').addClass('cookies--visible')
    }

    $('#jq_cookiesClose').click(function(){
        $('#jq_cookies').hide()
        if (localStorage) {
            localStorage.setItem('fsvuk_cookies_agreed', true);
        }
    });


    ///////////////
    //
    // newsletter
    //
    ///////////////

    $('form.fsv-newsletter-subscription-form input[name="email"]').on('keyup', function(e) {
        var $checkbox = $('form.fsv-newsletter-subscription-form .form-item-checkbox');
        if ($(this).val().length > 0) {
            $checkbox.addClass('show');
        } else {
            $checkbox.removeClass('show');
        }
    });


    ///////////////
    //
    // anchor smooth scroll
    //
    ///////////////

    // Select all links with hashes
    $('.body a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - 183 // minus height of the header
            }, 1000);
          }
        }
      });


    ///////////////
    //
    // Datepicker
    //
    ///////////////

    $.fn.datepicker.language['cs'] = {
        days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
        daysShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
        daysMin: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
        months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
        monthsShort: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
        today: 'Dnes',
        clear: 'Vymazat',
        dateFormat: 'dd.mm.yy',
        timeFormat: 'hh:ii',
        firstDay: 1
    };

    var datepicker = $('.js-form-type-date .form-text').datepicker({
        language: 'cs',
        autoClose: true,
    });


    ///////////////
    //
    // GTM
    //
    ///////////////
    dataLayer = window.dataLayer || [];
    $('.prefooter__social a.prefooter__social__link').click(function(e) {
      var socialNetwork = e.target.host.match(/^(\w+\.)?(\w+)\.\w{2,3}/);
      dataLayer.push({
        "event": "dk_fsv_social_media_click",
        "dk_social_media_type": socialNetwork[2]
      });
    });

    $('.lang-switcher a.language-link').click(function(e) {
      dataLayer.push({
        "event": "dk_fsv_language_change",
        "dk_language": e.target.getAttribute('hreflang')
      });
    });

    $('#block-topheadernavigation a.nav-top__link').click(function(e) {
      dataLayer.push({
        "event": "dk_fsv_study_system_click",
        "dk_study_system_type": e.target.innerText
      });
    });
})(jQuery);



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VudGZvbGRpbmcuanMiLCJjdXN0b20uanMiLCJkYXRlcGlja2VyLmpzIiwiaGVhZHJvb20uanMiLCJsYXp5c2l6ZXMuanMiLCJsaWdodGdhbGxlcnkuanMiLCJsaWdodHNsaWRlci5qcyIsImxzLmJnc2V0LmpzIiwibHMucmVzcGltZy5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeHNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcnJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbjFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzk5MDkwNC9yZW1vdmUtYWNjZW50cy1kaWFjcml0aWNzLWluLWEtc3RyaW5nLWluLWphdmFzY3JpcHRcbi8qXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG52YXIgZGVmYXVsdERpYWNyaXRpY3NSZW1vdmFsTWFwID0gW1xuICAgIHsnYmFzZSc6J0EnLCAnbGV0dGVycyc6J1xcdTAwNDFcXHUyNEI2XFx1RkYyMVxcdTAwQzBcXHUwMEMxXFx1MDBDMlxcdTFFQTZcXHUxRUE0XFx1MUVBQVxcdTFFQThcXHUwMEMzXFx1MDEwMFxcdTAxMDJcXHUxRUIwXFx1MUVBRVxcdTFFQjRcXHUxRUIyXFx1MDIyNlxcdTAxRTBcXHUwMEM0XFx1MDFERVxcdTFFQTJcXHUwMEM1XFx1MDFGQVxcdTAxQ0RcXHUwMjAwXFx1MDIwMlxcdTFFQTBcXHUxRUFDXFx1MUVCNlxcdTFFMDBcXHUwMTA0XFx1MDIzQVxcdTJDNkYnfSxcbiAgICB7J2Jhc2UnOidBQScsJ2xldHRlcnMnOidcXHVBNzMyJ30sXG4gICAgeydiYXNlJzonQUUnLCdsZXR0ZXJzJzonXFx1MDBDNlxcdTAxRkNcXHUwMUUyJ30sXG4gICAgeydiYXNlJzonQU8nLCdsZXR0ZXJzJzonXFx1QTczNCd9LFxuICAgIHsnYmFzZSc6J0FVJywnbGV0dGVycyc6J1xcdUE3MzYnfSxcbiAgICB7J2Jhc2UnOidBVicsJ2xldHRlcnMnOidcXHVBNzM4XFx1QTczQSd9LFxuICAgIHsnYmFzZSc6J0FZJywnbGV0dGVycyc6J1xcdUE3M0MnfSxcbiAgICB7J2Jhc2UnOidCJywgJ2xldHRlcnMnOidcXHUwMDQyXFx1MjRCN1xcdUZGMjJcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUwMjQzXFx1MDE4MlxcdTAxODEnfSxcbiAgICB7J2Jhc2UnOidDJywgJ2xldHRlcnMnOidcXHUwMDQzXFx1MjRCOFxcdUZGMjNcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDBDN1xcdTFFMDhcXHUwMTg3XFx1MDIzQlxcdUE3M0UnfSxcbiAgICB7J2Jhc2UnOidEJywgJ2xldHRlcnMnOidcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OVxcdTAwRDAnfSxcbiAgICB7J2Jhc2UnOidEWicsJ2xldHRlcnMnOidcXHUwMUYxXFx1MDFDNCd9LFxuICAgIHsnYmFzZSc6J0R6JywnbGV0dGVycyc6J1xcdTAxRjJcXHUwMUM1J30sXG4gICAgeydiYXNlJzonRScsICdsZXR0ZXJzJzonXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFJ30sXG4gICAgeydiYXNlJzonRicsICdsZXR0ZXJzJzonXFx1MDA0NlxcdTI0QkJcXHVGRjI2XFx1MUUxRVxcdTAxOTFcXHVBNzdCJ30sXG4gICAgeydiYXNlJzonRycsICdsZXR0ZXJzJzonXFx1MDA0N1xcdTI0QkNcXHVGRjI3XFx1MDFGNFxcdTAxMUNcXHUxRTIwXFx1MDExRVxcdTAxMjBcXHUwMUU2XFx1MDEyMlxcdTAxRTRcXHUwMTkzXFx1QTdBMFxcdUE3N0RcXHVBNzdFJ30sXG4gICAgeydiYXNlJzonSCcsICdsZXR0ZXJzJzonXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OEQnfSxcbiAgICB7J2Jhc2UnOidJJywgJ2xldHRlcnMnOidcXHUwMDQ5XFx1MjRCRVxcdUZGMjlcXHUwMENDXFx1MDBDRFxcdTAwQ0VcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTMwXFx1MDBDRlxcdTFFMkVcXHUxRUM4XFx1MDFDRlxcdTAyMDhcXHUwMjBBXFx1MUVDQVxcdTAxMkVcXHUxRTJDXFx1MDE5Nyd9LFxuICAgIHsnYmFzZSc6J0onLCAnbGV0dGVycyc6J1xcdTAwNEFcXHUyNEJGXFx1RkYyQVxcdTAxMzRcXHUwMjQ4J30sXG4gICAgeydiYXNlJzonSycsICdsZXR0ZXJzJzonXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTInfSxcbiAgICB7J2Jhc2UnOidMJywgJ2xldHRlcnMnOidcXHUwMDRDXFx1MjRDMVxcdUZGMkNcXHUwMTNGXFx1MDEzOVxcdTAxM0RcXHUxRTM2XFx1MUUzOFxcdTAxM0JcXHUxRTNDXFx1MUUzQVxcdTAxNDFcXHUwMjNEXFx1MkM2MlxcdTJDNjBcXHVBNzQ4XFx1QTc0NlxcdUE3ODAnfSxcbiAgICB7J2Jhc2UnOidMSicsJ2xldHRlcnMnOidcXHUwMUM3J30sXG4gICAgeydiYXNlJzonTGonLCdsZXR0ZXJzJzonXFx1MDFDOCd9LFxuICAgIHsnYmFzZSc6J00nLCAnbGV0dGVycyc6J1xcdTAwNERcXHUyNEMyXFx1RkYyRFxcdTFFM0VcXHUxRTQwXFx1MUU0MlxcdTJDNkVcXHUwMTlDJ30sXG4gICAgeydiYXNlJzonTicsICdsZXR0ZXJzJzonXFx1MDA0RVxcdTI0QzNcXHVGRjJFXFx1MDFGOFxcdTAxNDNcXHUwMEQxXFx1MUU0NFxcdTAxNDdcXHUxRTQ2XFx1MDE0NVxcdTFFNEFcXHUxRTQ4XFx1MDIyMFxcdTAxOURcXHVBNzkwXFx1QTdBNCd9LFxuICAgIHsnYmFzZSc6J05KJywnbGV0dGVycyc6J1xcdTAxQ0EnfSxcbiAgICB7J2Jhc2UnOidOaicsJ2xldHRlcnMnOidcXHUwMUNCJ30sXG4gICAgeydiYXNlJzonTycsICdsZXR0ZXJzJzonXFx1MDA0RlxcdTI0QzRcXHVGRjJGXFx1MDBEMlxcdTAwRDNcXHUwMEQ0XFx1MUVEMlxcdTFFRDBcXHUxRUQ2XFx1MUVENFxcdTAwRDVcXHUxRTRDXFx1MDIyQ1xcdTFFNEVcXHUwMTRDXFx1MUU1MFxcdTFFNTJcXHUwMTRFXFx1MDIyRVxcdTAyMzBcXHUwMEQ2XFx1MDIyQVxcdTFFQ0VcXHUwMTUwXFx1MDFEMVxcdTAyMENcXHUwMjBFXFx1MDFBMFxcdTFFRENcXHUxRURBXFx1MUVFMFxcdTFFREVcXHUxRUUyXFx1MUVDQ1xcdTFFRDhcXHUwMUVBXFx1MDFFQ1xcdTAwRDhcXHUwMUZFXFx1MDE4NlxcdTAxOUZcXHVBNzRBXFx1QTc0Qyd9LFxuICAgIHsnYmFzZSc6J09JJywnbGV0dGVycyc6J1xcdTAxQTInfSxcbiAgICB7J2Jhc2UnOidPTycsJ2xldHRlcnMnOidcXHVBNzRFJ30sXG4gICAgeydiYXNlJzonT1UnLCdsZXR0ZXJzJzonXFx1MDIyMid9LFxuICAgIHsnYmFzZSc6J09FJywnbGV0dGVycyc6J1xcdTAwOENcXHUwMTUyJ30sXG4gICAgeydiYXNlJzonb2UnLCdsZXR0ZXJzJzonXFx1MDA5Q1xcdTAxNTMnfSxcbiAgICB7J2Jhc2UnOidQJywgJ2xldHRlcnMnOidcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0J30sXG4gICAgeydiYXNlJzonUScsICdsZXR0ZXJzJzonXFx1MDA1MVxcdTI0QzZcXHVGRjMxXFx1QTc1NlxcdUE3NThcXHUwMjRBJ30sXG4gICAgeydiYXNlJzonUicsICdsZXR0ZXJzJzonXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODInfSxcbiAgICB7J2Jhc2UnOidTJywgJ2xldHRlcnMnOidcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NCd9LFxuICAgIHsnYmFzZSc6J1QnLCAnbGV0dGVycyc6J1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nid9LFxuICAgIHsnYmFzZSc6J1RaJywnbGV0dGVycyc6J1xcdUE3MjgnfSxcbiAgICB7J2Jhc2UnOidVJywgJ2xldHRlcnMnOidcXHUwMDU1XFx1MjRDQVxcdUZGMzVcXHUwMEQ5XFx1MDBEQVxcdTAwREJcXHUwMTY4XFx1MUU3OFxcdTAxNkFcXHUxRTdBXFx1MDE2Q1xcdTAwRENcXHUwMURCXFx1MDFEN1xcdTAxRDVcXHUwMUQ5XFx1MUVFNlxcdTAxNkVcXHUwMTcwXFx1MDFEM1xcdTAyMTRcXHUwMjE2XFx1MDFBRlxcdTFFRUFcXHUxRUU4XFx1MUVFRVxcdTFFRUNcXHUxRUYwXFx1MUVFNFxcdTFFNzJcXHUwMTcyXFx1MUU3NlxcdTFFNzRcXHUwMjQ0J30sXG4gICAgeydiYXNlJzonVicsICdsZXR0ZXJzJzonXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDUnfSxcbiAgICB7J2Jhc2UnOidWWScsJ2xldHRlcnMnOidcXHVBNzYwJ30sXG4gICAgeydiYXNlJzonVycsICdsZXR0ZXJzJzonXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Mid9LFxuICAgIHsnYmFzZSc6J1gnLCAnbGV0dGVycyc6J1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDJ30sXG4gICAgeydiYXNlJzonWScsICdsZXR0ZXJzJzonXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFJ30sXG4gICAgeydiYXNlJzonWicsICdsZXR0ZXJzJzonXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjInfSxcbiAgICB7J2Jhc2UnOidhJywgJ2xldHRlcnMnOidcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MCd9LFxuICAgIHsnYmFzZSc6J2FhJywnbGV0dGVycyc6J1xcdUE3MzMnfSxcbiAgICB7J2Jhc2UnOidhZScsJ2xldHRlcnMnOidcXHUwMEU2XFx1MDFGRFxcdTAxRTMnfSxcbiAgICB7J2Jhc2UnOidhbycsJ2xldHRlcnMnOidcXHVBNzM1J30sXG4gICAgeydiYXNlJzonYXUnLCdsZXR0ZXJzJzonXFx1QTczNyd9LFxuICAgIHsnYmFzZSc6J2F2JywnbGV0dGVycyc6J1xcdUE3MzlcXHVBNzNCJ30sXG4gICAgeydiYXNlJzonYXknLCdsZXR0ZXJzJzonXFx1QTczRCd9LFxuICAgIHsnYmFzZSc6J2InLCAnbGV0dGVycyc6J1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1Myd9LFxuICAgIHsnYmFzZSc6J2MnLCAnbGV0dGVycyc6J1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODQnfSxcbiAgICB7J2Jhc2UnOidkJywgJ2xldHRlcnMnOidcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QSd9LFxuICAgIHsnYmFzZSc6J2R6JywnbGV0dGVycyc6J1xcdTAxRjNcXHUwMUM2J30sXG4gICAgeydiYXNlJzonZScsICdsZXR0ZXJzJzonXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERCd9LFxuICAgIHsnYmFzZSc6J2YnLCAnbGV0dGVycyc6J1xcdTAwNjZcXHUyNEQ1XFx1RkY0NlxcdTFFMUZcXHUwMTkyXFx1QTc3Qyd9LFxuICAgIHsnYmFzZSc6J2cnLCAnbGV0dGVycyc6J1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rid9LFxuICAgIHsnYmFzZSc6J2gnLCAnbGV0dGVycyc6J1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NSd9LFxuICAgIHsnYmFzZSc6J2h2JywnbGV0dGVycyc6J1xcdTAxOTUnfSxcbiAgICB7J2Jhc2UnOidpJywgJ2xldHRlcnMnOidcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMSd9LFxuICAgIHsnYmFzZSc6J2onLCAnbGV0dGVycyc6J1xcdTAwNkFcXHUyNEQ5XFx1RkY0QVxcdTAxMzVcXHUwMUYwXFx1MDI0OSd9LFxuICAgIHsnYmFzZSc6J2snLCAnbGV0dGVycyc6J1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzJ30sXG4gICAgeydiYXNlJzonbCcsICdsZXR0ZXJzJzonXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0Nyd9LFxuICAgIHsnYmFzZSc6J2xqJywnbGV0dGVycyc6J1xcdTAxQzknfSxcbiAgICB7J2Jhc2UnOidtJywgJ2xldHRlcnMnOidcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2Rid9LFxuICAgIHsnYmFzZSc6J24nLCAnbGV0dGVycyc6J1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1J30sXG4gICAgeydiYXNlJzonbmonLCdsZXR0ZXJzJzonXFx1MDFDQyd9LFxuICAgIHsnYmFzZSc6J28nLCAnbGV0dGVycyc6J1xcdTAwNkZcXHUyNERFXFx1RkY0RlxcdTAwRjJcXHUwMEYzXFx1MDBGNFxcdTFFRDNcXHUxRUQxXFx1MUVEN1xcdTFFRDVcXHUwMEY1XFx1MUU0RFxcdTAyMkRcXHUxRTRGXFx1MDE0RFxcdTFFNTFcXHUxRTUzXFx1MDE0RlxcdTAyMkZcXHUwMjMxXFx1MDBGNlxcdTAyMkJcXHUxRUNGXFx1MDE1MVxcdTAxRDJcXHUwMjBEXFx1MDIwRlxcdTAxQTFcXHUxRUREXFx1MUVEQlxcdTFFRTFcXHUxRURGXFx1MUVFM1xcdTFFQ0RcXHUxRUQ5XFx1MDFFQlxcdTAxRURcXHUwMEY4XFx1MDFGRlxcdTAyNTRcXHVBNzRCXFx1QTc0RFxcdTAyNzUnfSxcbiAgICB7J2Jhc2UnOidvaScsJ2xldHRlcnMnOidcXHUwMUEzJ30sXG4gICAgeydiYXNlJzonb3UnLCdsZXR0ZXJzJzonXFx1MDIyMyd9LFxuICAgIHsnYmFzZSc6J29vJywnbGV0dGVycyc6J1xcdUE3NEYnfSxcbiAgICB7J2Jhc2UnOidwJywnbGV0dGVycyc6J1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTUnfSxcbiAgICB7J2Jhc2UnOidxJywnbGV0dGVycyc6J1xcdTAwNzFcXHUyNEUwXFx1RkY1MVxcdTAyNEJcXHVBNzU3XFx1QTc1OSd9LFxuICAgIHsnYmFzZSc6J3InLCdsZXR0ZXJzJzonXFx1MDA3MlxcdTI0RTFcXHVGRjUyXFx1MDE1NVxcdTFFNTlcXHUwMTU5XFx1MDIxMVxcdTAyMTNcXHUxRTVCXFx1MUU1RFxcdTAxNTdcXHUxRTVGXFx1MDI0RFxcdTAyN0RcXHVBNzVCXFx1QTdBN1xcdUE3ODMnfSxcbiAgICB7J2Jhc2UnOidzJywnbGV0dGVycyc6J1xcdTAwNzNcXHUyNEUyXFx1RkY1M1xcdTAwREZcXHUwMTVCXFx1MUU2NVxcdTAxNURcXHUxRTYxXFx1MDE2MVxcdTFFNjdcXHUxRTYzXFx1MUU2OVxcdTAyMTlcXHUwMTVGXFx1MDIzRlxcdUE3QTlcXHVBNzg1XFx1MUU5Qid9LFxuICAgIHsnYmFzZSc6J3QnLCdsZXR0ZXJzJzonXFx1MDA3NFxcdTI0RTNcXHVGRjU0XFx1MUU2QlxcdTFFOTdcXHUwMTY1XFx1MUU2RFxcdTAyMUJcXHUwMTYzXFx1MUU3MVxcdTFFNkZcXHUwMTY3XFx1MDFBRFxcdTAyODhcXHUyQzY2XFx1QTc4Nyd9LFxuICAgIHsnYmFzZSc6J3R6JywnbGV0dGVycyc6J1xcdUE3MjknfSxcbiAgICB7J2Jhc2UnOid1JywnbGV0dGVycyc6ICdcXHUwMDc1XFx1MjRFNFxcdUZGNTVcXHUwMEY5XFx1MDBGQVxcdTAwRkJcXHUwMTY5XFx1MUU3OVxcdTAxNkJcXHUxRTdCXFx1MDE2RFxcdTAwRkNcXHUwMURDXFx1MDFEOFxcdTAxRDZcXHUwMURBXFx1MUVFN1xcdTAxNkZcXHUwMTcxXFx1MDFENFxcdTAyMTVcXHUwMjE3XFx1MDFCMFxcdTFFRUJcXHUxRUU5XFx1MUVFRlxcdTFFRURcXHUxRUYxXFx1MUVFNVxcdTFFNzNcXHUwMTczXFx1MUU3N1xcdTFFNzVcXHUwMjg5J30sXG4gICAgeydiYXNlJzondicsJ2xldHRlcnMnOidcXHUwMDc2XFx1MjRFNVxcdUZGNTZcXHUxRTdEXFx1MUU3RlxcdTAyOEJcXHVBNzVGXFx1MDI4Qyd9LFxuICAgIHsnYmFzZSc6J3Z5JywnbGV0dGVycyc6J1xcdUE3NjEnfSxcbiAgICB7J2Jhc2UnOid3JywnbGV0dGVycyc6J1xcdTAwNzdcXHUyNEU2XFx1RkY1N1xcdTFFODFcXHUxRTgzXFx1MDE3NVxcdTFFODdcXHUxRTg1XFx1MUU5OFxcdTFFODlcXHUyQzczJ30sXG4gICAgeydiYXNlJzoneCcsJ2xldHRlcnMnOidcXHUwMDc4XFx1MjRFN1xcdUZGNThcXHUxRThCXFx1MUU4RCd9LFxuICAgIHsnYmFzZSc6J3knLCdsZXR0ZXJzJzonXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRid9LFxuICAgIHsnYmFzZSc6J3onLCdsZXR0ZXJzJzonXFx1MDA3QVxcdTI0RTlcXHVGRjVBXFx1MDE3QVxcdTFFOTFcXHUwMTdDXFx1MDE3RVxcdTFFOTNcXHUxRTk1XFx1MDFCNlxcdTAyMjVcXHUwMjQwXFx1MkM2Q1xcdUE3NjMnfVxuXTtcblxudmFyIGRpYWNyaXRpY3NNYXAgPSB7fTtcbmZvciAodmFyIGk9MDsgaSA8IGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbE1hcCAubGVuZ3RoOyBpKyspe1xuICAgIHZhciBsZXR0ZXJzID0gZGVmYXVsdERpYWNyaXRpY3NSZW1vdmFsTWFwIFtpXS5sZXR0ZXJzO1xuICAgIGZvciAodmFyIGo9MDsgaiA8IGxldHRlcnMubGVuZ3RoIDsgaisrKXtcbiAgICAgICAgZGlhY3JpdGljc01hcFtsZXR0ZXJzW2pdXSA9IGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbE1hcCBbaV0uYmFzZTtcbiAgICB9XG59XG5cbi8vIFwid2hhdD9cIiB2ZXJzaW9uIC4uLiBodHRwOi8vanNwZXJmLmNvbS9kaWFjcml0aWNzLzEyXG5mdW5jdGlvbiByZW1vdmVEaWFjcml0aWNzIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1teXFx1MDAwMC1cXHUwMDdFXS9nLCBmdW5jdGlvbihhKXsgXG4gICAgICAgcmV0dXJuIGRpYWNyaXRpY3NNYXBbYV0gfHwgYTsgXG4gICAgfSk7XG59ICAgICIsIihmdW5jdGlvbiAoJCkge1xuXG4vKiBwdWJsaWNhdGlvbnMgLSBsaXN0IC0gc29ydCB5ZWFycyBpbiBsaXN0cyAqL1xuJChcIi5saXN0aXRlbXNcIikuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICQodGhpcykuY2hpbGRyZW4oJ2xpJykuc29ydChzb3J0X2xpKS5hcHBlbmRUbyh0aGlzKTtcbiAgICAgICAgZnVuY3Rpb24gc29ydF9saShhLCBiKSB7XG4gICAgICAgIHJldHVybiAoJChiKS5kYXRhKCd2YWx1ZScpKSA+ICgkKGEpLmRhdGEoJ3ZhbHVlJykpID8gMSA6IC0xO1xuICAgIH1cbn0pO1xuXG4vKiBwdWJsaWNhdGlvbnMgLSB5ZWFyIGZpbHRlciAtIHNvcnQgeWVhcnMgaW4gb3B0aW9ucyAqL1xuJChcIiNwdWJseWVhclwiKS5hcHBlbmQoJChcIiNwdWJseWVhciBvcHRpb25cIikucmVtb3ZlKCkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGF0ID0gJChhKS50ZXh0KCksIGJ0ID0gJChiKS50ZXh0KCk7XG4gICAgcmV0dXJuIChhdCA+IGJ0KT8xOigoYXQgPCBidCk/LTE6MCk7XG59KSk7XG5cbi8qIHB1YmxpY2F0aW9ucyAtIHllYXIgZmlsdGVyIC0gZGlzcGxheSBvbmx5IHVuaXF1ZSB2YWx1ZXMgKi9cbnZhciB1c2VkTmFtZXMgPSB7fTtcbiQoXCIjcHVibHllYXIgb3B0aW9uXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIGlmKHVzZWROYW1lc1t0aGlzLnRleHRdKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXNlZE5hbWVzW3RoaXMudGV4dF0gPSB0aGlzLnZhbHVlO1xuICAgIH1cbn0pO1xuXG4vKiBwdWJsaWNhdGlvbnMgLSB5ZWFyIGZpbHRlciBtYWluIGZ1bmN0aW9uYWxpdHkgKi9cbiQoJyNwdWJseWVhcicpLmNoYW5nZShmdW5jdGlvbigpe1xuICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjcHVibHllYXIgb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgdmFyIHllYXJfdmFsdWVzID0gJCgnLmxpc3RpdGVtcyBsaScpO1xuICAgICQoeWVhcl92YWx1ZXMpLmhpZGUoKTtcbiAgICAkKHllYXJfdmFsdWVzKS5lYWNoKGZ1bmN0aW9uKCkge2lmICgkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKSA9PSBzZWxlY3RlZF9vcHRpb24pIHsgJCh0aGlzKS5zaG93KCk7IH19KVxuICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICc5OTk5JykgeyAkKHllYXJfdmFsdWVzKS5zaG93KCk7IH1cbn0pO1xuXG4vKiBwdWJsaWNhdGlvbnMgLSBoaWRlIGgzIGlmIGVtcHR5IGxpc3QgKi9cbiQoXCIjcHVibGljYXRpb25zIGgzXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIGlmICgkLnRyaW0oJCh0aGlzKS5uZXh0KFwidWxcIikuaHRtbCgpKT09JycpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImVtcHR5XCIpO1xuICAgIH1cblxufSk7XG59KShqUXVlcnkpO1xuIiwiOyhmdW5jdGlvbiAod2luZG93LCAkLCB1bmRlZmluZWQpIHsgOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFZFUlNJT04gPSAnMi4yLjMnLFxuICAgICAgICBwbHVnaW5OYW1lID0gJ2RhdGVwaWNrZXInLFxuICAgICAgICBhdXRvSW5pdFNlbGVjdG9yID0gJy5kYXRlcGlja2VyLWhlcmUnLFxuICAgICAgICAkYm9keSwgJGRhdGVwaWNrZXJzQ29udGFpbmVyLFxuICAgICAgICBjb250YWluZXJCdWlsdCA9IGZhbHNlLFxuICAgICAgICBiYXNlVGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImRhdGVwaWNrZXItLXBvaW50ZXJcIj48L2k+JyArXG4gICAgICAgICAgICAnPG5hdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdlwiPjwvbmF2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiAnJyxcbiAgICAgICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgICAgICBsYW5ndWFnZTogJ2NzJyxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtlbmRzOiBbNiwgMF0sXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkOiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkRGF0ZUZvcm1hdDogJ0AnLFxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICBrZXlib2FyZE5hdjogdHJ1ZSxcblxuICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG4gICAgICAgICAgICBvZmZzZXQ6IDEyLFxuXG4gICAgICAgICAgICB2aWV3OiAnZGF5cycsXG4gICAgICAgICAgICBtaW5WaWV3OiAnZGF5cycsXG5cbiAgICAgICAgICAgIHNob3dPdGhlck1vbnRoczogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJNb250aHNPblNlbGVjdDogdHJ1ZSxcblxuICAgICAgICAgICAgc2hvd090aGVyWWVhcnM6IHRydWUsXG4gICAgICAgICAgICBzZWxlY3RPdGhlclllYXJzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0OiB0cnVlLFxuXG4gICAgICAgICAgICBtaW5EYXRlOiAnJyxcbiAgICAgICAgICAgIG1heERhdGU6ICcnLFxuICAgICAgICAgICAgZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlOiB0cnVlLFxuXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzOiBmYWxzZSwgLy8gQm9vbGVhbiBvciBOdW1iZXJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcsJyxcbiAgICAgICAgICAgIHJhbmdlOiBmYWxzZSxcblxuICAgICAgICAgICAgdG9kYXlCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXJCdXR0b246IGZhbHNlLFxuXG4gICAgICAgICAgICBzaG93RXZlbnQ6ICdmb2N1cycsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIG5hdmlnYXRpb25cbiAgICAgICAgICAgIG1vbnRoc0ZpZWxkOiAnbW9udGhzU2hvcnQnLFxuICAgICAgICAgICAgcHJldkh0bWw6ICc8c3ZnPjxwYXRoIGQ9XCJNIDE3LDEyIGwgLTUsNSBsIDUsNVwiPjwvcGF0aD48L3N2Zz4nLFxuICAgICAgICAgICAgbmV4dEh0bWw6ICc8c3ZnPjxwYXRoIGQ9XCJNIDE0LDEyIGwgNSw1IGwgLTUsNVwiPjwvcGF0aD48L3N2Zz4nLFxuICAgICAgICAgICAgbmF2VGl0bGVzOiB7XG4gICAgICAgICAgICAgICAgZGF5czogJ01NLCA8aT55eTwvaT4nLFxuICAgICAgICAgICAgICAgIG1vbnRoczogJ3l5JyxcbiAgICAgICAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyB0aW1lcGlja2VyXG4gICAgICAgICAgICB0aW1lcGlja2VyOiBmYWxzZSxcbiAgICAgICAgICAgIG9ubHlUaW1lcGlja2VyOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGVUaW1lU2VwYXJhdG9yOiAnICcsXG4gICAgICAgICAgICB0aW1lRm9ybWF0OiAnJyxcbiAgICAgICAgICAgIG1pbkhvdXJzOiAwLFxuICAgICAgICAgICAgbWF4SG91cnM6IDI0LFxuICAgICAgICAgICAgbWluTWludXRlczogMCxcbiAgICAgICAgICAgIG1heE1pbnV0ZXM6IDU5LFxuICAgICAgICAgICAgaG91cnNTdGVwOiAxLFxuICAgICAgICAgICAgbWludXRlc1N0ZXA6IDEsXG5cbiAgICAgICAgICAgIC8vIGV2ZW50c1xuICAgICAgICAgICAgb25TZWxlY3Q6ICcnLFxuICAgICAgICAgICAgb25TaG93OiAnJyxcbiAgICAgICAgICAgIG9uSGlkZTogJycsXG4gICAgICAgICAgICBvbkNoYW5nZU1vbnRoOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlWWVhcjogJycsXG4gICAgICAgICAgICBvbkNoYW5nZURlY2FkZTogJycsXG4gICAgICAgICAgICBvbkNoYW5nZVZpZXc6ICcnLFxuICAgICAgICAgICAgb25SZW5kZXJDZWxsOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBob3RLZXlzID0ge1xuICAgICAgICAgICAgJ2N0cmxSaWdodCc6IFsxNywgMzldLFxuICAgICAgICAgICAgJ2N0cmxVcCc6IFsxNywgMzhdLFxuICAgICAgICAgICAgJ2N0cmxMZWZ0JzogWzE3LCAzN10sXG4gICAgICAgICAgICAnY3RybERvd24nOiBbMTcsIDQwXSxcbiAgICAgICAgICAgICdzaGlmdFJpZ2h0JzogWzE2LCAzOV0sXG4gICAgICAgICAgICAnc2hpZnRVcCc6IFsxNiwgMzhdLFxuICAgICAgICAgICAgJ3NoaWZ0TGVmdCc6IFsxNiwgMzddLFxuICAgICAgICAgICAgJ3NoaWZ0RG93bic6IFsxNiwgNDBdLFxuICAgICAgICAgICAgJ2FsdFVwJzogWzE4LCAzOF0sXG4gICAgICAgICAgICAnYWx0UmlnaHQnOiBbMTgsIDM5XSxcbiAgICAgICAgICAgICdhbHRMZWZ0JzogWzE4LCAzN10sXG4gICAgICAgICAgICAnYWx0RG93bic6IFsxOCwgNDBdLFxuICAgICAgICAgICAgJ2N0cmxTaGlmdFVwJzogWzE2LCAxNywgMzhdXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVwaWNrZXI7XG5cbiAgICB2YXIgRGF0ZXBpY2tlciAgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLiRlbCA9ICQoZWwpO1xuXG4gICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucywgdGhpcy4kZWwuZGF0YSgpKTtcblxuICAgICAgICBpZiAoJGJvZHkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vcHRzLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbC5ub2RlTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICB0aGlzLmVsSXNJbnB1dCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRzLmFsdEZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLiRhbHRGaWVsZCA9IHR5cGVvZiB0aGlzLm9wdHMuYWx0RmllbGQgPT0gJ3N0cmluZycgPyAkKHRoaXMub3B0cy5hbHRGaWVsZCkgOiB0aGlzLm9wdHMuYWx0RmllbGQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTsgLy8gTmVlZCB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlbmRlcmluZ1xuXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLm9wdHMuc3RhcnREYXRlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy5vcHRzLnZpZXc7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy52aWV3cyA9IHt9O1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICB0aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gJyc7XG5cbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlciA9IERhdGVwaWNrZXI7XG5cbiAgICBkYXRlcGlja2VyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgVkVSU0lPTjogVkVSU0lPTixcbiAgICAgICAgdmlld0luZGV4ZXM6IFsnZGF5cycsICdtb250aHMnLCAneWVhcnMnXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lckJ1aWx0ICYmICF0aGlzLm9wdHMuaW5saW5lICYmIHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSk7XG4gICAgICAgICAgICB0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXh0cmEgY2xhc3NlcyBmb3IgcHJvcGVyIHRyYW5zaXRpb25zXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5rZXlib2FyZE5hdiAmJiAhdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRLZXlib2FyZEV2ZW50cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bkRhdGVwaWNrZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcERhdGVwaWNrZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlciA9IG5ldyAkLmZuLmRhdGVwaWNrZXIuVGltZXBpY2tlcih0aGlzLCB0aGlzLm9wdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRUaW1lcGlja2VyRXZlbnRzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCctb25seS10aW1lcGlja2VyLScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsIHRoaXMuY3VycmVudFZpZXcsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMubmF2ID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5OYXZpZ2F0aW9uKHRoaXMsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3O1xuXG4gICAgICAgICAgICB0aGlzLiRlbC5vbignY2xpY2tDZWxsLmFkcCcsIHRoaXMuX29uQ2xpY2tDZWxsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2VlbnRlcicsICcuZGF0ZXBpY2tlci0tY2VsbCcsIHRoaXMuX29uTW91c2VFbnRlckNlbGwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWxlYXZlJywgJy5kYXRlcGlja2VyLS1jZWxsJywgdGhpcy5fb25Nb3VzZUxlYXZlQ2VsbC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jcmVhdGVTaG9ydEN1dHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IHRoaXMub3B0cy5taW5EYXRlID8gdGhpcy5vcHRzLm1pbkRhdGUgOiBuZXcgRGF0ZSgtODYzOTk5OTkxMzYwMDAwMCk7XG4gICAgICAgICAgICB0aGlzLm1heERhdGUgPSB0aGlzLm9wdHMubWF4RGF0ZSA/IHRoaXMub3B0cy5tYXhEYXRlIDogbmV3IERhdGUoODYzOTk5OTkxMzYwMDAwMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRFdmVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbih0aGlzLm9wdHMuc2hvd0V2ZW50ICsgJy5hZHAnLCB0aGlzLl9vblNob3dFdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdtb3VzZXVwLmFkcCcsIHRoaXMuX29uTW91c2VVcEVsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2JsdXIuYWRwJywgdGhpcy5fb25CbHVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2tleXVwLmFkcCcsIHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYWRwJywgdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ21vdXNldXAuYWRwJywgdGhpcy5fb25Nb3VzZVVwQm9keS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEtleWJvYXJkRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5ZG93bi5hZHAnLCB0aGlzLl9vbktleURvd24uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5dXAuYWRwJywgdGhpcy5fb25LZXlVcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdob3RLZXkuYWRwJywgdGhpcy5fb25Ib3RLZXkuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRUaW1lcGlja2VyRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigndGltZUNoYW5nZS5hZHAnLCB0aGlzLl9vblRpbWVDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNXZWVrZW5kOiBmdW5jdGlvbiAoZGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLndlZWtlbmRzLmluZGV4T2YoZGF5KSAhPT0gLTE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2RlZmluZUxvY2FsZTogZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGFuZyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW2xhbmddO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgbGFuZ3VhZ2UgXCInICsgbGFuZyArICdcIiBpbiBEYXRlcGlja2VyLmxhbmd1YWdlLCB3aWxsIHVzZSBcInJ1XCIgaW5zdGVhZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbbGFuZ10pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5leHRlbmQodHJ1ZSwge30sICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSwgbGFuZylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5kYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IHRoaXMub3B0cy5kYXRlRm9ybWF0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLnRpbWVGb3JtYXQgPSB0aGlzLm9wdHMudGltZUZvcm1hdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmZpcnN0RGF5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmZpcnN0RGF5ID0gdGhpcy5vcHRzLmZpcnN0RGF5XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmRhdGVGb3JtYXQgPSBbdGhpcy5sb2MuZGF0ZUZvcm1hdCwgdGhpcy5sb2MudGltZUZvcm1hdF0uam9pbih0aGlzLm9wdHMuZGF0ZVRpbWVTZXBhcmF0b3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IHRoaXMubG9jLnRpbWVGb3JtYXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGJvdW5kYXJ5KCdhYScpKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goYm91bmRhcnkoJ0FBJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgIHRoaXMuYW1wbSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckJ1aWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICRib2R5LmFwcGVuZCgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiIGlkPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkZGF0ZXBpY2tlcnNDb250YWluZXIgPSAkKCcjZGF0ZXBpY2tlcnMtY29udGFpbmVyJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkYXBwZW5kVGFyZ2V0LFxuICAgICAgICAgICAgICAgICRpbmxpbmUgPSAkKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1pbmxpbmVcIj4nKTtcblxuICAgICAgICAgICAgaWYodGhpcy5lbC5ub2RlTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICRhcHBlbmRUYXJnZXQgPSAkZGF0ZXBpY2tlcnNDb250YWluZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGFwcGVuZFRhcmdldCA9ICRpbmxpbmUuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXBwZW5kVGFyZ2V0ID0gJGlubGluZS5hcHBlbmRUbyh0aGlzLiRlbClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlciA9ICQoYmFzZVRlbXBsYXRlKS5hcHBlbmRUbygkYXBwZW5kVGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRlbnQgPSAkKCcuZGF0ZXBpY2tlci0tY29udGVudCcsIHRoaXMuJGRhdGVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbmF2ID0gJCgnLmRhdGVwaWNrZXItLW5hdicsIHRoaXMuJGRhdGVwaWNrZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90cmlnZ2VyT25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIG11bHRpcGxlIG9uU2VsZWN0IGNhbGxiYWNrIHdpdGggc2FtZSBhcmd1bWVudCAoZW1wdHkgc3RyaW5nKSBpbiBJRTEwLTExXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID09PSAnJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0cy5vblNlbGVjdCgnJywgJycsIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRlcyA9IHRoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShzZWxlY3RlZERhdGVzWzBdKSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGF0ZXMgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQueWVhcixcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQubW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLmhvdXJzLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5taW51dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZERhdGVzID0gc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdERhdGUoX3RoaXMubG9jLmRhdGVGb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSkuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgZGF0ZXMgYXJyYXksIHRvIHNlcGFyYXRlIGl0IGZyb20gb3JpZ2luYWwgc2VsZWN0ZWREYXRlc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzIHx8IHRoaXMub3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGRhdGVzID0gc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkRGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSA9IGZvcm1hdHRlZERhdGVzO1xuICAgICAgICAgICAgdGhpcy5vcHRzLm9uU2VsZWN0KGZvcm1hdHRlZERhdGVzLCBkYXRlcywgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGQgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCArIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZU1vbnRoKSBvLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLCB0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciArIDEsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZVllYXIpIG8ub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgKyAxMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlRGVjYWRlKSBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGQgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZU1vbnRoKSBvLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLCB0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciAtIDEsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZVllYXIpIG8ub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgLSAxMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlRGVjYWRlKSBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9ybWF0RGF0ZTogZnVuY3Rpb24gKHN0cmluZywgZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUgfHwgdGhpcy5kYXRlO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHN0cmluZyxcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IHRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cCxcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSB0aGlzLmxvYyxcbiAgICAgICAgICAgICAgICBsZWFkaW5nWmVybyA9IGRhdGVwaWNrZXIuZ2V0TGVhZGluZ1plcm9OdW0sXG4gICAgICAgICAgICAgICAgZGVjYWRlID0gZGF0ZXBpY2tlci5nZXREZWNhZGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBmdWxsSG91cnMgPSBkLmZ1bGxIb3VycyxcbiAgICAgICAgICAgICAgICBob3VycyA9IGQuaG91cnMsXG4gICAgICAgICAgICAgICAgYW1wbSA9IHN0cmluZy5tYXRjaChib3VuZGFyeSgnYWEnKSkgfHwgc3RyaW5nLm1hdGNoKGJvdW5kYXJ5KCdBQScpKSxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAnYW0nLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VyID0gdGhpcy5fcmVwbGFjZXIsXG4gICAgICAgICAgICAgICAgdmFsaWRIb3VycztcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyICYmIHRoaXMudGltZXBpY2tlciAmJiBhbXBtKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRIb3VycyA9IHRoaXMudGltZXBpY2tlci5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKGRhdGUsIGFtcG0pO1xuICAgICAgICAgICAgICAgIGZ1bGxIb3VycyA9IGxlYWRpbmdaZXJvKHZhbGlkSG91cnMuaG91cnMpO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gdmFsaWRIb3Vycy5ob3VycztcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSB2YWxpZEhvdXJzLmRheVBlcmlvZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAvQC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvQC8sIGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9hYS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdhYScpLCBkYXlQZXJpb2QpO1xuICAgICAgICAgICAgICAgIGNhc2UgL0FBLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ0FBJyksIGRheVBlcmlvZC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9kZC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdkZCcpLCBkLmZ1bGxEYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9kLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2QnKSwgZC5kYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9ERC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdERCcpLCBsb2NhbGUuZGF5c1tkLmRheV0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL0QvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnRCcpLCBsb2NhbGUuZGF5c1Nob3J0W2QuZGF5XSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvbW0vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnbW0nKSwgZC5mdWxsTW9udGgpO1xuICAgICAgICAgICAgICAgIGNhc2UgL20vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnbScpLCBkLm1vbnRoICsgMSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvTU0vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnTU0nKSwgdGhpcy5sb2MubW9udGhzW2QubW9udGhdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9NLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ00nKSwgbG9jYWxlLm1vbnRoc1Nob3J0W2QubW9udGhdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9paS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdpaScpLCBkLmZ1bGxNaW51dGVzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9pLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2knKSwgZC5taW51dGVzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9oaC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdoaCcpLCBmdWxsSG91cnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2gvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaCcpLCBob3Vycyk7XG4gICAgICAgICAgICAgICAgY2FzZSAveXl5eTEvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXl5eTEnKSwgZGVjYWRlWzBdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5Mi8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eXl5MicpLCBkZWNhZGVbMV0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5Ly50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5JyksIGQueWVhcik7XG4gICAgICAgICAgICAgICAgY2FzZSAveS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5JyksIGQueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlcGxhY2VyOiBmdW5jdGlvbiAoc3RyLCByZWcsIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWcsIGZ1bmN0aW9uIChtYXRjaCwgcDEscDIscDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgKyBkYXRhICsgcDM7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRXb3JkQm91bmRhcnlSZWdFeHA6IGZ1bmN0aW9uIChzaWduKSB7XG4gICAgICAgICAgICB2YXIgc3ltYm9scyA9ICdcXFxcc3xcXFxcLnwtfC98XFxcXFxcXFx8LHxcXFxcJHxcXFxcIXxcXFxcP3w6fDsnO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58PnwnICsgc3ltYm9scyArICcpKCcgKyBzaWduICsgJykoJHw8fCcgKyBzeW1ib2xzICsgJyknLCAnZycpO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgc2VsZWN0RGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0cyA9IF90aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgZCA9IF90aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRlcyA9IF90aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgbGVuID0gc2VsZWN0ZWREYXRlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3REYXRlKGQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gZGF0ZTtcblxuICAgICAgICAgICAgLy8gU2V0IG5ldyB0aW1lIHZhbHVlcyBmcm9tIERhdGVcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9uIHRoaXMgc3RlcCB0aW1lcGlja2VyIHdpbGwgc2V0IHZhbGlkIHZhbHVlcyBpbiBpdCdzIGluc3RhbmNlXG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlcignc2VsZWN0RGF0ZScsIGRhdGUpO1xuXG4gICAgICAgICAgICAvLyBTZXQgY29ycmVjdCB0aW1lIHZhbHVlcyBhZnRlciB0aW1lcGlja2VyJ3MgdmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHNldHRpbmcgaG91cnMgb3IgbWludXRlcyB3aGljaCB2YWx1ZXMgYXJlIGxlc3NlciB0aGVuIGBtaW5gIHZhbHVlIG9yXG4gICAgICAgICAgICAvLyBncmVhdGVyIHRoZW4gYG1heGAgdmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX3RoaXMudmlldyA9PSAnZGF5cycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRNb250aCgpICE9IGQubW9udGggJiYgb3B0cy5tb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX3RoaXMudmlldyA9PSAneWVhcnMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RnVsbFllYXIoKSAhPSBkLnllYXIgJiYgb3B0cy5tb3ZlVG9PdGhlclllYXJzT25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3RGF0ZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMubmF2Ll9yZW5kZXIoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5tdWx0aXBsZURhdGVzICYmICFvcHRzLnJhbmdlKSB7IC8vIFNldCBwcmlvcml0eSB0byByYW5nZSBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA9PT0gb3B0cy5tdWx0aXBsZURhdGVzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5faXNTZWxlY3RlZChkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzLnB1c2goZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMucHVzaChkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5tYXhSYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU3dhcCBkYXRlcyBpZiB0aGV5IHdlcmUgc2VsZWN0ZWQgdmlhIGRwLnNlbGVjdERhdGUoKSBhbmQgc2Vjb25kIGRhdGUgd2FzIHNtYWxsZXIgdGhlbiBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5iaWdnZXIoX3RoaXMubWF4UmFuZ2UsIF90aGlzLm1pblJhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSBfdGhpcy5taW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW190aGlzLm1pblJhbmdlLCBfdGhpcy5tYXhSYW5nZV1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5hdXRvQ2xvc2UgJiYgIXRoaXMudGltZXBpY2tlcklzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLm11bHRpcGxlRGF0ZXMgJiYgIW9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5yYW5nZSAmJiBfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkLnNvbWUoZnVuY3Rpb24gKGN1ckRhdGUsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5pc1NhbWUoY3VyRGF0ZSwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubGFzdFNlbGVjdGVkRGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubGFzdFNlbGVjdGVkRGF0ZSA9IF90aGlzLnNlbGVjdGVkRGF0ZXNbX3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnZpZXdzW190aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyT25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICB0b2RheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5vcHRzLm1pblZpZXc7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50b2RheUJ1dHRvbiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5vcHRzLnRvZGF5QnV0dG9uKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgZGF0ZXBpY2tlciBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcGFyYW0gLSBwYXJhbWV0ZXIncyBuYW1lIHRvIHVwZGF0ZS4gSWYgb2JqZWN0IHRoZW4gaXQgd2lsbCBleHRlbmQgY3VycmVudCBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxPYmplY3R9IFt2YWx1ZV0gLSBuZXcgcGFyYW0gdmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHBhcmFtLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZSA9IHRoaXMubGFzdFNlbGVjdGVkRGF0ZTtcblxuICAgICAgICAgICAgaWYgKGxlbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzW3BhcmFtXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZW4gPT0gMSAmJiB0eXBlb2YgcGFyYW0gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCB0aGlzLm9wdHMsIHBhcmFtKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKTtcbiAgICAgICAgICAgIHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpO1xuICAgICAgICAgICAgdGhpcy5uYXYuX2FkZEJ1dHRvbnNJZk5lZWQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB0aGlzLm5hdi5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0ICYmICF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCctb25seS10aW1lcGlja2VyLScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlbGVjdGVkRGF0ZSkgdGhpcy50aW1lcGlja2VyLl9oYW5kbGVEYXRlKGxhc3RTZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fdXBkYXRlUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl91cGRhdGVDdXJyZW50VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBob3VycyBhbmQgbWludXRlcyBpZiBpdCdzIHZhbHVlcyBoYXZlIGJlZW4gY2hhbmdlZCB0aHJvdWdoIG1pbi9tYXggaG91cnMvbWludXRlc1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWxlY3RlZERhdGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3N5bmNXaXRoTWluTWF4RGF0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJUaW1lID0gdGhpcy5kYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblRpbWUgPiBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhUaW1lIDwgY3VyVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzU2VsZWN0ZWQ6IGZ1bmN0aW9uIChjaGVja0RhdGUsIGNlbGxUeXBlKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMuc29tZShmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmlzU2FtZShkYXRlLCBjaGVja0RhdGUsIGNlbGxUeXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldElucHV0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0cyA9IF90aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gX3RoaXMubG9jLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICAgICAgYWx0Rm9ybWF0ID0gb3B0cy5hbHRGaWVsZERhdGVGb3JtYXQsXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBfdGhpcy5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShmb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5hbHRGaWVsZCAmJiBfdGhpcy4kYWx0RmllbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzID0gdGhpcy5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShhbHRGb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzID0gYWx0VmFsdWVzLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsdEZpZWxkLnZhbChhbHRWYWx1ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICB0aGlzLiRlbC52YWwodmFsdWUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGRhdGUgaXMgYmV0d2VlbiBtaW5EYXRlIGFuZCBtYXhEYXRlXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIHtvYmplY3R9IC0gZGF0ZSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gLSBjZWxsIHR5cGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfaXNJblJhbmdlOiBmdW5jdGlvbiAoZGF0ZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIHRpbWUgPSBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIG1pbiA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpLFxuICAgICAgICAgICAgICAgIG1heCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpLFxuICAgICAgICAgICAgICAgIGRNaW5UaW1lID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBtaW4uZGF0ZSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIGRNYXhUaW1lID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBtYXguZGF0ZSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIHR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXk6IHRpbWUgPj0gdGhpcy5taW5UaW1lICYmIHRpbWUgPD0gdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICBtb250aDogZE1pblRpbWUgPj0gdGhpcy5taW5UaW1lICYmIGRNYXhUaW1lIDw9IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZC55ZWFyID49IG1pbi55ZWFyICYmIGQueWVhciA8PSBtYXgueWVhclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA/IHR5cGVzW3R5cGVdIDogdHlwZXMuZGF5XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERpbWVuc2lvbnM6IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkZWwub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICRlbC5vdXRlcldpZHRoKCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkZWwub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgICB0b3A6IG9mZnNldC50b3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF0ZUZyb21DZWxsOiBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgdmFyIGN1ckRhdGUgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgeWVhciA9IGNlbGwuZGF0YSgneWVhcicpIHx8IGN1ckRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBtb250aCA9IGNlbGwuZGF0YSgnbW9udGgnKSA9PSB1bmRlZmluZWQgPyBjdXJEYXRlLm1vbnRoIDogY2VsbC5kYXRhKCdtb250aCcpLFxuICAgICAgICAgICAgICAgIGRhdGUgPSBjZWxsLmRhdGEoJ2RhdGUnKSB8fCAxO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRQb3NpdGlvbkNsYXNzZXM6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgIHBvcyA9IHBvcy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIG1haW4gPSBwb3NbMF0sXG4gICAgICAgICAgICAgICAgc2VjID0gcG9zWzFdLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAnZGF0ZXBpY2tlciAtJyArIG1haW4gKyAnLScgKyBzZWMgKyAnLSAtZnJvbS0nICsgbWFpbiArICctJztcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkgY2xhc3NlcyArPSAnIGFjdGl2ZSc7XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2xhc3MnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjbGFzc2VzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRQb3NpdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IHRoaXMub3B0cy5wb3NpdGlvbjtcblxuICAgICAgICAgICAgdmFyIGRpbXMgPSB0aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGVsKSxcbiAgICAgICAgICAgICAgICBzZWxmRGltcyA9IHRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZGF0ZXBpY2tlciksXG4gICAgICAgICAgICAgICAgcG9zID0gcG9zaXRpb24uc3BsaXQoJyAnKSxcbiAgICAgICAgICAgICAgICB0b3AsIGxlZnQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5vcHRzLm9mZnNldCxcbiAgICAgICAgICAgICAgICBtYWluID0gcG9zWzBdLFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeSA9IHBvc1sxXTtcblxuICAgICAgICAgICAgc3dpdGNoIChtYWluKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgLSBzZWxmRGltcy5oZWlnaHQgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCArIGRpbXMud2lkdGggKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wICsgZGltcy5oZWlnaHQgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0IC0gc2VsZkRpbXMud2lkdGggLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goc2Vjb25kYXJ5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3A7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCArIGRpbXMud2lkdGggLSBzZWxmRGltcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodCAtIHNlbGZEaW1zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICgvbGVmdHxyaWdodC8udGVzdChtYWluKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodC8yIC0gc2VsZkRpbXMuaGVpZ2h0LzI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aC8yIC0gc2VsZkRpbXMud2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdG9wXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb25TaG93ID0gdGhpcy5vcHRzLm9uU2hvdztcblxuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAob25TaG93KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZFZpc2lvbkV2ZW50cyhvblNob3cpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9uSGlkZSA9IHRoaXMub3B0cy5vbkhpZGU7XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctMTAwMDAwcHgnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbC5ibHVyKCk7XG5cbiAgICAgICAgICAgIGlmIChvbkhpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKG9uSGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkb3duOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlVmlldyhkYXRlLCAnZG93bicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlVmlldyhkYXRlLCAndXAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZFZpc2lvbkV2ZW50czogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9mZigndHJhbnNpdGlvbmVuZC5kcCcpO1xuICAgICAgICAgICAgZXZlbnQodGhpcywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbmUoJ3RyYW5zaXRpb25lbmQuZHAnLCBldmVudC5iaW5kKHRoaXMsIHRoaXMsIHRydWUpKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9jaGFuZ2VWaWV3OiBmdW5jdGlvbiAoZGF0ZSwgZGlyKSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZSB8fCB0aGlzLmZvY3VzZWQgfHwgdGhpcy5kYXRlO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFZpZXcgPSBkaXIgPT0gJ3VwJyA/IHRoaXMudmlld0luZGV4ICsgMSA6IHRoaXMudmlld0luZGV4IC0gMTtcbiAgICAgICAgICAgIGlmIChuZXh0VmlldyA+IDIpIG5leHRWaWV3ID0gMjtcbiAgICAgICAgICAgIGlmIChuZXh0VmlldyA8IDApIG5leHRWaWV3ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHRoaXMudmlld0luZGV4ZXNbbmV4dFZpZXddO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2hhbmRsZUhvdEtleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSksXG4gICAgICAgICAgICAgICAgZm9jdXNlZFBhcnNlZCxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzLFxuICAgICAgICAgICAgICAgIG5ld0RhdGUsXG4gICAgICAgICAgICAgICAgdG90YWxEYXlzSW5OZXh0TW9udGgsXG4gICAgICAgICAgICAgICAgbW9udGhDaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgeWVhckNoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgeSA9IGRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5kYXRlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFVwJzpcbiAgICAgICAgICAgICAgICAgICAgbSArPSAxO1xuICAgICAgICAgICAgICAgICAgICBtb250aENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybERvd24nOlxuICAgICAgICAgICAgICAgICAgICBtIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0VXAnOlxuICAgICAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdERvd24nOlxuICAgICAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0UmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdFVwJzpcbiAgICAgICAgICAgICAgICAgICAgZGVjYWRlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdExlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdERvd24nOlxuICAgICAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFNoaWZ0VXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbERheXNJbk5leHRNb250aCA9IGRhdGVwaWNrZXIuZ2V0RGF5c0NvdW50KG5ldyBEYXRlKHksbSkpO1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHksbSxkKTtcblxuICAgICAgICAgICAgLy8gSWYgbmV4dCBtb250aCBoYXMgbGVzcyBkYXlzIHRoYW4gY3VycmVudCwgc2V0IGRhdGUgdG8gdG90YWwgZGF5cyBpbiB0aGF0IG1vbnRoXG4gICAgICAgICAgICBpZiAodG90YWxEYXlzSW5OZXh0TW9udGggPCBkKSBkID0gdG90YWxEYXlzSW5OZXh0TW9udGg7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG5ld0RhdGUgaXMgaW4gdmFsaWQgcmFuZ2VcbiAgICAgICAgICAgIGlmIChuZXdEYXRlLmdldFRpbWUoKSA8IHRoaXMubWluVGltZSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0RhdGUuZ2V0VGltZSgpID4gdGhpcy5tYXhUaW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gbmV3RGF0ZTtcblxuICAgICAgICAgICAgZm9jdXNlZFBhcnNlZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShuZXdEYXRlKTtcbiAgICAgICAgICAgIGlmIChtb250aENoYW5nZWQgJiYgby5vbkNoYW5nZU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgby5vbkNoYW5nZU1vbnRoKGZvY3VzZWRQYXJzZWQubW9udGgsIGZvY3VzZWRQYXJzZWQueWVhcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5ZWFyQ2hhbmdlZCAmJiBvLm9uQ2hhbmdlWWVhcikge1xuICAgICAgICAgICAgICAgIG8ub25DaGFuZ2VZZWFyKGZvY3VzZWRQYXJzZWQueWVhcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWNhZGVDaGFuZ2VkICYmIG8ub25DaGFuZ2VEZWNhZGUpIHtcbiAgICAgICAgICAgICAgICBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlcktleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGV4aXN0cyA9IHRoaXMua2V5cy5zb21lKGZ1bmN0aW9uIChjdXJLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyS2V5ID09IGtleTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cy5wdXNoKGtleSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdW5SZWdpc3RlcktleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICAgICAgdGhpcy5rZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzSG90S2V5UHJlc3NlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRIb3RLZXksXG4gICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcHJlc3NlZEtleXMgPSB0aGlzLmtleXMuc29ydCgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBob3RLZXkgaW4gaG90S2V5cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRIb3RLZXkgPSBob3RLZXlzW2hvdEtleV07XG4gICAgICAgICAgICAgICAgaWYgKHByZXNzZWRLZXlzLmxlbmd0aCAhPSBjdXJyZW50SG90S2V5Lmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhvdEtleS5ldmVyeShmdW5jdGlvbiAoa2V5LCBpKSB7IHJldHVybiBrZXkgPT0gcHJlc3NlZEtleXNbaV19KSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlcignaG90S2V5JywgaG90S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90cmlnZ2VyOiBmdW5jdGlvbiAoZXZlbnQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnRyaWdnZXIoZXZlbnQsIGFyZ3MpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2ZvY3VzTmV4dENlbGw6IGZ1bmN0aW9uIChrZXlDb2RlLCB0eXBlKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCB0aGlzLmNlbGxUeXBlO1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvdEtleVByZXNzZWQoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkIC09IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtIC09IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkIC09IDcpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtIC09IDMpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgLT0gNCkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkICs9IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtICs9IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZG93blxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgKz0gNykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gKz0gMykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSArPSA0KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5kID0gbmV3IERhdGUoeSxtLGQpO1xuICAgICAgICAgICAgaWYgKG5kLmdldFRpbWUoKSA8IHRoaXMubWluVGltZSkge1xuICAgICAgICAgICAgICAgIG5kID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZC5nZXRUaW1lKCkgPiB0aGlzLm1heFRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZCA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gbmQ7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Rm9jdXNlZERhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmb2N1c2VkICA9IHRoaXMuZm9jdXNlZCB8fCB0aGlzLnNlbGVjdGVkRGF0ZXNbdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgICAgIGQgPSB0aGlzLnBhcnNlZERhdGU7XG5cbiAgICAgICAgICAgIGlmICghZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZCA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCwgbmV3IERhdGUoKS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvY3VzZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldENlbGw6IGZ1bmN0aW9uIChkYXRlLCB0eXBlKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCB0aGlzLmNlbGxUeXBlO1xuXG4gICAgICAgICAgICB2YXIgZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcuZGF0ZXBpY2tlci0tY2VsbFtkYXRhLXllYXI9XCInICsgZC55ZWFyICsgJ1wiXScsXG4gICAgICAgICAgICAgICAgJGNlbGw7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnW2RhdGEtbW9udGg9XCInICsgZC5tb250aCArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciArPSAnW2RhdGEtbW9udGg9XCInICsgZC5tb250aCArICdcIl1bZGF0YS1kYXRlPVwiJyArIGQuZGF0ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjZWxsID0gdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS4kZWwuZmluZChzZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIHJldHVybiAkY2VsbC5sZW5ndGggPyAkY2VsbCA6ICQoJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBfdGhpcy4kZWxcbiAgICAgICAgICAgICAgICAub2ZmKCcuYWRwJylcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicsICcnKTtcblxuICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICAgICAgX3RoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgX3RoaXMudmlld3MgPSB7fTtcbiAgICAgICAgICAgIF90aGlzLmtleXMgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5pbmxpbmUgfHwgIV90aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRkYXRlcGlja2VyLmNsb3Nlc3QoJy5kYXRlcGlja2VyLWlubGluZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZGF0ZXBpY2tlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXM6IGZ1bmN0aW9uIChhbHJlYWR5U2VsZWN0ZWQsIHNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBwb3NzaWJpbGl0eSB0byBzZWxlY3Qgc2FtZSBkYXRlIHdoZW4gcmFuZ2UgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdjbGlja0NlbGwnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGF0ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgbGFzdCBzZWxlY3RlZCBkYXRlIHRvIGJlIGFibGUgdG8gY2hhbmdlIHRpbWUgd2hlbiBjbGlja2luZyBvbiB0aGlzIGNlbGxcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gYWxyZWFkeVNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUoYWxyZWFkeVNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25TaG93RXZlbnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkJsdXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbkZvY3VzICYmIHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRG93bkRhdGVwaWNrZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLmluRm9jdXMgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBEYXRlcGlja2VyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWUub3JpZ2luYWxFdmVudC50aW1lcGlja2VyRm9jdXMpIHRoaXMuJGVsLmZvY3VzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uS2V5VXBHZW5lcmFsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuJGVsLnZhbCgpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25SZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcEJvZHk6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LmluRm9jdXMpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiAhdGhpcy5pbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcEVsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5vcmlnaW5hbEV2ZW50LmluRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpLDQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbktleURvd246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcktleShjb2RlKTtcblxuICAgICAgICAgICAgLy8gQXJyb3dzXG4gICAgICAgICAgICBpZiAoY29kZSA+PSAzNyAmJiBjb2RlIDw9IDQwKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZvY3VzTmV4dENlbGwoY29kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVudGVyXG4gICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKS5oYXNDbGFzcygnLWRpc2FibGVkLScpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgIT0gdGhpcy5vcHRzLm1pblZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bigpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5faXNTZWxlY3RlZCh0aGlzLmZvY3VzZWQsIHRoaXMuY2VsbFR5cGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuZm9jdXNlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMoYWxyZWFkeVNlbGVjdGVkLCB0aGlzLmZvY3VzZWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVzY1xuICAgICAgICAgICAgaWYgKGNvZGUgPT0gMjcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25LZXlVcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDtcbiAgICAgICAgICAgIHRoaXMuX3VuUmVnaXN0ZXJLZXkoY29kZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uSG90S2V5OiBmdW5jdGlvbiAoZSwgaG90S2V5KSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVIb3RLZXkoaG90S2V5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUVudGVyQ2VsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyksXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMuX2dldERhdGVGcm9tQ2VsbCgkY2VsbCk7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZnJvbSB1bm5lY2Vzc2FyeSByZW5kZXJpbmcgYW5kIHNldHRpbmcgbmV3IGN1cnJlbnREYXRlXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSAnJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkY2VsbC5hZGRDbGFzcygnLWZvY3VzLScpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSAmJiB0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gdGhpcy5zZWxlY3RlZERhdGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5sZXNzKHRoaXMubWluUmFuZ2UsIHRoaXMuZm9jdXNlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9IHRoaXMubWluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fdXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VMZWF2ZUNlbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGNlbGwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZGF0ZXBpY2tlci0tY2VsbCcpO1xuXG4gICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnLWZvY3VzLScpO1xuXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uVGltZUNoYW5nZTogZnVuY3Rpb24gKGUsIGgsIG0pIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5sYXN0U2VsZWN0ZWREYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlLnNldEhvdXJzKGgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG0pO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkICYmICF0aGlzLl9nZXRDZWxsKGRhdGUpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja0NlbGw6IGZ1bmN0aW9uIChlLCBkYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGZvY3VzZWQodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXZhbCAmJiB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGNlbGwgPSB0aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJGNlbGwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjZWxsLnJlbW92ZUNsYXNzKCctZm9jdXMtJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdmFsO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSAmJiB0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gdGhpcy5zZWxlY3RlZERhdGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5sZXNzKHRoaXMubWluUmFuZ2UsIHRoaXMuX2ZvY3VzZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSB0aGlzLm1pblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2lsZW50KSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB2YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGZvY3VzZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgcGFyc2VkRGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5kYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZGF0ZSAodmFsKSB7XG4gICAgICAgICAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gdmFsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0ZWQgJiYgIXRoaXMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLnZpZXddLl9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdi5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiB0aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZGF0ZSAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RGF0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldCB2aWV3ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0luZGV4ID0gdGhpcy52aWV3SW5kZXhlcy5pbmRleE9mKHZhbCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldlZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3O1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZhbDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZpZXdzW3ZhbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3c1t2YWxdID0gbmV3ICAkLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLCB2YWwsIHRoaXMub3B0cylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3ZhbF0uX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5wcmV2Vmlld10uaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdmFsXS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXYuX3JlbmRlcigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbkNoYW5nZVZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyh2YWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsSXNJbnB1dCAmJiB0aGlzLnZpc2libGUpIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCB2aWV3KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGNlbGxUeXBlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdWJzdHJpbmcoMCwgdGhpcy52aWV3Lmxlbmd0aCAtIDEpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1pblRpbWUoKSB7XG4gICAgICAgICAgICB2YXIgbWluID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUobWluLnllYXIsIG1pbi5tb250aCwgbWluLmRhdGUpLmdldFRpbWUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBtYXhUaW1lKCkge1xuICAgICAgICAgICAgdmFyIG1heCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1heC55ZWFyLCBtYXgubW9udGgsIG1heC5kYXRlKS5nZXRUaW1lKClcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgY3VyRGVjYWRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVwaWNrZXIuZ2V0RGVjYWRlKHRoaXMuZGF0ZSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyAgVXRpbHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBkYXRlcGlja2VyLmdldERheXNDb3VudCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBmdWxsTW9udGg6IChkYXRlLmdldE1vbnRoKCkgKyAxKSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMSwgLy8gT25lIGJhc2VkXG4gICAgICAgICAgICBkYXRlOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIGZ1bGxEYXRlOiBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIGRheTogZGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgIGhvdXJzOiBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgICAgICBmdWxsSG91cnM6ICBkYXRlLmdldEhvdXJzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0SG91cnMoKSA6ICBkYXRlLmdldEhvdXJzKCkgLFxuICAgICAgICAgICAgbWludXRlczogZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICBmdWxsTWludXRlczogIGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSA6ICBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuZ2V0RGVjYWRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgdmFyIGZpcnN0WWVhciA9IE1hdGguZmxvb3IoZGF0ZS5nZXRGdWxsWWVhcigpIC8gMTApICogMTA7XG5cbiAgICAgICAgcmV0dXJuIFtmaXJzdFllYXIsIGZpcnN0WWVhciArIDldO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLnRlbXBsYXRlID0gZnVuY3Rpb24gKHN0ciwgZGF0YSkge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyNcXHsoW1xcd10rKVxcfS9nLCBmdW5jdGlvbiAoc291cmNlLCBtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGRhdGFbbWF0Y2hdIHx8IGRhdGFbbWF0Y2hdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbbWF0Y2hdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmlzU2FtZSA9IGZ1bmN0aW9uIChkYXRlMSwgZGF0ZTIsIHR5cGUpIHtcbiAgICAgICAgaWYgKCFkYXRlMSB8fCAhZGF0ZTIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGQxID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUxKSxcbiAgICAgICAgICAgIGQyID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUyKSxcbiAgICAgICAgICAgIF90eXBlID0gdHlwZSA/IHR5cGUgOiAnZGF5JyxcblxuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkYXk6IGQxLmRhdGUgPT0gZDIuZGF0ZSAmJiBkMS5tb250aCA9PSBkMi5tb250aCAmJiBkMS55ZWFyID09IGQyLnllYXIsXG4gICAgICAgICAgICAgICAgbW9udGg6IGQxLm1vbnRoID09IGQyLm1vbnRoICYmIGQxLnllYXIgPT0gZDIueWVhcixcbiAgICAgICAgICAgICAgICB5ZWFyOiBkMS55ZWFyID09IGQyLnllYXJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbnNbX3R5cGVdO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmxlc3MgPSBmdW5jdGlvbiAoZGF0ZUNvbXBhcmVUbywgZGF0ZSwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGVDb21wYXJlVG8gfHwgIWRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIDwgZGF0ZUNvbXBhcmVUby5nZXRUaW1lKCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuYmlnZ2VyID0gZnVuY3Rpb24gKGRhdGVDb21wYXJlVG8sIGRhdGUsIHR5cGUpIHtcbiAgICAgICAgaWYgKCFkYXRlQ29tcGFyZVRvIHx8ICFkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKSA+IGRhdGVDb21wYXJlVG8uZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmdldExlYWRpbmdaZXJvTnVtID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtKSA8IDEwID8gJzAnICsgbnVtIDogbnVtO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvcHkgb2YgZGF0ZSB3aXRoIGhvdXJzIGFuZCBtaW51dGVzIGVxdWFscyB0byAwXG4gICAgICogQHBhcmFtIGRhdGUge0RhdGV9XG4gICAgICovXG4gICAgZGF0ZXBpY2tlci5yZXNldFRpbWUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGUgIT0gJ29iamVjdCcpIHJldHVybjtcbiAgICAgICAgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXRlKVxuICAgIH07XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEkLmRhdGEodGhpcywgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgIHBsdWdpbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlcGlja2VyKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSAkLmRhdGEodGhpcywgcGx1Z2luTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgX3RoaXMub3B0cywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIuQ29uc3RydWN0b3IgPSBEYXRlcGlja2VyO1xuXG4gICAgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlID0ge1xuICAgICAgICBydToge1xuICAgICAgICAgICAgZGF5czogWyfQktC+0YHQutGA0LXRgdC10L3RjNC1JywgJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonLCAn0JLRgtC+0YDQvdC40LonLCAn0KHRgNC10LTQsCcsICfQp9C10YLQstC10YDQsycsICfQn9GP0YLQvdC40YbQsCcsICfQodGD0LHQsdC+0YLQsCddLFxuICAgICAgICAgICAgZGF5c1Nob3J0OiBbJ9CS0L7RgScsJ9Cf0L7QvScsJ9CS0YLQvicsJ9Ch0YDQtScsJ9Cn0LXRgicsJ9Cf0Y/RgicsJ9Ch0YPQsSddLFxuICAgICAgICAgICAgZGF5c01pbjogWyfQktGBJywn0J/QvScsJ9CS0YInLCfQodGAJywn0KfRgicsJ9Cf0YInLCfQodCxJ10sXG4gICAgICAgICAgICBtb250aHM6IFsn0K/QvdCy0LDRgNGMJywgJ9Ck0LXQstGA0LDQu9GMJywgJ9Cc0LDRgNGCJywgJ9CQ0L/RgNC10LvRjCcsICfQnNCw0LknLCAn0JjRjtC90YwnLCAn0JjRjtC70YwnLCAn0JDQstCz0YPRgdGCJywgJ9Ch0LXQvdGC0Y/QsdGA0YwnLCAn0J7QutGC0Y/QsdGA0YwnLCAn0J3QvtGP0LHRgNGMJywgJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAgICAgICAgICBtb250aHNTaG9ydDogWyfQr9C90LInLCAn0KTQtdCyJywgJ9Cc0LDRgCcsICfQkNC/0YAnLCAn0JzQsNC5JywgJ9CY0Y7QvScsICfQmNGO0LsnLCAn0JDQstCzJywgJ9Ch0LXQvScsICfQntC60YInLCAn0J3QvtGPJywgJ9CU0LXQuiddLFxuICAgICAgICAgICAgdG9kYXk6ICfQodC10LPQvtC00L3RjycsXG4gICAgICAgICAgICBjbGVhcjogJ9Ce0YfQuNGB0YLQuNGC0YwnLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgICAgICBmaXJzdERheTogMVxuICAgICAgICB9LFxuICAgICAgICBjczoge1xuICAgICAgICAgICAgZGF5czogWydOZWTEm2xlJywgJ1BvbmTEm2zDrScsICfDmnRlcsO9JywgJ1N0xZllZGEnLCAnxIx0dnJ0ZWsnLCAnUMOhdGVrJywgJ1NvYm90YSddLFxuICAgICAgICAgICAgZGF5c1Nob3J0OiBbJ05lJywgJ1BvJywgJ8OadCcsICdTdCcsICfEjHQnLCAnUMOhJywgJ1NvJ10sXG4gICAgICAgICAgICBkYXlzTWluOiBbJ05lJywgJ1BvJywgJ8OadCcsICdTdCcsICfEjHQnLCAnUMOhJywgJ1NvJ10sXG4gICAgICAgICAgICBtb250aHM6IFsnTGVkZW4nLCAnw5pub3InLCAnQsWZZXplbicsICdEdWJlbicsICdLdsSbdGVuJywgJ8SMZXJ2ZW4nLCAnxIxlcnZlbmVjJywgJ1NycGVuJywgJ1rDocWZw60nLCAnxZjDrWplbicsICdMaXN0b3BhZCcsICdQcm9zaW5lYyddLFxuICAgICAgICAgICAgbW9udGhzU2hvcnQ6IFsnTGVkJywgJ8Oabm8nLCAnQsWZZScsICdEdWInLCAnS3bEmycsICfEjHZuJywgJ8SMdmMnLCAnU3JwJywgJ1rDocWZJywgJ8WYw61qJywgJ0xpcycsICdQcm8nXSxcbiAgICAgICAgICAgIHRvZGF5OiAnRG5lcycsXG4gICAgICAgICAgICBjbGVhcjogJ1Z5bWF6YXQnLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgICAgICBmaXJzdERheTogMSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoYXV0b0luaXRTZWxlY3RvcikuZGF0ZXBpY2tlcigpO1xuICAgIH0pXG5cbn0pKCk7XG5cbjsoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZW1wbGF0ZXMgPSB7XG4gICAgICAgIGRheXM6JycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMtbmFtZXNcIj48L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1kYXlzXCI+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICBtb250aHM6ICcnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1tb250aHMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLW1vbnRoc1wiPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgeWVhcnM6ICcnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS15ZWFycyBkYXRlcGlja2VyLS1ib2R5XCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMteWVhcnNcIj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZXBpY2tlciA9ICQuZm4uZGF0ZXBpY2tlcixcbiAgICAgICAgZHAgPSBkYXRlcGlja2VyLkNvbnN0cnVjdG9yO1xuXG4gICAgZGF0ZXBpY2tlci5Cb2R5ID0gZnVuY3Rpb24gKGQsIHR5cGUsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5kID0gZDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy4kZWwgPSAkKCcnKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSByZXR1cm47XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLkJvZHkucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLWNlbGwnLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tDZWxsLCB0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJCh0ZW1wbGF0ZXNbdGhpcy50eXBlXSkuYXBwZW5kVG8odGhpcy5kLiRjb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJG5hbWVzID0gJCgnLmRhdGVwaWNrZXItLWRheXMtbmFtZXMnLCB0aGlzLiRlbCk7XG4gICAgICAgICAgICB0aGlzLiRjZWxscyA9ICQoJy5kYXRlcGlja2VyLS1jZWxscycsIHRoaXMuJGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF5TmFtZXNIdG1sOiBmdW5jdGlvbiAoZmlyc3REYXksIGN1ckRheSwgaHRtbCwgaSkge1xuICAgICAgICAgICAgY3VyRGF5ID0gY3VyRGF5ICE9IHVuZGVmaW5lZCA/IGN1ckRheSA6IGZpcnN0RGF5O1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwgPyBodG1sIDogJyc7XG4gICAgICAgICAgICBpID0gaSAhPSB1bmRlZmluZWQgPyBpIDogMDtcblxuICAgICAgICAgICAgaWYgKGkgPiA3KSByZXR1cm4gaHRtbDtcbiAgICAgICAgICAgIGlmIChjdXJEYXkgPT0gNykgcmV0dXJuIHRoaXMuX2dldERheU5hbWVzSHRtbChmaXJzdERheSwgMCwgaHRtbCwgKytpKTtcblxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheS1uYW1lJyArICh0aGlzLmQuaXNXZWVrZW5kKGN1ckRheSkgPyBcIiAtd2Vla2VuZC1cIiA6IFwiXCIpICsgJ1wiPicgKyB0aGlzLmQubG9jLmRheXNNaW5bY3VyRGF5XSArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKGZpcnN0RGF5LCArK2N1ckRheSwgaHRtbCwgKytpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q2VsbENvbnRlbnRzOiBmdW5jdGlvbiAoZGF0ZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBcImRhdGVwaWNrZXItLWNlbGwgZGF0ZXBpY2tlci0tY2VsbC1cIiArIHR5cGUsXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuZCxcbiAgICAgICAgICAgICAgICBtaW5SYW5nZSA9IGRwLnJlc2V0VGltZShwYXJlbnQubWluUmFuZ2UpLFxuICAgICAgICAgICAgICAgIG1heFJhbmdlID0gZHAucmVzZXRUaW1lKHBhcmVudC5tYXhSYW5nZSksXG4gICAgICAgICAgICAgICAgb3B0cyA9IHBhcmVudC5vcHRzLFxuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHJlbmRlciA9IHt9LFxuICAgICAgICAgICAgICAgIGh0bWwgPSBkLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuaXNXZWVrZW5kKGQuZGF5KSkgY2xhc3NlcyArPSBcIiAtd2Vla2VuZC1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9udGggIT0gdGhpcy5kLnBhcnNlZERhdGUubW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLW90aGVyLW1vbnRoLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNlbGVjdE90aGVyTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSBcIiAtZGlzYWJsZWQtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2hvd090aGVyTW9udGhzKSBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICBodG1sID0gcGFyZW50LmxvY1twYXJlbnQub3B0cy5tb250aHNGaWVsZF1bZC5tb250aF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjYWRlID0gcGFyZW50LmN1ckRlY2FkZTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IGQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQueWVhciA8IGRlY2FkZVswXSB8fCBkLnllYXIgPiBkZWNhZGVbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtb3RoZXItZGVjYWRlLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2VsZWN0T3RoZXJZZWFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLWRpc2FibGVkLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dPdGhlclllYXJzKSBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uUmVuZGVyQ2VsbCkge1xuICAgICAgICAgICAgICAgIHJlbmRlciA9IG9wdHMub25SZW5kZXJDZWxsKGRhdGUsIHR5cGUpIHx8IHt9O1xuICAgICAgICAgICAgICAgIGh0bWwgPSByZW5kZXIuaHRtbCA/IHJlbmRlci5odG1sIDogaHRtbDtcbiAgICAgICAgICAgICAgICBjbGFzc2VzICs9IHJlbmRlci5jbGFzc2VzID8gJyAnICsgcmVuZGVyLmNsYXNzZXMgOiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHAuaXNTYW1lKG1pblJhbmdlLCBkYXRlLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1yYW5nZS1mcm9tLSc7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShtYXhSYW5nZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtcmFuZ2UtdG8tJztcblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSAmJiBwYXJlbnQuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5sZXNzKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChkcC5sZXNzKG1heFJhbmdlLCBkYXRlKSAmJiBkcC5iaWdnZXIocGFyZW50LmZvY3VzZWQsIGRhdGUpKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkgJiYgZHAuaXNTYW1lKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1yYW5nZS1mcm9tLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5pc1NhbWUocGFyZW50LmZvY3VzZWQsIGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLXJhbmdlLXRvLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnQuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5sZXNzKG1heFJhbmdlLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShjdXJyZW50RGF0ZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtY3VycmVudC0nO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5mb2N1c2VkICYmIGRwLmlzU2FtZShkYXRlLCBwYXJlbnQuZm9jdXNlZCwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtZm9jdXMtJztcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2lzU2VsZWN0ZWQoZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtc2VsZWN0ZWQtJztcbiAgICAgICAgICAgIGlmICghcGFyZW50Ll9pc0luUmFuZ2UoZGF0ZSwgdHlwZSkgfHwgcmVuZGVyLmRpc2FibGVkKSBjbGFzc2VzICs9ICcgLWRpc2FibGVkLSc7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGN1bGF0ZXMgZGF5cyBudW1iZXIgdG8gcmVuZGVyLiBHZW5lcmF0ZXMgZGF5cyBodG1sIGFuZCByZXR1cm5zIGl0LlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0ZSAtIERhdGUgb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0RGF5c0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgdG90YWxNb250aERheXMgPSBkcC5nZXREYXlzQ291bnQoZGF0ZSksXG4gICAgICAgICAgICAgICAgZmlyc3RNb250aERheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBsYXN0TW9udGhEYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgdG90YWxNb250aERheXMpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGRheXNGcm9tUGV2TW9udGggPSBmaXJzdE1vbnRoRGF5IC0gdGhpcy5kLmxvYy5maXJzdERheSxcbiAgICAgICAgICAgICAgICBkYXlzRnJvbU5leHRNb250aCA9IDYgLSBsYXN0TW9udGhEYXkgKyB0aGlzLmQubG9jLmZpcnN0RGF5O1xuXG4gICAgICAgICAgICBkYXlzRnJvbVBldk1vbnRoID0gZGF5c0Zyb21QZXZNb250aCA8IDAgPyBkYXlzRnJvbVBldk1vbnRoICsgNyA6IGRheXNGcm9tUGV2TW9udGg7XG4gICAgICAgICAgICBkYXlzRnJvbU5leHRNb250aCA9IGRheXNGcm9tTmV4dE1vbnRoID4gNiA/IGRheXNGcm9tTmV4dE1vbnRoIC0gNyA6IGRheXNGcm9tTmV4dE1vbnRoO1xuXG4gICAgICAgICAgICB2YXIgc3RhcnREYXlJbmRleCA9IC1kYXlzRnJvbVBldk1vbnRoICsgMSxcbiAgICAgICAgICAgICAgICBtLCB5LFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0RGF5SW5kZXgsIG1heCA9IHRvdGFsTW9udGhEYXlzICsgZGF5c0Zyb21OZXh0TW9udGg7IGkgPD0gbWF4OyBpKyspIHtcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCk7XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldERheUh0bWwobmV3IERhdGUoeSwgbSwgaSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREYXlIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEtZGF0ZT1cIicgKyBkYXRlLmdldERhdGUoKSArICdcIiAnICtcbiAgICAgICAgICAgICAgICAnZGF0YS1tb250aD1cIicgKyBkYXRlLmdldE1vbnRoKCkgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEteWVhcj1cIicgKyBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnXCI+JyArIGNvbnRlbnQuaHRtbCArICc8L2Rpdj4nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgbW9udGhzIGh0bWxcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGUgLSBkYXRlIGluc3RhbmNlXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0TW9udGhzSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlKGkgPCAxMikge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5fZ2V0TW9udGhIdG1sKG5ldyBEYXRlKGQueWVhciwgaSkpO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0TW9udGhIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ21vbnRoJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgZGF0YS1tb250aD1cIicgKyBkYXRlLmdldE1vbnRoKCkgKyAnXCI+JyArIGNvbnRlbnQuaHRtbCArICc8L2Rpdj4nXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFllYXJzSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBkZWNhZGUgPSBkcC5nZXREZWNhZGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZmlyc3RZZWFyID0gZGVjYWRlWzBdIC0gMSxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgaSA9IGZpcnN0WWVhcjtcblxuICAgICAgICAgICAgZm9yIChpOyBpIDw9IGRlY2FkZVsxXSArIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5fZ2V0WWVhckh0bWwobmV3IERhdGUoaSAsIDApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFllYXJIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ3llYXInKTtcblxuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIGNvbnRlbnQuY2xhc3NlcyArICdcIiBkYXRhLXllYXI9XCInICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+J1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJUeXBlczoge1xuICAgICAgICAgICAgZGF5czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXlOYW1lcyA9IHRoaXMuX2dldERheU5hbWVzSHRtbCh0aGlzLmQubG9jLmZpcnN0RGF5KSxcbiAgICAgICAgICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2dldERheXNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRjZWxscy5odG1sKGRheXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hbWVzLmh0bWwoZGF5TmFtZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW9udGhzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLl9nZXRNb250aHNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRjZWxscy5odG1sKGh0bWwpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWVhcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IHRoaXMuX2dldFllYXJzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChodG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclR5cGVzW3RoaXMudHlwZV0uYmluZCh0aGlzKSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbHMgPSAkKCcuZGF0ZXBpY2tlci0tY2VsbCcsIHRoaXMuJGNlbGxzKSxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAkY2VsbCxcbiAgICAgICAgICAgICAgICBkYXRlO1xuICAgICAgICAgICAgJGNlbGxzLmVhY2goZnVuY3Rpb24gKGNlbGwsIGkpIHtcbiAgICAgICAgICAgICAgICAkY2VsbCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IF90aGlzLmQuX2dldERhdGVGcm9tQ2VsbCgkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gX3RoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCBfdGhpcy5kLmNlbGxUeXBlKTtcbiAgICAgICAgICAgICAgICAkY2VsbC5hdHRyKCdjbGFzcycsY2xhc3Nlcy5jbGFzc2VzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5hY2l0dmUgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gIEV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgX2hhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gZWwuZGF0YSgnZGF0ZScpIHx8IDEsXG4gICAgICAgICAgICAgICAgbW9udGggPSBlbC5kYXRhKCdtb250aCcpIHx8IDAsXG4gICAgICAgICAgICAgICAgeWVhciA9IGVsLmRhdGEoJ3llYXInKSB8fCB0aGlzLmQucGFyc2VkRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIGRwID0gdGhpcy5kO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIHZpZXcgaWYgbWluIHZpZXcgZG9lcyBub3QgcmVhY2ggeWV0XG4gICAgICAgICAgICBpZiAoZHAudmlldyAhPSB0aGlzLm9wdHMubWluVmlldykge1xuICAgICAgICAgICAgICAgIGRwLmRvd24obmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZWxlY3QgZGF0ZSBpZiBtaW4gdmlldyBpcyByZWFjaGVkXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpLFxuICAgICAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMuZC5faXNTZWxlY3RlZChzZWxlY3RlZERhdGUsIHRoaXMuZC5jZWxsVHlwZSk7XG5cbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgZHAuX3RyaWdnZXIoJ2NsaWNrQ2VsbCcsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcC5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMuYmluZChkcCwgYWxyZWFkeVNlbGVjdGVkLCBzZWxlY3RlZERhdGUpKCk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja0NlbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmRhdGVwaWNrZXItLWNlbGwnKTtcblxuICAgICAgICAgICAgaWYgKCRlbC5oYXNDbGFzcygnLWRpc2FibGVkLScpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcykoJGVsKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwicHJldlwiPiN7cHJldkh0bWx9PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCI+I3t0aXRsZX08L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+I3tuZXh0SHRtbH08L2Rpdj4nLFxuICAgICAgICBidXR0b25zQ29udGFpbmVyVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvbnNcIj48L2Rpdj4nLFxuICAgICAgICBidXR0b24gPSAnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25cIiBkYXRhLWFjdGlvbj1cIiN7YWN0aW9ufVwiPiN7bGFiZWx9PC9zcGFuPicsXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuTmF2aWdhdGlvbiA9IGZ1bmN0aW9uIChkLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGQ7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9ICcnO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLk5hdmlnYXRpb24ucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tbmF2LWFjdGlvbicsICQucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbiwgdGhpcykpO1xuICAgICAgICAgICAgdGhpcy5kLiRuYXYub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1uYXYtdGl0bGUnLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZUaXRsZSwgdGhpcykpO1xuICAgICAgICAgICAgdGhpcy5kLiRkYXRlcGlja2VyLm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tYnV0dG9uJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLCB0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hZGRCdXR0b25zSWZOZWVkKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbnNJZk5lZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudG9kYXlCdXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b24oJ3RvZGF5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xlYXJCdXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b24oJ2NsZWFyJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLl9nZXRUaXRsZSh0aGlzLmQuY3VycmVudERhdGUpLFxuICAgICAgICAgICAgICAgIGh0bWwgPSBkcC50ZW1wbGF0ZSh0ZW1wbGF0ZSwgJC5leHRlbmQoe3RpdGxlOiB0aXRsZX0sIHRoaXMub3B0cykpO1xuICAgICAgICAgICAgdGhpcy5kLiRuYXYuaHRtbChodG1sKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmQudmlldyA9PSAneWVhcnMnKSB7XG4gICAgICAgICAgICAgICAgJCgnLmRhdGVwaWNrZXItLW5hdi10aXRsZScsIHRoaXMuZC4kbmF2KS5hZGRDbGFzcygnLWRpc2FibGVkLScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXROYXZTdGF0dXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0VGl0bGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kLmZvcm1hdERhdGUodGhpcy5vcHRzLm5hdlRpdGxlc1t0aGlzLmQudmlld10sIGRhdGUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy4kYnV0dG9uc0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b25zQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmQubG9jW3R5cGVdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBodG1sID0gZHAudGVtcGxhdGUoYnV0dG9uLCBkYXRhKTtcblxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWFjdGlvbj0nICsgdHlwZSArICddJywgdGhpcy4kYnV0dG9uc0NvbnRhaW5lcikubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyLmFwcGVuZChodG1sKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYWRkQnV0dG9uc0NvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kLiRkYXRlcGlja2VyLmFwcGVuZChidXR0b25zQ29udGFpbmVyVGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9ICQoJy5kYXRlcGlja2VyLS1idXR0b25zJywgdGhpcy5kLiRkYXRlcGlja2VyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXROYXZTdGF0dXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMub3B0cy5taW5EYXRlIHx8IHRoaXMub3B0cy5tYXhEYXRlKSB8fCAhdGhpcy5vcHRzLmRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuZC5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIHkgPSBkYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZGF0ZTtcblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmQudmlldykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHksIG0tMSwgMSksICdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCdwcmV2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHksIG0rMSwgMSksICdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCduZXh0JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHktMSwgbSwgZCksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ3ByZXYnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoeSsxLCBtLCBkKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjYWRlID0gZHAuZ2V0RGVjYWRlKHRoaXMuZC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShkZWNhZGVbMF0gLSAxLCAwLCAxKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdigncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShkZWNhZGVbMV0gKyAxLCAwLCAxKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rpc2FibGVOYXY6IGZ1bmN0aW9uIChuYXYpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLWFjdGlvbj1cIicgKyBuYXYgKyAnXCJdJywgdGhpcy5kLiRuYXYpLmFkZENsYXNzKCctZGlzYWJsZWQtJylcbiAgICAgICAgfSxcblxuICAgICAgICBfYWN0aXZhdGVOYXY6IGZ1bmN0aW9uIChuYXYpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLWFjdGlvbj1cIicgKyBuYXYgKyAnXCJdJywgdGhpcy5kLiRuYXYpLnJlbW92ZUNsYXNzKCctZGlzYWJsZWQtJylcbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja05hdkJ1dHRvbjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1hY3Rpb25dJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJGVsLmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgICAgICB0aGlzLmRbYWN0aW9uXSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrTmF2VGl0bGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLnZpZXcgPT0gJ2RheXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZC52aWV3ID0gJ21vbnRocydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kLnZpZXcgPSAneWVhcnMnO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWVcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnRcIj4nICtcbiAgICAgICAgJyAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzXCI+I3tob3VyVmlzaWJsZX08L3NwYW4+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1jb2xvblwiPjo8L3NwYW4+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCI+I3ttaW5WYWx1ZX08L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXNsaWRlcnNcIj4nICtcbiAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPicgK1xuICAgICAgICAnICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJob3Vyc1wiIHZhbHVlPVwiI3tob3VyVmFsdWV9XCIgbWluPVwiI3tob3VyTWlufVwiIG1heD1cIiN7aG91ck1heH1cIiBzdGVwPVwiI3tob3VyU3RlcH1cIi8+JyArXG4gICAgICAgICcgICA8L2Rpdj4nICtcbiAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPicgK1xuICAgICAgICAnICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJtaW51dGVzXCIgdmFsdWU9XCIje21pblZhbHVlfVwiIG1pbj1cIiN7bWluTWlufVwiIG1heD1cIiN7bWluTWF4fVwiIHN0ZXA9XCIje21pblN0ZXB9XCIvPicgK1xuICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuVGltZXBpY2tlciA9IGZ1bmN0aW9uIChpbnN0LCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGluc3Q7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuVGltZXBpY2tlci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICdpbnB1dCc7XG4gICAgICAgICAgICB0aGlzLl9zZXRUaW1lKHRoaXMuZC5kYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkSFRNTCgpO1xuXG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC9naSkpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmQuJGVsLm9uKCdzZWxlY3REYXRlJywgdGhpcy5fb25TZWxlY3REYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKGlucHV0LCB0aGlzLl9vbkNoYW5nZVJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwUmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oJ21vdXNlbW92ZSBmb2N1cyAnLCB0aGlzLl9vbk1vdXNlRW50ZXJSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbignbW91c2VvdXQgYmx1cicsIHRoaXMuX29uTW91c2VPdXRSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0VGltZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfZGF0ZSA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gX2RhdGUuaG91cnMgPCB0aGlzLm1pbkhvdXJzID8gdGhpcy5taW5Ib3VycyA6IF9kYXRlLmhvdXJzO1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gX2RhdGUubWludXRlcyA8IHRoaXMubWluTWludXRlcyA/IHRoaXMubWluTWludXRlcyA6IF9kYXRlLm1pbnV0ZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgbWluSG91cnMgYW5kIG1pbk1pbnV0ZXMgZnJvbSBkYXRlICh1c3VhbGx5IGl0J3MgYSBtaW5EYXRlKVxuICAgICAgICAgKiBBbHNvIGNoYW5nZXMgbWluTWludXRlcyBpZiBjdXJyZW50IGhvdXJzIGFyZSBiaWdnZXIgdGhlbiBAZGF0ZSBob3Vyc1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9zZXRNaW5UaW1lRnJvbURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgdGhpcy5taW5NaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cbiAgICAgICAgICAgIC8vIElmLCBmb3IgZXhhbXBsZSwgbWluIGhvdXJzIGFyZSAxMCwgYW5kIGN1cnJlbnQgaG91cnMgYXJlIDEyLFxuICAgICAgICAgICAgLy8gdXBkYXRlIG1pbk1pbnV0ZXMgdG8gZGVmYXVsdCB2YWx1ZSwgdG8gYmUgYWJsZSB0byBjaG9vc2Ugd2hvbGUgcmFuZ2Ugb2YgdmFsdWVzXG4gICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKSA+IGRhdGUuZ2V0SG91cnMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbk1pbnV0ZXMgPSB0aGlzLm9wdHMubWluTWludXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldE1heFRpbWVGcm9tRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWF4SG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICB0aGlzLm1heE1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCkgPCBkYXRlLmdldEhvdXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gdGhpcy5vcHRzLm1heE1pbnV0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXREZWZhdWx0TWluTWF4VGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1heEhvdXJzID0gMjMsXG4gICAgICAgICAgICAgICAgbWF4TWludXRlcyA9IDU5LFxuICAgICAgICAgICAgICAgIG9wdHMgPSB0aGlzLm9wdHM7XG5cbiAgICAgICAgICAgIHRoaXMubWluSG91cnMgPSBvcHRzLm1pbkhvdXJzIDwgMCB8fCBvcHRzLm1pbkhvdXJzID4gbWF4SG91cnMgPyAwIDogb3B0cy5taW5Ib3VycztcbiAgICAgICAgICAgIHRoaXMubWluTWludXRlcyA9IG9wdHMubWluTWludXRlcyA8IDAgfHwgb3B0cy5taW5NaW51dGVzID4gbWF4TWludXRlcyA/IDAgOiBvcHRzLm1pbk1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLm1heEhvdXJzID0gb3B0cy5tYXhIb3VycyA8IDAgfHwgb3B0cy5tYXhIb3VycyA+IG1heEhvdXJzID8gbWF4SG91cnMgOiBvcHRzLm1heEhvdXJzO1xuICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gb3B0cy5tYXhNaW51dGVzIDwgMCB8fCBvcHRzLm1heE1pbnV0ZXMgPiBtYXhNaW51dGVzID8gbWF4TWludXRlcyA6IG9wdHMubWF4TWludXRlcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTG9va3MgZm9yIG1pbi9tYXggaG91cnMvbWludXRlcyBhbmQgaWYgY3VycmVudCB2YWx1ZXNcbiAgICAgICAgICogYXJlIG91dCBvZiByYW5nZSBzZXRzIHZhbGlkIHZhbHVlcy5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF92YWxpZGF0ZUhvdXJzTWludXRlczogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJzIDwgdGhpcy5taW5Ib3Vycykge1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMgPSB0aGlzLm1pbkhvdXJzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvdXJzID4gdGhpcy5tYXhIb3Vycykge1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMgPSB0aGlzLm1heEhvdXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5taW51dGVzIDwgdGhpcy5taW5NaW51dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5taW5NaW51dGVzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pbnV0ZXMgPiB0aGlzLm1heE1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLm1heE1pbnV0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkSFRNTDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGx6ID0gZHAuZ2V0TGVhZGluZ1plcm9OdW0sXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaG91ck1pbjogdGhpcy5taW5Ib3VycyxcbiAgICAgICAgICAgICAgICAgICAgaG91ck1heDogbHoodGhpcy5tYXhIb3VycyksXG4gICAgICAgICAgICAgICAgICAgIGhvdXJTdGVwOiB0aGlzLm9wdHMuaG91cnNTdGVwLFxuICAgICAgICAgICAgICAgICAgICBob3VyVmFsdWU6IHRoaXMuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJWaXNpYmxlOiBseih0aGlzLmRpc3BsYXlIb3VycyksXG4gICAgICAgICAgICAgICAgICAgIG1pbk1pbjogdGhpcy5taW5NaW51dGVzLFxuICAgICAgICAgICAgICAgICAgICBtaW5NYXg6IGx6KHRoaXMubWF4TWludXRlcyksXG4gICAgICAgICAgICAgICAgICAgIG1pblN0ZXA6IHRoaXMub3B0cy5taW51dGVzU3RlcCxcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IGx6KHRoaXMubWludXRlcylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF90ZW1wbGF0ZSA9IGRwLnRlbXBsYXRlKHRlbXBsYXRlLCBkYXRhKTtcblxuICAgICAgICAgICAgdGhpcy4kdGltZXBpY2tlciA9ICQoX3RlbXBsYXRlKS5hcHBlbmRUbyh0aGlzLmQuJGRhdGVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzID0gJCgnW3R5cGU9XCJyYW5nZVwiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kaG91cnMgPSAkKCdbbmFtZT1cImhvdXJzXCJdJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzID0gJCgnW25hbWU9XCJtaW51dGVzXCJdJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRob3Vyc1RleHQgPSAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzVGV4dCA9ICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlcycsIHRoaXMuJHRpbWVwaWNrZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLmFtcG0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhbXBtID0gJCgnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtYW1wbVwiPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50JywgdGhpcy4kdGltZXBpY2tlcikpXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKHRoaXMuZGF5UGVyaW9kKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVwaWNrZXIuYWRkQ2xhc3MoJy1hbS1wbS0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlQ3VycmVudFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBoID0gIGRwLmdldExlYWRpbmdaZXJvTnVtKHRoaXMuZGlzcGxheUhvdXJzKSxcbiAgICAgICAgICAgICAgICBtID0gZHAuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5taW51dGVzKTtcblxuICAgICAgICAgICAgdGhpcy4kaG91cnNUZXh0Lmh0bWwoaCk7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzVGV4dC5odG1sKG0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLmFtcG0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhbXBtLmh0bWwodGhpcy5kYXlQZXJpb2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGVSYW5nZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvdXJzLmF0dHIoe1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5Ib3VycyxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4SG91cnNcbiAgICAgICAgICAgIH0pLnZhbCh0aGlzLmhvdXJzKTtcblxuICAgICAgICAgICAgdGhpcy4kbWludXRlcy5hdHRyKHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluTWludXRlcyxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4TWludXRlc1xuICAgICAgICAgICAgfSkudmFsKHRoaXMubWludXRlcylcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyBtaW5Ib3VycywgbWluTWludXRlcyBldGMuIGZyb20gZGF0ZS4gSWYgZGF0ZSBpcyBub3QgcGFzc2VkLCB0aGFuIHNldHNcbiAgICAgICAgICogdmFsdWVzIGZyb20gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0gW2RhdGVdIHtvYmplY3R9IC0gRGF0ZSBvYmplY3QsIHRvIGdldCB2YWx1ZXMgZnJvbVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2hhbmRsZURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXREZWZhdWx0TWluTWF4VGltZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHAuaXNTYW1lKGRhdGUsIHRoaXMuZC5vcHRzLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldE1pblRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRwLmlzU2FtZShkYXRlLCB0aGlzLmQub3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRNYXhUaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUhvdXJzTWludXRlcyhkYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlcyB2YWxpZCBob3VyIHZhbHVlIHRvIGRpc3BsYXkgaW4gdGV4dCBpbnB1dCBhbmQgZGF0ZXBpY2tlcidzIGJvZHkuXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIHtEYXRlfE51bWJlcn0gLSBkYXRlIG9yIGhvdXJzXG4gICAgICAgICAqIEBwYXJhbSBbYW1wbV0ge0Jvb2xlYW59IC0gMTIgaG91cnMgbW9kZVxuICAgICAgICAgKiBAcmV0dXJucyB7e2hvdXJzOiAqLCBkYXlQZXJpb2Q6IHN0cmluZ319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlOiBmdW5jdGlvbiAoZGF0ZSwgYW1wbSkge1xuICAgICAgICAgICAgdmFyIGQgPSBkYXRlLFxuICAgICAgICAgICAgICAgIGhvdXJzID0gZGF0ZTtcblxuICAgICAgICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgaG91cnMgPSBkLmhvdXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX2FtcG0gPSBhbXBtIHx8IHRoaXMuZC5hbXBtLFxuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdhbSc7XG5cbiAgICAgICAgICAgIGlmIChfYW1wbSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBob3VycyA9PSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdwbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBob3VycyA+IDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gJ3BtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhvdXJzOiBob3VycyxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2Q6IGRheVBlcmlvZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBob3VycyAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3VycyA9IHZhbDtcblxuICAgICAgICAgICAgdmFyIGRpc3BsYXlIb3VycyA9IHRoaXMuX2dldFZhbGlkSG91cnNGcm9tRGF0ZSh2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlIb3VycyA9IGRpc3BsYXlIb3Vycy5ob3VycztcbiAgICAgICAgICAgIHRoaXMuZGF5UGVyaW9kID0gZGlzcGxheUhvdXJzLmRheVBlcmlvZDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgaG91cnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gIEV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgX29uQ2hhbmdlUmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgIG5hbWUgPSAkdGFyZ2V0LmF0dHIoJ25hbWUnKTtcblxuICAgICAgICAgICAgdGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSAkdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuZC5fdHJpZ2dlcigndGltZUNoYW5nZScsIFt0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXNdKTtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZSh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uU2VsZWN0RGF0ZTogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRW50ZXJSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJChlLnRhcmdldCkuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC0nICsgbmFtZSwgdGhpcy4kdGltZXBpY2tlcikuYWRkQ2xhc3MoJy1mb2N1cy0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZU91dFJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGUudGFyZ2V0KS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5kLmluRm9jdXMpIHJldHVybjsgLy8gUHJldmVudCByZW1vdmluZyBmb2N1cyB3aGVuIG1vdXNlIG91dCBvZiByYW5nZSBzbGlkZXJcbiAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtJyArIG5hbWUsIHRoaXMuJHRpbWVwaWNrZXIpLnJlbW92ZUNsYXNzKCctZm9jdXMtJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcFJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4gfSkod2luZG93LCBqUXVlcnkpO1xuIiwiLyohXG4gKiBoZWFkcm9vbS5qcyB2MC45LjMgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbiFmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sYik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YigpOmEuSGVhZHJvb209YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYShhKXt0aGlzLmNhbGxiYWNrPWEsdGhpcy50aWNraW5nPSExfWZ1bmN0aW9uIGIoYSl7cmV0dXJuIGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJihhPT09d2luZG93fHxhLm5vZGVUeXBlKX1mdW5jdGlvbiBjKGEpe2lmKGFyZ3VtZW50cy5sZW5ndGg8PTApdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhcmd1bWVudHMgaW4gZXh0ZW5kIGZ1bmN0aW9uXCIpO3ZhciBkLGUsZj1hfHx7fTtmb3IoZT0xO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspe3ZhciBnPWFyZ3VtZW50c1tlXXx8e307Zm9yKGQgaW4gZylcIm9iamVjdFwiIT10eXBlb2YgZltkXXx8YihmW2RdKT9mW2RdPWZbZF18fGdbZF06ZltkXT1jKGZbZF0sZ1tkXSl9cmV0dXJuIGZ9ZnVuY3Rpb24gZChhKXtyZXR1cm4gYT09PU9iamVjdChhKT9hOntkb3duOmEsdXA6YX19ZnVuY3Rpb24gZShhLGIpe2I9YyhiLGUub3B0aW9ucyksdGhpcy5sYXN0S25vd25TY3JvbGxZPTAsdGhpcy5lbGVtPWEsdGhpcy50b2xlcmFuY2U9ZChiLnRvbGVyYW5jZSksdGhpcy5jbGFzc2VzPWIuY2xhc3Nlcyx0aGlzLm9mZnNldD1iLm9mZnNldCx0aGlzLnNjcm9sbGVyPWIuc2Nyb2xsZXIsdGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLm9uUGluPWIub25QaW4sdGhpcy5vblVucGluPWIub25VbnBpbix0aGlzLm9uVG9wPWIub25Ub3AsdGhpcy5vbk5vdFRvcD1iLm9uTm90VG9wLHRoaXMub25Cb3R0b209Yi5vbkJvdHRvbSx0aGlzLm9uTm90Qm90dG9tPWIub25Ob3RCb3R0b219dmFyIGY9e2JpbmQ6ISFmdW5jdGlvbigpe30uYmluZCxjbGFzc0xpc3Q6XCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxyQUY6ISEod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSl9O3JldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsYS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmEsdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5jYWxsYmFjayYmdGhpcy5jYWxsYmFjaygpLHRoaXMudGlja2luZz0hMX0scmVxdWVzdFRpY2s6ZnVuY3Rpb24oKXt0aGlzLnRpY2tpbmd8fChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yYWZDYWxsYmFja3x8KHRoaXMucmFmQ2FsbGJhY2s9dGhpcy51cGRhdGUuYmluZCh0aGlzKSkpLHRoaXMudGlja2luZz0hMCl9LGhhbmRsZUV2ZW50OmZ1bmN0aW9uKCl7dGhpcy5yZXF1ZXN0VGljaygpfX0sZS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmUsaW5pdDpmdW5jdGlvbigpe3JldHVybiBlLmN1dHNUaGVNdXN0YXJkPyh0aGlzLmRlYm91bmNlcj1uZXcgYSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKSx0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuaW5pdGlhbCksc2V0VGltZW91dCh0aGlzLmF0dGFjaEV2ZW50LmJpbmQodGhpcyksMTAwKSx0aGlzKTp2b2lkIDB9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmNsYXNzZXM7dGhpcy5pbml0aWFsaXNlZD0hMSx0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZShhLnVucGlubmVkLGEucGlubmVkLGEudG9wLGEubm90VG9wLGEuaW5pdGlhbCksdGhpcy5zY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5kZWJvdW5jZXIsITEpfSxhdHRhY2hFdmVudDpmdW5jdGlvbigpe3RoaXMuaW5pdGlhbGlzZWR8fCh0aGlzLmxhc3RLbm93blNjcm9sbFk9dGhpcy5nZXRTY3JvbGxZKCksdGhpcy5pbml0aWFsaXNlZD0hMCx0aGlzLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLmRlYm91bmNlciwhMSksdGhpcy5kZWJvdW5jZXIuaGFuZGxlRXZlbnQoKSl9LHVucGluOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5lbGVtLmNsYXNzTGlzdCxiPXRoaXMuY2xhc3NlczshYS5jb250YWlucyhiLnBpbm5lZCkmJmEuY29udGFpbnMoYi51bnBpbm5lZCl8fChhLmFkZChiLnVucGlubmVkKSxhLnJlbW92ZShiLnBpbm5lZCksdGhpcy5vblVucGluJiZ0aGlzLm9uVW5waW4uY2FsbCh0aGlzKSl9LHBpbjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZWxlbS5jbGFzc0xpc3QsYj10aGlzLmNsYXNzZXM7YS5jb250YWlucyhiLnVucGlubmVkKSYmKGEucmVtb3ZlKGIudW5waW5uZWQpLGEuYWRkKGIucGlubmVkKSx0aGlzLm9uUGluJiZ0aGlzLm9uUGluLmNhbGwodGhpcykpfSx0b3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi50b3ApfHwoYS5hZGQoYi50b3ApLGEucmVtb3ZlKGIubm90VG9wKSx0aGlzLm9uVG9wJiZ0aGlzLm9uVG9wLmNhbGwodGhpcykpfSxub3RUb3A6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RUb3ApfHwoYS5hZGQoYi5ub3RUb3ApLGEucmVtb3ZlKGIudG9wKSx0aGlzLm9uTm90VG9wJiZ0aGlzLm9uTm90VG9wLmNhbGwodGhpcykpfSxib3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ib3R0b20pfHwoYS5hZGQoYi5ib3R0b20pLGEucmVtb3ZlKGIubm90Qm90dG9tKSx0aGlzLm9uQm90dG9tJiZ0aGlzLm9uQm90dG9tLmNhbGwodGhpcykpfSxub3RCb3R0b206ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVsZW0uY2xhc3NMaXN0LGI9dGhpcy5jbGFzc2VzO2EuY29udGFpbnMoYi5ub3RCb3R0b20pfHwoYS5hZGQoYi5ub3RCb3R0b20pLGEucmVtb3ZlKGIuYm90dG9tKSx0aGlzLm9uTm90Qm90dG9tJiZ0aGlzLm9uTm90Qm90dG9tLmNhbGwodGhpcykpfSxnZXRTY3JvbGxZOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMCE9PXRoaXMuc2Nyb2xsZXIucGFnZVlPZmZzZXQ/dGhpcy5zY3JvbGxlci5wYWdlWU9mZnNldDp2b2lkIDAhPT10aGlzLnNjcm9sbGVyLnNjcm9sbFRvcD90aGlzLnNjcm9sbGVyLnNjcm9sbFRvcDooZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50fHxkb2N1bWVudC5ib2R5LnBhcmVudE5vZGV8fGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcH0sZ2V0Vmlld3BvcnRIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fHxkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodH0sZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0OmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLm1heChhLm9mZnNldEhlaWdodCxhLmNsaWVudEhlaWdodCl9LGdldFNjcm9sbGVyUGh5c2ljYWxIZWlnaHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY3JvbGxlcj09PXdpbmRvd3x8dGhpcy5zY3JvbGxlcj09PWRvY3VtZW50LmJvZHk/dGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpOnRoaXMuZ2V0RWxlbWVudFBoeXNpY2FsSGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxnZXREb2N1bWVudEhlaWdodDpmdW5jdGlvbigpe3ZhciBhPWRvY3VtZW50LmJvZHksYj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIE1hdGgubWF4KGEuc2Nyb2xsSGVpZ2h0LGIuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LGIub2Zmc2V0SGVpZ2h0LGEuY2xpZW50SGVpZ2h0LGIuY2xpZW50SGVpZ2h0KX0sZ2V0RWxlbWVudEhlaWdodDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5tYXgoYS5zY3JvbGxIZWlnaHQsYS5vZmZzZXRIZWlnaHQsYS5jbGllbnRIZWlnaHQpfSxnZXRTY3JvbGxlckhlaWdodDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjcm9sbGVyPT09d2luZG93fHx0aGlzLnNjcm9sbGVyPT09ZG9jdW1lbnQuYm9keT90aGlzLmdldERvY3VtZW50SGVpZ2h0KCk6dGhpcy5nZXRFbGVtZW50SGVpZ2h0KHRoaXMuc2Nyb2xsZXIpfSxpc091dE9mQm91bmRzOmZ1bmN0aW9uKGEpe3ZhciBiPTA+YSxjPWErdGhpcy5nZXRTY3JvbGxlclBoeXNpY2FsSGVpZ2h0KCk+dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpO3JldHVybiBifHxjfSx0b2xlcmFuY2VFeGNlZWRlZDpmdW5jdGlvbihhLGIpe3JldHVybiBNYXRoLmFicyhhLXRoaXMubGFzdEtub3duU2Nyb2xsWSk+PXRoaXMudG9sZXJhbmNlW2JdfSxzaG91bGRVbnBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE+dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YT49dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmQmJmJ9LHNob3VsZFBpbjpmdW5jdGlvbihhLGIpe3ZhciBjPWE8dGhpcy5sYXN0S25vd25TY3JvbGxZLGQ9YTw9dGhpcy5vZmZzZXQ7cmV0dXJuIGMmJmJ8fGR9LHVwZGF0ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2V0U2Nyb2xsWSgpLGI9YT50aGlzLmxhc3RLbm93blNjcm9sbFk/XCJkb3duXCI6XCJ1cFwiLGM9dGhpcy50b2xlcmFuY2VFeGNlZWRlZChhLGIpO3RoaXMuaXNPdXRPZkJvdW5kcyhhKXx8KGE8PXRoaXMub2Zmc2V0P3RoaXMudG9wKCk6dGhpcy5ub3RUb3AoKSxhK3RoaXMuZ2V0Vmlld3BvcnRIZWlnaHQoKT49dGhpcy5nZXRTY3JvbGxlckhlaWdodCgpP3RoaXMuYm90dG9tKCk6dGhpcy5ub3RCb3R0b20oKSx0aGlzLnNob3VsZFVucGluKGEsYyk/dGhpcy51bnBpbigpOnRoaXMuc2hvdWxkUGluKGEsYykmJnRoaXMucGluKCksdGhpcy5sYXN0S25vd25TY3JvbGxZPWEpfX0sZS5vcHRpb25zPXt0b2xlcmFuY2U6e3VwOjAsZG93bjowfSxvZmZzZXQ6MCxzY3JvbGxlcjp3aW5kb3csY2xhc3Nlczp7cGlubmVkOlwiaGVhZHJvb20tLXBpbm5lZFwiLHVucGlubmVkOlwiaGVhZHJvb20tLXVucGlubmVkXCIsdG9wOlwiaGVhZHJvb20tLXRvcFwiLG5vdFRvcDpcImhlYWRyb29tLS1ub3QtdG9wXCIsYm90dG9tOlwiaGVhZHJvb20tLWJvdHRvbVwiLG5vdEJvdHRvbTpcImhlYWRyb29tLS1ub3QtYm90dG9tXCIsaW5pdGlhbDpcImhlYWRyb29tXCJ9fSxlLmN1dHNUaGVNdXN0YXJkPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBmJiZmLnJBRiYmZi5iaW5kJiZmLmNsYXNzTGlzdCxlfSk7IiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50KTtcbiAgICB3aW5kb3cubGF6eVNpemVzID0gbGF6eVNpemVzO1xuICAgIGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGxhenlTaXplcztcbiAgICB9XG59KHdpbmRvdywgZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8qanNoaW50IGVxbnVsbDp0cnVlICovXG4gICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe3JldHVybjt9XG5cbiAgICB2YXIgbGF6eXNpemVzLCBsYXp5U2l6ZXNDb25maWc7XG5cbiAgICB2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHZhciBEYXRlID0gd2luZG93LkRhdGU7XG5cbiAgICB2YXIgc3VwcG9ydFBpY3R1cmUgPSB3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50O1xuXG4gICAgdmFyIF9hZGRFdmVudExpc3RlbmVyID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG4gICAgdmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuICAgIHZhciBhZGRFdmVudExpc3RlbmVyID0gd2luZG93W19hZGRFdmVudExpc3RlbmVyXTtcblxuICAgIHZhciBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5cbiAgICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG4gICAgdmFyIHJlcXVlc3RJZGxlQ2FsbGJhY2sgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaztcblxuICAgIHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG4gICAgdmFyIGxvYWRFdmVudHMgPSBbJ2xvYWQnLCAnZXJyb3InLCAnbGF6eWluY2x1ZGVkJywgJ19sYXp5bG9hZGVkJ107XG5cbiAgICB2YXIgcmVnQ2xhc3NDYWNoZSA9IHt9O1xuXG4gICAgdmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuICAgIHZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG4gICAgICAgIGlmKCFyZWdDbGFzc0NhY2hlW2Nsc10pe1xuICAgICAgICAgICAgcmVnQ2xhc3NDYWNoZVtjbHNdID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3wkKScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdDbGFzc0NhY2hlW2Nsc10udGVzdChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpICYmIHJlZ0NsYXNzQ2FjaGVbY2xzXTtcbiAgICB9O1xuXG4gICAgdmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbGUsIGNscykpe1xuICAgICAgICAgICAgZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS50cmltKCkgKyAnICcgKyBjbHMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG4gICAgICAgIHZhciByZWc7XG4gICAgICAgIGlmICgocmVnID0gaGFzQ2xhc3MoZWxlLGNscykpKSB7XG4gICAgICAgICAgICBlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnJlcGxhY2UocmVnLCAnICcpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYWRkUmVtb3ZlTG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGRvbSwgZm4sIGFkZCl7XG4gICAgICAgIHZhciBhY3Rpb24gPSBhZGQgPyBfYWRkRXZlbnRMaXN0ZW5lciA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgICAgICAgaWYoYWRkKXtcbiAgICAgICAgICAgIGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICBkb21bYWN0aW9uXShldnQsIGZuKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB0cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCBkZXRhaWwsIG5vQnViYmxlcywgbm9DYW5jZWxhYmxlKXtcbiAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cbiAgICAgICAgaWYoIWRldGFpbCl7XG4gICAgICAgICAgICBkZXRhaWwgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFpbC5pbnN0YW5jZSA9IGxhenlzaXplcztcblxuICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgIW5vQnViYmxlcywgIW5vQ2FuY2VsYWJsZSwgZGV0YWlsKTtcblxuICAgICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVQb2x5ZmlsbCA9IGZ1bmN0aW9uIChlbCwgZnVsbCl7XG4gICAgICAgIHZhciBwb2x5ZmlsbDtcbiAgICAgICAgaWYoICFzdXBwb3J0UGljdHVyZSAmJiAoIHBvbHlmaWxsID0gKHdpbmRvdy5waWN0dXJlZmlsbCB8fCBsYXp5U2l6ZXNDb25maWcucGYpICkgKXtcbiAgICAgICAgICAgIHBvbHlmaWxsKHtyZWV2YWx1YXRlOiB0cnVlLCBlbGVtZW50czogW2VsXX0pO1xuICAgICAgICB9IGVsc2UgaWYoZnVsbCAmJiBmdWxsLnNyYyl7XG4gICAgICAgICAgICBlbC5zcmMgPSBmdWxsLnNyYztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW0sIHN0eWxlKXtcbiAgICAgICAgcmV0dXJuIChnZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpIHx8IHt9KVtzdHlsZV07XG4gICAgfTtcblxuICAgIHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgd2hpbGUod2lkdGggPCBsYXp5U2l6ZXNDb25maWcubWluU2l6ZSAmJiBwYXJlbnQgJiYgIWVsZW0uX2xhenlzaXplc1dpZHRoKXtcbiAgICAgICAgICAgIHdpZHRoID0gIHBhcmVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH07XG5cbiAgICB2YXIgckFGID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBydW5uaW5nLCB3YWl0aW5nO1xuICAgICAgICB2YXIgZmlyc3RGbnMgPSBbXTtcbiAgICAgICAgdmFyIHNlY29uZEZucyA9IFtdO1xuICAgICAgICB2YXIgZm5zID0gZmlyc3RGbnM7XG5cbiAgICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgcnVuRm5zID0gZm5zO1xuXG4gICAgICAgICAgICBmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB3YWl0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJ1bkZucy5zaGlmdCgpKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmFmQmF0Y2ggPSBmdW5jdGlvbihmbiwgcXVldWUpe1xuICAgICAgICAgICAgaWYocnVubmluZyAmJiAhcXVldWUpe1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZucy5wdXNoKGZuKTtcblxuICAgICAgICAgICAgICAgIGlmKCF3YWl0aW5nKXtcbiAgICAgICAgICAgICAgICAgICAgd2FpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByYWZCYXRjaC5fbHNGbHVzaCA9IHJ1bjtcblxuICAgICAgICByZXR1cm4gcmFmQmF0Y2g7XG4gICAgfSkoKTtcblxuICAgIHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuICAgICAgICByZXR1cm4gc2ltcGxlID9cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJBRihmbik7XG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIHJBRihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgO1xuICAgIH07XG5cbiAgICB2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbihmbil7XG4gICAgICAgIHZhciBydW5uaW5nO1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgICAgICB2YXIgZ0RlbGF5ID0gMTI1O1xuICAgICAgICB2YXIgUklDX0RFRkFVTFRfVElNRU9VVCA9IDY2NjtcbiAgICAgICAgdmFyIHJJQ1RpbWVvdXQgPSBSSUNfREVGQVVMVF9USU1FT1VUO1xuICAgICAgICB2YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrID9cbiAgICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVxdWVzdElkbGVDYWxsYmFjayhydW4sIHt0aW1lb3V0OiBySUNUaW1lb3V0fSk7XG4gICAgICAgICAgICAgICAgaWYocklDVGltZW91dCAhPT0gUklDX0RFRkFVTFRfVElNRU9VVCl7XG4gICAgICAgICAgICAgICAgICAgIHJJQ1RpbWVvdXQgPSBSSUNfREVGQVVMVF9USU1FT1VUO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH06XG4gICAgICAgICAgICByQUZJdChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocnVuKTtcbiAgICAgICAgICAgIH0sIHRydWUpXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG4gICAgICAgICAgICB2YXIgZGVsYXk7XG4gICAgICAgICAgICBpZigoaXNQcmlvcml0eSA9IGlzUHJpb3JpdHkgPT09IHRydWUpKXtcbiAgICAgICAgICAgICAgICBySUNUaW1lb3V0ID0gNDQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHJ1bm5pbmcpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVubmluZyA9ICB0cnVlO1xuXG4gICAgICAgICAgICBkZWxheSA9IGdEZWxheSAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG4gICAgICAgICAgICBpZihkZWxheSA8IDApe1xuICAgICAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaXNQcmlvcml0eSB8fCAoZGVsYXkgPCA5ICYmIHJlcXVlc3RJZGxlQ2FsbGJhY2spKXtcbiAgICAgICAgICAgICAgICBpZGxlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy9iYXNlZCBvbiBodHRwOi8vbW9kZXJuamF2YXNjcmlwdC5ibG9nc3BvdC5kZS8yMDEzLzA4L2J1aWxkaW5nLWJldHRlci1kZWJvdW5jZS5odG1sXG4gICAgdmFyIGRlYm91bmNlID0gZnVuY3Rpb24oZnVuYykge1xuICAgICAgICB2YXIgdGltZW91dCwgdGltZXN0YW1wO1xuICAgICAgICB2YXIgd2FpdCA9IDk5O1xuICAgICAgICB2YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAocmVxdWVzdElkbGVDYWxsYmFjayB8fCBydW4pKHJ1bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cblxuICAgIHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxhenlsb2FkRWxlbXMsIHByZWxvYWRFbGVtcywgaXNDb21wbGV0ZWQsIHJlc2V0UHJlbG9hZGluZ1RpbWVyLCBsb2FkTW9kZSwgc3RhcnRlZDtcblxuICAgICAgICB2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b207XG5cbiAgICAgICAgdmFyIGRlZmF1bHRFeHBhbmQsIHByZWxvYWRFeHBhbmQsIGhGYWM7XG5cbiAgICAgICAgdmFyIHJlZ0ltZyA9IC9eaW1nJC9pO1xuICAgICAgICB2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cbiAgICAgICAgdmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoL2dsZWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cbiAgICAgICAgdmFyIHNocmlua0V4cGFuZCA9IDA7XG4gICAgICAgIHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuICAgICAgICB2YXIgaXNMb2FkaW5nID0gMDtcbiAgICAgICAgdmFyIGxvd1J1bnMgPSAtMTtcblxuICAgICAgICB2YXIgcmVzZXRQcmVsb2FkaW5nID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0xvYWRpbmctLTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS50YXJnZXQpe1xuICAgICAgICAgICAgICAgIGFkZFJlbW92ZUxvYWRFdmVudHMoZS50YXJnZXQsIHJlc2V0UHJlbG9hZGluZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFlIHx8IGlzTG9hZGluZyA8IDAgfHwgIWUudGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmcgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcbiAgICAgICAgICAgIHZhciBvdXRlclJlY3Q7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxlbTtcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gZ2V0Q1NTKGRvY3VtZW50LmJvZHksICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicgfHwgZ2V0Q1NTKGVsZW0sICd2aXNpYmlsaXR5JykgIT0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgIGVMdG9wIC09IGVsZW1FeHBhbmQ7XG4gICAgICAgICAgICBlTGJvdHRvbSArPSBlbGVtRXhwYW5kO1xuICAgICAgICAgICAgZUxsZWZ0IC09IGVsZW1FeHBhbmQ7XG4gICAgICAgICAgICBlTHJpZ2h0ICs9IGVsZW1FeHBhbmQ7XG5cbiAgICAgICAgICAgIHdoaWxlKHZpc2libGUgJiYgKHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnQpICYmIHBhcmVudCAhPSBkb2N1bWVudC5ib2R5ICYmIHBhcmVudCAhPSBkb2NFbGVtKXtcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gKChnZXRDU1MocGFyZW50LCAnb3BhY2l0eScpIHx8IDEpID4gMCk7XG5cbiAgICAgICAgICAgICAgICBpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG4gICAgICAgICAgICAgICAgICAgIG91dGVyUmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9IGVMcmlnaHQgPiBvdXRlclJlY3QubGVmdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBlTGJvdHRvbSA+IG91dGVyUmVjdC50b3AgLSAxICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBlTHRvcCA8IG91dGVyUmVjdC5ib3R0b20gKyAxXG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZUxsZW4sIGksIHJlY3QsIGF1dG9Mb2FkRWxlbSwgbG9hZGVkU29tZXRoaW5nLCBlbGVtRXhwYW5kLCBlbGVtTmVnYXRpdmVFeHBhbmQsIGVsZW1FeHBhbmRWYWwsIGJlZm9yZUV4cGFuZFZhbDtcblxuICAgICAgICAgICAgaWYoKGxvYWRNb2RlID0gbGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlKSAmJiBpc0xvYWRpbmcgPCA4ICYmIChlTGxlbiA9IGxhenlsb2FkRWxlbXMubGVuZ3RoKSl7XG5cbiAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgICAgIGxvd1J1bnMrKztcblxuICAgICAgICAgICAgICAgIGlmKHByZWxvYWRFeHBhbmQgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCEoJ2V4cGFuZCcgaW4gbGF6eVNpemVzQ29uZmlnKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5U2l6ZXNDb25maWcuZXhwYW5kID0gZG9jRWxlbS5jbGllbnRIZWlnaHQgPiA1MDAgJiYgZG9jRWxlbS5jbGllbnRXaWR0aCA+IDUwMCA/IDUwMCA6IDM3MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRFeHBhbmQgPSBsYXp5U2l6ZXNDb25maWcuZXhwYW5kO1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkRXhwYW5kID0gZGVmYXVsdEV4cGFuZCAqIGxhenlTaXplc0NvbmZpZy5leHBGYWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudEV4cGFuZCA8IHByZWxvYWRFeHBhbmQgJiYgaXNMb2FkaW5nIDwgMSAmJiBsb3dSdW5zID4gMiAmJiBsb2FkTW9kZSA+IDIgJiYgIWRvY3VtZW50LmhpZGRlbil7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFeHBhbmQgPSBwcmVsb2FkRXhwYW5kO1xuICAgICAgICAgICAgICAgICAgICBsb3dSdW5zID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RXhwYW5kID0gc2hyaW5rRXhwYW5kO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcig7IGkgPCBlTGxlbjsgaSsrKXtcblxuICAgICAgICAgICAgICAgICAgICBpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzdXBwb3J0U2Nyb2xsKXt1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO2NvbnRpbnVlO31cblxuICAgICAgICAgICAgICAgICAgICBpZighKGVsZW1FeHBhbmRWYWwgPSBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKCdkYXRhLWV4cGFuZCcpKSB8fCAhKGVsZW1FeHBhbmQgPSBlbGVtRXhwYW5kVmFsICogMSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbUV4cGFuZCA9IGN1cnJlbnRFeHBhbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihiZWZvcmVFeHBhbmRWYWwgIT09IGVsZW1FeHBhbmQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZUx2VyA9IGlubmVyV2lkdGggKyAoZWxlbUV4cGFuZCAqIGhGYWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWx2SCA9IGlubmVySGVpZ2h0ICsgZWxlbUV4cGFuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1OZWdhdGl2ZUV4cGFuZCA9IGVsZW1FeHBhbmQgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZUV4cGFuZFZhbCA9IGVsZW1FeHBhbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZWN0ID0gbGF6eWxvYWRFbGVtc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKGVMYm90dG9tID0gcmVjdC5ib3R0b20pID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGVMdG9wID0gcmVjdC50b3ApIDw9IGVsdkggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChlTHJpZ2h0ID0gcmVjdC5yaWdodCkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICogaEZhYyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGVMbGVmdCA9IHJlY3QubGVmdCkgPD0gZUx2VyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGxhenlTaXplc0NvbmZpZy5sb2FkSGlkZGVuIHx8IGdldENTUyhsYXp5bG9hZEVsZW1zW2ldLCAndmlzaWJpbGl0eScpICE9ICdoaWRkZW4nKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKChpc0NvbXBsZXRlZCAmJiBpc0xvYWRpbmcgPCAzICYmICFlbGVtRXhwYW5kVmFsICYmIChsb2FkTW9kZSA8IDMgfHwgbG93UnVucyA8IDQpKSB8fCBpc05lc3RlZFZpc2libGUobGF6eWxvYWRFbGVtc1tpXSwgZWxlbUV4cGFuZCkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRTb21ldGhpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNMb2FkaW5nID4gOSl7YnJlYWs7fVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIWxvYWRlZFNvbWV0aGluZyAmJiBpc0NvbXBsZXRlZCAmJiAhYXV0b0xvYWRFbGVtICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmcgPCA0ICYmIGxvd1J1bnMgPCA0ICYmIGxvYWRNb2RlID4gMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHByZWxvYWRFbGVtc1swXSB8fCBsYXp5U2l6ZXNDb25maWcucHJlbG9hZEFmdGVyTG9hZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChwcmVsb2FkRWxlbXNbMF0gfHwgKCFlbGVtRXhwYW5kVmFsICYmICgoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApIHx8IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNpemVzQXR0cikgIT0gJ2F1dG8nKSkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkRWxlbSA9IHByZWxvYWRFbGVtc1swXSB8fCBsYXp5bG9hZEVsZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoYXV0b0xvYWRFbGVtICYmICFsb2FkZWRTb21ldGhpbmcpe1xuICAgICAgICAgICAgICAgICAgICB1bnZlaWxFbGVtZW50KGF1dG9Mb2FkRWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cbiAgICAgICAgdmFyIHN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgYWRkQ2xhc3MoZS50YXJnZXQsIGxhenlTaXplc0NvbmZpZy5sb2FkZWRDbGFzcyk7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhlLnRhcmdldCwgbGF6eVNpemVzQ29uZmlnLmxvYWRpbmdDbGFzcyk7XG4gICAgICAgICAgICBhZGRSZW1vdmVMb2FkRXZlbnRzKGUudGFyZ2V0LCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KGUudGFyZ2V0LCAnbGF6eWxvYWRlZCcpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuICAgICAgICB2YXIgcmFmU3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICByYWZlZFN3aXRjaExvYWRpbmdDbGFzcyh7dGFyZ2V0OiBlLnRhcmdldH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbGVtLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVwbGFjZShzcmMpO1xuICAgICAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgICAgICBlbGVtLnNyYyA9IHNyYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG4gICAgICAgICAgICB2YXIgY3VzdG9tTWVkaWE7XG5cbiAgICAgICAgICAgIHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNyY3NldEF0dHIpO1xuXG4gICAgICAgICAgICBpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ29uZmlnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG4gICAgICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNvdXJjZVNyY3NldCl7XG4gICAgICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc291cmNlU3Jjc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbGF6eVVudmVpbCA9IHJBRkl0KGZ1bmN0aW9uIChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKXtcbiAgICAgICAgICAgIHZhciBzcmMsIHNyY3NldCwgcGFyZW50LCBpc1BpY3R1cmUsIGV2ZW50LCBmaXJlc0xvYWQ7XG5cbiAgICAgICAgICAgIGlmKCEoZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmV1bnZlaWwnLCBkZXRhaWwpKS5kZWZhdWx0UHJldmVudGVkKXtcblxuICAgICAgICAgICAgICAgIGlmKHNpemVzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNBdXRvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NvbmZpZy5hdXRvc2l6ZXNDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCBzaXplcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzcmNzZXQgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NvbmZpZy5zcmNzZXRBdHRyKTtcbiAgICAgICAgICAgICAgICBzcmMgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NvbmZpZy5zcmNBdHRyKTtcblxuICAgICAgICAgICAgICAgIGlmKGlzSW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaXNQaWN0dXJlID0gcGFyZW50ICYmIHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZpcmVzTG9hZCA9IGRldGFpbC5maXJlc0xvYWQgfHwgKCgnc3JjJyBpbiBlbGVtKSAmJiAoc3Jjc2V0IHx8IHNyYyB8fCBpc1BpY3R1cmUpKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50ID0ge3RhcmdldDogZWxlbX07XG5cbiAgICAgICAgICAgICAgICBpZihmaXJlc0xvYWQpe1xuICAgICAgICAgICAgICAgICAgICBhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJlc2V0UHJlbG9hZGluZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0UHJlbG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChyZXNldFByZWxvYWRpbmcsIDI1MDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NvbmZpZy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXNQaWN0dXJlKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaC5jYWxsKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyksIGhhbmRsZVNvdXJjZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNyY3NldCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzcmMgJiYgIWlzUGljdHVyZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUlmcmFtZVNyYyhlbGVtLCBzcmMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zcmMgPSBzcmM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihpc0ltZyAmJiAoc3Jjc2V0IHx8IGlzUGljdHVyZSkpe1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQb2x5ZmlsbChlbGVtLCB7c3JjOiBzcmN9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGVsZW0uX2xhenlSYWNlKXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxlbS5fbGF6eVJhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcubGF6eUNsYXNzKTtcblxuICAgICAgICAgICAgckFGKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoICFmaXJlc0xvYWQgfHwgKGVsZW0uY29tcGxldGUgJiYgZWxlbS5uYXR1cmFsV2lkdGggPiAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZpcmVzTG9hZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFByZWxvYWRpbmcoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTG9hZGluZ0NsYXNzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG4gICAgICAgICAgICB2YXIgZGV0YWlsO1xuXG4gICAgICAgICAgICB2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuICAgICAgICAgICAgLy9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcbiAgICAgICAgICAgIHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NvbmZpZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuICAgICAgICAgICAgdmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuICAgICAgICAgICAgaWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXSgnc3JjJykgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcuZXJyb3JDbGFzcykpe3JldHVybjt9XG5cbiAgICAgICAgICAgIGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cbiAgICAgICAgICAgIGlmKGlzQXV0byl7XG4gICAgICAgICAgICAgICAgIGF1dG9TaXplci51cGRhdGVFbGVtKGVsZW0sIHRydWUsIGVsZW0ub2Zmc2V0V2lkdGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtLl9sYXp5UmFjZSA9IHRydWU7XG4gICAgICAgICAgICBpc0xvYWRpbmcrKztcblxuICAgICAgICAgICAgbGF6eVVudmVpbChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuICAgICAgICAgICAgaWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQob25sb2FkLCA5OTkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhZnRlclNjcm9sbCA9IGRlYm91bmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlID0gMztcbiAgICAgICAgICAgICAgICB0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXG4gICAgICAgICAgICB0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYobGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlID09IDMpe1xuICAgICAgICAgICAgICAgICAgICBsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZnRlclNjcm9sbCgpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIF86IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgICAgICBsYXp5bG9hZEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDb25maWcubGF6eUNsYXNzKTtcbiAgICAgICAgICAgICAgICBwcmVsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MgKyAnICcgKyBsYXp5U2l6ZXNDb25maWcucHJlbG9hZENsYXNzKTtcbiAgICAgICAgICAgICAgICBoRmFjID0gbGF6eVNpemVzQ29uZmlnLmhGYWM7XG5cbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpe1xuICAgICAgICAgICAgICAgICAgICBuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NQXR0ck1vZGlmaWVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEludGVydmFsKHRocm90dGxlZENoZWNrRWxlbWVudHMsIDk5OSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy8sICdmdWxsc2NyZWVuY2hhbmdlJ1xuICAgICAgICAgICAgICAgIFsnZm9jdXMnLCAnbW91c2VvdmVyJywgJ2NsaWNrJywgJ2xvYWQnLCAndHJhbnNpdGlvbmVuZCcsICdhbmltYXRpb25lbmQnLCAnd2Via2l0QW5pbWF0aW9uRW5kJ10uZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuICAgICAgICAgICAgICAgICAgICBvbmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Db250ZW50TG9hZGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYobGF6eWxvYWRFbGVtcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBjaGVja0VsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJBRi5fbHNGbHVzaCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcbiAgICAgICAgICAgIHVudmVpbDogdW52ZWlsRWxlbWVudFxuICAgICAgICB9O1xuICAgIH0pKCk7XG5cblxuICAgIHZhciBhdXRvU2l6ZXIgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGF1dG9zaXplc0VsZW1zO1xuXG4gICAgICAgIHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcbiAgICAgICAgICAgIHZhciBzb3VyY2VzLCBpLCBsZW47XG4gICAgICAgICAgICBlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgd2lkdGggKz0gJ3B4JztcblxuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG4gICAgICAgICAgICBpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG4gICAgICAgICAgICAgICAgc291cmNlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlc1tpXS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG4gICAgICAgICAgICAgICAgdXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBnZXRTaXplRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtLCBkYXRhQXR0ciwgd2lkdGgpe1xuICAgICAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgaWYocGFyZW50KXtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGdldFdpZHRoKGVsZW0sIHBhcmVudCwgd2lkdGgpO1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG4gICAgICAgICAgICAgICAgaWYoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZih3aWR0aCAmJiB3aWR0aCAhPT0gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUVsZW1lbnQoZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKGxlbil7XG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBnZXRTaXplRWxlbWVudChhdXRvc2l6ZXNFbGVtc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIF86IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5hdXRvc2l6ZXNDbGFzcyk7XG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tFbGVtczogZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyxcbiAgICAgICAgICAgIHVwZGF0ZUVsZW06IGdldFNpemVFbGVtZW50XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIWluaXQuaSl7XG4gICAgICAgICAgICBpbml0LmkgPSB0cnVlO1xuICAgICAgICAgICAgYXV0b1NpemVyLl8oKTtcbiAgICAgICAgICAgIGxvYWRlci5fKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwcm9wO1xuXG4gICAgICAgIHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGxhenlDbGFzczogJ2xhenlsb2FkJyxcbiAgICAgICAgICAgIGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG4gICAgICAgICAgICBsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG4gICAgICAgICAgICBwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG4gICAgICAgICAgICBlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcbiAgICAgICAgICAgIC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0JyxcbiAgICAgICAgICAgIGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG4gICAgICAgICAgICBzcmNBdHRyOiAnZGF0YS1zcmMnLFxuICAgICAgICAgICAgc3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0JyxcbiAgICAgICAgICAgIHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuICAgICAgICAgICAgLy9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcbiAgICAgICAgICAgIG1pblNpemU6IDQwLFxuICAgICAgICAgICAgY3VzdG9tTWVkaWE6IHt9LFxuICAgICAgICAgICAgaW5pdDogdHJ1ZSxcbiAgICAgICAgICAgIGV4cEZhY3RvcjogMS41LFxuICAgICAgICAgICAgaEZhYzogMC44LFxuICAgICAgICAgICAgbG9hZE1vZGU6IDIsXG4gICAgICAgICAgICBsb2FkSGlkZGVuOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxhenlTaXplc0NvbmZpZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuICAgICAgICBmb3IocHJvcCBpbiBsYXp5U2l6ZXNEZWZhdWx0cyl7XG4gICAgICAgICAgICBpZighKHByb3AgaW4gbGF6eVNpemVzQ29uZmlnKSl7XG4gICAgICAgICAgICAgICAgbGF6eVNpemVzQ29uZmlnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cubGF6eVNpemVzQ29uZmlnID0gbGF6eVNpemVzQ29uZmlnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKGxhenlTaXplc0NvbmZpZy5pbml0KXtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgICBsYXp5c2l6ZXMgPSB7XG4gICAgICAgIGNmZzogbGF6eVNpemVzQ29uZmlnLFxuICAgICAgICBhdXRvU2l6ZXI6IGF1dG9TaXplcixcbiAgICAgICAgbG9hZGVyOiBsb2FkZXIsXG4gICAgICAgIGluaXQ6IGluaXQsXG4gICAgICAgIHVQOiB1cGRhdGVQb2x5ZmlsbCxcbiAgICAgICAgYUM6IGFkZENsYXNzLFxuICAgICAgICByQzogcmVtb3ZlQ2xhc3MsXG4gICAgICAgIGhDOiBoYXNDbGFzcyxcbiAgICAgICAgZmlyZTogdHJpZ2dlckV2ZW50LFxuICAgICAgICBnVzogZ2V0V2lkdGgsXG4gICAgICAgIHJBRjogckFGLFxuICAgIH07XG5cbiAgICByZXR1cm4gbGF6eXNpemVzO1xufVxuKSk7IiwiLyohIGxpZ2h0Z2FsbGVyeSAtIHYxLjQuMCAtIDIwMTctMDYtMDRcbiogaHR0cDovL3NhY2hpbmNob29sdXIuZ2l0aHViLmlvL2xpZ2h0R2FsbGVyeS9cbiogQ29weXJpZ2h0IChjKSAyMDE3IFNhY2hpbiBOOyBMaWNlbnNlZCBHUEx2MyAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSB1bmxlc3MgYW1kTW9kdWxlSWQgaXMgc2V0XG4gICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uIChhMCkge1xuICAgICAgcmV0dXJuIChmYWN0b3J5KGEwKSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gIH0gZWxzZSB7XG4gICAgZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoJCkge1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIG1vZGU6ICdsZy1zbGlkZScsXG5cbiAgICAgICAgLy8gRXggOiAnZWFzZSdcbiAgICAgICAgY3NzRWFzaW5nOiAnZWFzZScsXG5cbiAgICAgICAgLy8nZm9yIGpxdWVyeSBhbmltYXRpb24nXG4gICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgIHNwZWVkOiA2MDAsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBhZGRDbGFzczogJycsXG4gICAgICAgIHN0YXJ0Q2xhc3M6ICdsZy1zdGFydC16b29tJyxcbiAgICAgICAgYmFja2Ryb3BEdXJhdGlvbjogMTUwLFxuICAgICAgICBoaWRlQmFyc0RlbGF5OiA2MDAwLFxuXG4gICAgICAgIHVzZUxlZnQ6IGZhbHNlLFxuXG4gICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICBlc2NLZXk6IHRydWUsXG4gICAgICAgIGtleVByZXNzOiB0cnVlLFxuICAgICAgICBjb250cm9sczogdHJ1ZSxcbiAgICAgICAgc2xpZGVFbmRBbmltYXRvaW46IHRydWUsXG4gICAgICAgIGhpZGVDb250cm9sT25FbmQ6IGZhbHNlLFxuICAgICAgICBtb3VzZXdoZWVsOiB0cnVlLFxuXG4gICAgICAgIGdldENhcHRpb25Gcm9tVGl0bGVPckFsdDogdHJ1ZSxcblxuICAgICAgICAvLyAubGctaXRlbSB8fCAnLmxnLXN1Yi1odG1sJ1xuICAgICAgICBhcHBlbmRTdWJIdG1sVG86ICcubGctc3ViLWh0bWwnLFxuXG4gICAgICAgIHN1Ykh0bWxTZWxlY3RvclJlbGF0aXZlOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2MgbnVtYmVyIG9mIHByZWxvYWQgc2xpZGVzXG4gICAgICAgICAqIHdpbGwgZXhpY3V0ZSBvbmx5IGFmdGVyIHRoZSBjdXJyZW50IHNsaWRlIGlzIGZ1bGx5IGxvYWRlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4IHlvdSBjbGlja2VkIG9uIDR0aCBpbWFnZSBhbmQgaWYgcHJlbG9hZCA9IDEgdGhlbiAzcmQgc2xpZGUgYW5kIDV0aFxuICAgICAgICAgKiBzbGlkZSB3aWxsIGJlIGxvYWRlZCBpbiB0aGUgYmFja2dyb3VuZCBhZnRlciB0aGUgNHRoIHNsaWRlIGlzIGZ1bGx5IGxvYWRlZC4uXG4gICAgICAgICAqIGlmIHByZWxvYWQgaXMgMiB0aGVuIDJuZCAzcmQgNXRoIDZ0aCBzbGlkZXMgd2lsbCBiZSBwcmVsb2FkZWQuLiAuLi4gLi4uXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBwcmVsb2FkOiAxLFxuICAgICAgICBzaG93QWZ0ZXJMb2FkOiB0cnVlLFxuICAgICAgICBzZWxlY3RvcjogJycsXG4gICAgICAgIHNlbGVjdFdpdGhpbjogJycsXG4gICAgICAgIG5leHRIdG1sOiAnJyxcbiAgICAgICAgcHJldkh0bWw6ICcnLFxuXG4gICAgICAgIC8vIDAsIDFcbiAgICAgICAgaW5kZXg6IGZhbHNlLFxuXG4gICAgICAgIGlmcmFtZU1heFdpZHRoOiAnMTAwJScsXG5cbiAgICAgICAgZG93bmxvYWQ6IHRydWUsXG4gICAgICAgIGNvdW50ZXI6IHRydWUsXG4gICAgICAgIGFwcGVuZENvdW50ZXJUbzogJy5sZy10b29sYmFyJyxcblxuICAgICAgICBzd2lwZVRocmVzaG9sZDogNTAsXG4gICAgICAgIGVuYWJsZVN3aXBlOiB0cnVlLFxuICAgICAgICBlbmFibGVEcmFnOiB0cnVlLFxuXG4gICAgICAgIGR5bmFtaWM6IGZhbHNlLFxuICAgICAgICBkeW5hbWljRWw6IFtdLFxuICAgICAgICBnYWxsZXJ5SWQ6IDFcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgICAvLyBDdXJyZW50IGxpZ2h0R2FsbGVyeSBlbGVtZW50XG4gICAgICAgIHRoaXMuZWwgPSBlbGVtZW50O1xuXG4gICAgICAgIC8vIEN1cnJlbnQganF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgdGhpcy4kZWwgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgIC8vIGxpZ2h0R2FsbGVyeSBzZXR0aW5nc1xuICAgICAgICB0aGlzLnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFdoZW4gdXNpbmcgZHluYW1pYyBtb2RlLCBlbnN1cmUgZHluYW1pY0VsIGlzIGFuIGFycmF5XG4gICAgICAgIGlmICh0aGlzLnMuZHluYW1pYyAmJiB0aGlzLnMuZHluYW1pY0VsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnMuZHluYW1pY0VsLmNvbnN0cnVjdG9yID09PSBBcnJheSAmJiAhdGhpcy5zLmR5bmFtaWNFbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93ICgnV2hlbiB1c2luZyBkeW5hbWljIG1vZGUsIHlvdSBtdXN0IGFsc28gZGVmaW5lIGR5bmFtaWNFbCBhcyBhbiBBcnJheS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxpZ2h0R2FsbGVyeSBtb2R1bGVzXG4gICAgICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuXG4gICAgICAgIC8vIGZhbHNlIHdoZW4gbGlnaHRnYWxsZXJ5IGNvbXBsZXRlIGZpcnN0IHNsaWRlO1xuICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmxnQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFRpbWVvdXQgZnVuY3Rpb24gZm9yIGhpZGluZyBjb250cm9scztcbiAgICAgICAgdGhpcy5oaWRlQmFydGltZW91dCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFRvIGRldGVybWluZSBicm93c2VyIHN1cHBvcnRzIGZvciB0b3VjaCBldmVudHM7XG4gICAgICAgIHRoaXMuaXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIERpc2FibGUgaGlkZUNvbnRyb2xPbkVuZCBpZiBzaWxkZUVuZEFuaW1hdGlvbiBpcyB0cnVlXG4gICAgICAgIGlmICh0aGlzLnMuc2xpZGVFbmRBbmltYXRvaW4pIHtcbiAgICAgICAgICAgIHRoaXMucy5oaWRlQ29udHJvbE9uRW5kID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHYWxsZXJ5IGl0ZW1zXG4gICAgICAgIGlmICh0aGlzLnMuZHluYW1pYykge1xuICAgICAgICAgICAgdGhpcy4kaXRlbXMgPSB0aGlzLnMuZHluYW1pY0VsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucy5zZWxlY3RvciA9PT0gJ3RoaXMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaXRlbXMgPSB0aGlzLiRlbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zLnNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnMuc2VsZWN0V2l0aGluKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGl0ZW1zID0gJCh0aGlzLnMuc2VsZWN0V2l0aGluKS5maW5kKHRoaXMucy5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaXRlbXMgPSB0aGlzLiRlbC5maW5kKCQodGhpcy5zLnNlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpdGVtcyA9IHRoaXMuJGVsLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAubGctaXRlbVxuICAgICAgICB0aGlzLiRzbGlkZSA9ICcnO1xuXG4gICAgICAgIC8vIC5sZy1vdXRlclxuICAgICAgICB0aGlzLiRvdXRlciA9ICcnO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIFBsdWdpbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgLy8gcy5wcmVsb2FkIHNob3VsZCBub3QgYmUgbW9yZSB0aGFuICRpdGVtLmxlbmd0aFxuICAgICAgICBpZiAoX3RoaXMucy5wcmVsb2FkID4gX3RoaXMuJGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgX3RoaXMucy5wcmVsb2FkID0gX3RoaXMuJGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGR5bmFtaWMgb3B0aW9uIGlzIGVuYWJsZWQgZXhlY3V0ZSBpbW1lZGlhdGVseVxuICAgICAgICB2YXIgX2hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgaWYgKF9oYXNoLmluZGV4T2YoJ2xnPScgKyB0aGlzLnMuZ2FsbGVyeUlkKSA+IDApIHtcblxuICAgICAgICAgICAgX3RoaXMuaW5kZXggPSBwYXJzZUludChfaGFzaC5zcGxpdCgnJnNsaWRlPScpWzFdLCAxMCk7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbGctZnJvbS1oYXNoJyk7XG4gICAgICAgICAgICBpZiAoISQoJ2JvZHknKS5oYXNDbGFzcygnbGctb24nKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJ1aWxkKF90aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbGctb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpcy5zLmR5bmFtaWMpIHtcblxuICAgICAgICAgICAgX3RoaXMuJGVsLnRyaWdnZXIoJ29uQmVmb3JlT3Blbi5sZycpO1xuXG4gICAgICAgICAgICBfdGhpcy5pbmRleCA9IF90aGlzLnMuaW5kZXggfHwgMDtcblxuICAgICAgICAgICAgLy8gcHJldmVudCBhY2NpZGVudGFsIGRvdWJsZSBleGVjdXRpb25cbiAgICAgICAgICAgIGlmICghJCgnYm9keScpLmhhc0NsYXNzKCdsZy1vbicpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYnVpbGQoX3RoaXMuaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2xnLW9uJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpZmZlcmVudCBuYW1lc3BhY2UgZm9yIGNsaWNrIGJlY2F1c2UgY2xpY2sgZXZlbnQgc2hvdWxkIG5vdCB1bmJpbmQgaWYgc2VsZWN0b3IgaXMgc2FtZSBvYmplY3QoJ3RoaXMnKVxuICAgICAgICAgICAgX3RoaXMuJGl0ZW1zLm9uKCdjbGljay5sZ2N1c3RvbScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgSUU4XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkJlZm9yZU9wZW4ubGcnKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLmluZGV4ID0gX3RoaXMucy5pbmRleCB8fCBfdGhpcy4kaXRlbXMuaW5kZXgodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGFjY2lkZW50YWwgZG91YmxlIGV4ZWN1dGlvblxuICAgICAgICAgICAgICAgIGlmICghJCgnYm9keScpLmhhc0NsYXNzKCdsZy1vbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJ1aWxkKF90aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdsZy1vbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBfdGhpcy5zdHJ1Y3R1cmUoKTtcblxuICAgICAgICAvLyBtb2R1bGUgY29uc3RydWN0b3JcbiAgICAgICAgJC5lYWNoKCQuZm4ubGlnaHRHYWxsZXJ5Lm1vZHVsZXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgX3RoaXMubW9kdWxlc1trZXldID0gbmV3ICQuZm4ubGlnaHRHYWxsZXJ5Lm1vZHVsZXNba2V5XShfdGhpcy5lbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNsaWRlIGZ1bmN0aW9uXG4gICAgICAgIF90aGlzLnNsaWRlKGluZGV4LCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcblxuICAgICAgICBpZiAoX3RoaXMucy5rZXlQcmVzcykge1xuICAgICAgICAgICAgX3RoaXMua2V5UHJlc3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpcy4kaXRlbXMubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICBfdGhpcy5hcnJvdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmVuYWJsZURyYWcoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbmFibGVTd2lwZSgpO1xuICAgICAgICAgICAgfSwgNTApO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMucy5tb3VzZXdoZWVsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubW91c2V3aGVlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJHNsaWRlLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvblNsaWRlQ2xpY2subGcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuY291bnRlcigpO1xuXG4gICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xuXG4gICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkFmdGVyT3Blbi5sZycpO1xuXG4gICAgICAgIC8vIEhpZGUgY29udHJvbGxlcnMgaWYgbW91c2UgZG9lc24ndCBtb3ZlIGZvciBzb21lIHBlcmlvZFxuICAgICAgICBfdGhpcy4kb3V0ZXIub24oJ21vdXNlbW92ZS5sZyBjbGljay5sZyB0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIF90aGlzLiRvdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuaGlkZUJhcnRpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBUaW1lb3V0IHdpbGwgYmUgY2xlYXJlZCBvbiBlYWNoIHNsaWRlIG1vdmVtZW50IGFsc29cbiAgICAgICAgICAgIF90aGlzLmhpZGVCYXJ0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcbiAgICAgICAgICAgIH0sIF90aGlzLnMuaGlkZUJhcnNEZWxheSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMuJG91dGVyLnRyaWdnZXIoJ21vdXNlbW92ZS5sZycpO1xuXG4gICAgfTtcblxuICAgIFBsdWdpbi5wcm90b3R5cGUuc3RydWN0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaXN0ID0gJyc7XG4gICAgICAgIHZhciBjb250cm9scyA9ICcnO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBzdWJIdG1sQ29udCA9ICcnO1xuICAgICAgICB2YXIgdGVtcGxhdGU7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxnLWJhY2tkcm9wXCI+PC9kaXY+Jyk7XG4gICAgICAgICQoJy5sZy1iYWNrZHJvcCcpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMucy5iYWNrZHJvcER1cmF0aW9uICsgJ21zJyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGdhbGxlcnkgaXRlbXNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuJGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaXN0ICs9ICc8ZGl2IGNsYXNzPVwibGctaXRlbVwiPjwvZGl2Pic7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgY29udHJvbGxzXG4gICAgICAgIGlmICh0aGlzLnMuY29udHJvbHMgJiYgdGhpcy4kaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29udHJvbHMgPSAnPGRpdiBjbGFzcz1cImxnLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImxnLXByZXYgbGctaWNvblwiPicgKyB0aGlzLnMucHJldkh0bWwgKyAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJsZy1uZXh0IGxnLWljb25cIj4nICsgdGhpcy5zLm5leHRIdG1sICsgJzwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctc3ViLWh0bWwnKSB7XG4gICAgICAgICAgICBzdWJIdG1sQ29udCA9ICc8ZGl2IGNsYXNzPVwibGctc3ViLWh0bWxcIj48L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImxnLW91dGVyICcgKyB0aGlzLnMuYWRkQ2xhc3MgKyAnICcgKyB0aGlzLnMuc3RhcnRDbGFzcyArICdcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibGdcIiBzdHlsZT1cIndpZHRoOicgKyB0aGlzLnMud2lkdGggKyAnOyBoZWlnaHQ6JyArIHRoaXMucy5oZWlnaHQgKyAnXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImxnLWlubmVyXCI+JyArIGxpc3QgKyAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImxnLXRvb2xiYXIgbGctZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxnLWNsb3NlIGxnLWljb25cIj48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICBjb250cm9scyArXG4gICAgICAgICAgICBzdWJIdG1sQ29udCArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy4kb3V0ZXIgPSAkKCcubGctb3V0ZXInKTtcbiAgICAgICAgdGhpcy4kc2xpZGUgPSB0aGlzLiRvdXRlci5maW5kKCcubGctaXRlbScpO1xuXG4gICAgICAgIGlmICh0aGlzLnMudXNlTGVmdCkge1xuICAgICAgICAgICAgdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLXVzZS1sZWZ0Jyk7XG5cbiAgICAgICAgICAgIC8vIFNldCBtb2RlIGxnLXNsaWRlIGlmIHVzZSBsZWZ0IGlzIHRydWU7XG4gICAgICAgICAgICB0aGlzLnMubW9kZSA9ICdsZy1zbGlkZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRvdXRlci5hZGRDbGFzcygnbGctdXNlLWNzczMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBmaXhlZCBoZWlnaHQgZ2FsbGVyeVxuICAgICAgICBfdGhpcy5zZXRUb3AoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUubGcgb3JpZW50YXRpb25jaGFuZ2UubGcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VG9wKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGQgY2xhc3MgbGctY3VycmVudCB0byByZW1vdmUgaW5pdGlhbCB0cmFuc2l0aW9uXG4gICAgICAgIHRoaXMuJHNsaWRlLmVxKHRoaXMuaW5kZXgpLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XG5cbiAgICAgICAgLy8gYWRkIENsYXNzIGZvciBjc3Mgc3VwcG9ydCBhbmQgdHJhbnNpdGlvbiBtb2RlXG4gICAgICAgIGlmICh0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJG91dGVyLmFkZENsYXNzKCdsZy1jc3MzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRvdXRlci5hZGRDbGFzcygnbGctY3NzJyk7XG5cbiAgICAgICAgICAgIC8vIFNldCBzcGVlZCAwIGJlY2F1c2Ugbm8gYW5pbWF0aW9uIHdpbGwgaGFwcGVuIGlmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNzczNcbiAgICAgICAgICAgIHRoaXMucy5zcGVlZCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdXRlci5hZGRDbGFzcyh0aGlzLnMubW9kZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucy5lbmFibGVEcmFnICYmIHRoaXMuJGl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuJG91dGVyLmFkZENsYXNzKCdsZy1ncmFiJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zLnNob3dBZnRlckxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuJG91dGVyLmFkZENsYXNzKCdsZy1zaG93LWFmdGVyLWxvYWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgIHZhciAkaW5uZXIgPSB0aGlzLiRvdXRlci5maW5kKCcubGctaW5uZXInKTtcbiAgICAgICAgICAgICRpbm5lci5jc3MoJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgdGhpcy5zLmNzc0Vhc2luZyk7XG4gICAgICAgICAgICAkaW5uZXIuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5zLnNwZWVkICsgJ21zJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmxnLWJhY2tkcm9wJykuYWRkQ2xhc3MoJ2luJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLXZpc2libGUnKTtcbiAgICAgICAgfSwgdGhpcy5zLmJhY2tkcm9wRHVyYXRpb24pO1xuXG4gICAgICAgIGlmICh0aGlzLnMuZG93bmxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuJG91dGVyLmZpbmQoJy5sZy10b29sYmFyJykuYXBwZW5kKCc8YSBpZD1cImxnLWRvd25sb2FkXCIgdGFyZ2V0PVwiX2JsYW5rXCIgZG93bmxvYWQgY2xhc3M9XCJsZy1kb3dubG9hZCBsZy1pY29uXCI+PC9hPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgc2Nyb2xsIHRvcCB2YWx1ZSB0byBzY3JvbGwgYmFjayBhZnRlciBjbG9zaW5nIHRoZSBnYWxsZXJ5Li5cbiAgICAgICAgdGhpcy5wcmV2U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgfTtcblxuICAgIC8vIEZvciBmaXhlZCBoZWlnaHQgZ2FsbGVyeVxuICAgIFBsdWdpbi5wcm90b3R5cGUuc2V0VG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnMuaGVpZ2h0ICE9PSAnMTAwJScpIHtcbiAgICAgICAgICAgIHZhciB3SCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciB0b3AgPSAod0ggLSBwYXJzZUludCh0aGlzLnMuaGVpZ2h0LCAxMCkpIC8gMjtcbiAgICAgICAgICAgIHZhciAkbEdhbGxlcnkgPSB0aGlzLiRvdXRlci5maW5kKCcubGcnKTtcbiAgICAgICAgICAgIGlmICh3SCA+PSBwYXJzZUludCh0aGlzLnMuaGVpZ2h0LCAxMCkpIHtcbiAgICAgICAgICAgICAgICAkbEdhbGxlcnkuY3NzKCd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGxHYWxsZXJ5LmNzcygndG9wJywgJzBweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIEZpbmQgY3NzMyBzdXBwb3J0XG4gICAgUGx1Z2luLnByb3RvdHlwZS5kb0NzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjaGVjayBmb3IgY3NzIGFuaW1hdGlvbiBzdXBwb3J0XG4gICAgICAgIHZhciBzdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ0todG1sVHJhbnNpdGlvbiddO1xuICAgICAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uW2ldIGluIHJvb3Quc3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdXBwb3J0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgQGRlc2MgQ2hlY2sgdGhlIGdpdmVuIHNyYyBpcyB2aWRlb1xuICAgICAqICBAcGFyYW0ge1N0cmluZ30gc3JjXG4gICAgICogIEByZXR1cm4ge09iamVjdH0gdmlkZW8gdHlwZVxuICAgICAqICBFeDp7IHlvdXR1YmUgIDogIFtcIi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9YzBhc0pnU3l4Y1lcIiwgXCJjMGFzSmdTeXhjWVwiXSB9XG4gICAgICovXG4gICAgUGx1Z2luLnByb3RvdHlwZS5pc1ZpZGVvID0gZnVuY3Rpb24oc3JjLCBpbmRleCkge1xuXG4gICAgICAgIHZhciBodG1sO1xuICAgICAgICBpZiAodGhpcy5zLmR5bmFtaWMpIHtcbiAgICAgICAgICAgIGh0bWwgPSB0aGlzLnMuZHluYW1pY0VsW2luZGV4XS5odG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHRtbCA9IHRoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLWh0bWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICBpZihodG1sKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDU6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnkgOi0gZGF0YS1zcmMgaXMgbm90IHB2b3ZpZGVkIG9uIHNsaWRlIGl0ZW0gJyArIChpbmRleCArIDEpICsgJy4gUGxlYXNlIG1ha2Ugc3VyZSB0aGUgc2VsZWN0b3IgcHJvcGVydHkgaXMgcHJvcGVybHkgY29uZmlndXJlZC4gTW9yZSBpbmZvIC0gaHR0cDovL3NhY2hpbmNob29sdXIuZ2l0aHViLmlvL2xpZ2h0R2FsbGVyeS9kZW1vcy9odG1sLW1hcmt1cC5odG1sJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHlvdXR1YmUgPSBzcmMubWF0Y2goL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOVxcLVxcX1xcJV0rKS9pKTtcbiAgICAgICAgdmFyIHZpbWVvID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgdmFyIGRhaWx5bW90aW9uID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pP2RhaS5seVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgdmFyIHZrID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pPyg/OnZrXFwuY29tfHZrb250YWt0ZVxcLnJ1KVxcLyg/OnZpZGVvX2V4dFxcLnBocFxcPykoLiopL2kpO1xuXG4gICAgICAgIGlmICh5b3V0dWJlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHlvdXR1YmU6IHlvdXR1YmVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodmltZW8pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmltZW86IHZpbWVvXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGRhaWx5bW90aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhaWx5bW90aW9uOiBkYWlseW1vdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh2aykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2azogdmtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIEBkZXNjIENyZWF0ZSBpbWFnZSBjb3VudGVyXG4gICAgICogIEV4OiAxLzEwXG4gICAgICovXG4gICAgUGx1Z2luLnByb3RvdHlwZS5jb3VudGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnMuY291bnRlcikge1xuICAgICAgICAgICAgJCh0aGlzLnMuYXBwZW5kQ291bnRlclRvKS5hcHBlbmQoJzxkaXYgaWQ9XCJsZy1jb3VudGVyXCI+PHNwYW4gaWQ9XCJsZy1jb3VudGVyLWN1cnJlbnRcIj4nICsgKHBhcnNlSW50KHRoaXMuaW5kZXgsIDEwKSArIDEpICsgJzwvc3Bhbj4gLyA8c3BhbiBpZD1cImxnLWNvdW50ZXItYWxsXCI+JyArIHRoaXMuJGl0ZW1zLmxlbmd0aCArICc8L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIEBkZXNjIGFkZCBzdWItaHRtbCBpbnRvIHRoZSBzbGlkZVxuICAgICAqICBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcbiAgICAgKi9cbiAgICBQbHVnaW4ucHJvdG90eXBlLmFkZEh0bWwgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICB2YXIgc3ViSHRtbCA9IG51bGw7XG4gICAgICAgIHZhciBzdWJIdG1sVXJsO1xuICAgICAgICB2YXIgJGN1cnJlbnRFbGU7XG4gICAgICAgIGlmICh0aGlzLnMuZHluYW1pYykge1xuICAgICAgICAgICAgaWYgKHRoaXMucy5keW5hbWljRWxbaW5kZXhdLnN1Ykh0bWxVcmwpIHtcbiAgICAgICAgICAgICAgICBzdWJIdG1sVXJsID0gdGhpcy5zLmR5bmFtaWNFbFtpbmRleF0uc3ViSHRtbFVybDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ViSHRtbCA9IHRoaXMucy5keW5hbWljRWxbaW5kZXhdLnN1Ykh0bWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkY3VycmVudEVsZSA9IHRoaXMuJGl0ZW1zLmVxKGluZGV4KTtcbiAgICAgICAgICAgIGlmICgkY3VycmVudEVsZS5hdHRyKCdkYXRhLXN1Yi1odG1sLXVybCcpKSB7XG4gICAgICAgICAgICAgICAgc3ViSHRtbFVybCA9ICRjdXJyZW50RWxlLmF0dHIoJ2RhdGEtc3ViLWh0bWwtdXJsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkY3VycmVudEVsZS5hdHRyKCdkYXRhLXN1Yi1odG1sJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucy5nZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQgJiYgIXN1Ykh0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSHRtbCA9ICRjdXJyZW50RWxlLmF0dHIoJ3RpdGxlJykgfHwgJGN1cnJlbnRFbGUuZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdhbHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN1Ykh0bWxVcmwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSHRtbCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3ViSHRtbCAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGZpcnN0IGxldHRlciBvZiBzdWJodG1sXG4gICAgICAgICAgICAgICAgLy8gaWYgZmlyc3QgbGV0dGVyIHN0YXJ0cyB3aXRoIC4gb3IgIyBnZXQgdGhlIGh0bWwgZm9ybSB0aGUgalF1ZXJ5IG9iamVjdFxuICAgICAgICAgICAgICAgIHZhciBmTCA9IHN1Ykh0bWwuc3Vic3RyaW5nKDAsIDEpO1xuICAgICAgICAgICAgICAgIGlmIChmTCA9PT0gJy4nIHx8IGZMID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucy5zdWJIdG1sU2VsZWN0b3JSZWxhdGl2ZSAmJiAhdGhpcy5zLmR5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkY3VycmVudEVsZS5maW5kKHN1Ykh0bWwpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkKHN1Ykh0bWwpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ViSHRtbCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctc3ViLWh0bWwnKSB7XG5cbiAgICAgICAgICAgIGlmIChzdWJIdG1sVXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3V0ZXIuZmluZCh0aGlzLnMuYXBwZW5kU3ViSHRtbFRvKS5sb2FkKHN1Ykh0bWxVcmwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdXRlci5maW5kKHRoaXMucy5hcHBlbmRTdWJIdG1sVG8pLmh0bWwoc3ViSHRtbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHN1Ykh0bWxVcmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzbGlkZS5lcShpbmRleCkubG9hZChzdWJIdG1sVXJsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2xpZGUuZXEoaW5kZXgpLmFwcGVuZChzdWJIdG1sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBsZy1lbXB0eS1odG1sIGNsYXNzIGlmIHRpdGxlIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgaWYgKHR5cGVvZiBzdWJIdG1sICE9PSAndW5kZWZpbmVkJyAmJiBzdWJIdG1sICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoc3ViSHRtbCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdXRlci5maW5kKHRoaXMucy5hcHBlbmRTdWJIdG1sVG8pLmFkZENsYXNzKCdsZy1lbXB0eS1odG1sJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG91dGVyLmZpbmQodGhpcy5zLmFwcGVuZFN1Ykh0bWxUbykucmVtb3ZlQ2xhc3MoJ2xnLWVtcHR5LWh0bWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVsLnRyaWdnZXIoJ29uQWZ0ZXJBcHBlbmRTdWJIdG1sLmxnJywgW2luZGV4XSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICBAZGVzYyBQcmVsb2FkIHNsaWRlc1xuICAgICAqICBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcbiAgICAgKi9cbiAgICBQbHVnaW4ucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICB2YXIgaSA9IDE7XG4gICAgICAgIHZhciBqID0gMTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSB0aGlzLnMucHJlbG9hZDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSB0aGlzLiRpdGVtcy5sZW5ndGggLSBpbmRleCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KGluZGV4ICsgaSwgZmFsc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChqID0gMTsgaiA8PSB0aGlzLnMucHJlbG9hZDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggLSBqIDwgMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KGluZGV4IC0gaiwgZmFsc2UsIDApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICBAZGVzYyBMb2FkIHNsaWRlIGNvbnRlbnQgaW50byBzbGlkZS5cbiAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlLlxuICAgICAqICBAcGFyYW0ge0Jvb2xlYW59IHJlYyAtIGlmIHRydWUgY2FsbCBsb2FkY29udGVudCgpIGZ1bmN0aW9uIGFnYWluLlxuICAgICAqICBAcGFyYW0ge0Jvb2xlYW59IGRlbGF5IC0gZGVsYXkgZm9yIGFkZGluZyBjb21wbGV0ZSBjbGFzcy4gaXQgaXMgMCBleGNlcHQgZmlyc3QgdGltZS5cbiAgICAgKi9cbiAgICBQbHVnaW4ucHJvdG90eXBlLmxvYWRDb250ZW50ID0gZnVuY3Rpb24oaW5kZXgsIHJlYywgZGVsYXkpIHtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2hhc1Bvc3RlciA9IGZhbHNlO1xuICAgICAgICB2YXIgXyRpbWc7XG4gICAgICAgIHZhciBfc3JjO1xuICAgICAgICB2YXIgX3Bvc3RlcjtcbiAgICAgICAgdmFyIF9zcmNzZXQ7XG4gICAgICAgIHZhciBfc2l6ZXM7XG4gICAgICAgIHZhciBfaHRtbDtcbiAgICAgICAgdmFyIGdldFJlc3BvbnNpdmVTcmMgPSBmdW5jdGlvbihzcmNJdG1zKSB7XG4gICAgICAgICAgICB2YXIgcnNXaWR0aCA9IFtdO1xuICAgICAgICAgICAgdmFyIHJzU3JjID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNyY0l0bXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX19zcmMgPSBzcmNJdG1zW2ldLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYW5hZ2UgZW1wdHkgc3BhY2VcbiAgICAgICAgICAgICAgICBpZiAoX19zcmNbMF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fc3JjLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByc1NyYy5wdXNoKF9fc3JjWzBdKTtcbiAgICAgICAgICAgICAgICByc1dpZHRoLnB1c2goX19zcmNbMV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJzV2lkdGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQocnNXaWR0aFtqXSwgMTApID4gd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zcmMgPSByc1NyY1tqXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfdGhpcy5zLmR5bmFtaWMpIHtcblxuICAgICAgICAgICAgaWYgKF90aGlzLnMuZHluYW1pY0VsW2luZGV4XS5wb3N0ZXIpIHtcbiAgICAgICAgICAgICAgICBfaGFzUG9zdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfcG9zdGVyID0gX3RoaXMucy5keW5hbWljRWxbaW5kZXhdLnBvc3RlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2h0bWwgPSBfdGhpcy5zLmR5bmFtaWNFbFtpbmRleF0uaHRtbDtcbiAgICAgICAgICAgIF9zcmMgPSBfdGhpcy5zLmR5bmFtaWNFbFtpbmRleF0uc3JjO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMucy5keW5hbWljRWxbaW5kZXhdLnJlc3BvbnNpdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3JjRHlJdG1zID0gX3RoaXMucy5keW5hbWljRWxbaW5kZXhdLnJlc3BvbnNpdmUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICBnZXRSZXNwb25zaXZlU3JjKHNyY0R5SXRtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9zcmNzZXQgPSBfdGhpcy5zLmR5bmFtaWNFbFtpbmRleF0uc3Jjc2V0O1xuICAgICAgICAgICAgX3NpemVzID0gX3RoaXMucy5keW5hbWljRWxbaW5kZXhdLnNpemVzO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy4kaXRlbXMuZXEoaW5kZXgpLmF0dHIoJ2RhdGEtcG9zdGVyJykpIHtcbiAgICAgICAgICAgICAgICBfaGFzUG9zdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfcG9zdGVyID0gX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLXBvc3RlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfaHRtbCA9IF90aGlzLiRpdGVtcy5lcShpbmRleCkuYXR0cignZGF0YS1odG1sJyk7XG4gICAgICAgICAgICBfc3JjID0gX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdocmVmJykgfHwgX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLXNyYycpO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLXJlc3BvbnNpdmUnKSkge1xuICAgICAgICAgICAgICAgIHZhciBzcmNJdG1zID0gX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLXJlc3BvbnNpdmUnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIGdldFJlc3BvbnNpdmVTcmMoc3JjSXRtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9zcmNzZXQgPSBfdGhpcy4kaXRlbXMuZXEoaW5kZXgpLmF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICBfc2l6ZXMgPSBfdGhpcy4kaXRlbXMuZXEoaW5kZXgpLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiAoX3NyYyB8fCBfc3Jjc2V0IHx8IF9zaXplcyB8fCBfcG9zdGVyKSB7XG5cbiAgICAgICAgdmFyIGlmcmFtZSA9IGZhbHNlO1xuICAgICAgICBpZiAoX3RoaXMucy5keW5hbWljKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMucy5keW5hbWljRWxbaW5kZXhdLmlmcmFtZSkge1xuICAgICAgICAgICAgICAgIGlmcmFtZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLWlmcmFtZScpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICBpZnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pc1ZpZGVvID0gX3RoaXMuaXNWaWRlbyhfc3JjLCBpbmRleCk7XG4gICAgICAgIGlmICghX3RoaXMuJHNsaWRlLmVxKGluZGV4KS5oYXNDbGFzcygnbGctbG9hZGVkJykpIHtcbiAgICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kc2xpZGUuZXEoaW5kZXgpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsZy12aWRlby1jb250IGxnLWhhcy1pZnJhbWVcIiBzdHlsZT1cIm1heC13aWR0aDonICsgX3RoaXMucy5pZnJhbWVNYXhXaWR0aCArICdcIj48ZGl2IGNsYXNzPVwibGctdmlkZW9cIj48aWZyYW1lIGNsYXNzPVwibGctb2JqZWN0XCIgZnJhbWVib3JkZXI9XCIwXCIgc3JjPVwiJyArIF9zcmMgKyAnXCIgIGFsbG93ZnVsbHNjcmVlbj1cInRydWVcIj48L2lmcmFtZT48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2hhc1Bvc3Rlcikge1xuICAgICAgICAgICAgICAgIHZhciB2aWRlb0NsYXNzID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKF9pc1ZpZGVvICYmIF9pc1ZpZGVvLnlvdXR1YmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9DbGFzcyA9ICdsZy1oYXMteW91dHViZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaXNWaWRlbyAmJiBfaXNWaWRlby52aW1lbykge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy12aW1lbyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9DbGFzcyA9ICdsZy1oYXMtaHRtbDUnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90aGlzLiRzbGlkZS5lcShpbmRleCkucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxnLXZpZGVvLWNvbnQgJyArIHZpZGVvQ2xhc3MgKyAnIFwiPjxkaXYgY2xhc3M9XCJsZy12aWRlb1wiPjxzcGFuIGNsYXNzPVwibGctdmlkZW8tcGxheVwiPjwvc3Bhbj48aW1nIGNsYXNzPVwibGctb2JqZWN0IGxnLWhhcy1wb3N0ZXJcIiBzcmM9XCInICsgX3Bvc3RlciArICdcIiAvPjwvZGl2PjwvZGl2PicpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9pc1ZpZGVvKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHNsaWRlLmVxKGluZGV4KS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGctdmlkZW8tY29udCBcIj48ZGl2IGNsYXNzPVwibGctdmlkZW9cIj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignaGFzVmlkZW8ubGcnLCBbaW5kZXgsIF9zcmMsIF9odG1sXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLiRzbGlkZS5lcShpbmRleCkucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxnLWltZy13cmFwXCI+PGltZyBjbGFzcz1cImxnLW9iamVjdCBsZy1pbWFnZVwiIHNyYz1cIicgKyBfc3JjICsgJ1wiIC8+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkFmZXJBcHBlbmRTbGlkZS5sZycsIFtpbmRleF0pO1xuXG4gICAgICAgICAgICBfJGltZyA9IF90aGlzLiRzbGlkZS5lcShpbmRleCkuZmluZCgnLmxnLW9iamVjdCcpO1xuICAgICAgICAgICAgaWYgKF9zaXplcykge1xuICAgICAgICAgICAgICAgIF8kaW1nLmF0dHIoJ3NpemVzJywgX3NpemVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9zcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBfJGltZy5hdHRyKCdzcmNzZXQnLCBfc3Jjc2V0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlZmlsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogW18kaW1nWzBdXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignbGlnaHRHYWxsZXJ5IDotIElmIHlvdSB3YW50IHNyY3NldCB0byBiZSBzdXBwb3J0ZWQgZm9yIG9sZGVyIGJyb3dzZXIgcGxlYXNlIGluY2x1ZGUgcGljdHVyZWZpbCB2ZXJzaW9uIDIgamF2YXNjcmlwdCBsaWJyYXJ5IGluIHlvdXIgZG9jdW1lbnQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zLmFwcGVuZFN1Ykh0bWxUbyAhPT0gJy5sZy1zdWItaHRtbCcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRIdG1sKGluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMuJHNsaWRlLmVxKGluZGV4KS5hZGRDbGFzcygnbGctbG9hZGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy4kc2xpZGUuZXEoaW5kZXgpLmZpbmQoJy5sZy1vYmplY3QnKS5vbignbG9hZC5sZyBlcnJvci5sZycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAvLyBGb3IgZmlyc3QgdGltZSBhZGQgc29tZSBkZWxheSBmb3IgZGlzcGxheWluZyB0aGUgc3RhcnQgYW5pbWF0aW9uLlxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IDA7XG5cbiAgICAgICAgICAgIC8vIERvIG5vdCBjaGFuZ2UgdGhlIGRlbGF5IHZhbHVlIGJlY2F1c2UgaXQgaXMgcmVxdWlyZWQgZm9yIHpvb20gcGx1Z2luLlxuICAgICAgICAgICAgLy8gSWYgZ2FsbGVyeSBvcGVuZWQgZnJvbSBkaXJlY3QgdXJsIChoYXNoKSBzcGVlZCB2YWx1ZSBzaG91bGQgYmUgMFxuICAgICAgICAgICAgaWYgKGRlbGF5ICYmICEkKCdib2R5JykuaGFzQ2xhc3MoJ2xnLWZyb20taGFzaCcpKSB7XG4gICAgICAgICAgICAgICAgX3NwZWVkID0gZGVsYXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHNsaWRlLmVxKGluZGV4KS5hZGRDbGFzcygnbGctY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25TbGlkZUl0ZW1Mb2FkLmxnJywgW2luZGV4LCBkZWxheSB8fCAwXSk7XG4gICAgICAgICAgICB9LCBfc3BlZWQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEB0b2RvIGNoZWNrIGxvYWQgc3RhdGUgZm9yIGh0bWw1IHZpZGVvc1xuICAgICAgICBpZiAoX2lzVmlkZW8gJiYgX2lzVmlkZW8uaHRtbDUgJiYgIV9oYXNQb3N0ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLiRzbGlkZS5lcShpbmRleCkuYWRkQ2xhc3MoJ2xnLWNvbXBsZXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVjID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLiRzbGlkZS5lcShpbmRleCkuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlJykpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kc2xpZGUuZXEoaW5kZXgpLmZpbmQoJy5sZy1vYmplY3QnKS5vbignbG9hZC5sZyBlcnJvci5sZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVsb2FkKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucHJlbG9hZChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL31cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgKiAgIEBkZXNjIHNsaWRlIGZ1bmN0aW9uIGZvciBsaWdodGdhbGxlcnlcbiAgICAgICAgKiogU2xpZGUoKSBnZXRzIGNhbGwgb24gc3RhcnRcbiAgICAgICAgKiogKiogU2V0IGxnLm9uIHRydWUgb25jZSBzbGlkZSgpIGZ1bmN0aW9uIGdldHMgY2FsbGVkLlxuICAgICAgICAqKiBDYWxsIGxvYWRDb250ZW50KCkgb24gc2xpZGUoKSBmdW5jdGlvbiBpbnNpZGUgc2V0VGltZW91dFxuICAgICAgICAqKiAqKiBPbiBmaXJzdCBzbGlkZSB3ZSBkbyBub3Qgd2FudCBhbnkgYW5pbWF0aW9uIGxpa2Ugc2xpZGUgb2YgZmFkZVxuICAgICAgICAqKiAqKiBTbyBvbiBmaXJzdCBzbGlkZSggaWYgbGcub24gaWYgZmFsc2UgdGhhdCBpcyBmaXJzdCBzbGlkZSkgbG9hZENvbnRlbnQoKSBzaG91bGQgc3RhcnQgbG9hZGluZyBpbW1lZGlhdGVseVxuICAgICAgICAqKiAqKiBFbHNlIGxvYWRDb250ZW50KCkgc2hvdWxkIHdhaXQgZm9yIHRoZSB0cmFuc2l0aW9uIHRvIGNvbXBsZXRlLlxuICAgICAgICAqKiAqKiBTbyBzZXQgdGltZW91dCBzLnNwZWVkICsgNTBcbiAgICA8PT4gKiogbG9hZENvbnRlbnQoKSB3aWxsIGxvYWQgc2xpZGUgY29udGVudCBpbiB0byB0aGUgcGFydGljdWxhciBzbGlkZVxuICAgICAgICAqKiAqKiBJdCBoYXMgcmVjdXJzaW9uIChyZWMpIHBhcmFtZXRlci4gaWYgcmVjID09PSB0cnVlIGxvYWRDb250ZW50KCkgd2lsbCBjYWxsIHByZWxvYWQoKSBmdW5jdGlvbi5cbiAgICAgICAgKiogKiogcHJlbG9hZCB3aWxsIGV4ZWN1dGUgb25seSB3aGVuIHRoZSBwcmV2aW91cyBzbGlkZSBpcyBmdWxseSBsb2FkZWQgKGltYWdlcyBpZnJhbWUpXG4gICAgICAgICoqICoqIGF2b2lkIHNpbXVsdGFuZW91cyBpbWFnZSBsb2FkXG4gICAgPD0+ICoqIFByZWxvYWQoKSB3aWxsIGNoZWNrIGZvciBzLnByZWxvYWQgdmFsdWUgYW5kIGNhbGwgbG9hZENvbnRlbnQoKSBhZ2FpbiBhY2NvcmluZyB0byBwcmVsb2FkIHZhbHVlXG4gICAgICAgICoqIGxvYWRDb250ZW50KCkgIDw9PT09PiBQcmVsb2FkKCk7XG5cbiAgICAqICAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXG4gICAgKiAgIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50IG9yIG1vdXNlIGRyYWdcbiAgICAqICAgQHBhcmFtIHtCb29sZWFufSBmcm9tVGh1bWIgLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdGh1bWJuYWlsIGNsaWNrXG4gICAgKiAgIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb24gLSBEaXJlY3Rpb24gb2YgdGhlIHNsaWRlKG5leHQvcHJldilcbiAgICAqL1xuICAgIFBsdWdpbi5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbihpbmRleCwgZnJvbVRvdWNoLCBmcm9tVGh1bWIsIGRpcmVjdGlvbikge1xuXG4gICAgICAgIHZhciBfcHJldkluZGV4ID0gdGhpcy4kb3V0ZXIuZmluZCgnLmxnLWN1cnJlbnQnKS5pbmRleCgpO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIC8vIFByZXZlbnQgaWYgbXVsdGlwbGUgY2FsbFxuICAgICAgICAvLyBSZXF1aXJlZCBmb3IgaHNoIHBsdWdpblxuICAgICAgICBpZiAoX3RoaXMubEdhbGxlcnlPbiAmJiAoX3ByZXZJbmRleCA9PT0gaW5kZXgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2xlbmd0aCA9IHRoaXMuJHNsaWRlLmxlbmd0aDtcbiAgICAgICAgdmFyIF90aW1lID0gX3RoaXMubEdhbGxlcnlPbiA/IHRoaXMucy5zcGVlZCA6IDA7XG5cbiAgICAgICAgaWYgKCFfdGhpcy5sZ0J1c3kpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMucy5kb3dubG9hZCkge1xuICAgICAgICAgICAgICAgIHZhciBfc3JjO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zLmR5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NyYyA9IF90aGlzLnMuZHluYW1pY0VsW2luZGV4XS5kb3dubG9hZFVybCAhPT0gZmFsc2UgJiYgKF90aGlzLnMuZHluYW1pY0VsW2luZGV4XS5kb3dubG9hZFVybCB8fCBfdGhpcy5zLmR5bmFtaWNFbFtpbmRleF0uc3JjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfc3JjID0gX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLWRvd25sb2FkLXVybCcpICE9PSAnZmFsc2UnICYmIChfdGhpcy4kaXRlbXMuZXEoaW5kZXgpLmF0dHIoJ2RhdGEtZG93bmxvYWQtdXJsJykgfHwgX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdocmVmJykgfHwgX3RoaXMuJGl0ZW1zLmVxKGluZGV4KS5hdHRyKCdkYXRhLXNyYycpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNsZy1kb3dubG9hZCcpLmF0dHIoJ2hyZWYnLCBfc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWRvd25sb2FkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLmFkZENsYXNzKCdsZy1oaWRlLWRvd25sb2FkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VyKCdvbkJlZm9yZVNsaWRlLmxnJywgW19wcmV2SW5kZXgsIGluZGV4LCBmcm9tVG91Y2gsIGZyb21UaHVtYl0pO1xuXG4gICAgICAgICAgICBfdGhpcy5sZ0J1c3kgPSB0cnVlO1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuaGlkZUJhcnRpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGl0bGUgaWYgdGhpcy5zLmFwcGVuZFN1Ykh0bWxUbyA9PT0gbGctc3ViLWh0bWxcbiAgICAgICAgICAgIGlmICh0aGlzLnMuYXBwZW5kU3ViSHRtbFRvID09PSAnLmxnLXN1Yi1odG1sJykge1xuXG4gICAgICAgICAgICAgICAgLy8gd2FpdCBmb3Igc2xpZGUgYW5pbWF0aW9uIHRvIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkSHRtbChpbmRleCk7XG4gICAgICAgICAgICAgICAgfSwgX3RpbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFycm93RGlzYWJsZShpbmRleCk7XG5cbiAgICAgICAgICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgX3ByZXZJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAncHJldic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+IF9wcmV2SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmcm9tVG91Y2gpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgdHJhbnNpdGlvbnNcbiAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLW5vLXRyYW5zJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzbGlkZS5yZW1vdmVDbGFzcygnbGctcHJldi1zbGlkZSBsZy1uZXh0LXNsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncHJldicpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL3ByZXZzbGlkZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzbGlkZS5lcShpbmRleCkuYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2xpZGUuZXEoX3ByZXZJbmRleCkuYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2xpZGUuZXEoaW5kZXgpLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNsaWRlLmVxKF9wcmV2SW5kZXgpLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2l2ZSA1MCBtcyBmb3IgYnJvd3NlciB0byBhZGQvcmVtb3ZlIGNsYXNzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHNsaWRlLnJlbW92ZUNsYXNzKCdsZy1jdXJyZW50Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9fdGhpcy4kc2xpZGUuZXEoX3ByZXZJbmRleCkucmVtb3ZlQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHNsaWRlLmVxKGluZGV4KS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IGFsbCB0cmFuc2l0aW9uc1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLW5vLXRyYW5zJyk7XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHNsaWRlLnJlbW92ZUNsYXNzKCdsZy1wcmV2LXNsaWRlIGxnLWN1cnJlbnQgbGctbmV4dC1zbGlkZScpO1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaFByZXY7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoTmV4dDtcbiAgICAgICAgICAgICAgICBpZiAoX2xlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gaW5kZXggLSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSBpbmRleCArIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbmRleCA9PT0gMCkgJiYgKF9wcmV2SW5kZXggPT09IF9sZW5ndGggLSAxKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gX2xlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGluZGV4ID09PSBfbGVuZ3RoIC0gMSkgJiYgKF9wcmV2SW5kZXggPT09IDApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXYgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSBfbGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHNsaWRlLmVxKHRvdWNoTmV4dCkuYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kc2xpZGUuZXEodG91Y2hQcmV2KS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90aGlzLiRzbGlkZS5lcShpbmRleCkuYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF90aGlzLmxHYWxsZXJ5T24pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudChpbmRleCwgdHJ1ZSwgMCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zLnNwZWVkICsgNTApO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubGdCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkFmdGVyU2xpZGUubGcnLCBbX3ByZXZJbmRleCwgaW5kZXgsIGZyb21Ub3VjaCwgZnJvbVRodW1iXSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zLnNwZWVkKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudChpbmRleCwgdHJ1ZSwgX3RoaXMucy5iYWNrZHJvcER1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLmxnQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkFmdGVyU2xpZGUubGcnLCBbX3ByZXZJbmRleCwgaW5kZXgsIGZyb21Ub3VjaCwgZnJvbVRodW1iXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLmxHYWxsZXJ5T24gPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zLmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICAkKCcjbGctY291bnRlci1jdXJyZW50JykudGV4dChpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgQGRlc2MgR28gdG8gbmV4dCBzbGlkZVxuICAgICAqICBAcGFyYW0ge0Jvb2xlYW59IGZyb21Ub3VjaCAtIHRydWUgaWYgc2xpZGUgZnVuY3Rpb24gY2FsbGVkIHZpYSB0b3VjaCBldmVudFxuICAgICAqL1xuICAgIFBsdWdpbi5wcm90b3R5cGUuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uKGZyb21Ub3VjaCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2xvb3AgPSBfdGhpcy5zLmxvb3A7XG4gICAgICAgIGlmIChmcm9tVG91Y2ggJiYgX3RoaXMuJHNsaWRlLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIF9sb29wID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV90aGlzLmxnQnVzeSkge1xuICAgICAgICAgICAgaWYgKChfdGhpcy5pbmRleCArIDEpIDwgX3RoaXMuJHNsaWRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmluZGV4Kys7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGVsLnRyaWdnZXIoJ29uQmVmb3JlTmV4dFNsaWRlLmxnJywgW190aGlzLmluZGV4XSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGUoX3RoaXMuaW5kZXgsIGZyb21Ub3VjaCwgZmFsc2UsICduZXh0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfbG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkJlZm9yZU5leHRTbGlkZS5sZycsIFtfdGhpcy5pbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZShfdGhpcy5pbmRleCwgZnJvbVRvdWNoLCBmYWxzZSwgJ25leHQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnMuc2xpZGVFbmRBbmltYXRvaW4gJiYgIWZyb21Ub3VjaCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLXJpZ2h0LWVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLnJlbW92ZUNsYXNzKCdsZy1yaWdodC1lbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIEBkZXNjIEdvIHRvIHByZXZpb3VzIHNsaWRlXG4gICAgICogIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50XG4gICAgICovXG4gICAgUGx1Z2luLnByb3RvdHlwZS5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24oZnJvbVRvdWNoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfbG9vcCA9IF90aGlzLnMubG9vcDtcbiAgICAgICAgaWYgKGZyb21Ub3VjaCAmJiBfdGhpcy4kc2xpZGUubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX3RoaXMubGdCdXN5KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5kZXgtLTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25CZWZvcmVQcmV2U2xpZGUubGcnLCBbX3RoaXMuaW5kZXgsIGZyb21Ub3VjaF0pO1xuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlKF90aGlzLmluZGV4LCBmcm9tVG91Y2gsIGZhbHNlLCAncHJldicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoX2xvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5kZXggPSBfdGhpcy4kaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGVsLnRyaWdnZXIoJ29uQmVmb3JlUHJldlNsaWRlLmxnJywgW190aGlzLmluZGV4LCBmcm9tVG91Y2hdKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2xpZGUoX3RoaXMuaW5kZXgsIGZyb21Ub3VjaCwgZmFsc2UsICdwcmV2Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy5zLnNsaWRlRW5kQW5pbWF0b2luICYmICFmcm9tVG91Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLmFkZENsYXNzKCdsZy1sZWZ0LWVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLnJlbW92ZUNsYXNzKCdsZy1sZWZ0LWVuZCcpO1xuICAgICAgICAgICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBQbHVnaW4ucHJvdG90eXBlLmtleVByZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLiRpdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ2tleXVwLmxnJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdrZXlkb3duLmxnJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLnMuZXNjS2V5ID09PSB0cnVlICYmIGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kb3V0ZXIuaGFzQ2xhc3MoJ2xnLXRodW1iLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLnJlbW92ZUNsYXNzKCdsZy10aHVtYi1vcGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRvdXRlci5maW5kKCcubGctcHJldicpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRvdXRlci5maW5kKCcubGctbmV4dCcpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5hcnJvd0Rpc2FibGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIC8vIERpc2FibGUgYXJyb3dzIGlmIHMuaGlkZUNvbnRyb2xPbkVuZCBpcyB0cnVlXG4gICAgICAgIGlmICghdGhpcy5zLmxvb3AgJiYgdGhpcy5zLmhpZGVDb250cm9sT25FbmQpIHtcbiAgICAgICAgICAgIGlmICgoaW5kZXggKyAxKSA8IHRoaXMuJHNsaWRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG91dGVyLmZpbmQoJy5sZy1uZXh0JykucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3V0ZXIuZmluZCgnLmxnLW5leHQnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3V0ZXIuZmluZCgnLmxnLXByZXYnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdXRlci5maW5kKCcubGctcHJldicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbigkZWwsIHhWYWx1ZSwgeVZhbHVlKSB7XG4gICAgICAgIC8vIGpRdWVyeSBzdXBwb3J0cyBBdXRvbWF0aWMgQ1NTIHByZWZpeGluZyBzaW5jZSBqUXVlcnkgMS44LjBcbiAgICAgICAgaWYgKHRoaXMucy51c2VMZWZ0KSB7XG4gICAgICAgICAgICAkZWwuY3NzKCdsZWZ0JywgeFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRlbC5jc3Moe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCcgKyAoeFZhbHVlKSArICdweCwgJyArIHlWYWx1ZSArICdweCwgMHB4KSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFBsdWdpbi5wcm90b3R5cGUudG91Y2hNb3ZlID0gZnVuY3Rpb24oc3RhcnRDb29yZHMsIGVuZENvb3Jkcykge1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGVuZENvb3JkcyAtIHN0YXJ0Q29vcmRzO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPiAxNSkge1xuICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxuICAgICAgICAgICAgdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCBzbGlkZVxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy4kc2xpZGUuZXEodGhpcy5pbmRleCksIGRpc3RhbmNlLCAwKTtcblxuICAgICAgICAgICAgLy8gbW92ZSBuZXh0IGFuZCBwcmV2IHNsaWRlIHdpdGggY3VycmVudCBzbGlkZVxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUoJCgnLmxnLXByZXYtc2xpZGUnKSwgLXRoaXMuJHNsaWRlLmVxKHRoaXMuaW5kZXgpLndpZHRoKCkgKyBkaXN0YW5jZSwgMCk7XG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSgkKCcubGctbmV4dC1zbGlkZScpLCB0aGlzLiRzbGlkZS5lcSh0aGlzLmluZGV4KS53aWR0aCgpICsgZGlzdGFuY2UsIDApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFBsdWdpbi5wcm90b3R5cGUudG91Y2hFbmQgPSBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIC8vIGtlZXAgc2xpZGUgYW5pbWF0aW9uIGZvciBhbnkgbW9kZSB3aGlsZSBkcmFnZy9zd2lwZVxuICAgICAgICBpZiAoX3RoaXMucy5tb2RlICE9PSAnbGctc2xpZGUnKSB7XG4gICAgICAgICAgICBfdGhpcy4kb3V0ZXIuYWRkQ2xhc3MoJ2xnLXNsaWRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRzbGlkZS5ub3QoJy5sZy1jdXJyZW50LCAubGctcHJldi1zbGlkZSwgLmxnLW5leHQtc2xpZGUnKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xuXG4gICAgICAgIC8vIHNldCB0cmFuc2l0aW9uIGR1cmF0aW9uXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy4kb3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XG4gICAgICAgICAgICBpZiAoKGRpc3RhbmNlIDwgMCkgJiYgKE1hdGguYWJzKGRpc3RhbmNlKSA+IF90aGlzLnMuc3dpcGVUaHJlc2hvbGQpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGRpc3RhbmNlID4gMCkgJiYgKE1hdGguYWJzKGRpc3RhbmNlKSA+IF90aGlzLnMuc3dpcGVUaHJlc2hvbGQpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgNSkge1xuXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBjbGljayBpZiBkaXN0YW5jZSBpcyBsZXNzIHRoYW4gNSBwaXhcbiAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25TbGlkZUNsaWNrLmxnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLiRzbGlkZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZW1vdmUgc2xpZGUgY2xhc3Mgb25jZSBkcmFnL3N3aXBlIGlzIGNvbXBsZXRlZCBpZiBtb2RlIGlzIG5vdCBzbGlkZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy4kb3V0ZXIuaGFzQ2xhc3MoJ2xnLWRyYWdnaW5nJykgJiYgX3RoaXMucy5tb2RlICE9PSAnbGctc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJG91dGVyLnJlbW92ZUNsYXNzKCdsZy1zbGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBfdGhpcy5zLnNwZWVkICsgMTAwKTtcblxuICAgIH07XG5cbiAgICBQbHVnaW4ucHJvdG90eXBlLmVuYWJsZVN3aXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdGFydENvb3JkcyA9IDA7XG4gICAgICAgIHZhciBlbmRDb29yZHMgPSAwO1xuICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChfdGhpcy5zLmVuYWJsZVN3aXBlICYmIF90aGlzLmlzVG91Y2ggJiYgX3RoaXMuZG9Dc3MoKSkge1xuXG4gICAgICAgICAgICBfdGhpcy4kc2xpZGUub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kb3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpICYmICFfdGhpcy5sZ0J1c3kpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYW5hZ2VTd2lwZUNsYXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF90aGlzLiRzbGlkZS5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuJG91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaE1vdmUoc3RhcnRDb29yZHMsIGVuZENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfdGhpcy4kc2xpZGUub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kb3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEVuZChlbmRDb29yZHMgLSBzdGFydENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25TbGlkZUNsaWNrLmxnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFBsdWdpbi5wcm90b3R5cGUuZW5hYmxlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSAwO1xuICAgICAgICB2YXIgZW5kQ29vcmRzID0gMDtcbiAgICAgICAgdmFyIGlzRHJhZ2luZyA9IGZhbHNlO1xuICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoX3RoaXMucy5lbmFibGVEcmFnICYmICFfdGhpcy5pc1RvdWNoICYmIF90aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgIF90aGlzLiRzbGlkZS5vbignbW91c2Vkb3duLmxnJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgb25seSBvbiAubGctb2JqZWN0XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kb3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctb2JqZWN0JykgfHwgJChlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLXZpZGVvLXBsYXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmxnQnVzeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1hbmFnZVN3aXBlQ2xhc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIuc2Nyb2xsTGVmdCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRvdXRlci5zY3JvbGxMZWZ0IC09IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAqXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWInKS5hZGRDbGFzcygnbGctZ3JhYmJpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkRyYWdzdGFydC5sZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUubGcnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2luZykge1xuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0gZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hNb3ZlKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25EcmFnbW92ZS5sZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ21vdXNldXAubGcnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEVuZChlbmRDb29yZHMgLSBzdGFydENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkRyYWdlbmQubGcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1vYmplY3QnKSB8fCAkKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctdmlkZW8tcGxheScpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvblNsaWRlQ2xpY2subGcnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGV4ZWN1dGlvbiBvbiBjbGlja1xuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRvdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5tYW5hZ2VTd2lwZUNsYXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdG91Y2hOZXh0ID0gdGhpcy5pbmRleCArIDE7XG4gICAgICAgIHZhciBfdG91Y2hQcmV2ID0gdGhpcy5pbmRleCAtIDE7XG4gICAgICAgIGlmICh0aGlzLnMubG9vcCAmJiB0aGlzLiRzbGlkZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIF90b3VjaFByZXYgPSB0aGlzLiRzbGlkZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLiRzbGlkZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgX3RvdWNoTmV4dCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRzbGlkZS5yZW1vdmVDbGFzcygnbGctbmV4dC1zbGlkZSBsZy1wcmV2LXNsaWRlJyk7XG4gICAgICAgIGlmIChfdG91Y2hQcmV2ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHNsaWRlLmVxKF90b3VjaFByZXYpLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRzbGlkZS5lcShfdG91Y2hOZXh0KS5hZGRDbGFzcygnbGctbmV4dC1zbGlkZScpO1xuICAgIH07XG5cbiAgICBQbHVnaW4ucHJvdG90eXBlLm1vdXNld2hlZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgX3RoaXMuJG91dGVyLm9uKCdtb3VzZXdoZWVsLmxnJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBpZiAoIWUuZGVsdGFZKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5kZWx0YVkgPiAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgUGx1Z2luLnByb3RvdHlwZS5jbG9zZUdhbGxlcnkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJG91dGVyLmZpbmQoJy5sZy1jbG9zZScpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZGVzdHJveSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoX3RoaXMucy5jbG9zYWJsZSkge1xuXG4gICAgICAgICAgICAvLyBJZiB5b3UgZHJhZyB0aGUgc2xpZGUgYW5kIHJlbGVhc2Ugb3V0c2lkZSBnYWxsZXJ5IGdldHMgY2xvc2Ugb24gY2hyb21lXG4gICAgICAgICAgICAvLyBmb3IgcHJldmVudGluZyB0aGlzIGNoZWNrIG1vdXNlZG93biBhbmQgbW91c2V1cCBoYXBwZW5lZCBvbiAubGctaXRlbSBvciBsZy1vdXRlclxuICAgICAgICAgICAgX3RoaXMuJG91dGVyLm9uKCdtb3VzZWRvd24ubGcnLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJy5sZy1vdXRlcicpIHx8ICQoZS50YXJnZXQpLmlzKCcubGctaXRlbSAnKSB8fCAkKGUudGFyZ2V0KS5pcygnLmxnLWltZy13cmFwJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfdGhpcy4kb3V0ZXIub24oJ21vdXNldXAubGcnLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJy5sZy1vdXRlcicpIHx8ICQoZS50YXJnZXQpLmlzKCcubGctaXRlbSAnKSB8fCAkKGUudGFyZ2V0KS5pcygnLmxnLWltZy13cmFwJykgJiYgbW91c2Vkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuJG91dGVyLmhhc0NsYXNzKCdsZy1kcmFnZ2luZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBQbHVnaW4ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihkKSB7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIWQpIHtcbiAgICAgICAgICAgIF90aGlzLiRlbC50cmlnZ2VyKCdvbkJlZm9yZUNsb3NlLmxnJyk7XG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKF90aGlzLnByZXZTY3JvbGxUb3ApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgZCBpcyBmYWxzZSBvciB1bmRlZmluZWQgZGVzdHJveSB3aWxsIG9ubHkgY2xvc2UgdGhlIGdhbGxlcnlcbiAgICAgICAgICogcGx1Z2lucyBpbnN0YW5jZSByZW1haW5zIHdpdGggdGhlIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogaWYgZCBpcyB0cnVlIGRlc3Ryb3kgd2lsbCBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgcGx1Z2luXG4gICAgICAgICAqL1xuXG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnMuZHluYW1pYykge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgd2hlbiBub3QgdXNpbmcgZHluYW1pYyBtb2RlIGlzICRpdGVtcyBhIGpxdWVyeSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy4kaXRlbXMub2ZmKCdjbGljay5sZyBjbGljay5sZ2N1c3RvbScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkLnJlbW92ZURhdGEoX3RoaXMuZWwsICdsaWdodEdhbGxlcnknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIGFkZGVkIGJ5IGxpZ2h0R2FsbGVyeVxuICAgICAgICB0aGlzLiRlbC5vZmYoJy5sZy50bScpO1xuXG4gICAgICAgIC8vIERpc3Ryb3kgYWxsIGxpZ2h0R2FsbGVyeSBtb2R1bGVzXG4gICAgICAgICQuZWFjaCgkLmZuLmxpZ2h0R2FsbGVyeS5tb2R1bGVzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5tb2R1bGVzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb2R1bGVzW2tleV0uZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuaGlkZUJhcnRpbWVvdXQpO1xuICAgICAgICB0aGlzLmhpZGVCYXJ0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICQod2luZG93KS5vZmYoJy5sZycpO1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xnLW9uIGxnLWZyb20taGFzaCcpO1xuXG4gICAgICAgIGlmIChfdGhpcy4kb3V0ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLiRvdXRlci5yZW1vdmVDbGFzcygnbGctdmlzaWJsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnLmxnLWJhY2tkcm9wJykucmVtb3ZlQ2xhc3MoJ2luJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy4kb3V0ZXIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kb3V0ZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJy5sZy1iYWNrZHJvcCcpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZWwudHJpZ2dlcignb25DbG9zZUFmdGVyLmxnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgX3RoaXMucy5iYWNrZHJvcER1cmF0aW9uICsgNTApO1xuICAgIH07XG5cbiAgICAkLmZuLmxpZ2h0R2FsbGVyeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghJC5kYXRhKHRoaXMsICdsaWdodEdhbGxlcnknKSkge1xuICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbGlnaHRHYWxsZXJ5JywgbmV3IFBsdWdpbih0aGlzLCBvcHRpb25zKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnbGlnaHRHYWxsZXJ5JykuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnkgaGFzIG5vdCBpbml0aWF0ZWQgcHJvcGVybHknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmxpZ2h0R2FsbGVyeS5tb2R1bGVzID0ge307XG5cbn0pKCk7XG5cblxufSkpOyIsIi8qISBsaWdodHNsaWRlciAtIHYxLjEuNiAtIDIwMTYtMTAtMjVcbiogaHR0cHM6Ly9naXRodWIuY29tL3NhY2hpbmNob29sdXIvbGlnaHRzbGlkZXJcbiogQ29weXJpZ2h0IChjKSAyMDE2IFNhY2hpbiBOOyBMaWNlbnNlZCBNSVQgKi9cbihmdW5jdGlvbiAoJCwgdW5kZWZpbmVkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgaXRlbTogMyxcbiAgICAgICAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgICAgICAgc2xpZGVNb3ZlOiAxLFxuICAgICAgICBzbGlkZU1hcmdpbjogMTAsXG4gICAgICAgIGFkZENsYXNzOiAnJyxcbiAgICAgICAgbW9kZTogJ3NsaWRlJyxcbiAgICAgICAgdXNlQ1NTOiB0cnVlLFxuICAgICAgICBjc3NFYXNpbmc6ICdlYXNlJywgLy8nY3ViaWMtYmV6aWVyKDAuMjUsIDAsIDAuMjUsIDEpJyxcbiAgICAgICAgZWFzaW5nOiAnbGluZWFyJywgLy8nZm9yIGpxdWVyeSBhbmltYXRpb24nLC8vXG4gICAgICAgIHNwZWVkOiA0MDAsIC8vbXMnXG4gICAgICAgIGF1dG86IGZhbHNlLFxuICAgICAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXG4gICAgICAgIHBhdXNlOiAyMDAwLFxuICAgICAgICBrZXlQcmVzczogZmFsc2UsXG4gICAgICAgIGNvbnRyb2xzOiB0cnVlLFxuICAgICAgICBwcmV2SHRtbDogJycsXG4gICAgICAgIG5leHRIdG1sOiAnJyxcbiAgICAgICAgcnRsOiBmYWxzZSxcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgIHZlcnRpY2FsSGVpZ2h0OiA1MDAsXG4gICAgICAgIHZUaHVtYldpZHRoOiAxMDAsXG4gICAgICAgIHRodW1iSXRlbTogMTAsXG4gICAgICAgIHBhZ2VyOiB0cnVlLFxuICAgICAgICBnYWxsZXJ5OiBmYWxzZSxcbiAgICAgICAgZ2FsbGVyeU1hcmdpbjogNSxcbiAgICAgICAgdGh1bWJNYXJnaW46IDUsXG4gICAgICAgIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgICAgZW5hYmxlVG91Y2g6IHRydWUsXG4gICAgICAgIGVuYWJsZURyYWc6IHRydWUsXG4gICAgICAgIGZyZWVNb3ZlOiB0cnVlLFxuICAgICAgICBzd2lwZVRocmVzaG9sZDogNDAsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtdLFxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICAgIG9uQmVmb3JlU3RhcnQ6IGZ1bmN0aW9uICgkZWwpIHt9LFxuICAgICAgICBvblNsaWRlckxvYWQ6IGZ1bmN0aW9uICgkZWwpIHt9LFxuICAgICAgICBvbkJlZm9yZVNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkge30sXG4gICAgICAgIG9uQWZ0ZXJTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHt9LFxuICAgICAgICBvbkJlZm9yZU5leHRTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHt9LFxuICAgICAgICBvbkJlZm9yZVByZXZTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHt9XG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgfTtcbiAgICAkLmZuLmxpZ2h0U2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5saWdodFNsaWRlcihvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGx1Z2luID0ge30sXG4gICAgICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgICAgICBzZXR0aW5nc1RlbXAgPSB7fSxcbiAgICAgICAgICAgICRlbCA9IHRoaXM7XG4gICAgICAgIHBsdWdpbi4kZWwgPSB0aGlzO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLnZlcnRpY2FsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyICRjaGlsZHJlbiA9ICRlbC5jaGlsZHJlbigpLFxuICAgICAgICAgICAgd2luZG93VyA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICAgICAgYnJlYWtwb2ludCA9IG51bGwsXG4gICAgICAgICAgICByZXNwb3NpdmVPYmogPSBudWxsLFxuICAgICAgICAgICAgbGVuZ3RoID0gMCxcbiAgICAgICAgICAgIHcgPSAwLFxuICAgICAgICAgICAgb24gPSBmYWxzZSxcbiAgICAgICAgICAgIGVsU2l6ZSA9IDAsXG4gICAgICAgICAgICAkc2xpZGUgPSAnJyxcbiAgICAgICAgICAgIHNjZW5lID0gMCxcbiAgICAgICAgICAgIHByb3BlcnR5ID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdoZWlnaHQnIDogJ3dpZHRoJyxcbiAgICAgICAgICAgIGd1dHRlciA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyAnbWFyZ2luLWJvdHRvbScgOiAnbWFyZ2luLXJpZ2h0JyxcbiAgICAgICAgICAgIHNsaWRlVmFsdWUgPSAwLFxuICAgICAgICAgICAgcGFnZXJXaWR0aCA9IDAsXG4gICAgICAgICAgICBzbGlkZVdpZHRoID0gMCxcbiAgICAgICAgICAgIHRodW1iV2lkdGggPSAwLFxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBudWxsLFxuICAgICAgICAgICAgaXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB2YXIgcmVmcmVzaCA9IHt9O1xuXG4gICAgICAgIHJlZnJlc2guY2hicmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93VyA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnJlc3BvbnNpdmUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHNldHRpbmdzLml0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3dXIDwgc2V0dGluZ3MucmVzcG9uc2l2ZVswXS5icmVha3BvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MucmVzcG9uc2l2ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvd1cgPCBzZXR0aW5ncy5yZXNwb25zaXZlW2ldLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50ID0gc2V0dGluZ3MucmVzcG9uc2l2ZVtpXS5icmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3Bvc2l2ZU9iaiA9IHNldHRpbmdzLnJlc3BvbnNpdmVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb3NpdmVPYmogIT09ICd1bmRlZmluZWQnICYmIHJlc3Bvc2l2ZU9iaiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHJlc3Bvc2l2ZU9iai5zZXR0aW5ncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3Bvc2l2ZU9iai5zZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3NUZW1wW2pdID09PSAndW5kZWZpbmVkJyB8fCBzZXR0aW5nc1RlbXBbal0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3NUZW1wW2pdID0gc2V0dGluZ3Nbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzW2pdID0gcmVzcG9zaXZlT2JqLnNldHRpbmdzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KHNldHRpbmdzVGVtcCkgJiYgd2luZG93VyA+IHNldHRpbmdzLnJlc3BvbnNpdmVbMF0uYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIHNldHRpbmdzVGVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzVGVtcC5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzW2tdID0gc2V0dGluZ3NUZW1wW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVZhbHVlID4gMCAmJiBzbGlkZVdpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSA9IE1hdGgucm91bmQoc2xpZGVWYWx1ZSAvICgoc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKSAqIHNldHRpbmdzLnNsaWRlTW92ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJlZnJlc2guY2FsU1cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNsaWRlV2lkdGggPSAoZWxTaXplIC0gKChzZXR0aW5ncy5pdGVtICogKHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIC8gc2V0dGluZ3MuaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZWZyZXNoLmNhbFdpZHRoID0gZnVuY3Rpb24gKGNsbikge1xuICAgICAgICAgICAgdmFyIGxuID0gY2xuID09PSB0cnVlID8gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggOiAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB3ID0gbG4gKiAoc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdyA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0gKHBhcnNlSW50KCRjaGlsZHJlbi5lcShpKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdztcbiAgICAgICAgfTtcbiAgICAgICAgcGx1Z2luID0ge1xuICAgICAgICAgICAgZG9Dc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBbJ3RyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdXZWJraXRUcmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ21zVHJhbnNpdGlvbicsICdLaHRtbFRyYW5zaXRpb24nXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25baV0gaW4gcm9vdC5zdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudXNlQ1NTICYmIHN1cHBvcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleVByZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmtleVByZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cC5saWdodHNsaWRlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoJzpmb2N1cycpLmlzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJvbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFmdGVyKCc8ZGl2IGNsYXNzPVwibFNBY3Rpb25cIj48YSBjbGFzcz1cImxTUHJldlwiPicgKyBzZXR0aW5ncy5wcmV2SHRtbCArICc8L2E+PGEgY2xhc3M9XCJsU05leHRcIj4nICsgc2V0dGluZ3MubmV4dEh0bWwgKyAnPC9hPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoLmNhbFdpZHRoKGZhbHNlKSA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdjbGFzcycpID09PSAnbFNQcmV2Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYXV0b1dpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2xpZGVNb3ZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaXRlbSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmZyZWVNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlU3RhcnQuY2FsbCh0aGlzLCAkZWwpO1xuICAgICAgICAgICAgICAgIHJlZnJlc2guY2hicmVha3BvaW50KCk7XG4gICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsaWdodFNsaWRlcicpLndyYXAoJzxkaXYgY2xhc3M9XCJsU1NsaWRlT3V0ZXIgJyArIHNldHRpbmdzLmFkZENsYXNzICsgJ1wiPjxkaXYgY2xhc3M9XCJsU1NsaWRlV3JhcHBlclwiPjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICRzbGlkZSA9ICRlbC5wYXJlbnQoJy5sU1NsaWRlV3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLnBhcmVudCgpLmFkZENsYXNzKCdsU3J0bCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLnBhcmVudCgpLmFkZENsYXNzKCd2ZXJ0aWNhbCcpO1xuICAgICAgICAgICAgICAgICAgICBlbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmNzcygnaGVpZ2h0JywgZWxTaXplICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxTaXplID0gJGVsLm91dGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGNoaWxkcmVuLmFkZENsYXNzKCdsc2xpZGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2guY2FsU1coKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaC5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoLmNhbFdpZHRoKHRydWUpID4gZWxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0V3IgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0SSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAkY2hpbGRyZW4ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdFdyICs9IChwYXJzZUludCgkZWwuZmluZCgnLmxzbGlkZScpLmVxKGspLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0SSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodFdyID49IChlbFNpemUgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0SXRlbSA9IHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/IHRJIDogc2V0dGluZ3MuaXRlbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodEl0ZW0gPCAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGggLSB0SXRlbTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRyZW4uZXEoaSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRJdGVtIDwgJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gJGNoaWxkcmVuLmxlbmd0aCAtIDE7IGogPiAoJGNoaWxkcmVuLmxlbmd0aCAtIDEgLSAkZWwuZmluZCgnLmNsb25lLnJpZ2h0JykubGVuZ3RoKTsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoaWxkcmVuLmVxKGopLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aDsgbiA8IHRJdGVtOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sc2xpZGUnKS5lcShuKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgcmlnaHQnKS5hcHBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtID0gJGVsLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggLSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7IG0gPiAoJGVsLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggLSB0SXRlbSk7IG0tLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxzbGlkZScpLmVxKG0gLSAxKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgbGVmdCcpLnByZXBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRyZW4gPSAkZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjaGlsZHJlbi5oYXNDbGFzcygnY2xvbmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmNsb25lJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLm1vdmUoJGVsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2guY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVmcmVzaC5zU1cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9ICRjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBndXR0ZXIgPSAnbWFyZ2luLWxlZnQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRyZW4uY3NzKHByb3BlcnR5LCBzbGlkZVdpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJGNoaWxkcmVuLmNzcyhndXR0ZXIsIHNldHRpbmdzLnNsaWRlTWFyZ2luICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIHcgPSByZWZyZXNoLmNhbFdpZHRoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNzcyhwcm9wZXJ0eSwgdyArICdweCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUgPSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlZnJlc2guY2FsTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9ICRjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb0NzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5hZGRDbGFzcygndXNpbmdDc3MnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVmcmVzaC5jYWxMKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaC5jYWxTVygpO1xuICAgICAgICAgICAgICAgICAgICByZWZyZXNoLnNTVygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZSgkZWwsIHNsaWRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xTRmFkZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNoaWxkcmVuLmZhZGVPdXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmZhZGVJbigwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICRjaGlsZHJlbi5lcShzY2VuZSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRjaGlsZHJlbi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJlZnJlc2guY3JlYXRlUGFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRodW1iV2lkdGggPSAoZWxTaXplIC0gKChzZXR0aW5ncy50aHVtYkl0ZW0gKiAoc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAtIHNldHRpbmdzLnRodW1iTWFyZ2luKSkgLyBzZXR0aW5ncy50aHVtYkl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHZhciAkY2hpbGRyZW4gPSAkc2xpZGUuZmluZCgnLmxzbGlkZScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VycyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgc2NlbmUgKiBzbGlkZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBpICogKChzbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ICs9ICgocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGh1bWIgPSAkY2hpbGRyZW4uZXEoaSAqIHNldHRpbmdzLnNsaWRlTW92ZSkuYXR0cignZGF0YS10aHVtYicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlcnMgKz0gJzxsaSBzdHlsZT1cIndpZHRoOjEwMCU7JyArIHByb3BlcnR5ICsgJzonICsgdGh1bWJXaWR0aCArICdweDsnICsgZ3V0dGVyICsgJzonICsgc2V0dGluZ3MudGh1bWJNYXJnaW4gKyAncHhcIj48YSBocmVmPVwiI1wiPjxpbWcgc3JjPVwiJyArIHRodW1iICsgJ1wiIC8+PC9hPjwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGk+PGEgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHYpID49IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5QZ3IgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlcnMgKz0gJzxsaT48YSBocmVmPVwiI1wiPicgKyAoaSArIDEpICsgJzwvYT48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5QZ3IgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgbWluUGdyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlLnBhcmVudCgpLmFkZENsYXNzKCdub1BhZ2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ25vUGFnZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyICRjU291dGVyID0gJHNsaWRlLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmh0bWwocGFnZXJzKTsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgR2FsbGVyeSB0aHVtYm5haWwgd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmNzcygnd2lkdGgnLCBzZXR0aW5ncy52VGh1bWJXaWR0aCArICdweCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXJXaWR0aCA9IChpICogKHNldHRpbmdzLnRodW1iTWFyZ2luICsgdGh1bWJXaWR0aCkpICsgMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwYWdlcldpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbi1kdXJhdGlvbic6IHNldHRpbmdzLnNwZWVkICsgJ21zJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgKHNldHRpbmdzLnZUaHVtYldpZHRoICsgc2V0dGluZ3MuZ2FsbGVyeU1hcmdpbikgKyAncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuY3NzKHByb3BlcnR5LCBwYWdlcldpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYWdlciA9ICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICAgICAgJHBhZ2VyLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkcGFnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lID0gc2NlbmUgKyAoJHBhZ2VyLmluZGV4KHRoaXMpIC0gJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5maW5kKCdsaS5hY3RpdmUnKS5pbmRleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUgPSAkcGFnZXIuaW5kZXgodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsID0gJ2xTcGcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2wgPSAnbFNHYWxsZXJ5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkc2xpZGUuYWZ0ZXIoJzx1bCBjbGFzcz1cImxTUGFnZXIgJyArIGNsICsgJ1wiPjwvdWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBnTWFyZ2luID0gKHNldHRpbmdzLnZlcnRpY2FsKSA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLXRvcCc7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmNzcyhnTWFyZ2luLCBzZXR0aW5ncy5nYWxsZXJ5TWFyZ2luICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2guY3JlYXRlUGFnZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGVpZ2h0OiBmdW5jdGlvbiAob2IsIGZhZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IG9iLmNoaWxkcmVuKCcubHNsaWRlICcpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2IuY2hpbGRyZW4oKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2V0Q3NzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdEggPSBvYmoub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRQID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRIVCA9IHRIO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdEggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdFAgPSAoKHRIVCkgKiAxMDApIC8gZWxTaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzogdEggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogdFAgKyAnJSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzZXRDc3MoKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmZpbmQoJ2ltZycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIG9iai5maW5kKCdpbWcnKVswXS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5maW5kKCdpbWcnKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmF1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZlOiBmdW5jdGlvbiAob2IsIHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGUuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzYyA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnICYmIHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYi5mYWRlT3V0KHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzY2VuZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy90ID09PSB0cnVlID8gc2MgPSBzY2VuZSA6IHNjID0gc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsLCBubDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBvYi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBubCA9IGwgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjICsgMSA+PSBsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBubDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3QgPT09IHRydWUgPyBzYyA9IHNjZW5lIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIDogc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzY2VuZSAtICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IG9iLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBubCA9IGwgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYyArIDEgPT09IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSBubDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjICsgMSA+IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJyAmJiB0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2IuZXEoc2MpLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2IuZXEoc2MpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIG9iLmVxKG9iLmxlbmd0aCAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnICYmIHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYi5mYWRlT3V0KHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iLmVxKHNjKS5mYWRlSW4oc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChvYiwgdikge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IC12O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb0NzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDBweCwgJyArICgtdikgKyAncHgsIDBweCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwcHgsICcgKyAoLXYpICsgJ3B4LCAwcHgpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYi5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArICgtdikgKyAncHgsIDBweCwgMHB4KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyAoLXYpICsgJ3B4LCAwcHgsIDBweCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC12ICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQsIHNldHRpbmdzLmVhc2luZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYi5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogLXYgKyAncHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgJHRodW1iID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSgkdGh1bWIsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgJHRodW1iID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSgkdGh1bWIsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICByZWZyZXNoLmNhbFNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodyA+IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2xpZGVWYWx1ZSkgPiB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVZhbHVlID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZVZhbHVlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMubW92ZSgkZWwsIHNsaWRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZSA+PSAobGVuZ3RoIC0gKCRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCAvIHNldHRpbmdzLnNsaWRlTW92ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJlc2V0U2xpZGUoJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjZW5lID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJlc2V0U2xpZGUoJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVmcmVzaC5jYWxTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0U2xpZGU6IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uIGEnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUgPSBzO1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZVZhbHVlID0gJHRoaXMuc2xpZGVWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5hY3RpdmUoJGNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHNldHRpbmdzLnNwZWVkICsgJ21zJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uIGEnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNwZWVkICsgMTAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbGlkZVZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9zViA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NWID0gc2NlbmUgKiAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9zViA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NlbmU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NWICs9IChwYXJzZUludCgkY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zVjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbGlkZVRodW1iOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2V0dGluZ3MuY3VycmVudFBhZ2VyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IChlbFNpemUgLyAyKSAtICh0aHVtYldpZHRoIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBlbFNpemUgLSB0aHVtYldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2MgPSBzY2VuZSAtICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgJHBhZ2VyID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScgJiYgc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2MgPj0gJHBhZ2VyLmNoaWxkcmVuKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2MgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYyA9ICRwYWdlci5jaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGh1bWJTbGlkZSA9IHNjICogKCh0aHVtYldpZHRoICsgc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAtIChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKCh0aHVtYlNsaWRlICsgZWxTaXplKSA+IHBhZ2VyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJTbGlkZSA9IHBhZ2VyV2lkdGggLSBlbFNpemUgLSBzZXR0aW5ncy50aHVtYk1hcmdpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRodW1iU2xpZGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRodW1iU2xpZGUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoJHBhZ2VyLCB0aHVtYlNsaWRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgc2V0dGluZ3MucGF1c2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZU9uSG92ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0byAmJiBzZXR0aW5ncy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2xzLWhvdmVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmF1dG8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbHMtaG92ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLmhhc0NsYXNzKCdsc0dyYWJiaW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b3VjaE1vdmU6IGZ1bmN0aW9uIChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsICcwbXMnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBlbmRDb29yZHMgLSBzdGFydENvb3JkcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN3aXBlVmFsID0gc2xpZGVWYWx1ZSAtIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN3aXBlVmFsKSA+PSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmVlTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2lwZVZhbCA9IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN3aXBlVmFsVCA9IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2lwZVZhbCA9IHN3aXBlVmFsVCArICgoc3dpcGVWYWwgLSBzd2lwZVZhbFQpIC8gNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzd2lwZVZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmVlTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2lwZVZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlVmFsID0gc3dpcGVWYWwgLyA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZSgkZWwsIHN3aXBlVmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b3VjaEVuZDogZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHNldHRpbmdzLnNwZWVkICsgJ21zJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG14VmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVmFsdWUgPSBzbGlkZVZhbHVlIC0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2xpZGVWYWx1ZSkgPiB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVmFsdWUgPSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG14VmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZVZhbHVlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGdDID0gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW14VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bSA9IHNsaWRlVmFsdWUgLyAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lID0gcGFyc2VJbnQobnVtKSArIGFkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVZhbHVlID49ICh3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW0gJSAxICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdFcgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRXICs9IChwYXJzZUludCgkY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lID0gaSArIGFkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodFcgPj0gc2xpZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ0MoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX25leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZSA8PSAtc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdDKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX25leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkZWwubW9kZShfbmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUaHVtYigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmdvVG9QcmV2U2xpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZSA8PSAtc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG5cblxuICAgICAgICAgICAgZW5hYmxlRHJhZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5hZGRDbGFzcygnbHNHcmFiJyk7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3IDwgZWxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5hdHRyKCdjbGFzcycpICE9PSAoJ2xTUHJldicpICYmICQoZS50YXJnZXQpLmF0dHIoJ2NsYXNzJykgIT09ICgnbFNOZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUuc2Nyb2xsTGVmdCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZS5zY3JvbGxMZWZ0IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5yZW1vdmVDbGFzcygnbHNHcmFiJykuYWRkQ2xhc3MoJ2xzR3JhYmJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gZS5wYWdlWSA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcywgc3RhcnRDb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxpZ2h0U2xpZGVyJykucmVtb3ZlQ2xhc3MoJ2xzR3JhYmJpbmcnKS5hZGRDbGFzcygnbHNHcmFiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGVuZENvb3JkcyAtIHN0YXJ0Q29vcmRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdjbGljay5scycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykub2ZmKCdjbGljay5scycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy50b3VjaEVuZChkaXN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuXG5cblxuICAgICAgICAgICAgZW5hYmxlVG91Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0ge307XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnBhZ2VYID0gZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3Jkcy5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGUub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodyA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZyA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IG9yaWcudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4TW92ZW1lbnQgPSBNYXRoLmFicyhlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeU1vdmVtZW50ID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VZIC0gc3RhcnRDb29yZHMucGFnZVkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh5TW92ZW1lbnQgKiAzKSA+IHhNb3ZlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnRvdWNoTW92ZShlbmRDb29yZHMucGFnZVksIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh4TW92ZW1lbnQgKiAzKSA+IHlNb3ZlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnRvdWNoTW92ZShlbmRDb29yZHMucGFnZVgsIHN0YXJ0Q29vcmRzLnBhZ2VYKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3IDwgZWxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VZIC0gc3RhcnRDb29yZHMucGFnZVk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy50b3VjaEVuZChkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgJHRoaXMuaW5pdGlhbFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5lbmFibGVUb3VjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuZW5hYmxlVG91Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZW5hYmxlRHJhZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuZW5hYmxlRHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmF1dG8oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ2JsdXInLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICR0aGlzLnBhZ2VyKCk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGF1c2VPbkhvdmVyKCk7XG4gICAgICAgICAgICAgICAgJHRoaXMuY29udHJvbHMoKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5rZXlQcmVzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwbHVnaW4uYnVpbGQoKTtcbiAgICAgICAgcmVmcmVzaC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVmcmVzaC5jaGJyZWFrcG9pbnQoKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pdGVtID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBlbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbFNpemUgPSAkY2hpbGRyZW4ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNsaWRlLmNzcygnaGVpZ2h0JywgZWxTaXplICsgJ3B4Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsU2l6ZSA9ICRzbGlkZS5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgcmVmcmVzaC5jbG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVmcmVzaC5jYWxMKCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnbFNTbGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgICAgICAgICAgcmVmcmVzaC5zU1coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNTbGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy8gc2VlbXMgdG8gd29yayBidXQgYmV3YXJlXG4gICAgICAgICAgICAvLyBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgICAgIC8vICAgICByZWZyZXNoLmNyZWF0ZVBhZ2VyKCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgJGVsLmNzcygnaGVpZ2h0JywgJGNoaWxkcmVuLmVxKHNjZW5lKS5vdXRlckhlaWdodCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNldEhlaWdodCgkZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNldEhlaWdodCgkZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICgkY2hpbGRyZW4ubGVuZ3RoIDw9IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKChyZWZyZXNoLmNhbFdpZHRoKGZhbHNlKSA8IGVsU2l6ZSkgJiYgKHcgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRlbC5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjZW5lID4gMCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgICAgICAgc2NlbmUtLTtcbiAgICAgICAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gKGxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUgPSBwYXJzZUludChsIC8gc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xlZnRFbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2xlZnRFbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRlbC5nb1RvTmV4dFNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5leHRJID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9zbGlkZVZhbHVlID0gcGx1Z2luLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICBuZXh0SSA9IF9zbGlkZVZhbHVlIDwgdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCgoc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmUpIDwgbGVuZ3RoIC0gc2V0dGluZ3Muc2xpZGVNb3ZlKSAmJiBuZXh0SSkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlTmV4dFNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgICAgICAgc2NlbmUrKztcbiAgICAgICAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlTmV4dFNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgJGVsLm1vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdyaWdodEVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygncmlnaHRFbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRlbC5tb2RlID0gZnVuY3Rpb24gKF90b3VjaCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICRlbC5jc3MoJ2hlaWdodCcsICRjaGlsZHJlbi5lcShzY2VuZSkub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uZG9Dc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsU1NsaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3BlZWQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHNldHRpbmdzLnNwZWVkICsgJ21zJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuY3NzRWFzaW5nICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgc2V0dGluZ3MuY3NzRWFzaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uZG9Dc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnNwZWVkICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNzc0Vhc2luZyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWwuY3NzKCd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbicsIHNldHRpbmdzLmNzc0Vhc2luZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90b3VjaCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlU2xpZGUuY2FsbCh0aGlzLCAkZWwsIHNjZW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5mYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISRzbGlkZS5oYXNDbGFzcygnbHMtaG92ZXInKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5hdXRvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90b3VjaCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5vbkFmdGVyU2xpZGUuY2FsbCh0aGlzLCAkZWwsIHNjZW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICBvbiA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgICRlbC5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICAgIHNldHRpbmdzLmF1dG8gPSB0cnVlO1xuICAgICAgICAgICAgcGx1Z2luLmF1dG8oKTtcbiAgICAgICAgfTtcbiAgICAgICAgJGVsLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0dGluZ3MuYXV0byA9IGZhbHNlO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH07XG4gICAgICAgICRlbC5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICAgIH07XG4gICAgICAgICRlbC5nZXRDdXJyZW50U2xpZGVDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzYyA9IHNjZW5lO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgbG4gPSAkc2xpZGUuZmluZCgnLmxzbGlkZScpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgY2wgPSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHNjZW5lIDw9IGNsIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzYyA9IGxuICsgKHNjZW5lIC0gY2wpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NlbmUgPj0gKGxuICsgY2wpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2NlbmUgLSBsbiAtIGNsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjID0gc2NlbmUgLSBjbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2MgKyAxO1xuICAgICAgICB9OyBcbiAgICAgICAgJGVsLmdldFRvdGFsU2xpZGVDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2xpZGUuZmluZCgnLmxzbGlkZScpLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgJGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICAgICAgICAgIHNjZW5lID0gKHMgKyAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NlbmUgPSBzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGVsLm1vZGUoZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkZWwuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkZWwubGlnaHRTbGlkZXIpIHtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub1ByZXZTbGlkZSA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgICAgICAgICAkZWwubW9kZSA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgICAgICAgICAkZWwucGxheSA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgICAgICAgICAkZWwucGF1c2UgPSBmdW5jdGlvbigpe307XG4gICAgICAgICAgICAgICAgJGVsLnJlZnJlc2ggPSBmdW5jdGlvbigpe307XG4gICAgICAgICAgICAgICAgJGVsLmdldEN1cnJlbnRTbGlkZUNvdW50ID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAgICAgICAgICRlbC5nZXRUb3RhbFNsaWRlQ291bnQgPSBmdW5jdGlvbigpe307XG4gICAgICAgICAgICAgICAgJGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uKCl7fTsgXG4gICAgICAgICAgICAgICAgJGVsLmxpZ2h0U2xpZGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZWZyZXNoID0ge1xuICAgICAgICAgICAgICAgICAgICBpbml0IDogZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAkZWwucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmxTQWN0aW9uLCAubFNQYWdlcicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnbGlnaHRTbGlkZXIgbFNGYWRlIGxTU2xpZGUgbHNHcmFiIGxzR3JhYmJpbmcgbGVmdEVuZCByaWdodCcpLnJlbW92ZUF0dHIoJ3N0eWxlJykudW53cmFwKCkudW53cmFwKCk7XG4gICAgICAgICAgICAgICAgJGVsLmNoaWxkcmVuKCkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAkY2hpbGRyZW4ucmVtb3ZlQ2xhc3MoJ2xzbGlkZSBhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmNsb25lJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzY2VuZSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5vblNsaWRlckxvYWQuY2FsbCh0aGlzLCAkZWwpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlZnJlc2guaW5pdCgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIHZhciBnbG9iYWxJbnN0YWxsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgZmFjdG9yeSh3aW5kb3cubGF6eVNpemVzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhenl1bnZlaWxyZWFkJywgZ2xvYmFsSW5zdGFsbCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIGZhY3RvcnkgPSBmYWN0b3J5LmJpbmQobnVsbCwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnbGF6eXNpemVzJykpO1xuICAgIH0gZWxzZSBpZih3aW5kb3cubGF6eVNpemVzKSB7XG4gICAgICAgIGdsb2JhbEluc3RhbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbGF6eXVudmVpbHJlYWQnLCBnbG9iYWxJbnN0YWxsLCB0cnVlKTtcbiAgICB9XG59KHdpbmRvdywgZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgbGF6eVNpemVzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmKCF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7cmV0dXJuO31cblxuICAgIHZhciByZWdXaGl0ZSA9IC9cXHMrL2c7XG4gICAgdmFyIHJlZ1NwbGl0U2V0ID0gL1xccypcXHxcXHMrfFxccytcXHxcXHMqL2c7XG4gICAgdmFyIHJlZ1NvdXJjZSA9IC9eKC4rPykoPzpcXHMrXFxbXFxzKiguKz8pXFxzKlxcXSk/JC87XG4gICAgdmFyIHJlZ0JnVXJsRXNjYXBlID0gL1xcKHxcXCl8Jy87XG4gICAgdmFyIGFsbG93ZWRCYWNrZ3JvdW5kU2l6ZSA9IHtjb250YWluOiAxLCBjb3ZlcjogMX07XG4gICAgdmFyIHByb3h5V2lkdGggPSBmdW5jdGlvbihlbGVtKXtcbiAgICAgICAgdmFyIHdpZHRoID0gbGF6eVNpemVzLmdXKGVsZW0sIGVsZW0ucGFyZW50Tm9kZSk7XG5cbiAgICAgICAgaWYoIWVsZW0uX2xhenlzaXplc1dpZHRoIHx8IHdpZHRoID4gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuICAgICAgICAgICAgZWxlbS5fbGF6eXNpemVzV2lkdGggPSB3aWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbS5fbGF6eXNpemVzV2lkdGg7XG4gICAgfTtcbiAgICB2YXIgZ2V0QmdTaXplID0gZnVuY3Rpb24oZWxlbSl7XG4gICAgICAgIHZhciBiZ1NpemU7XG5cbiAgICAgICAgYmdTaXplID0gKGdldENvbXB1dGVkU3R5bGUoZWxlbSkgfHwge2dldFByb3BlcnR5VmFsdWU6IGZ1bmN0aW9uKCl7fX0pLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtc2l6ZScpO1xuXG4gICAgICAgIGlmKCFhbGxvd2VkQmFja2dyb3VuZFNpemVbYmdTaXplXSAmJiBhbGxvd2VkQmFja2dyb3VuZFNpemVbZWxlbS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZV0pe1xuICAgICAgICAgICAgYmdTaXplID0gZWxlbS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZ1NpemU7XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlUGljdHVyZSA9IGZ1bmN0aW9uKHNldHMsIGVsZW0sIGltZyl7XG4gICAgICAgIHZhciBwaWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGljdHVyZScpO1xuICAgICAgICB2YXIgc2l6ZXMgPSBlbGVtLmdldEF0dHJpYnV0ZShsYXp5U2l6ZXNDb25maWcuc2l6ZXNBdHRyKTtcbiAgICAgICAgdmFyIHJhdGlvID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0aW8nKTtcbiAgICAgICAgdmFyIG9wdGltdW14ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3B0aW11bXgnKTtcblxuICAgICAgICBpZihlbGVtLl9sYXp5YmdzZXQgJiYgZWxlbS5fbGF6eWJnc2V0LnBhcmVudE5vZGUgPT0gZWxlbSl7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0uX2xhenliZ3NldCk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaW1nLCAnX2xhenliZ3NldCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiBlbGVtLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtLCAnX2xhenliZ3NldCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiBwaWN0dXJlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0cyA9IHNldHMucmVwbGFjZShyZWdXaGl0ZSwgJyAnKS5zcGxpdChyZWdTcGxpdFNldCk7XG5cbiAgICAgICAgcGljdHVyZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpbWcuY2xhc3NOYW1lID0gbGF6eVNpemVzQ29uZmlnLmxhenlDbGFzcztcblxuICAgICAgICBpZihzZXRzLmxlbmd0aCA9PSAxICYmICFzaXplcyl7XG4gICAgICAgICAgICBzaXplcyA9ICdhdXRvJztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHMuZm9yRWFjaChmdW5jdGlvbihzZXQpe1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBpZihzaXplcyAmJiBzaXplcyAhPSAnYXV0bycpe1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXQubWF0Y2gocmVnU291cmNlKSl7XG4gICAgICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShsYXp5U2l6ZXNDb25maWcuc3Jjc2V0QXR0ciwgUmVnRXhwLiQxKTtcbiAgICAgICAgICAgICAgICBpZihSZWdFeHAuJDIpe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKCdtZWRpYScsIGxhenlTaXplc0NvbmZpZy5jdXN0b21NZWRpYVtSZWdFeHAuJDJdIHx8IFJlZ0V4cC4kMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGljdHVyZS5hcHBlbmRDaGlsZChzb3VyY2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihzaXplcyl7XG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKGxhenlTaXplc0NvbmZpZy5zaXplc0F0dHIsIHNpemVzKTtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKGxhenlTaXplc0NvbmZpZy5zaXplc0F0dHIpO1xuICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ3NpemVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0aW11bXgpe1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1vcHRpbXVteCcsIG9wdGltdW14KTtcbiAgICAgICAgfVxuICAgICAgICBpZihyYXRpbykge1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1yYXRpbycsIHJhdGlvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBpY3R1cmUuYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKHBpY3R1cmUpO1xuICAgIH07XG5cbiAgICB2YXIgcHJveHlMb2FkID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCFlLnRhcmdldC5fbGF6eWJnc2V0KXtyZXR1cm47fVxuXG4gICAgICAgIHZhciBpbWFnZSA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgZWxlbSA9IGltYWdlLl9sYXp5YmdzZXQ7XG4gICAgICAgIHZhciBiZyA9IGltYWdlLmN1cnJlbnRTcmMgfHwgaW1hZ2Uuc3JjO1xuXG4gICAgICAgIGlmKGJnKXtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgKHJlZ0JnVXJsRXNjYXBlLnRlc3QoYmcpID8gSlNPTi5zdHJpbmdpZnkoYmcpIDogYmcgKSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGltYWdlLl9sYXp5YmdzZXRMb2FkaW5nKXtcbiAgICAgICAgICAgIGxhenlTaXplcy5maXJlKGVsZW0sICdfbGF6eWxvYWRlZCcsIHt9LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBkZWxldGUgaW1hZ2UuX2xhenliZ3NldExvYWRpbmc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcignbGF6eWJlZm9yZXVudmVpbCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgc2V0LCBpbWFnZSwgZWxlbTtcblxuICAgICAgICBpZihlLmRlZmF1bHRQcmV2ZW50ZWQgfHwgIShzZXQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmdzZXQnKSkpe3JldHVybjt9XG5cbiAgICAgICAgZWxlbSA9IGUudGFyZ2V0O1xuICAgICAgICBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltYWdlLmFsdCA9ICcnO1xuXG4gICAgICAgIGltYWdlLl9sYXp5YmdzZXRMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgZS5kZXRhaWwuZmlyZXNMb2FkID0gdHJ1ZTtcblxuICAgICAgICBjcmVhdGVQaWN0dXJlKHNldCwgZWxlbSwgaW1hZ2UpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxhenlTaXplcy5sb2FkZXIudW52ZWlsKGltYWdlKTtcblxuICAgICAgICAgICAgbGF6eVNpemVzLnJBRihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxhenlTaXplcy5maXJlKGltYWdlLCAnX2xhenlsb2FkZWQnLCB7fSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYoaW1hZ2UuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlMb2FkKHt0YXJnZXQ6IGltYWdlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcHJveHlMb2FkLCB0cnVlKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsYXp5YmVmb3Jlc2l6ZXMnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoZS5kZXRhaWwuaW5zdGFuY2UgIT0gbGF6eVNpemVzKXtyZXR1cm47fVxuICAgICAgICBpZihlLnRhcmdldC5fbGF6eWJnc2V0ICYmIGUuZGV0YWlsLmRhdGFBdHRyKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQuX2xhenliZ3NldDtcbiAgICAgICAgICAgIHZhciBiZ1NpemUgPSBnZXRCZ1NpemUoZWxlbSk7XG5cbiAgICAgICAgICAgIGlmKGFsbG93ZWRCYWNrZ3JvdW5kU2l6ZVtiZ1NpemVdKXtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5fbGF6eXNpemVzUGFyZW50Rml0ID0gYmdTaXplO1xuXG4gICAgICAgICAgICAgICAgbGF6eVNpemVzLnJBRihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50LWZpdCcsIGJnU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0Ll9sYXp5c2l6ZXNQYXJlbnRGaXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGUudGFyZ2V0Ll9sYXp5c2l6ZXNQYXJlbnRGaXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHRydWUpO1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xhenliZWZvcmVzaXplcycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZihlLmRlZmF1bHRQcmV2ZW50ZWQgfHwgIWUudGFyZ2V0Ll9sYXp5YmdzZXQgfHwgZS5kZXRhaWwuaW5zdGFuY2UgIT0gbGF6eVNpemVzKXtyZXR1cm47fVxuICAgICAgICBlLmRldGFpbC53aWR0aCA9IHByb3h5V2lkdGgoZS50YXJnZXQuX2xhenliZ3NldCk7XG4gICAgfSk7XG59KSk7IiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIHZhciBnbG9iYWxJbnN0YWxsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgZmFjdG9yeSh3aW5kb3cubGF6eVNpemVzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhenl1bnZlaWxyZWFkJywgZ2xvYmFsSW5zdGFsbCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIGZhY3RvcnkgPSBmYWN0b3J5LmJpbmQobnVsbCwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnbGF6eXNpemVzJyksIHJlcXVpcmUoJy4uL2ZpeC1pb3Mtc2l6ZXMvZml4LWlvcy1zaXplcycpKTtcbiAgICB9IGVsc2UgaWYod2luZG93LmxhenlTaXplcykge1xuICAgICAgICBnbG9iYWxJbnN0YWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhenl1bnZlaWxyZWFkJywgZ2xvYmFsSW5zdGFsbCwgdHJ1ZSk7XG4gICAgfVxufSh3aW5kb3csIGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGxhenlTaXplcykge1xuICAgIC8qanNoaW50IGVxbnVsbDp0cnVlICovXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBwb2x5ZmlsbDtcbiAgICB2YXIgY29uZmlnID0gKGxhenlTaXplcyAmJiBsYXp5U2l6ZXMuY2ZnKSB8fCB3aW5kb3cubGF6eVNpemVzQ29uZmlnO1xuICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB2YXIgc3VwcG9ydFNyY3NldCA9ICgnc2l6ZXMnIGluIGltZykgJiYgKCdzcmNzZXQnIGluIGltZyk7XG4gICAgdmFyIHJlZ0hEZXNjID0gL1xccytcXGQraC9nO1xuICAgIHZhciBmaXhFZGdlSERlc2NyaXB0b3IgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHJlZ0Rlc2NyaXB0b3JzID0gL1xccysoXFxkKykod3xoKVxccysoXFxkKykod3xoKS87XG4gICAgICAgIHZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGVkZ2VNYXRjaCl7XG4gICAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSERlc2NyaXB0b3JzID0gZnVuY3Rpb24oc291cmNlKXtcbiAgICAgICAgICAgICAgICB2YXIgcmF0aW87XG4gICAgICAgICAgICAgICAgdmFyIHNyY3NldCA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUobGF6eVNpemVzQ29uZmlnLnNyY3NldEF0dHIpO1xuICAgICAgICAgICAgICAgIGlmKHNyY3NldCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNyY3NldC5tYXRjaChyZWdEZXNjcmlwdG9ycykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoUmVnRXhwLiQyID09ICd3Jyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW8gPSBSZWdFeHAuJDEgLyBSZWdFeHAuJDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvID0gUmVnRXhwLiQzIC8gUmVnRXhwLiQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyYXRpbyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZSgnZGF0YS1hc3BlY3RyYXRpbycsIHJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKGxhenlTaXplc0NvbmZpZy5zcmNzZXRBdHRyLCBzcmNzZXQucmVwbGFjZShyZWdIRGVzYywgJycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgcGljdHVyZSA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICBpZihwaWN0dXJlICYmIHBpY3R1cmUubm9kZU5hbWUgPT0gJ1BJQ1RVUkUnKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaC5jYWxsKHBpY3R1cmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpLCByZW1vdmVIRGVzY3JpcHRvcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZW1vdmVIRGVzY3JpcHRvcnMoZS50YXJnZXQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKCEhaW1nLmN1cnJlbnRTcmMpe1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdsYXp5YmVmb3JldW52ZWlsJywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYoZWRnZU1hdGNoWzFdKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsYXp5YmVmb3JldW52ZWlsJywgaGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICBpZih0cnVlIHx8IGVkZ2VNYXRjaFsxXSA+IDE0KXtcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IHRlc3Q7XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gdGVzdDtcblxuICAgICAgICAgICAgICAgICAgICBpbWcuc3Jjc2V0ID0gJ2RhdGE6LGEgMXcgMWgnO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGltZy5jb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuXG4gICAgaWYoIWNvbmZpZyl7XG4gICAgICAgIGNvbmZpZyA9IHt9O1xuICAgICAgICB3aW5kb3cubGF6eVNpemVzQ29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmKCFjb25maWcuc3VwcG9ydHNUeXBlKXtcbiAgICAgICAgY29uZmlnLnN1cHBvcnRzVHlwZSA9IGZ1bmN0aW9uKHR5cGUvKiwgZWxlbSovKXtcbiAgICAgICAgICAgIHJldHVybiAhdHlwZTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZih3aW5kb3cucGljdHVyZWZpbGwgfHwgY29uZmlnLnBmKXtyZXR1cm47fVxuXG4gICAgaWYod2luZG93LkhUTUxQaWN0dXJlRWxlbWVudCAmJiBzdXBwb3J0U3Jjc2V0KXtcblxuICAgICAgICBpZihkb2N1bWVudC5tc0VsZW1lbnRzRnJvbVBvaW50KXtcbiAgICAgICAgICAgIGZpeEVkZ2VIRGVzY3JpcHRvcihuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLnBmID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uZmlnLnBmID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgIGlmKHdpbmRvdy5waWN0dXJlZmlsbCl7cmV0dXJuO31cbiAgICAgICAgZm9yKGkgPSAwLCBsZW4gPSBvcHRpb25zLmVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgIHBvbHlmaWxsKG9wdGlvbnMuZWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIHBhcnRpYWwgcG9seWZpbGxcbiAgICBwb2x5ZmlsbCA9IChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYXNjZW5kaW5nU29ydCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgICAgICAgcmV0dXJuIGEudyAtIGIudztcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlZ1B4TGVuZ3RoID0gL15cXHMqXFxkK1xcLipcXGQqcHhcXHMqJC87XG4gICAgICAgIHZhciByZWR1Y2VDYW5kaWRhdGUgPSBmdW5jdGlvbiAoc3JjZXMpIHtcbiAgICAgICAgICAgIHZhciBsb3dlckNhbmRpZGF0ZSwgYm9udXNGYWN0b3I7XG4gICAgICAgICAgICB2YXIgbGVuID0gc3JjZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHNyY2VzW2xlbiAtMV07XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgICAgIGZvcihpOyBpIDwgbGVuO2krKyl7XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gc3JjZXNbaV07XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlLmQgPSBjYW5kaWRhdGUudyAvIHNyY2VzLnc7XG5cbiAgICAgICAgICAgICAgICBpZihjYW5kaWRhdGUuZCA+PSBzcmNlcy5kKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNhbmRpZGF0ZS5jYWNoZWQgJiYgKGxvd2VyQ2FuZGlkYXRlID0gc3JjZXNbaSAtIDFdKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJDYW5kaWRhdGUuZCA+IHNyY2VzLmQgLSAoMC4xMyAqIE1hdGgucG93KHNyY2VzLmQsIDIuMikpKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYm9udXNGYWN0b3IgPSBNYXRoLnBvdyhsb3dlckNhbmRpZGF0ZS5kIC0gMC42LCAxLjYpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsb3dlckNhbmRpZGF0ZS5jYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlckNhbmRpZGF0ZS5kICs9IDAuMTUgKiBib251c0ZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobG93ZXJDYW5kaWRhdGUuZCArICgoY2FuZGlkYXRlLmQgLSBzcmNlcy5kKSAqIGJvbnVzRmFjdG9yKSA+IHNyY2VzLmQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGxvd2VyQ2FuZGlkYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHBhcnNlV3NyY3NldCA9IChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGNhbmRpZGF0ZXM7XG4gICAgICAgICAgICB2YXIgcmVnV0NhbmRpZGF0ZXMgPSAvKChbXixcXHNdLlteXFxzXSspXFxzKyhcXGQrKXcpL2c7XG4gICAgICAgICAgICB2YXIgcmVnTXVsdGlwbGUgPSAvXFxzLztcbiAgICAgICAgICAgIHZhciBhZGRDYW5kaWRhdGUgPSBmdW5jdGlvbihtYXRjaCwgY2FuZGlkYXRlLCB1cmwsIHdEZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjOiBjYW5kaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgIHU6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgdzogd0Rlc2NyaXB0b3IgKiAxXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpe1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpbnB1dFxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShyZWdIRGVzYywgJycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJlZ1dDYW5kaWRhdGVzLCBhZGRDYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYoIWNhbmRpZGF0ZXMubGVuZ3RoICYmIGlucHV0ICYmICFyZWdNdWx0aXBsZS50ZXN0KGlucHV0KSl7XG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHU6IGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdzogOTlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHZhciBydW5NYXRjaE1lZGlhID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKHJ1bk1hdGNoTWVkaWEuaW5pdCl7cmV0dXJuO31cblxuICAgICAgICAgICAgcnVuTWF0Y2hNZWRpYS5pbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB0aW1lcjtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hNZWRpYUVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGF6eW1hdGNobWVkaWEnKTtcbiAgICAgICAgICAgICAgICB2YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksIGxlbjtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSAwLCBsZW4gPSBtYXRjaE1lZGlhRWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9seWZpbGwobWF0Y2hNZWRpYUVsZW1zW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHJ1biwgNjYpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY3JlYXRlU3Jjc2V0ID0gZnVuY3Rpb24oZWxlbSwgaXNJbWFnZSl7XG4gICAgICAgICAgICB2YXIgcGFyc2VkU2V0O1xuICAgICAgICAgICAgdmFyIHNyY1NldCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdzcmNzZXQnKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShjb25maWcuc3Jjc2V0QXR0cik7XG5cbiAgICAgICAgICAgIGlmKCFzcmNTZXQgJiYgaXNJbWFnZSl7XG4gICAgICAgICAgICAgICAgc3JjU2V0ID0gIWVsZW0uX2xhenlwb2x5ZmlsbCA/XG4gICAgICAgICAgICAgICAgICAgIChlbGVtLmdldEF0dHJpYnV0ZShjb25maWcuc3JjQXR0cikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpKSA6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uX2xhenlwb2x5ZmlsbC5fc2V0XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighZWxlbS5fbGF6eXBvbHlmaWxsIHx8IGVsZW0uX2xhenlwb2x5ZmlsbC5fc2V0ICE9IHNyY1NldCl7XG5cbiAgICAgICAgICAgICAgICBwYXJzZWRTZXQgPSBwYXJzZVdzcmNzZXQoIHNyY1NldCB8fCAnJyApO1xuICAgICAgICAgICAgICAgIGlmKGlzSW1hZ2UgJiYgZWxlbS5wYXJlbnROb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2V0LmlzUGljdHVyZSA9IGVsZW0ucGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09ICdQSUNUVVJFJztcblxuICAgICAgICAgICAgICAgICAgICBpZihwYXJzZWRTZXQuaXNQaWN0dXJlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5tYXRjaE1lZGlhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXp5U2l6ZXMuYUMoZWxlbSwgJ2xhenltYXRjaG1lZGlhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuTWF0Y2hNZWRpYSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFyc2VkU2V0Ll9zZXQgPSBzcmNTZXQ7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW0sICdfbGF6eXBvbHlmaWxsJywge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VkU2V0LFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRYID0gZnVuY3Rpb24oZWxlbSl7XG4gICAgICAgICAgICB2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgICAgIHZhciBvcHRpbXVtID0gbGF6eVNpemVzLmdldFggJiYgbGF6eVNpemVzLmdldFgoZWxlbSk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4ob3B0aW11bSB8fCBkcHIsIDIuNSwgZHByKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWF0Y2hlc01lZGlhID0gZnVuY3Rpb24obWVkaWEpe1xuICAgICAgICAgICAgaWYod2luZG93Lm1hdGNoTWVkaWEpe1xuICAgICAgICAgICAgICAgIG1hdGNoZXNNZWRpYSA9IGZ1bmN0aW9uKG1lZGlhKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFtZWRpYSB8fCAobWF0Y2hNZWRpYShtZWRpYSkgfHwge30pLm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFtZWRpYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNNZWRpYShtZWRpYSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldENhbmRpZGF0ZSA9IGZ1bmN0aW9uKGVsZW0pe1xuICAgICAgICAgICAgdmFyIHNvdXJjZXMsIGksIGxlbiwgbWVkaWEsIHNvdXJjZSwgc3JjZXMsIHNyYywgd2lkdGg7XG5cbiAgICAgICAgICAgIHNvdXJjZSA9IGVsZW07XG4gICAgICAgICAgICBjcmVhdGVTcmNzZXQoc291cmNlLCB0cnVlKTtcbiAgICAgICAgICAgIHNyY2VzID0gc291cmNlLl9sYXp5cG9seWZpbGw7XG5cbiAgICAgICAgICAgIGlmKHNyY2VzLmlzUGljdHVyZSl7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwLCBzb3VyY2VzID0gZWxlbS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKSwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBjb25maWcuc3VwcG9ydHNUeXBlKHNvdXJjZXNbaV0uZ2V0QXR0cmlidXRlKCd0eXBlJyksIGVsZW0pICYmIG1hdGNoZXNNZWRpYSggc291cmNlc1tpXS5nZXRBdHRyaWJ1dGUoJ21lZGlhJykpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlU3Jjc2V0KHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNlcyA9IHNvdXJjZS5fbGF6eXBvbHlmaWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNyY2VzLmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgICAgIHdpZHRoID0gc291cmNlLmdldEF0dHJpYnV0ZSgnc2l6ZXMnKSB8fCAnJztcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHJlZ1B4TGVuZ3RoLnRlc3Qod2lkdGgpICYmIHBhcnNlSW50KHdpZHRoLCAxMCkgfHwgbGF6eVNpemVzLmdXKGVsZW0sIGVsZW0ucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgc3JjZXMuZCA9IGdldFgoZWxlbSk7XG4gICAgICAgICAgICAgICAgaWYoIXNyY2VzLnNyYyB8fCAhc3JjZXMudyB8fCBzcmNlcy53IDwgd2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBzcmNlcy53ID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHJlZHVjZUNhbmRpZGF0ZShzcmNlcy5zb3J0KGFzY2VuZGluZ1NvcnQpKTtcbiAgICAgICAgICAgICAgICAgICAgc3JjZXMuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHNyY2VzLnNyYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNyYyA9IHNyY2VzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwID0gZnVuY3Rpb24oZWxlbSl7XG4gICAgICAgICAgICBpZihzdXBwb3J0U3Jjc2V0ICYmIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtLnBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPSAnUElDVFVSRScpe3JldHVybjt9XG4gICAgICAgICAgICB2YXIgY2FuZGlkYXRlID0gZ2V0Q2FuZGlkYXRlKGVsZW0pO1xuXG4gICAgICAgICAgICBpZihjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLnUgJiYgZWxlbS5fbGF6eXBvbHlmaWxsLmN1ciAhPSBjYW5kaWRhdGUudSl7XG4gICAgICAgICAgICAgICAgZWxlbS5fbGF6eXBvbHlmaWxsLmN1ciA9IGNhbmRpZGF0ZS51O1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZS5jYWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGNvbmZpZy5zcmNBdHRyLCBjYW5kaWRhdGUudSk7XG4gICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGNhbmRpZGF0ZS51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBwLnBhcnNlID0gcGFyc2VXc3Jjc2V0O1xuXG4gICAgICAgIHJldHVybiBwO1xuICAgIH0pKCk7XG5cbiAgICBpZihjb25maWcubG9hZGVkQ2xhc3MgJiYgY29uZmlnLmxvYWRpbmdDbGFzcyl7XG4gICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbHMgPSBbXTtcbiAgICAgICAgICAgIFsnaW1nW3NpemVzJD1cInB4XCJdW3NyY3NldF0uJywgJ3BpY3R1cmUgPiBpbWc6bm90KFtzcmNzZXRdKS4nXS5mb3JFYWNoKGZ1bmN0aW9uKHNlbCl7XG4gICAgICAgICAgICAgICAgc2Vscy5wdXNoKHNlbCArIGNvbmZpZy5sb2FkZWRDbGFzcyk7XG4gICAgICAgICAgICAgICAgc2Vscy5wdXNoKHNlbCArIGNvbmZpZy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25maWcucGYoe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbHMuam9pbignLCAnKSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuXG4gICAgfVxufSkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBzdGlja3kgbmF2IC0gbW9iaWxlXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vIGdyYWIgYW4gZWxlbWVudFxuICAgIHZhciBteUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpxX2hlYWRlclwiKTtcbiAgICAvLyBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgSGVhZHJvb20sIHBhc3NpbmcgdGhlIGVsZW1lbnRcbiAgICB2YXIgaGVhZHJvb20gID0gbmV3IEhlYWRyb29tKG15RWxlbWVudCk7XG4gICAgLy8gaW5pdGlhbGlzZVxuICAgIGhlYWRyb29tLmluaXQoKTtcblxuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIHN0aWNreSBuYXYgLSBkZXNrdG9wXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdpblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYgKHdpblRvcCA+PSAzMCl7XG4gICAgICAgICAgJChcIiNqcV9oZWFkZXJcIikuYWRkQ2xhc3MoXCJoZWFkZXItLXNxdWVlemVkXCIpO1xuICAgICAgICAgICQoXCIjY29udGVudC13cmFwXCIpLmFkZENsYXNzKFwiaGVhZGVyLWZpeGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoXCIjanFfaGVhZGVyXCIpLnJlbW92ZUNsYXNzKFwiaGVhZGVyLS1zcXVlZXplZFwiKTtcbiAgICAgICAgICAkKFwiI2NvbnRlbnQtd3JhcFwiKS5yZW1vdmVDbGFzcyhcImhlYWRlci1maXhlZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gc2xpZGVyXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgIHZhciBzbGlkZXIgPSAkKCcuanFfc2xpZGVyJykubGlnaHRTbGlkZXIoe1xuICAgICAgICBpdGVtOiAxLFxuICAgICAgICBnYWxsZXJ5TWFyZ2luOiAwLFxuICAgICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICAgIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24oZWwpe1xuICAgICAgICAgICAgZWxbMF0uY2xhc3NMaXN0LmFkZChcInNsaWRlcl9fbGlzdC0tbG9hZGVkXCIpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGFkanVzdFNsaWRlckJ1dHRvbnMoKVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIHNsaWRlci5yZWZyZXNoKCk7XG4gICAgLy8gfSk7XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RTbGlkZXJCdXR0b25zKCkge1xuICAgICAgICB2YXIgJG5hdlVsID0gJCgnLnNsaWRlcicpLmZpbmQoJ3VsLmxTUGFnZXInKTtcbiAgICAgICAgJCggJG5hdlVsWzBdLmNoaWxkcmVuICkuZWFjaChmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd3aWR0aCcsICgxMDAvJG5hdlVsWzBdLmNoaWxkcmVuLmxlbmd0aCkgKyAnJScgKTtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYScpLmh0bWwoICQoICQoJCgnLnNsaWRlcl9fbGlzdCcpWzBdLmNoaWxkcmVuKS5nZXQoa2V5KSApLmRhdGEoJ3RpdGxlJykgKVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gbm8gZm9jdXMgb24gbW91c2Vkb3duXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgICQoXCJib2R5XCIpLm9uKFwibW91c2Vkb3duXCIsIFwiKlwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgoJCh0aGlzKS5pcyhcIjpmb2N1c1wiKSB8fCAkKHRoaXMpLmlzKGUudGFyZ2V0KSkgJiYgJCh0aGlzKS5jc3MoXCJvdXRsaW5lLXN0eWxlXCIpID09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyhcIm91dGxpbmVcIiwgXCJub25lXCIpLm9uKFwiYmx1clwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZihcImJsdXJcIikuY3NzKFwib3V0bGluZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIHNpZGUgbmF2XG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgIGlmICggJCgnLmpxX3NpZGUtbmF2JykubGVuZ3RoICkge1xuICAgICAgICAkKCcuanFfc2lkZS1uYXZUb2dnbGUnKS5vbignY2xpY2sga2V5cHJlc3MnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ2NsaWNrJyB8fCBlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xvc2UgYWxsIG9wZW4gdGFic1xuICAgICAgICAgICAgICAgICQoJy5qcV9zaWRlLW5hdlN1Ym1lbnUnKS5ub3QoICQodGhpcykuc2libGluZ3MoJ3VsJykgKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgJCgnLmpxX3NpZGUtbmF2VG9nZ2xlJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoKSA9PSAn4oCTJyA/ICQodGhpcykuaHRtbCgnKycpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBjbGlja2luZyBvbiBhY3RpdmUgb25lLCBoaWRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2libGluZ3MoJ3VsJykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygndWwnKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaHRtbCgnKycpXG4gICAgICAgICAgICAgICAgLy8gb3BlbiBjdXJyZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygndWwnKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKCfigJMnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAkKCcjanFfc2lkZS1uYXYtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLmpxX3NpZGUtbmF2Jykuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyByZXNwb25zaXZlIHRhYmxlc1xuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAkKCcuYm9keSB0YWJsZScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxhYmVscyA9IFtdO1xuICAgICAgICB2YXIgdGhzID0gJCh0aGlzKS5maW5kKCd0aCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGFiZWxzLnB1c2goIHRoc1tpXS5pbm5lclRleHQgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJzID0gJCh0aGlzKS5maW5kKCd0cicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRkcyA9ICQodHJzW2ldKS5maW5kKCd0ZCcpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0ZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWxzW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRkc1tqXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnLCBsYWJlbHNbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIGdhbGxlcmllc1xuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvLyB3YWl0IGZvciB0aGUgbGF6aXNpemVzIHRvIHRha2UgY2FyZSBvZiBpbWFnZXMgZmlyc3RcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzbGlkZUdhbGxlcnkgPSAkKCcuanFfc2xpZGVHYWxsZXJ5JykubGlnaHRTbGlkZXIoe1xuICAgICAgICAgICAgZ2FsbGVyeTogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW06IDEsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgdGh1bWJJdGVtOiA0LFxuICAgICAgICAgICAgc2xpZGVNYXJnaW46IDAsXG4gICAgICAgICAgICBlbmFibGVEcmFnOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlTWFyZ2luOiAxNSxcbiAgICAgICAgICAgIGdhbGxlcnlNYXJnaW46IDE1LFxuICAgICAgICAgICAgdGh1bWJNYXJnaW46IDE1LFxuICAgICAgICAgICAgY3VycmVudFBhZ2VyUG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmUgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OjQ4MCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRodW1iSXRlbTogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5saWdodEdhbGxlcnkoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5qcV9zbGlkZUdhbGxlcnkgLmxzbGlkZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgMCk7XG5cbiAgICAkKCcuanFfZ2FsbGVyeScpLmxpZ2h0R2FsbGVyeSh7XG4gICAgICAgIHRodW1ibmFpbDogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICAvLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBwcmludFxuICAgIC8vXG4gICAgLy8vLy8vLy8vL1xuXG4gICAgJCgnI2pxX3ByaW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgd2luZG93LnByaW50KCk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBzd2l0Y2ggdGFicyB3aXRoIGFycm93IGtleXNcbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vL1xuXG4gICAgalF1ZXJ5KCdbcm9sZT1cInRhYlwiXScpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgIC8vIGRlZmluZSBjdXJyZW50LCBwcmV2aW91cyBhbmQgbmV4dCAocG9zc2libGUpIHRhYnNcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGNsYXNzZXNcbiAgICAgICAgdmFyICRvcmlnaW5hbCA9IGpRdWVyeSh0aGlzKTtcbiAgICAgICAgdmFyICRwcmV2ID0galF1ZXJ5KHRoaXMpLnBhcmVudHMoJy5jb250YWN0X19maWx0ZXJfX3RhYnNfX2l0ZW0nKS5wcmV2KCkuY2hpbGRyZW4oJ1tyb2xlPVwidGFiXCJdJyk7XG4gICAgICAgIHZhciAkbmV4dCA9IGpRdWVyeSh0aGlzKS5wYXJlbnRzKCcuY29udGFjdF9fZmlsdGVyX190YWJzX19pdGVtJykubmV4dCgpLmNoaWxkcmVuKCdbcm9sZT1cInRhYlwiXScpO1xuICAgICAgICB2YXIgJHRhcmdldDtcblxuICAgICAgICAvLyBmaW5kIHRoZSBkaXJlY3Rpb24gKHByZXYgb3IgbmV4dClcblxuICAgICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJHByZXY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkbmV4dDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICRvcmlnaW5hbC5hdHRyKHtcbiAgICAgICAgICAgICAgICAndGFiaW5kZXgnIDogJy0xJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCcgOiBudWxsLFxuICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbicgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRvcmlnaW5hbC5uZXh0KCkuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICR0YXJnZXQuYXR0cih7XG4gICAgICAgICAgICAgICAgJ3RhYmluZGV4JyA6ICcwJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCcgOiB0cnVlLFxuICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbicgOiBmYWxzZVxuICAgICAgICAgICAgfSkuZm9jdXMoKTtcbiAgICAgICAgICAgICR0YXJnZXQubmV4dCgpLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgICAgICAgICAgLy8gc3dpdGNoIHBhbmVsXG4gICAgICAgICAgICAkdGFyZ2V0LnByZXYoJ2lucHV0JykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cblxuXG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gZmlsdGVyIGF1dG9zdWJtaXRcbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdmFyICRleHBvc2VkVmlld3NXcmFwcGVyID0gJCgnLnZpZXctZm9ybS1hdXRvc3VibWl0JykucGFyZW50KCk7XG4gICAgJC5lYWNoKCRleHBvc2VkVmlld3NXcmFwcGVyLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5vbignY2hhbmdlJywgJy52aWV3cy1leHBvc2VkLWZvcm0gaW5wdXQ6bm90KDpzdWJtaXQpLCAudmlld3MtZXhwb3NlZC1mb3JtIHNlbGVjdDpub3QoLnNocy1zZWxlY3QpJywgKGZ1bmN0aW9uKCR2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRleHBvc2VkVmlld3MgPSAkKCcudmlldy1mb3JtLWF1dG9zdWJtaXQnKTtcbiAgICAgICAgICAgICAgICB2YXIgcnVuQmVmb3JlU3VibWl0ID0gJGV4cG9zZWRWaWV3cy5kYXRhKCdydW4tYmVmb3JlLXN1Ym1pdCcpO1xuICAgICAgICAgICAgICAgIHZhciAkc3VibWl0ID0gJHZpZXcuZmluZCgnLnZpZXdzLWV4cG9zZWQtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjanFfbG9hZGVyJykuYWRkQ2xhc3MoJ2xvYWRlci0tb3BlbicpO1xuICAgICAgICAgICAgICAgICRzdWJtaXQuY2xpY2soKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKCQodGhpcykpKTtcbiAgICB9KTtcblxuXG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gbG9hZGVyXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgICQoIGRvY3VtZW50ICkuYWpheFN0b3AoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJyNqcV9sb2FkZXInKS5yZW1vdmVDbGFzcygnbG9hZGVyLS1vcGVuJyk7XG4gICAgICAgIH0sIDApO1xuICAgIH0pO1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIG1vYmlsZSBzZWFyY2hcbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdmFyICRzZWFyY2ggPSAkKCcuaGVhZGVyX19jb250YWluZXIgPiAuc2VhcmNoLWJsb2NrJyk7XG4gICAgJHNlYXJjaC5maW5kKCdpbnB1dFt0eXBlPXNlYXJjaF0nKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gRVNDQVBFIGtleSBwcmVzc2VkXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcbiAgICAgICAgICAgICRzZWFyY2gucmVtb3ZlQ2xhc3MoJ3NlYXJjaC1ibG9jay0tb3BlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjanFfc2VhcmNoLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICRzZWFyY2guYWRkQ2xhc3MoJ3NlYXJjaC1ibG9jay0tb3BlbicpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgICRzZWFyY2guZmluZCgnaW5wdXRbdHlwZT1zZWFyY2hdJykuZm9jdXMoKTtcbiAgICAgICAgaWYgKCAhJCgnYm9keSwgaHRtbCcpLmhhc0NsYXNzKCduby1zY3JvbGwnKSApIHtcbiAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5hZGRDbGFzcygnbm8tc2Nyb2xsJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJyNqcV9zZWFyY2gtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkc2VhcmNoLnJlbW92ZUNsYXNzKCdzZWFyY2gtYmxvY2stLW9wZW4nKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIGlmICggISQoJyNqcV9oYW1idXJnZXInKS5oYXNDbGFzcygnbWVudS1pcy1vcGVuJykgKSB7XG4gICAgICAgICAgICAkKCdib2R5LCBodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXNjcm9sbCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gY29va2llc1xuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbiAgICBpZiAoICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnN2dWtfY29va2llc19hZ3JlZWQnKSApIHtcbiAgICAgICAgJCgnI2pxX2Nvb2tpZXMnKS5hZGRDbGFzcygnY29va2llcy0tdmlzaWJsZScpXG4gICAgfVxuXG4gICAgJCgnI2pxX2Nvb2tpZXNDbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyNqcV9jb29raWVzJykuaGlkZSgpXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmc3Z1a19jb29raWVzX2FncmVlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gbmV3c2xldHRlclxuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAkKCdmb3JtLmZzdi1uZXdzbGV0dGVyLXN1YnNjcmlwdGlvbi1mb3JtIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyICRjaGVja2JveCA9ICQoJ2Zvcm0uZnN2LW5ld3NsZXR0ZXItc3Vic2NyaXB0aW9uLWZvcm0gLmZvcm0taXRlbS1jaGVja2JveCcpO1xuICAgICAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkY2hlY2tib3guYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRjaGVja2JveC5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gYW5jaG9yIHNtb290aCBzY3JvbGxcbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLy8gU2VsZWN0IGFsbCBsaW5rcyB3aXRoIGhhc2hlc1xuICAgICQoJy5ib2R5IGFbaHJlZio9XCIjXCJdJylcbiAgICAgIC8vIFJlbW92ZSBsaW5rcyB0aGF0IGRvbid0IGFjdHVhbGx5IGxpbmsgdG8gYW55dGhpbmdcbiAgICAgIC5ub3QoJ1tocmVmPVwiI1wiXScpXG4gICAgICAubm90KCdbaHJlZj1cIiMwXCJdJylcbiAgICAgIC5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBPbi1wYWdlIGxpbmtzXG4gICAgICAgIGlmIChcbiAgICAgICAgICBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKVxuICAgICAgICAgICYmXG4gICAgICAgICAgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XG4gICAgICAgICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XG4gICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgcHJldmVudCBkZWZhdWx0IGlmIGFuaW1hdGlvbiBpcyBhY3R1YWxseSBnb25uYSBoYXBwZW5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIDE4MyAvLyBtaW51cyBoZWlnaHQgb2YgdGhlIGhlYWRlclxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBEYXRlcGlja2VyXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxuICAgICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVsnY3MnXSA9IHtcbiAgICAgICAgZGF5czogWydOZWTEm2xlJywgJ1BvbmTEm2zDrScsICfDmnRlcsO9JywgJ1N0xZllZGEnLCAnxIx0dnJ0ZWsnLCAnUMOhdGVrJywgJ1NvYm90YSddLFxuICAgICAgICBkYXlzU2hvcnQ6IFsnTmUnLCAnUG8nLCAnw5p0JywgJ1N0JywgJ8SMdCcsICdQw6EnLCAnU28nXSxcbiAgICAgICAgZGF5c01pbjogWydOZScsICdQbycsICfDmnQnLCAnU3QnLCAnxIx0JywgJ1DDoScsICdTbyddLFxuICAgICAgICBtb250aHM6IFsnTGVkZW4nLCAnw5pub3InLCAnQsWZZXplbicsICdEdWJlbicsICdLdsSbdGVuJywgJ8SMZXJ2ZW4nLCAnxIxlcnZlbmVjJywgJ1NycGVuJywgJ1rDocWZw60nLCAnxZjDrWplbicsICdMaXN0b3BhZCcsICdQcm9zaW5lYyddLFxuICAgICAgICBtb250aHNTaG9ydDogWydMZWQnLCAnw5pubycsICdCxZllJywgJ0R1YicsICdLdsSbJywgJ8SMdm4nLCAnxIx2YycsICdTcnAnLCAnWsOhxZknLCAnxZjDrWonLCAnTGlzJywgJ1BybyddLFxuICAgICAgICB0b2RheTogJ0RuZXMnLFxuICAgICAgICBjbGVhcjogJ1Z5bWF6YXQnLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICB0aW1lRm9ybWF0OiAnaGg6aWknLFxuICAgICAgICBmaXJzdERheTogMVxuICAgIH07XG5cbiAgICB2YXIgZGF0ZXBpY2tlciA9ICQoJy5qcy1mb3JtLXR5cGUtZGF0ZSAuZm9ybS10ZXh0JykuZGF0ZXBpY2tlcih7XG4gICAgICAgIGxhbmd1YWdlOiAnY3MnLFxuICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gR1RNXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICBkYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICAgICQoJy5wcmVmb290ZXJfX3NvY2lhbCBhLnByZWZvb3Rlcl9fc29jaWFsX19saW5rJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHNvY2lhbE5ldHdvcmsgPSBlLnRhcmdldC5ob3N0Lm1hdGNoKC9eKFxcdytcXC4pPyhcXHcrKVxcLlxcd3syLDN9Lyk7XG4gICAgICBkYXRhTGF5ZXIucHVzaCh7XG4gICAgICAgIFwiZXZlbnRcIjogXCJka19mc3Zfc29jaWFsX21lZGlhX2NsaWNrXCIsXG4gICAgICAgIFwiZGtfc29jaWFsX21lZGlhX3R5cGVcIjogc29jaWFsTmV0d29ya1syXVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKCcubGFuZy1zd2l0Y2hlciBhLmxhbmd1YWdlLWxpbmsnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICBkYXRhTGF5ZXIucHVzaCh7XG4gICAgICAgIFwiZXZlbnRcIjogXCJka19mc3ZfbGFuZ3VhZ2VfY2hhbmdlXCIsXG4gICAgICAgIFwiZGtfbGFuZ3VhZ2VcIjogZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmbGFuZycpXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJyNibG9jay10b3BoZWFkZXJuYXZpZ2F0aW9uIGEubmF2LXRvcF9fbGluaycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGRhdGFMYXllci5wdXNoKHtcbiAgICAgICAgXCJldmVudFwiOiBcImRrX2Zzdl9zdHVkeV9zeXN0ZW1fY2xpY2tcIixcbiAgICAgICAgXCJka19zdHVkeV9zeXN0ZW1fdHlwZVwiOiBlLnRhcmdldC5pbm5lclRleHRcbiAgICAgIH0pO1xuICAgIH0pO1xufSkoalF1ZXJ5KTtcblxuXG4iXX0=

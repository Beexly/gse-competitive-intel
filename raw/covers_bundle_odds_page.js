
var OddsPage = {

    // "Public" properties
    countryCode: "",
    stateProvince: "",
    seasonId: "",
    seasonName: "",
    leagueId: "",
    leagueName: "",
    oddsLocation: window.partnerListLocation || "",

    // Initial setup of properties and accessors
    init: function (obj) {
        // Create accessors
        // . . .

        // Call init() on child objects
        var oddsFilters = obj.oddsFilters;
        this.OddsFilters.init(oddsFilters);

        // Set properties
        var countryCode = obj.countryCode;
        var stateProvince = obj.stateProvince;
        var seasonId = obj.seasonId;
        var seasonName = obj.seasonName;
        var leagueId = obj.leagueId;
        var leagueName = obj.leagueName;
        var oddsLocation = obj.oddsLocation;

        if (countryCode) this.countryCode = countryCode;
        if (stateProvince) this.stateProvince = stateProvince;
        if (seasonId) this.seasonId = seasonId;
        if (seasonName) this.seasonName = seasonName;
        if (leagueId) this.leagueId = leagueId;
        if (leagueName) this.leagueName = leagueName;
        if (oddsLocation) this.oddsLocation = oddsLocation;
    },

    OddsFilters: {

        // "Private" properties
        _selectedBetType: "",
        _selectedOddsFormat: "",
        _selectedOddsScope: "Competition",

        // "Public" properties
        oddsFormatKey: "",
        currentTab: "",

        // Initial setup of properties and accessors
        init: function (obj) {

            // Create accessors for validation and error logging
            Object.defineProperty(this, 'selectedBetType', {
                get() {
                     return this._selectedBetType;
                },
                set(betType) {
                    betType = betType.toLowerCase().trim();
                    var betTypes = ["moneyline", "spread", "total", "spreadtotal"];
                    // $.inArray returns index of object when found
                    if ($.inArray(betType, betTypes) >= 0) {
                        this._selectedBetType = betType;
                    } else {
                        console.error("Invalid value assigned to OddsPage.OddsFilters.selectedBetType: " + betType);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(this, 'selectedOddsFormat', {
                get() {
                     return this._selectedOddsFormat;
                },
                set(oddsFormat) {
                    oddsFormat = oddsFormat.toLowerCase().trim();
                    var oddsFormats = ["american", "decimal", "fractional"];
                    // $.inArray returns index of object when found
                    if ($.inArray(oddsFormat, oddsFormats) >= 0) {
                        this._selectedOddsFormat = oddsFormat;
                        // Set odds format value in cookie
                        this._setUserOddsFormat();
                    } else {
                        console.error("Invalid value assigned to OddsPage.OddsFilters.selectedOddsFormat: " + oddsFormat);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(this, 'selectedOddsScope', {
                get() {
                     return this._selectedOddsScope;
                },
                set(oddsScope) {
                    oddsScope = oddsScope.trim();
                    this._selectedOddsScope = oddsScope;
                },
                enumerable: true,
                configurable: true
            });

            // Set properties
            var betTypeKey = obj.betTypeKey;
            var oddsFormatKey = obj.oddsFormatKey;
            var selectedBetType = obj.selectedBetType;
            var selectedOddsFormat = obj.selectedOddsFormat;
            var selectedOddsScope = obj.selectedOddsScope;

            if (betTypeKey) this.betTypeKey = betTypeKey;
            if (oddsFormatKey) this.oddsFormatKey = oddsFormatKey;
            if (selectedBetType) this.selectedBetType = selectedBetType;
            if (selectedOddsFormat) this.selectedOddsFormat = selectedOddsFormat;
            if (selectedOddsScope) this.selectedOddsScope = selectedOddsScope;
        },

        // "Public" methods
        setOddsFormatDisplay: function (oddsFormat) {
            var OF = OddsPage.OddsFilters;

            if (oddsFormat) OF.selectedOddsFormat = oddsFormat;
            switch (OF.selectedOddsFormat) {
                case "american":
                    OF.showAmerican();
                    break;
                case "decimal":
                    OF.showDecimal();
                    break;
                case "fractional":
                    OF.showFraction();
                    break;
            }
        },

        setBetTypeDisplay: function (betType, newTab, callback) {
            var OF = OddsPage.OddsFilters;

            if (betType) OF.selectedBetType = betType;
            if (newTab) OF.currentTab = newTab;
            $(".bet-type-dropdown li.active").removeClass("active");
            $(OF.currentTab).tab('show');
            if (callback) {
                callback();
            }
        },

        getOddsByScope: function (contentSelector, ajaxUrl, callback) {
            var OF = OddsPage.OddsFilters;

            var oddsFormat = OF.selectedOddsFormat;
            var selectedTab = OF.selectedBetType;
            var selectedOddsScope = OF.selectedOddsScope;
            var location = OddsPage.oddsLocation;
            var countryCode = OddsPage.countryCode;
            var stateProvince = OddsPage.stateProvince;
            var seasonId = OddsPage.seasonId;

            $.ajax({
                url: ajaxUrl,
                data: {
                    seasonId: seasonId, location: location, countryCode: countryCode, stateProvince: stateProvince, oddsScope: selectedOddsScope, selectedTab
                }
            }).done(function (html) {
                $(contentSelector).html(html);
                //floatyTables();
                if (callback) {
                    callback();
                }
            });
        },
        
        showAmerican: function () {
            var OF = OddsPage.OddsFilters;
            OF._show('American');
            OF._hide('Decimal');
            OF._hide('Fraction');
        },

        showDecimal: function () {
            var OF = OddsPage.OddsFilters;
            OF._show('Decimal');
            OF._hide('American');
            OF._hide('Fraction');
        },

        showFraction: function () {
            var OF = OddsPage.OddsFilters;
            OF._show('Fraction');
            OF._hide('Decimal');
            OF._hide('American');
        },

        showFull: function(callback) {
            $(".__btn-full-game").prop("checked", true);
            $(".__btn-first-half").prop("checked", false);

            if (callback) {
                callback();
            }
            //OddsScope("Competition");
        },

        showFirst: function(callback) {
            $(".__btn-full-game").prop("checked", false);
            $(".__btn-first-half").prop("checked", true);

            if (callback) {
                callback();
            }
            //OddsScope("FirstHalf");
        },

        // "Private" methods
        _show: function(showWhat) {
            var mElements = document.getElementsByClassName(showWhat);
            for (var i = 0; i < mElements.length; i++) {
                mElements[i].style.display = "block";
            }
        },

        _hide: function(hideWhat) {
            var mElements = document.getElementsByClassName(hideWhat);
            for (var i = 0; i < mElements.length; i++) {
                mElements[i].style.display = "none";
            }
        },

        _setUserOddsFormat: function () {
            var OF = OddsPage.OddsFilters;
            document.cookie =
                OF.oddsFormatKey +
                '=' +
            encodeURIComponent(OF.selectedOddsFormat) +
                ";@CoversUrls.CoversUrl;path=/"; //";expires=" + date.setDate(date.getDate() + 1);
        }

    }

}

// Odds information Modal
var oddsHelpBtn = document.querySelector('button#__OddsInfoMenu');
var oddsHelpDialog = document.querySelector('dialog#odds-help-dialog');
var closeDialogBtn = oddsHelpDialog.querySelector("button#close-dialog");

oddsHelpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openDialog(oddsHelpDialog);
});

function openDialog(which) {
    which.showModal();
}

closeDialogBtn.addEventListener('click', (event) => {
    oddsHelpDialog.close();
});

oddsHelpDialog.addEventListener('click', function (event) {
    var rect = oddsHelpDialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        oddsHelpDialog.close();
    }
});
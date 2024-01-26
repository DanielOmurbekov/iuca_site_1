"use strict";

const StateManager = (function()
{
  const sortAlphabetically = (a, b) =>
  {
    const nameA = a.toUpperCase();
    const nameB = b.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  function _createStateUrl()
  {
    let url = "?";
    let delim = "";
    const sortedKeys = Object.keys(this._currentState).sort(sortAlphabetically);
    sortedKeys.forEach(key =>
    {
      if (this._currentState.hasOwnProperty(key)) {
        url += delim + key + "=" + this._currentState[key].join(DELIMITER);
        delim = "&";
      }
    });

    return url;
  }

  const DELIMITER = "+";

  const StateManager = function ()
  {
    this._base = window.location.pathname + window.location.search;
    this._currentState = {};
    this._userCallback = null;
    this._dirty = true;

    this.getCurrentState();
    window.addEventListener('popstate', this._onchange.bind(this));
  };

  StateManager.prototype._onchange = function (state)
  {
    this.clearState();
    this.getCurrentState();

    if (this._userCallback) {
      // Emulate event calling
      this._userCallback.call(window, this._currentState);
    }
  };

  StateManager.prototype.getCurrentState = function ()
  {
    if (this._dirty) {
      const matches = window.location.search.match(/[^?=&]+(=[^=&]+)?/gi);

      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          const part = matches[i].match(/([^=&]+)(=([^=&]+))?/);
          const key = part[1];
          let value = true;
          if (3 in part) {
            if (part[3] === undefined) {
              value = [];
            } else if (part[3].match(`\\${DELIMITER}`)) {
              value = [];
              const parts = part[3].split(DELIMITER);
              for (let j = 0; j < parts.length; j++) {
                value.push(decodeURIComponent(parts[j]));
              }
            } else {
              value = [decodeURIComponent(part[3])];
            }
          }

          this._currentState[key] = value;
        }
      }
    }
    this._dirty = false;
    return this._currentState;
  };

  StateManager.prototype.addListener = function (callback)
  {
    if (typeof callback === "function") {
      this._userCallback = callback;
    }
  };

  StateManager.prototype.clearState = function ()
  {
    this._currentState = {};
    this._dirty = true;
  };

  StateManager.prototype.setState = function (newState, replace)
  {
    const newStateVal = newState || this._currentState;
    this._currentState = newStateVal;

    const url = _createStateUrl.apply(this);
    if (replace) {
      history.replaceState(newStateVal, '', url);
    } else {
      history.pushState(newStateVal, '', url);
    }
  };

  StateManager.prototype.getParameter = function (key)
  {
    return this._currentState[key];
  };

  StateManager.prototype.setParameter = function (key, value)
  {
    if (Array.isArray(value)) {
      this._currentState[key] = value;
    } else {
      this._currentState[key] = [encodeURIComponent(value)];
    }
  };

  StateManager.prototype.removeParameter = function (key)
  {
    delete this._currentState[key];
  };

  StateManager.prototype.empty = function ()
  {
    return (Object.keys(this._currentState).length === 0);
  };

  return StateManager;
})();

(function ($)
{
  const stateManager = new StateManager();

  if (document.getElementById('fsv-contactslist')) {
    const contact = new Vue({
      el: '#fsv-contactslist',
      delimiters: ['${', '}'],
      data: {
        people: null,
        filteredPeople: null,
        selectedLetter: null,
        selectedName: null,
        selectedDepartments: [],
        expandedDepartments: [],
        contactTypes: ['staff'],
        range: 8,
        page: 1,
        filterData: drupalSettings.fsv_contacts.filter,
      },
      computed: {
        last: function ()
        {
          if (this.filteredPeople) {
            return Math.ceil(this.filteredPeople.length / this.range);
          }
        },
        paginatedPeople: function ()
        {
          if (this.filteredPeople) {
            var range = this.range;
            var offset = range * (this.page - 1);
            return this.filteredPeople.slice(offset, range + offset);
          }
        },
        paginationText: function ()
        {
          return Drupal.t("@current of @total", {"@current": this.page, "@total": this.last});
        }
      },
      watch: {
        selectedLetter: function (val, oldVal)
        {
          this.filter({
            selectedDepartments: this.selectedDepartments,
            selectedName: this.selectedName,
            selectedLetter: val,
            contactTypes: this.contactTypes
          });
        },
        selectedName: function (val, oldVal)
        {
          this.filter({
            selectedDepartments: this.selectedDepartments,
            selectedName: val,
            selectedLetter: this.selectedLetter,
            contactTypes: this.contactTypes
          });
        },
        selectedDepartments: function (val, oldVal)
        {
          this.filter({
            selectedDepartments: val,
            selectedName: this.selectedName,
            selectedLetter: this.selectedLetter,
            contactTypes: this.contactTypes
          });
        },
        contactTypes: function (val, oldVal)
        {
          stateManager.setParameter('type', val);
          this.filter({
            selectedDepartments: this.selectedDepartments,
            selectedName: this.selectedName,
            selectedLetter: this.selectedLetter,
            contactTypes: val
          });
          stateManager.setState();
        }
      },
      methods: {
        filter: function (values)
        {
          let f = function (person)
          {
            return this.filterDepartments(person, values.selectedDepartments) &&
              this.filterFulltext(person, values.selectedName, values.selectedLetter) &&
              this.filterContactType(person, values.contactTypes)
          };
          f = f.bind(this);
          this.filteredPeople = this.people.filter(f);
          this.page = 1;
        },
        filterFulltext: function (person, selectedName, selectedLetter)
        {
          if (selectedName) {
            const val = removeDiacritics(selectedName.toLowerCase());
            const name = removeDiacritics(person.cn.toLowerCase());
            return ~name.indexOf(val);
          } else if (selectedLetter) {
            const nameParts = person.cn.split(' ');
            const lastName = removeDiacritics(nameParts[nameParts.length - 1]);
            return lastName.toLowerCase().lastIndexOf(selectedLetter, 0) === 0;
          }

          return true;
        },
        filterDepartments: function (person, filteredDepartments)
        {
          // filter not empty
          if (filteredDepartments && filteredDepartments.length) {
            for (let i = 0; i < filteredDepartments.length; i++) {
              const splitted = filteredDepartments[i].split('-');
              let attribute = 'institutes';
              let value = splitted[0];
              if (splitted.length > 1) {
                attribute = 'departments_filter';
                value = splitted[1];
              }

              for (let j = 0; j < person[attribute].length; j++) {
                if (person[attribute][j] === value) {
                  return true;
                }
              }
            }
            return false;
          }

          return true;
        },
        filterContactType: function (person, types)
        {
          if (!types || (Array.isArray(types) && types.length < 1)) {
            return true;
          }

          for (const type of types) {
            if (person[type] === true) {
              return true;
            }
          }

          return false;
        },
        selectDepartment: function (department)
        {
          if (!(department in this.filterData && 'children' in this.filterData[department])) {
            return;
          }

          if (this.selectedDepartments.includes(department)) {
            for (const subDepartment of Object.keys(this.filterData[department].children)) {
              const subKey = `${department}-${subDepartment}`;
              if (!this.selectedDepartments.includes(subKey)) {
                this.selectedDepartments.push(subKey);
              }
            }
          } else {
            for (const subDepartment of Object.keys(this.filterData[department].children)) {
              const subKey = `${department}-${subDepartment}`;
              const index = this.selectedDepartments.indexOf(subKey);
              if (index > -1) {
                this.selectedDepartments.splice(index, 1);
              }
            }
          }
        },
        selectSubDeparment: function (department, subDeparment)
        {
          if (this.selectedDepartments.includes(subDeparment)) {
            for (const subDepartment of Object.keys(this.filterData[department].children)) {
              const subKey = `${department}-${subDepartment}`;
              if (!this.selectedDepartments.includes(subKey)) {
                return;
              }
            }
            if (!this.selectedDepartments.includes(department)) {
              this.selectedDepartments.push(department);
            }
          } else {
            const index = this.selectedDepartments.indexOf(department);
            if (index > -1) {
              this.selectedDepartments.splice(index, 1);
            }
          }
        },
        departmentExpanded: function (department)
        {
          if (this.selectedDepartments.includes(department) || this.expandedDepartments.includes(department)) {
            return true;
          }

          if ('children' in this.filterData[department]) {
            for (const subDepartment of Object.keys(this.filterData[department].children)) {
              const subKey = `${department}-${subDepartment}`;
              if (this.selectedDepartments.includes(subKey)) {
                return true;
              }
            }
          }

          return false;
        },
        expandDepartment: function (department)
        {
          if (this.expandedDepartments.includes(department)) {
            this.expandedDepartments.splice(
              this.expandedDepartments.indexOf(department),
              1
            )
          } else {
            this.expandedDepartments.push(department);
          }
        }
      },
      mounted: function ()
      {
        $('#jq_loader').addClass('loader--open');
        const _this = this;
        const contactTypes = stateManager.getParameter('type');
        if (contactTypes) {
          this.contactTypes = contactTypes;
        }
        jQuery.getJSON(drupalSettings.fsv_contacts.endpoint, function (json)
        {
          _this.people = json.results;
          _this.filter({
            selectedDepartments: _this.selectedDepartments,
            selectedName: _this.selectedName,
            selectedLetter: _this.selectedLetter,
            contactTypes: _this.contactTypes
          });
        });
        document.getElementById('js_people-input').onkeypress = function (e)
        {
          if (!e) e = window.event;
          const keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            // Enter pressed
            this.blur();
            e.preventDefault();
            const element = document.getElementById("js_people-results");
            element.scrollIntoView(true);
          }
        }
      }
    });

  }

  if (document.getElementById('viewsearch-index-viewpage-1')) {
    const search = new Vue({
      el: '#viewsearch-index-viewpage-1',
      delimiters: ['${', '}'],
      data: {
        people: null,
        selectedName: null,
        range: 8,
        page: 1,
        drupalSettings: drupalSettings,
      },
      computed: {
        last: function ()
        {
          if (this.people) {
            return Math.ceil(this.people.length / this.range);
          }
        },
        paginatedPeople: function ()
        {
          if (this.people) {
            const range = this.range;
            const offset = range * (this.page - 1);
            return this.people.slice(offset, range + offset);
          }
        },
        paginationText: function ()
        {
          return Drupal.t("@current of @total", {"@current": this.page, "@total": this.last});
        }
      },
      watch: {
        selectedName: function (val, oldVal)
        {
          const string = val.toLowerCase();
          const filteredArray = this.people.filter(function (person)
          {
            const name = person.name.toLowerCase();
            return ~name.indexOf(string);
          });
          this.filteredPeople = filteredArray;
          // reset pagination
          this.page = 1;
        },
      },
      mounted: function ()
      {
        $('#jq_loader').addClass('loader--open');
        const _this = this;
        const name = drupalSettings.fsv_contacts.search_string;
        jQuery.getJSON(`${drupalSettings.fsv_contacts.endpoint}&search=${name}`, function (json)
        {
          _this.people = json.results;
        });
      }
    });
  }

})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBTdGF0ZU1hbmFnZXIgPSAoZnVuY3Rpb24oKVxue1xuICBjb25zdCBzb3J0QWxwaGFiZXRpY2FsbHkgPSAoYSwgYikgPT5cbiAge1xuICAgIGNvbnN0IG5hbWVBID0gYS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5hbWVCID0gYi50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChuYW1lQSA8IG5hbWVCKSByZXR1cm4gLTE7XG4gICAgaWYgKG5hbWVBID4gbmFtZUIpIHJldHVybiAxO1xuICAgIHJldHVybiAwO1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9jcmVhdGVTdGF0ZVVybCgpXG4gIHtcbiAgICBsZXQgdXJsID0gXCI/XCI7XG4gICAgbGV0IGRlbGltID0gXCJcIjtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gT2JqZWN0LmtleXModGhpcy5fY3VycmVudFN0YXRlKS5zb3J0KHNvcnRBbHBoYWJldGljYWxseSk7XG4gICAgc29ydGVkS2V5cy5mb3JFYWNoKGtleSA9PlxuICAgIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB1cmwgKz0gZGVsaW0gKyBrZXkgKyBcIj1cIiArIHRoaXMuX2N1cnJlbnRTdGF0ZVtrZXldLmpvaW4oREVMSU1JVEVSKTtcbiAgICAgICAgZGVsaW0gPSBcIiZcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBjb25zdCBERUxJTUlURVIgPSBcIitcIjtcblxuICBjb25zdCBTdGF0ZU1hbmFnZXIgPSBmdW5jdGlvbiAoKVxuICB7XG4gICAgdGhpcy5fYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgdGhpcy5fY3VycmVudFN0YXRlID0ge307XG4gICAgdGhpcy5fdXNlckNhbGxiYWNrID0gbnVsbDtcbiAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG5cbiAgICB0aGlzLmdldEN1cnJlbnRTdGF0ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuX29uY2hhbmdlLmJpbmQodGhpcykpO1xuICB9O1xuXG4gIFN0YXRlTWFuYWdlci5wcm90b3R5cGUuX29uY2hhbmdlID0gZnVuY3Rpb24gKHN0YXRlKVxuICB7XG4gICAgdGhpcy5jbGVhclN0YXRlKCk7XG4gICAgdGhpcy5nZXRDdXJyZW50U3RhdGUoKTtcblxuICAgIGlmICh0aGlzLl91c2VyQ2FsbGJhY2spIHtcbiAgICAgIC8vIEVtdWxhdGUgZXZlbnQgY2FsbGluZ1xuICAgICAgdGhpcy5fdXNlckNhbGxiYWNrLmNhbGwod2luZG93LCB0aGlzLl9jdXJyZW50U3RhdGUpO1xuICAgIH1cbiAgfTtcblxuICBTdGF0ZU1hbmFnZXIucHJvdG90eXBlLmdldEN1cnJlbnRTdGF0ZSA9IGZ1bmN0aW9uICgpXG4gIHtcbiAgICBpZiAodGhpcy5fZGlydHkpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKC9bXj89Jl0rKD1bXj0mXSspPy9naSk7XG5cbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHBhcnQgPSBtYXRjaGVzW2ldLm1hdGNoKC8oW149Jl0rKSg9KFtePSZdKykpPy8pO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHBhcnRbMV07XG4gICAgICAgICAgbGV0IHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoMyBpbiBwYXJ0KSB7XG4gICAgICAgICAgICBpZiAocGFydFszXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRbM10ubWF0Y2goYFxcXFwke0RFTElNSVRFUn1gKSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHBhcnRbM10uc3BsaXQoREVMSU1JVEVSKTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzW2pdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0WzNdKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7XG4gIH07XG5cbiAgU3RhdGVNYW5hZ2VyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIChjYWxsYmFjaylcbiAge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fdXNlckNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuICB9O1xuXG4gIFN0YXRlTWFuYWdlci5wcm90b3R5cGUuY2xlYXJTdGF0ZSA9IGZ1bmN0aW9uICgpXG4gIHtcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB7fTtcbiAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gIH07XG5cbiAgU3RhdGVNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChuZXdTdGF0ZSwgcmVwbGFjZSlcbiAge1xuICAgIGNvbnN0IG5ld1N0YXRlVmFsID0gbmV3U3RhdGUgfHwgdGhpcy5fY3VycmVudFN0YXRlO1xuICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG5ld1N0YXRlVmFsO1xuXG4gICAgY29uc3QgdXJsID0gX2NyZWF0ZVN0YXRlVXJsLmFwcGx5KHRoaXMpO1xuICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShuZXdTdGF0ZVZhbCwgJycsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG5ld1N0YXRlVmFsLCAnJywgdXJsKTtcbiAgICB9XG4gIH07XG5cbiAgU3RhdGVNYW5hZ2VyLnByb3RvdHlwZS5nZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbiAoa2V5KVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZVtrZXldO1xuICB9O1xuXG4gIFN0YXRlTWFuYWdlci5wcm90b3R5cGUuc2V0UGFyYW1ldGVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpXG4gIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZVtrZXldID0gW2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuICAgIH1cbiAgfTtcblxuICBTdGF0ZU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVBhcmFtZXRlciA9IGZ1bmN0aW9uIChrZXkpXG4gIHtcbiAgICBkZWxldGUgdGhpcy5fY3VycmVudFN0YXRlW2tleV07XG4gIH07XG5cbiAgU3RhdGVNYW5hZ2VyLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpXG4gIHtcbiAgICByZXR1cm4gKE9iamVjdC5rZXlzKHRoaXMuX2N1cnJlbnRTdGF0ZSkubGVuZ3RoID09PSAwKTtcbiAgfTtcblxuICByZXR1cm4gU3RhdGVNYW5hZ2VyO1xufSkoKTtcblxuKGZ1bmN0aW9uICgkKVxue1xuICBjb25zdCBzdGF0ZU1hbmFnZXIgPSBuZXcgU3RhdGVNYW5hZ2VyKCk7XG5cbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmc3YtY29udGFjdHNsaXN0JykpIHtcbiAgICBjb25zdCBjb250YWN0ID0gbmV3IFZ1ZSh7XG4gICAgICBlbDogJyNmc3YtY29udGFjdHNsaXN0JyxcbiAgICAgIGRlbGltaXRlcnM6IFsnJHsnLCAnfSddLFxuICAgICAgZGF0YToge1xuICAgICAgICBwZW9wbGU6IG51bGwsXG4gICAgICAgIGZpbHRlcmVkUGVvcGxlOiBudWxsLFxuICAgICAgICBzZWxlY3RlZExldHRlcjogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWROYW1lOiBudWxsLFxuICAgICAgICBzZWxlY3RlZERlcGFydG1lbnRzOiBbXSxcbiAgICAgICAgZXhwYW5kZWREZXBhcnRtZW50czogW10sXG4gICAgICAgIGNvbnRhY3RUeXBlczogWydzdGFmZiddLFxuICAgICAgICByYW5nZTogOCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgZmlsdGVyRGF0YTogZHJ1cGFsU2V0dGluZ3MuZnN2X2NvbnRhY3RzLmZpbHRlcixcbiAgICAgIH0sXG4gICAgICBjb21wdXRlZDoge1xuICAgICAgICBsYXN0OiBmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRQZW9wbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5maWx0ZXJlZFBlb3BsZS5sZW5ndGggLyB0aGlzLnJhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2luYXRlZFBlb3BsZTogZnVuY3Rpb24gKClcbiAgICAgICAge1xuICAgICAgICAgIGlmICh0aGlzLmZpbHRlcmVkUGVvcGxlKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLnJhbmdlO1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHJhbmdlICogKHRoaXMucGFnZSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRQZW9wbGUuc2xpY2Uob2Zmc2V0LCByYW5nZSArIG9mZnNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwYWdpbmF0aW9uVGV4dDogZnVuY3Rpb24gKClcbiAgICAgICAge1xuICAgICAgICAgIHJldHVybiBEcnVwYWwudChcIkBjdXJyZW50IG9mIEB0b3RhbFwiLCB7XCJAY3VycmVudFwiOiB0aGlzLnBhZ2UsIFwiQHRvdGFsXCI6IHRoaXMubGFzdH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgd2F0Y2g6IHtcbiAgICAgICAgc2VsZWN0ZWRMZXR0ZXI6IGZ1bmN0aW9uICh2YWwsIG9sZFZhbClcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudHM6IHRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cyxcbiAgICAgICAgICAgIHNlbGVjdGVkTmFtZTogdGhpcy5zZWxlY3RlZE5hbWUsXG4gICAgICAgICAgICBzZWxlY3RlZExldHRlcjogdmFsLFxuICAgICAgICAgICAgY29udGFjdFR5cGVzOiB0aGlzLmNvbnRhY3RUeXBlc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RlZE5hbWU6IGZ1bmN0aW9uICh2YWwsIG9sZFZhbClcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudHM6IHRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cyxcbiAgICAgICAgICAgIHNlbGVjdGVkTmFtZTogdmFsLFxuICAgICAgICAgICAgc2VsZWN0ZWRMZXR0ZXI6IHRoaXMuc2VsZWN0ZWRMZXR0ZXIsXG4gICAgICAgICAgICBjb250YWN0VHlwZXM6IHRoaXMuY29udGFjdFR5cGVzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudHM6IGZ1bmN0aW9uICh2YWwsIG9sZFZhbClcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudHM6IHZhbCxcbiAgICAgICAgICAgIHNlbGVjdGVkTmFtZTogdGhpcy5zZWxlY3RlZE5hbWUsXG4gICAgICAgICAgICBzZWxlY3RlZExldHRlcjogdGhpcy5zZWxlY3RlZExldHRlcixcbiAgICAgICAgICAgIGNvbnRhY3RUeXBlczogdGhpcy5jb250YWN0VHlwZXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFjdFR5cGVzOiBmdW5jdGlvbiAodmFsLCBvbGRWYWwpXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0ZU1hbmFnZXIuc2V0UGFyYW1ldGVyKCd0eXBlJywgdmFsKTtcbiAgICAgICAgICB0aGlzLmZpbHRlcih7XG4gICAgICAgICAgICBzZWxlY3RlZERlcGFydG1lbnRzOiB0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMsXG4gICAgICAgICAgICBzZWxlY3RlZE5hbWU6IHRoaXMuc2VsZWN0ZWROYW1lLFxuICAgICAgICAgICAgc2VsZWN0ZWRMZXR0ZXI6IHRoaXMuc2VsZWN0ZWRMZXR0ZXIsXG4gICAgICAgICAgICBjb250YWN0VHlwZXM6IHZhbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN0YXRlTWFuYWdlci5zZXRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWV0aG9kczoge1xuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uICh2YWx1ZXMpXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgZiA9IGZ1bmN0aW9uIChwZXJzb24pXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRGVwYXJ0bWVudHMocGVyc29uLCB2YWx1ZXMuc2VsZWN0ZWREZXBhcnRtZW50cykgJiZcbiAgICAgICAgICAgICAgdGhpcy5maWx0ZXJGdWxsdGV4dChwZXJzb24sIHZhbHVlcy5zZWxlY3RlZE5hbWUsIHZhbHVlcy5zZWxlY3RlZExldHRlcikgJiZcbiAgICAgICAgICAgICAgdGhpcy5maWx0ZXJDb250YWN0VHlwZShwZXJzb24sIHZhbHVlcy5jb250YWN0VHlwZXMpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBmID0gZi5iaW5kKHRoaXMpO1xuICAgICAgICAgIHRoaXMuZmlsdGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZS5maWx0ZXIoZik7XG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyRnVsbHRleHQ6IGZ1bmN0aW9uIChwZXJzb24sIHNlbGVjdGVkTmFtZSwgc2VsZWN0ZWRMZXR0ZXIpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSByZW1vdmVEaWFjcml0aWNzKHNlbGVjdGVkTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSByZW1vdmVEaWFjcml0aWNzKHBlcnNvbi5jbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIHJldHVybiB+bmFtZS5pbmRleE9mKHZhbCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZExldHRlcikge1xuICAgICAgICAgICAgY29uc3QgbmFtZVBhcnRzID0gcGVyc29uLmNuLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0TmFtZSA9IHJlbW92ZURpYWNyaXRpY3MobmFtZVBhcnRzW25hbWVQYXJ0cy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICByZXR1cm4gbGFzdE5hbWUudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZihzZWxlY3RlZExldHRlciwgMCkgPT09IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlckRlcGFydG1lbnRzOiBmdW5jdGlvbiAocGVyc29uLCBmaWx0ZXJlZERlcGFydG1lbnRzKVxuICAgICAgICB7XG4gICAgICAgICAgLy8gZmlsdGVyIG5vdCBlbXB0eVxuICAgICAgICAgIGlmIChmaWx0ZXJlZERlcGFydG1lbnRzICYmIGZpbHRlcmVkRGVwYXJ0bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkRGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWQgPSBmaWx0ZXJlZERlcGFydG1lbnRzW2ldLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSAnaW5zdGl0dXRlcyc7XG4gICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNwbGl0dGVkWzBdO1xuICAgICAgICAgICAgICBpZiAoc3BsaXR0ZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9ICdkZXBhcnRtZW50c19maWx0ZXInO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3BsaXR0ZWRbMV07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBlcnNvblthdHRyaWJ1dGVdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvblthdHRyaWJ1dGVdW2pdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlckNvbnRhY3RUeXBlOiBmdW5jdGlvbiAocGVyc29uLCB0eXBlcylcbiAgICAgICAge1xuICAgICAgICAgIGlmICghdHlwZXMgfHwgKEFycmF5LmlzQXJyYXkodHlwZXMpICYmIHR5cGVzLmxlbmd0aCA8IDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgdHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChwZXJzb25bdHlwZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3REZXBhcnRtZW50OiBmdW5jdGlvbiAoZGVwYXJ0bWVudClcbiAgICAgICAge1xuICAgICAgICAgIGlmICghKGRlcGFydG1lbnQgaW4gdGhpcy5maWx0ZXJEYXRhICYmICdjaGlsZHJlbicgaW4gdGhpcy5maWx0ZXJEYXRhW2RlcGFydG1lbnRdKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMuaW5jbHVkZXMoZGVwYXJ0bWVudCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViRGVwYXJ0bWVudCBvZiBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckRhdGFbZGVwYXJ0bWVudF0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YktleSA9IGAke2RlcGFydG1lbnR9LSR7c3ViRGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cy5pbmNsdWRlcyhzdWJLZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERlcGFydG1lbnRzLnB1c2goc3ViS2V5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN1YkRlcGFydG1lbnQgb2YgT2JqZWN0LmtleXModGhpcy5maWx0ZXJEYXRhW2RlcGFydG1lbnRdLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICBjb25zdCBzdWJLZXkgPSBgJHtkZXBhcnRtZW50fS0ke3N1YkRlcGFydG1lbnR9YDtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMuaW5kZXhPZihzdWJLZXkpO1xuICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RTdWJEZXBhcm1lbnQ6IGZ1bmN0aW9uIChkZXBhcnRtZW50LCBzdWJEZXBhcm1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERlcGFydG1lbnRzLmluY2x1ZGVzKHN1YkRlcGFybWVudCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViRGVwYXJ0bWVudCBvZiBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckRhdGFbZGVwYXJ0bWVudF0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YktleSA9IGAke2RlcGFydG1lbnR9LSR7c3ViRGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cy5pbmNsdWRlcyhzdWJLZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cy5pbmNsdWRlcyhkZXBhcnRtZW50KSkge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMucHVzaChkZXBhcnRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMuaW5kZXhPZihkZXBhcnRtZW50KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREZXBhcnRtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVwYXJ0bWVudEV4cGFuZGVkOiBmdW5jdGlvbiAoZGVwYXJ0bWVudClcbiAgICAgICAge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMuaW5jbHVkZXMoZGVwYXJ0bWVudCkgfHwgdGhpcy5leHBhbmRlZERlcGFydG1lbnRzLmluY2x1ZGVzKGRlcGFydG1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJ2NoaWxkcmVuJyBpbiB0aGlzLmZpbHRlckRhdGFbZGVwYXJ0bWVudF0pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViRGVwYXJ0bWVudCBvZiBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckRhdGFbZGVwYXJ0bWVudF0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YktleSA9IGAke2RlcGFydG1lbnR9LSR7c3ViRGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERlcGFydG1lbnRzLmluY2x1ZGVzKHN1YktleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhwYW5kRGVwYXJ0bWVudDogZnVuY3Rpb24gKGRlcGFydG1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5leHBhbmRlZERlcGFydG1lbnRzLmluY2x1ZGVzKGRlcGFydG1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkRGVwYXJ0bWVudHMuc3BsaWNlKFxuICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkRGVwYXJ0bWVudHMuaW5kZXhPZihkZXBhcnRtZW50KSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkRGVwYXJ0bWVudHMucHVzaChkZXBhcnRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtb3VudGVkOiBmdW5jdGlvbiAoKVxuICAgICAge1xuICAgICAgICAkKCcjanFfbG9hZGVyJykuYWRkQ2xhc3MoJ2xvYWRlci0tb3BlbicpO1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGNvbnRhY3RUeXBlcyA9IHN0YXRlTWFuYWdlci5nZXRQYXJhbWV0ZXIoJ3R5cGUnKTtcbiAgICAgICAgaWYgKGNvbnRhY3RUeXBlcykge1xuICAgICAgICAgIHRoaXMuY29udGFjdFR5cGVzID0gY29udGFjdFR5cGVzO1xuICAgICAgICB9XG4gICAgICAgIGpRdWVyeS5nZXRKU09OKGRydXBhbFNldHRpbmdzLmZzdl9jb250YWN0cy5lbmRwb2ludCwgZnVuY3Rpb24gKGpzb24pXG4gICAgICAgIHtcbiAgICAgICAgICBfdGhpcy5wZW9wbGUgPSBqc29uLnJlc3VsdHM7XG4gICAgICAgICAgX3RoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudHM6IF90aGlzLnNlbGVjdGVkRGVwYXJ0bWVudHMsXG4gICAgICAgICAgICBzZWxlY3RlZE5hbWU6IF90aGlzLnNlbGVjdGVkTmFtZSxcbiAgICAgICAgICAgIHNlbGVjdGVkTGV0dGVyOiBfdGhpcy5zZWxlY3RlZExldHRlcixcbiAgICAgICAgICAgIGNvbnRhY3RUeXBlczogX3RoaXMuY29udGFjdFR5cGVzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfcGVvcGxlLWlucHV0Jykub25rZXlwcmVzcyA9IGZ1bmN0aW9uIChlKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFlKSBlID0gd2luZG93LmV2ZW50O1xuICAgICAgICAgIGNvbnN0IGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcbiAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIC8vIEVudGVyIHByZXNzZWRcbiAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNfcGVvcGxlLXJlc3VsdHNcIik7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdzZWFyY2gtaW5kZXgtdmlld3BhZ2UtMScpKSB7XG4gICAgY29uc3Qgc2VhcmNoID0gbmV3IFZ1ZSh7XG4gICAgICBlbDogJyN2aWV3c2VhcmNoLWluZGV4LXZpZXdwYWdlLTEnLFxuICAgICAgZGVsaW1pdGVyczogWyckeycsICd9J10sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBlb3BsZTogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWROYW1lOiBudWxsLFxuICAgICAgICByYW5nZTogOCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgZHJ1cGFsU2V0dGluZ3M6IGRydXBhbFNldHRpbmdzLFxuICAgICAgfSxcbiAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGxhc3Q6IGZ1bmN0aW9uICgpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5wZW9wbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5wZW9wbGUubGVuZ3RoIC8gdGhpcy5yYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwYWdpbmF0ZWRQZW9wbGU6IGZ1bmN0aW9uICgpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5wZW9wbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5yYW5nZTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHJhbmdlICogKHRoaXMucGFnZSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVvcGxlLnNsaWNlKG9mZnNldCwgcmFuZ2UgKyBvZmZzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGFnaW5hdGlvblRleHQ6IGZ1bmN0aW9uICgpXG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gRHJ1cGFsLnQoXCJAY3VycmVudCBvZiBAdG90YWxcIiwge1wiQGN1cnJlbnRcIjogdGhpcy5wYWdlLCBcIkB0b3RhbFwiOiB0aGlzLmxhc3R9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHdhdGNoOiB7XG4gICAgICAgIHNlbGVjdGVkTmFtZTogZnVuY3Rpb24gKHZhbCwgb2xkVmFsKVxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgc3RyaW5nID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheSA9IHRoaXMucGVvcGxlLmZpbHRlcihmdW5jdGlvbiAocGVyc29uKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwZXJzb24ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIH5uYW1lLmluZGV4T2Yoc3RyaW5nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmZpbHRlcmVkUGVvcGxlID0gZmlsdGVyZWRBcnJheTtcbiAgICAgICAgICAvLyByZXNldCBwYWdpbmF0aW9uXG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtb3VudGVkOiBmdW5jdGlvbiAoKVxuICAgICAge1xuICAgICAgICAkKCcjanFfbG9hZGVyJykuYWRkQ2xhc3MoJ2xvYWRlci0tb3BlbicpO1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBkcnVwYWxTZXR0aW5ncy5mc3ZfY29udGFjdHMuc2VhcmNoX3N0cmluZztcbiAgICAgICAgalF1ZXJ5LmdldEpTT04oYCR7ZHJ1cGFsU2V0dGluZ3MuZnN2X2NvbnRhY3RzLmVuZHBvaW50fSZzZWFyY2g9JHtuYW1lfWAsIGZ1bmN0aW9uIChqc29uKVxuICAgICAgICB7XG4gICAgICAgICAgX3RoaXMucGVvcGxlID0ganNvbi5yZXN1bHRzO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59KShqUXVlcnkpO1xuIl19

angular.module('app', [])

    .controller('MainController', function () {

        this.options = {
            key1: {
                state: false,
                label: 'value 1'
            },
            key2: {
                state: false,
                label: 'value 2'
            },
            key3: {
                state: false,
                label: 'value 3'
            },
            key4: {
                state: true,
                label: 'value 4'
            }
        };

        this.model = [];
    })

    .component('checkboxGroup', {
        restrict: 'E',
        bindings: {
            options: '<'
        },
        require: {
            ngModel: 'ngModel'
        },
        controller: function () {
            this.selectedOptions = [];

            this.$onInit = () => {
                this.ngModel.$render = () => {
                    this.selectedOptions = angular.copy(this.ngModel.$modelValue);
                    this.initSelectedOptions(this.options);
                };

            };

            this.initSelectedOptions = (options) => {
                Object.keys(options)
                    .filter(key => !!options[key].state)
                    .forEach(key => this.selectedOptions.push(this.options[key]));
                this.updateSelectedOptions();

            };

            this.onOptionUpdate = (optionKey) => {
                this.updateOption(this.options[optionKey]);
                this.updateSelectedOptions();

            };

            this.updateOption = (option) => {
                const idx = this.selectedOptions.indexOf(option);

                if (idx >= 0) {
                    this.selectedOptions.splice(idx, 1);
                } else {
                    this.selectedOptions.push(option);
                }

            };

            this.updateSelectedOptions = () => {
                this.ngModel.$setViewValue(this.selectedOptions.map(option => option.label));

            }
        },
        template: '<div class="col s12 m4 offset-m4">' +
        '<ul class="collection">' +
        '<li class="collection-item" ng-repeat="(key, value) in $ctrl.options">' +
        '<label>' +
        '<input type="checkbox" ng-model="$ctrl.options[key].state" ng-change="$ctrl.onOptionUpdate(key);"/>' +
        '<span>{{::value.label}}</span>' +
        '</label>' +
        '</li>' +
        '</ul>' +
        '</div>'
    })

    .directive('customMinLength', () => ({
        restrict: 'A',
        require: 'ngModel',
        link: ($scope, $elem, $attrs, ngModel) => {
            ngModel.$validators.customMinLength = (viewVal) => viewVal && viewVal.length >= $scope.$eval($attrs['customMinLength']);
        }
    }));

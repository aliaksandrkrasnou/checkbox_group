angular.module('app', [])

    .controller('MainController', function () {

        this.options = {
            key1: 'value 1',
            key2: 'value 2',
            key3: 'value 3',
            key4: 'value 4'
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
            this.expandedOptions = [];

            this.$onInit = () => {
                this.ngModel.$render = () => {
                    this.expandedOptions = Object.keys(this.options)
                        .map(value => {
                            return {
                                state: (this.ngModel.$modelValue.indexOf(value) !== -1),
                                value: value
                            };
                        });

                };

            };

            this.onUpdate = () => {
                this.ngModel.$setViewValue(this.expandedOptions
                    .filter(option => option.state)
                    .map(option => option.value)
                );

            };

        },
        template: '<div class="col s12 m4 offset-m4">' +
        '<ul class="collection">' +
        '<li class="collection-item" ng-repeat="option in $ctrl.expandedOptions">' +
        '<label>' +
        '<input type="checkbox" ng-model="option.state" ng-change="$ctrl.onUpdate();"/>' +
        '<span>{{::option.value}}</span>' +
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
    }))

    .directive('handleCheckboxInput', () => ({
        restrict: 'A',
        require: 'ngModel',
        link: ($scope, $elem, $attrs, ngModel) => {
            ngModel.$formatters.push(string => {
                return angular.toJson(string);
            });

            ngModel.$parsers.push(string => {
                return angular.fromJson(string);
            });

        }
    }));

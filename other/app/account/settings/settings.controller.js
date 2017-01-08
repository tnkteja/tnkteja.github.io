(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'Critic'];

    function SettingsController (Principal, Auth, Critic) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.success = null;
        vm.becomeCritic = becomeCritic;
        vm.isNormalUser = true;

        /**
         * Store the "settings account" in a separate variable, and not in the shared "account" variable.
         */
        var copyAccount = function (account) {
            var isNormalUser = true;
            $.each(account.authorities, function (i, v){
               if (v === "ROLE_CRITIC"){
                   isNormalUser = false;
               }
            });

            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login,
                isNormalUser: isNormalUser
            };
        };

        Principal.identity().then(function(account) {
            vm.settingsAccount = copyAccount(account);
            vm.isNormalUser = vm.settingsAccount.isNormalUser;
        });

        function save () {
            Auth.updateAccount(vm.settingsAccount).then(function() {
                vm.error = null;
                vm.success = 'OK';
                Principal.identity(true).then(function(account) {
                    vm.settingsAccount = copyAccount(account);
                });
            }).catch(function() {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }

        function becomeCritic(account) {
            Auth.becomeCritic(account).then(function(data) {
                vm.error = null;
                vm.success = 'OK';
            }).catch(function() {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }
    }
})();

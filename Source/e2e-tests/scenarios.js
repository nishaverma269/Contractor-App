'use strict';
describe('webApp', function () {
    it('Should redirect the ', function () {
        browser.get('/#/welcome').then(function () {
            expect(browser.getLocationAbsUrl()).toMatch("/welcome");
        });
    });
    /* describe('Contractor', function () {
         beforeEach(function () {
             browser.get('/#/contractorLogin');
         });
         it('should render contractor page when user navigates to /contractorLogin', function () {
             expect(element.all(by.css('[ng-view] p')).first().getText()).
             toMatch("/contractorLogin");
         });
     });*/
    describe('Authentication', function () {
        var loginURL;
        var email = element(by.name('email'));
        var password = element(by.name('password'));
        var loginButton = element(by.buttonText('Sign In'));
        var error = element(by.model('There is no user record corresponding to this identifier. The user may have been deleted.'));
        it('should redirect to the login page if trying to load protected page while not authenticated', function () {
            browser.get('/#/contractorAdmin');
            loginURL = browser.getCurrentUrl();
            browser.get('/#/contractorAdmin');
            expect(browser.getCurrentUrl()).toEqual(loginURL);
        });
        it('should accept a valid email address and password', function () {
            email.clear();
            password.clear();
            email.sendKeys('cameron.m.simon@wmich.edu');
            password.sendKeys('pinball1123');
            loginButton.click().then(function () {
                return browser.driver.wait(function () {
                    return browser.driver.getCurrentUrl().then(function (url) {
                        return /home/.test(url);
                    });
                }, 10000);
            });
        });
        it('should return to the welcome page after logout', function () {
            email.clear();
            password.clear();
            email.sendKeys('cameron.m.simon@wmich.edu');
            password.sendKeys('pinball1123');
            loginButton.click().then(function () {
                return browser.driver.wait(function () {
                    return browser.driver.getCurrentUrl().then(function (url) {
                        return /home/.test(url);
                    });
                }, 10000);
            });
            var logoutButton = element('.navbar a: eq(4)');
            logoutButton.click().then(function () {
                return browser.driver.wait(function () {
                    return browser.driver.getCurrentUrl().then(function (url) {
                        return /welcome/.test(url);
                    });
                }, 10000);
            });
        });
    });
});
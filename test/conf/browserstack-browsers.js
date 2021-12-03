var config = {
    'commanCapabilities': {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'build': 'mocha-browserstack',
        'name': 'async_css_test',
        'browserstack.video': 'false',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'browserstack.local': true
    },
    'multiCapabilities': [
        /*{
                    'browserName': 'Chrome',
                    'browser': 'Chrome',
                    'browser_version': '14',
                    'os': 'WINDOWS',
                    'os_version': '7'
                }, */
        {
            'browserName': 'Internet Explorer',
            'browser': 'IE',
            'browser_version': '8',
            'os': 'WINDOWS',
            'os_version': '7'
        }
        /*, {
                    'browserName': 'Firefox',
                    'browser': 'Firefox',
                    'browser_version': '4.0',
                    'os': 'WINDOWS',
                    'os_version': '7'
                }, {
                    'browserName': 'Safari',
                    'browser': 'Safari',
                    'browser_version': '5.1',
                    'os': 'OS X',
                    'os_version': 'Snow Leopard',
                }, {
                    'browserName': 'Opera',
                    'browser': 'Opera',
                    'browser_version': '12.15',
                    'os': 'WINDOWS',
                    'os_version': '7'
                }, {
                    'browserName': 'Android 4.4',
                    'device': 'Google Nexus 5',
                    'osName': 'Android',
                    'os_version': '4.4',
                    'real_mobile': 'true'
                }, {
                    'browserName': 'Edge',
                    'browser': 'Edge',
                    'browser_version': '15.0',
                    'os': 'Windows',
                    'os_version': '10',
                    'real_mobile': 'true'
                }
                /*, {
                            'browserName': 'IE',
                            'browser': 'IE',
                            'browser_version': '11.0',
                            'os': 'Windows',
                            'os_version': '10',
                            'real_mobile': 'true'
                        }*/



        /*, {
                'browserName': 'iPhone 5S',
                'device': 'iPhone 5S',
                'device_browser' => 'safari',
                'osName': 'iOS',
                'os_version': '7.0',
                'real_mobile': 'true'
            }*/
    ]

};

exports.capabilities = [];
// Code to support common capabilities
config.multiCapabilities.forEach(function(caps) {
    var temp_caps = JSON.parse(JSON.stringify(config.commanCapabilities));
    for (var i in caps) temp_caps[i] = caps[i];
    exports.capabilities.push(temp_caps);
});
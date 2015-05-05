Ext.define('Uranium.view.Settings',
   function() {
    var theme = location.href.match(/theme=([\w-]+)/),
        locale = location.href.match(/locale=([\w-]+)/);

    theme = (theme && theme[1]) || (Ext.microloaderTags.desktop ? 'uranium' : 'crisp-touch');
    locale = locale && locale[1] || 'es';

    if (!Ext.themeName && !!theme) {
        var m = theme.match(/^([\w-]+)-(?:es)$/);
        Ext.themeName = m ? m[1] : theme;
    }
    return {

        extend: 'Ext.Container',
        xtype: 'setttings',
        id: 'setttings-btn',
        margin: '0 10 0 0',
        layout: 'hbox',
        logoutText: 'Logout',
        languageEN: 'English',
        languageES: 'Spanish',
        languageFR: 'French',
        initComponent: function() {
            var me = this;

             var theme = location.href.match(/theme=([\w-]+)/),
                locale = location.href.match(/locale=([\w-]+)/);

            function setQueryParam(name, value) {
                var query = Ext.Object.fromQueryString(location.search);
                query[name] = value;
                location.search = Ext.Object.toQueryString(query);
            }

            function makeItem(value, text, paramName) {
                paramName = paramName || "theme";

                var checked = value === (paramName === "theme" ? theme : locale);
                if(paramName === "logout"){
                    return {
                        text: text,
                        handler: 'onClickButton'
                    };
                }
                return {
                    text: text,
                    group: (paramName === 'theme' ? 'themegroup' : 'localegroup'),
                    checked: checked,
                    handler: function () {
                        if (!checked) {
                            if(paramName === 'theme') {
                                setQueryParam('theme', value);
                            } else {
                                setQueryParam('locale', value);
                            }
                        }
                    }
                };
            }

            var menu = new Ext.menu.Menu({
                    items: [
                        makeItem('neptune',       'Neptune'),
                        makeItem('neptune-touch', 'Neptune Touch'),
                        makeItem('crisp',         'Crisp'),
                        makeItem('crisp-touch',   'Crisp Touch'),
                        makeItem('uranium',       'Uranium'),
                        makeItem('uranoium-touch','Uranium Touch'),
                        '-',
                        makeItem('en',            this.languageEN,    'locale'),
                        makeItem('es',            this.languageES,     'locale'),
                        makeItem('fr',            this.languageFR,     'locale'),
                        '-',
                        makeItem('exit',    this.logoutText, 'logout')
                    ]
                }, this);

            this.items = [{
                    xtype: 'component',
                    id: 'theme-switcher',
                    cls: 'uranium-theme-switcher',
                    margin: '0 5 0 0',
                    listeners: {
                        scope: this,
                        click: function (e) {
                            menu.showBy(this);
                        },
                        element: 'el'
                    }
                }];

            this.callParent();
        }
    };
});

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/">App SDK 2.0rc3 Docs</a>'},
    launch: function() {
        console.log("Hello World");
        var myStore= Ext.create('Rally.data.wsapi.Store', {
            model: 'User Story',
            autoLoad: true,
            listeners: {
                load: function(myStore, data, success) {
                    console.log("This is my Store",myStore,data);
                    var myGrid=Ext.create('Rally.ui.grid.Grid',
                    {store:myStore,
                        columnCfgs: [
                         'FormattedID',
                         'Name',
                         'Owner'
                     ]});
                     console.log("This is my Grid",myGrid);
                     this.add(myGrid);
                     console.log("What is this?",this);
                },
                scope:this
            },
            fetch: ['Name', 'ScheduleState','FormattedID','Owner']
        });
    }
});

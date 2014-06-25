        Rally.onReady(function() {
            Ext.define('CustomApp', {
                extend: 'Rally.app.App',
                componentCls: 'app',

                items: [
                    {
                        xtype: 'container',
                        itemId: 'iterationFilter'
                    },
                    {
                        xtype: 'container',
                        itemId: 'grid',
                        width: 800
                    }
                ],

                launch: function() {
                    this.down('#iterationFilter').add({
                        xtype: 'rallyiterationcombobox',
                        cls: 'filter',
                        model: 'UserStory',
                        field: 'Iteration',
                        listeners: {
                            ready: this._onIterationComboBoxLoad,
                            select: this._onIterationComboBoxSelect,
                            scope: this
                        }
                        
                    });
                    
                },

                _onIterationComboBoxLoad: function(comboBox) {
                    this.iterationComboBox = comboBox;

                    Rally.data.ModelFactory.getModel({
                        type: 'UserStory',
                        success: this._onModelRetrieved,
                        scope: this
                    });
                },                  

                _getFilter: function() {
                    var filter = [];

                    filter.push({
                        property: 'Iteration',
                        operator: '=',
                        value: this.iterationComboBox.getValue()
                    });

                    return filter;
                },


                _onIterationComboBoxSelect: function() {
                    this._onSettingsChange();
                },

                _onSettingsChange: function() {
                    this.grid.filter(this._getFilter(), true, true);
                },

                _onModelRetrieved: function(model) {
                    this.grid = this.down('#grid').add({
                        xtype: 'rallygrid',
                        model: model,
                        columnCfgs: [
                            'FormattedID',
                            'Name',
                            'Plan Estimate',
                            'Parent',
                            'Schedule State',
                            'StoryType'
                        ],
                        storeConfig: {
                            context: this.context.getDataContext(),
                            filters: this._getFilter()
                        },
                        showPagingToolbar: true,
                        enableEditing: false
                    });
                }



            });
        });
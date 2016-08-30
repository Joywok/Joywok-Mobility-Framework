/*
 * 主文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Regist.Punch', function(Punch, Jma, Backbone, Marionette, $, _) {

    Punch.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('Regist.Punch');
            var self = this;
            this.layoutView = new Jma.Punch.Views.punchLayoutView();
            this.collection = new Jma.Punch.Entities.recordCollection();
            this.model = new Jma.Punch.Entities.personModel();
            // this.list.show(self.loadingView);
            this.layoutView.on('show', function() {
                self.collection.fetch({
                    success: function(collection, resp) {
                        self.recordCollectionView = new Jma.Punch.Views.recordCollectionView({
                            collection: self.collection
                        });
                        self.layoutView.punchRecord.show(self.recordCollectionView);
                    }
                });
                self.model.fetch({
                    success: function(model, resp) {
                        self.personInfoView = new Jma.Punch.Views.personItemView({
                            model: self.model
                        });
                        self.layoutView.personInfo.show(self.personInfoView);
                    }

                })

            })
            Jma.mainRegion.show(this.layoutView);
        },
    });

    Punch.StartApp = function(options) {
        Punch.Controllers = new Punch.Controller(options);
    };

    Punch.StopApp = function(options) {
        console.log('stop');
    };

})

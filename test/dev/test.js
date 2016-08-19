var assert = chai.assert; 
suite('Juggler', function () {  
    setup(function () {  
        // ...  
    });  
  
    suite('#Notify()', function () {  
        var m = 'Test Message';
        var o = {message:m};
        Juggler.Notify(m);
        var $m = $('body > .alert');
        test('Juggler.Notify(String)', function () {  
            assert.equal($m.length, 1, '.alert not exists');
            assert.equal($m.find('[data-growl=message]').text(), m, 'message wrong');
	    });
        test('Juggler.Notify(Object)', function () {  
            assert.equal($m.length, 1, '.alert not exists');
            assert.equal($m.find('[data-growl=message]').text(), m, 'message wrong');
        });   
	     
    }); 

    suite('#Dialog', function () {  
        test('Juggler.Dialog',function(){
            assert.property(Juggler, 'Dialog', 'Juggler has a Dialog property');
        });
    }); 

    suite('#Grid',function(){
        var Territory = Backbone.Model.extend({});

        var Territories = Backbone.PageableCollection.extend({
          model: Territory,
          state: {
			pageSize: 15
		  },
		  mode: "client"
        });

        var territories = new Territories(table);

        
		
		


        test('Juggler.Grid',function(){
			var grid = new Juggler.Grid({
				columns:columns,
				collection:territories
			})
            assert.property(Juggler, 'Grid', 'Juggler has a Grid property')
            $('#grid').append(grid.render().el)
            //territories.reset(table)
        })
		
		test('Juggler.Grid.Extension.Paginator',function(){
			var paginator = new Backgrid.Extension.Paginator({
			  collection: territories
			});
			$('#grid').after(paginator.render().$el)
		})
    });
});  

var assert = chai.assert; 
suite('Array', function () {  
    setup(function () {  
        // ...  
    });  
  
    suite('#indexOf()', function () {  
        test('should return -1 when not present', function () {  
            assert.equal(-1, [1, 2, 3].indexOf(4),'aaa');  
	});  
	test('should return 1 ', function () {  
	    assert.equal(1, 1);  
	});  
    });  
});  

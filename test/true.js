
describe('true', function() {
  beforeEach(module('App'));
  beforeEach(inject(function($controller, $injector, $rootScope) {
    //console.log($rootScope);
  }));
  it('should be true', function() {
    expect(true).toEqual(true);
  });
});
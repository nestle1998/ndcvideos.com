'use strict';

describe('Filter: whitelist', function() {
    beforeEach(module('ndc'));

    describe('whitelist', function() {
        it('should return a map with only the allowed parameters', inject(function (whitelistFilter) {
            expect(whitelistFilter({ 'autoplay' : 1 , 'loop' : 'no' }, ['autoplay'])).toEqual({ 'autoplay' : 1});
            expect(whitelistFilter({ 'autoplay' : 1 }, ['autoplay','loop'])).toEqual({ 'autoplay' : 1});
            expect(whitelistFilter({ 'autoplay' : 1 , 'loop' : 'no' , 'forceQuality' : 'hq' }, ['autoplay','loop', 'forceQuality'])).toEqual({ 'autoplay' : 1 , 'loop' : 'no' , 'forceQuality' : 'hq'});
        }))
    })
})
import { assert } from 'chai';
import 'mocha';

import { Guid } from './guid';


describe('Guid', () => {

    it('should be defined', () => {
        assert.isDefined(Guid);
    });

    it('should return value', () => {
        assert.isDefined(Guid.generate());
        assert.isOk(Guid.generate());
    });

    it('should return valid value', () => {
        assert.match(Guid.generate(), /^\S{8}-\S{4}-\S{4}-\S{4}-\S{12}$/);
    });

});

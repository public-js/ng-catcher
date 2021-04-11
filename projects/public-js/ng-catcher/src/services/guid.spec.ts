import { Guid } from './guid';


describe('Guid', () => {
    it('should be defined', () => {
        expect(Guid).toBeDefined();
        expect(Guid).toBeTruthy();
    });

    it('should return value', () => {
        const guid = Guid.generate();
        expect(guid).toBeDefined();
        expect(guid).toBeTruthy();
    });

    it('should return valid value', () => {
        expect(Guid.generate()).toMatch(/^\S{8}-\S{4}-\S{4}-\S{4}-\S{12}$/);
    });
});

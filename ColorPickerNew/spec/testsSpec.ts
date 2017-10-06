import { RGBToHex, HexToRGB, validateRGBCode, validateHexCode } from '../src/components/graphicServices';

describe('Graphic services', () => {

    describe('HexToRgb', () => {
        it('compute RBG color from HEX value', () => {
            expect(HexToRGB('#ff4d4d')).toEqual({r: 255, g: 77, b: 77});
        });
        it('compute RBG color from HEX value (with empty spaces)', () => {
            expect(HexToRGB('    #ff4d4d')).toEqual({r: 255, g: 77, b: 77});
        });
    });

    describe('RGBToHex', () => {
        it('compute HEX value from RBG color', () => {
            expect(RGBToHex({r: 255, g: 77, b: 77})).toEqual('#ff4d4d');
        });
    });

    describe('validateRGBCode', () => {
        it('validate r (or g, or b) value', () => {
            expect(validateRGBCode('254')).toBeTruthy();
        });
        it('validate empty r (or g, or b) value', () => {
            expect(validateRGBCode('')).toBeFalsy();
        });
        it('validate to big r (or g, or b) value', () => {
            expect(validateRGBCode('256')).toBeFalsy();
        });
        it('validate non number r (or g, or b) value', () => {
            expect(validateRGBCode('25a5')).toBeFalsy();
        });
        it('validate r (or g, or b) value with empty spaces', () => {
            expect(validateRGBCode('  255   ')).toBeTruthy();
        });
        it('validate r (or g, or b) zero value', () => {
            expect(validateRGBCode('0')).toBeTruthy();
        });
    });

    describe('validateHexCode', () => {
        it('validate right hex code', () => {
            expect(validateHexCode('#25abcd')).toBeTruthy();
        });
        it('validate right hex code (with empty spaces)', () => {
            expect(validateHexCode('   #25abcd   ')).toBeTruthy();
        });
        it('validate wrong hex code (missing value)', () => {
            expect(validateHexCode('#25 bcd')).toBeFalsy();
        });
        it('validate wrong hex code (missing hash tag)', () => {
            expect(validateHexCode('25abcd')).toBeFalsy();
        });
        it('validate wrong hex code (too long)', () => {
            expect(validateHexCode('#25abcdaa')).toBeFalsy();
        });
        it('validate wrong hex code (use of wrong letter)', () => {
            expect(validateHexCode('#25agcd')).toBeFalsy();
        });
    });
});

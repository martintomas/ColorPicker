const regExpHex = new RegExp('^#[a-f0-9]{6}$', 'i');

export declare type rgb = {
    r: number;
    g: number;
    b: number;
};

export function HexToRGB(hex:string): rgb {
    //console.log('Computing RGB value');

    hex = hex.trim();

    let res = {r: 0, g: 0, b: 0};
    res.r = parseInt(hex.substring(1, 3), 16);
    res.g = parseInt(hex.substring(3, 5), 16);
    res.b = parseInt(hex.substring(5, 7), 16);

    return res;
}

export function RGBToHex(rgb: rgb): string {
    //console.log('Computing HEX value')

    let res: string = '#';
    res += computeHexFromRGB(rgb.r);
    res += computeHexFromRGB(rgb.g);
    res += computeHexFromRGB(rgb.b);

    return res;
}

function computeHexFromRGB(value: number): string {
    let val: string = value.toString(16);
    return val.length > 1 ? val : '0' + val;
}

export function validateHexCode(value: string): boolean {
    //console.log('Validation of hex code');

    value = value.trim();
    return regExpHex.test(value);
}

export function validateRGBCode(value: string): boolean {

    if (!Number(value) && value !== '0') return false;

    let n: number = parseInt(value, 10);
    if (isNaN(n)) return false;
    if (n < 0 || n > 255) return false;

    return true;
}
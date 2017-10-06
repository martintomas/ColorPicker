import { observable } from 'bobx';

import {ColorTypes} from './index';

const allowedHexChars: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];

class ColorsPickerStore {
    @observable private _selectedColor: string = '#FFFFFF';

    get Blue() {
        return HexToRGB(this._selectedColor)[ColorTypes.BLUE];
    }

    get Red() {
        return HexToRGB(this._selectedColor)[ColorTypes.RED];
    }

    get Green() {
        return HexToRGB(this._selectedColor)[ColorTypes.GREEN];
    }

    get SelectedColor() {
        return this._selectedColor;
    }

    getRGBColor(colorPosition: ColorTypes) {
        return HexToRGB(this._selectedColor)[colorPosition]
    }

    setRBGColor(colorPosition: ColorTypes, newValue: number) {
        let tempRGB = HexToRGB(this._selectedColor)
        tempRGB[colorPosition] = newValue;
        this._selectedColor = RGBToHex(tempRGB);
    }

    setRBGColors(newValues: ColorTypes[]) {
        this.setRBGColor(ColorTypes.RED,newValues[ColorTypes.RED]);
        this.setRBGColor(ColorTypes.GREEN,newValues[ColorTypes.GREEN]);
        this.setRBGColor(ColorTypes.BLUE,newValues[ColorTypes.BLUE]);
    }

    setHexColor(newValue: string) {
        this._selectedColor = newValue;
    }
}

export const colorsPickerStore = new ColorsPickerStore();

function HexToRGB(hex:string):ColorTypes[] {
    //console.log('Computing RGB value');

    let res = [0, 0, 0];
    res[0] = parseInt(hex.substring(1, 3), 16);
    res[1] = parseInt(hex.substring(3, 5), 16);
    res[2] = parseInt(hex.substring(5, 7), 16);
    // res[0] = computeIntValueFromHex(hex[1]) * 16 + (computeIntValueFromHex(hex[2]));
    // res[1] = computeIntValueFromHex(hex[3]) * 16 + (computeIntValueFromHex(hex[4]));
    // res[2] = computeIntValueFromHex(hex[5]) * 16 + (computeIntValueFromHex(hex[6]));

    return res;
}

/* OBSOLETE --> manual computing od dec value
function computeIntValueFromHex(value: string): number {
    return isNaN(parseInt(value)) ? allowedHexChars.indexOf(value.toLowerCase()) + 10 : parseInt(value);
}
 */

function RGBToHex(rgb: ColorTypes[]): string {
    //console.log('Computing HEX value')

    let res: string = '#';

    res += computeHexFromRGB(rgb[0]);
    res += computeHexFromRGB(rgb[1]);
    res += computeHexFromRGB(rgb[2]);

    return res;
}

function computeHexFromRGB(value: number): string {
    let val: string = value.toString(16);
    return val.length > 1 ? val : '0' + val;
}

/* OBSOLETE --> manual computing of hex value
function computeHexFromRGB(value: number): string {
   let f: string =  value % 16 >= 10 ? allowedHexChars[value % 16 - 10] : (value % 16).toString();
   value = parseInt('' + value/16);
   let k: string = value % 16 >= 10 ? allowedHexChars[value % 16 - 10] : (value % 16).toString();
   return k + f;
} 
*/

export function validateHexCode(value: string): boolean {
    //console.log('Validation of hex code');
    value = value.trim();

    if (!value.startsWith('#')) return false;
    if (value.length !== 7) return false;

    for(let i: number = 1; i < value.length; i++) {
        if (isNaN(parseInt(value[i])) && allowedHexChars.indexOf(value[i].toLowerCase()) === -1) return false;
    }

    return true;
}

export function validateRGBCode(value: string): boolean {
    let n: number = parseInt(value);

    if(!Number(value) && value !== '0')
    if(isNaN(n)) return false;
    if(n < 0 || n > 255) return false;

    return true;
}
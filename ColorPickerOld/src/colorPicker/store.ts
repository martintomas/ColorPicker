import { observable } from 'bobx';

export enum ColorTypes {
    RED,
    GREEN,
    BLUE
}

class ColorsPickerStore {
    @observable private _colors: number[] = [0, 0, 0]; // positions corresponds with  ColorTypes enum positions

    get Blue() {
        return this._colors[ColorTypes.BLUE];
    }

    getColor(colorPosition: ColorTypes) {
        return this._colors[colorPosition]
    }

    setColor(colorPosition: ColorTypes, newValue: number) {
        this._colors[colorPosition] = newValue;
    }
}

export const colorsPickerStore = new ColorsPickerStore();
import * as b from 'bobril';
import * as ColorPickerOLD from './colorPickerOLD/index';
import * as ColorPicker from './colorPicker/index';

let colorsHex = [
    '#FF0000',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF'
]

b.init(() => {
    return [
        //ColorPickerOLD.create(),
        ColorPicker.create({
            predefinedColors: colorsHex,
            selectColorAction: (color: string): void => {alert('You have selected color: ' + color)}
        })
    ]
})
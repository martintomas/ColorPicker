import * as b from 'bobril';
import { colorsPickerStore } from './store';
import * as PredefinedColorsField from './predefinedColorsField';
import * as ColorPickerHexTextBox from './colorPickerHexTextBox';
import * as RgbPicker from './rgbPicker';
import * as ColorPickerButton from './colorPickerButton';

const mainWrapperStyle = { height: '200px', width: '240px', position: 'relative' };
const leftBlockStyle = { cssFloat: 'left' };
const rightBlockStyle = { cssFloat: 'right' };
const selectedColorStyle = { height: '100px', width: '100px', border: 'solid black 1px' }
const hexTextboxStyle = { marginTop: '5px', paddingTop: '5px' };

export enum ColorTypes {
    RED,
    GREEN,
    BLUE
}

export interface IColorPicker {
    predefinedColors?: string[],
    selectColorAction?: (color: string) => void;
}

interface IContextColor extends b.IBobrilCtx {
    data: IColorPicker;
}

export const create = b.createComponent<IColorPicker>({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.tag = 'div';

        me.children = [
            b.styledDiv([
                ctx.data.predefinedColors.map(color => PredefinedColorsField.create({
                    colorCode: color
                }))
            ]),
            b.styledDiv([
                b.styledDiv(null, selectedColorStyle, { backgroundColor: colorsPickerStore.SelectedColor }),
                b.style({
                    tag: 'div',
                    children: ColorPickerHexTextBox.create()
                }, hexTextboxStyle)
            ], leftBlockStyle),
            b.styledDiv([
                RgbPicker.create({ colorLabel: 'R', colorType: ColorTypes.RED }),
                RgbPicker.create({ colorLabel: 'G', colorType: ColorTypes.GREEN }),
                RgbPicker.create({ colorLabel: 'B', colorType: ColorTypes.BLUE }),
                ColorPickerButton.create({ callbackAction: ctx.data.selectColorAction })
            ], rightBlockStyle)
        ]
        me.style = mainWrapperStyle;
    }
})
import * as b from 'bobril';
import * as m from 'bobril-m';

import { PredefinedColor } from './components/predefinedColor';
import { rgb, RGBToHex, HexToRGB, validateRGBCode, validateHexCode } from './components/graphicServices';

const defaultColor = { r: 50, g: 50, b: 50 };
const defaultWidth = 300;
const marginStyle = b.styleDef({ margin: '0px 1% 0px 1%' });

export interface IColorPicker {
    predefinedColors?: string[];
    color?: string;
    onSelectColor: (string) => void;
    onClose: () => void;
    width?: number;
}

interface IColorPickerContext extends b.IBobrilCtx {
    data: IColorPicker;
    activeColor: rgb;
    colorHexTemp: string;
    useTempColorHex: boolean;
    width: number;
}

function getRGBString(rgb: rgb): string {
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

function getPredefinedColors(ctx: IColorPickerContext): b.IBobrilNode {
    return b.styledDiv(ctx.data.predefinedColors.map(color =>
        PredefinedColor({
            color: color,
            onSelectColor: (color: string) => {
                ctx.activeColor = HexToRGB(color);
                b.invalidate(ctx);
            }
        })), { padding: 5 });
}

function getColorPreview(ctx: IColorPickerContext): b.IBobrilNode {
    return b.styledDiv(
        b.styledDiv(undefined, {
            width: '100%',
            minHeight: 50,
            backgroundColor: getRGBString(ctx.activeColor),
            border: 'solid 1px black'
        }, marginStyle), { width: '96%' });
}

function getColorValues(ctx: IColorPickerContext): b.IBobrilNode {
    return b.styledDiv([
        getHexTextBox(ctx, '23%'),
        getRGBTextBox(ctx, 'Red:', 'r', '23%'),
        getRGBTextBox(ctx, 'Green:', 'g', '23%'),
        getRGBTextBox(ctx, 'Blue:', 'b', '23%')
    ], { display: 'flex', flexFlow: 'row', justifyContent: 'center', width: '95%', margin: '0px auto 0px auto' });
}

function getRGBTextBox(ctx: IColorPickerContext, label: string, colorCode: string, width: string): b.IBobrilNode {
    return b.styledDiv([
        m.TextField({
            labelText: label,
            value: ctx.activeColor[colorCode].toString(),
            onChange: (value: string) => {
                value = value === '' ? '0' : value;
                if (validateRGBCode(value)) {
                    ctx.activeColor[colorCode] = parseInt(value, 10);
                    b.invalidate(ctx);
                }
            }
        })
    ], marginStyle, { width: width });
}

function getHexTextBox(ctx: IColorPickerContext, width: string): b.IBobrilNode {
    // actualize temp color based on new color --> only in case that change was not triggered by this node
    if (!ctx.useTempColorHex) ctx.colorHexTemp = RGBToHex(ctx.activeColor);
    ctx.useTempColorHex = false; // reset

    return b.styledDiv([
        m.TextField({
            errorText: validateHexCode(ctx.colorHexTemp) ? undefined : '',
            labelText: 'Hex:',
            value: ctx.colorHexTemp,
            onChange: (value: string) => {
                if (validateHexCode(value)) {
                    ctx.activeColor = HexToRGB(value);
                }
                ctx.colorHexTemp = value;
                ctx.useTempColorHex = true; // remmember to show temporal value
                b.invalidate(ctx);
            }
        })
    ], marginStyle, { width: width });
}

function getColorButton(ctx: IColorPickerContext): b.IBobrilNode {
    return b.styledDiv([
        b.styledDiv(m.Button({
            children: 'Select',
            action: () => { ctx.data.onSelectColor(RGBToHex(ctx.activeColor)); },
            type: m.ButtonType.Raised
        }), marginStyle, { display: 'inline-block' }),
        b.styledDiv(m.Button({
            children: 'Close',
            action: ctx.data.onClose,
            type: m.ButtonType.Raised
        }), marginStyle, { display: 'inline-block' })
    ], { textAlign: 'center' });
}

export const ColorPicker = b.createComponent<IColorPicker>({
    init(ctx: IColorPickerContext) {
        ctx.activeColor = ctx.data.color ? HexToRGB(ctx.data.color) : defaultColor;

        ctx.colorHexTemp = ctx.data.color ? ctx.data.color : RGBToHex(defaultColor);
        ctx.useTempColorHex = false;
        ctx.width = ctx.data.width ? ctx.data.width : defaultWidth;
    },
    render(ctx: IColorPickerContext, me: b.IBobrilNode) {
        me.style = {padding: 5};
        me.children = m.Paper({
            zDepth: 1, 
            style: { display: 'flex', flexFlow: 'column', minHeight: 5, minWidth: 300, width: ctx.width }},
            [
                getPredefinedColors(ctx),
                getColorPreview(ctx),
                getColorValues(ctx),
                getColorButton(ctx),
            ]);
    }
});
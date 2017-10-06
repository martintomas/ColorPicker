import * as b from 'bobril';
import { colorsPickerStore, validateRGBCode } from './store';
import {ColorTypes} from './index';

const mainWrapperStyle = {marginTop: '5px'};
const labelStyle = {fontSize: '15px', fontWeight: 'bold'};
const rgbTextBoxStyle = {width: '100px', height: '15px', textAlign: 'right'}
const rgbTextBoxStyleWrong = {...rgbTextBoxStyle, color: 'red'};

export interface IRGBPicker {
    colorLabel: string;
    colorType: ColorTypes;
}

export interface IRGBTextbox {
    colorType: ColorTypes;
}

interface IRGBPickerContext extends b.IBobrilCtx {
    data: IRGBPicker;
}

interface IContextTextbox extends b.IBobrilCtx {
    data: IRGBTextbox;
    wrongTextBox: boolean;
    temporalValue: string;
    isOnChanged: boolean;
}

const rgbTextbox = b.createComponent<IRGBTextbox>({
    init(ctx: IContextTextbox) {
        ctx.wrongTextBox = false;
        ctx.isOnChanged  = false;
    },
    render(ctx: IContextTextbox, me: b.IBobrilNode) {
        if(!ctx.isOnChanged) ctx.temporalValue =  colorsPickerStore.getRGBColor(ctx.data.colorType).toString();

        me.tag = 'input';
        me.attrs = {
            value: ctx.temporalValue
        };

        if(ctx.wrongTextBox)  b.style(me, rgbTextBoxStyleWrong);
        else b.style(me, rgbTextBoxStyle);

        ctx.wrongTextBox = false;
        ctx.isOnChanged  = false;
    },
    onChange(ctx: IContextTextbox, param: string) {
        //console.log('changing rgb value');

        if (validateRGBCode(param)) {
            colorsPickerStore.setRBGColor(ctx.data.colorType,parseInt(param));
            ctx.wrongTextBox = false;
        } else {
            ctx.wrongTextBox = true;
        }

        ctx.temporalValue = param;
        ctx.isOnChanged  = true;

        b.invalidate(ctx);
    }
});

export const create = b.createComponent<IRGBPicker>({
    render(ctx: IRGBPickerContext, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = [
            b.style({tag: 'span', children: ctx.data.colorLabel + ': '}, labelStyle),
            rgbTextbox({colorType: ctx.data.colorType})
        ];
        me.style = mainWrapperStyle;
    },
});
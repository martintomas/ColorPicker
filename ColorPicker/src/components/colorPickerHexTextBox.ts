import * as b from 'bobril';
import { colorsPickerStore, validateHexCode } from './store';

const hexTextboxStyle = {width: '100px', height: '15px', textAlign: 'right'};
const hexTextboxStyleWrong = { ...hexTextboxStyle, color: 'red'};

interface IHexButtonContex extends  b.IBobrilCtx {
    wrongValue: boolean;
    temporalValue: string;
    isOnChanged: boolean;
}

export const create = b.createComponent<never>({
    init(ctx: IHexButtonContex) {
        ctx.wrongValue = false;
        ctx.isOnChanged = false;
        ctx.temporalValue = colorsPickerStore.SelectedColor;
    },
    render(ctx: IHexButtonContex, me: b.IBobrilNode) {
        //console.log('Updating HEX textbox');

        if (!ctx.isOnChanged) ctx.temporalValue = colorsPickerStore.SelectedColor; // if bobx hit invalidate --> actualize temporal value
        
        me.tag = 'input';
        me.attrs = {
            align: 'right',
            value: ctx.temporalValue
        }

        // decide what type of style use
        if(ctx.wrongValue)  b.style(me, hexTextboxStyleWrong);
        else b.style(me, hexTextboxStyle);

        // reset internal render params
        ctx.isOnChanged = false;
        ctx.wrongValue = false;
    },
    onChange(ctx: IHexButtonContex, param: string) {
        if (validateHexCode(param)) {
            colorsPickerStore.setHexColor(param);
            ctx.wrongValue = false;
        } else {
            ctx.wrongValue = true;
        }
        ctx.temporalValue = param; // actialize temporal value
        ctx.isOnChanged = true;   // keep in mind who hit invalidate

        b.invalidate(ctx);
    }
});
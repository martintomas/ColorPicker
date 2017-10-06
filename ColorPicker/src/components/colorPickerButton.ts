import * as b from 'bobril';

import {colorsPickerStore} from './store';

const buttonStyle = {width: '120px', height: '50px', marginTop: '5px', fontSize: '15px', cssFloat: 'right' };

export interface IColorPickerButton {
    callbackAction: (color: string) => void;
}

interface IColorPickerContexButton extends b.IBobrilCtx {
    data: IColorPickerButton;
}

export const create = b.createComponent<IColorPickerButton>({
    render(ctx: IColorPickerContexButton, me: b.IBobrilNode) {
        me.tag = 'button';
        me.children = 'Select color';
        me.style = buttonStyle;
    },
    onClick(ctx: IColorPickerContexButton): boolean {

        ctx.data.callbackAction(colorsPickerStore.SelectedColor);

        return true;
    }
});
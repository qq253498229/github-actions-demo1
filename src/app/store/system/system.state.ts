import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { ChangeTestNumber } from './system.action';

export interface SystemStateModel {
  testNumber: number;
}

@State<SystemStateModel>({
  name: 'system',
  defaults: {
    testNumber: 0,
  },
})
@Injectable({
  providedIn: 'root',
})
export class SystemState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({testNumber: 0});
  }

  @Action(ChangeTestNumber)
  ChangeTestNumber(ctx: StateContext<SystemStateModel>) {
    let testNumber = ctx.getState().testNumber + 1;
    ctx.patchState({testNumber});
  }

}

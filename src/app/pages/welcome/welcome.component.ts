import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { Store } from '@ngxs/store';
import { SystemSelector } from '../../store/system/system.selector';
import { ChangeTestNumber } from '../../store/system/system.action';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [CommonModule, SharedModule, NzDividerComponent],
})
export class WelcomeComponent {
  store = inject(Store);
  testNumber = this.store.selectSignal(SystemSelector.testNumber());

  changeTestNumber() {
    this.store.dispatch(new ChangeTestNumber());
  }
}

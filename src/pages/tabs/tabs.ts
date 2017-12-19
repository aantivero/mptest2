import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import {CobrarRoot, PagarRoot, VincularRoot} from '../pages';
import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  pagarRoot: any = PagarRoot;
  cobrarRoot: any = CobrarRoot;
  vincularRoot: any = VincularRoot;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  pagarTitle = " ";
  cobrarTitle = " ";
  vincularTitle = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'PAGAR_TITLE', 'COBRAR_TITLE', 'VINCULAR_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.pagarTitle = values['PAGAR_TITLE'];
      this.cobrarTitle = values['COBRAR_TITLE'];
      this.vincularTitle = values['VINCULAR_TITLE'];
    });
  }
}

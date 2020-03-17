import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() name: string;
  @Input() imageUrl: string;
  @Input() telephone: string;
  @Input() skill: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onBtnClick() {
    alert(`Call ${this.name} on ${this.telephone}?`);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

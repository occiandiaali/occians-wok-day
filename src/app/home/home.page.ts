import { Component } from "@angular/core";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import { Geolocation } from "@capacitor/core";

import { ModalController } from "@ionic/angular";
import { ModalPage } from "../pages/modal/modal.page";

//import * as data from './../intel/dummy.json';

import "../../assets/icon/marker-icon-2x.png";

// import workers from '../../assets/workerLocs.json';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  map: Map;

  latitude: any;
  longitude: any;
  category: string;
  workerList = []; // assignment op instead of colon to avoid "property does not exist on type never error"

  constructor(public modalController: ModalController) {}
  ionViewDidEnter() {
    this.getLocation();
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(`From getLocation: ${this.latitude} | ${this.longitude}`);

    this.leafletMap();
  } // get location

  async presentModal(name, imageUrl, telephone, skill) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        name,
        imageUrl,
        telephone,
        skill
      }
    });
    return await modal.present();
  }

  leafletMap() {
    this.map = new Map("mapId").setView([this.latitude, this.longitude], 14);
    tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // tslint:disable-next-line:max-line-length
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    ).addTo(this.map);
    marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup("You are here")
      .openPopup()
    
    console.log(
      `From leafletMap(2) -> Latitude: ${this.latitude} | Longitude: ${this.longitude}`
    );
  } // leaflet map

  showSelected() {
    console.log(`Selected: ${this.category}`);
    fetch("../../assets/dummy.json")
      .then(res => res.json())
      .then(json => {
        this.workerList = json.werkers;
        //console.log(`WorkerList is: ${typeof this.workerList}`);
        if (marker !== null) {
          this.map.eachLayer(marker => {
            this.map.removeLayer(marker);
            // add attribution AGAIN? to show map???
            tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              // tslint:disable-next-line:max-line-length
              {
                attribution:
                  'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
              }
            ).addTo(this.map);
          });
          
        } // causes map not to show without attribution 
        for (const werk of this.workerList) {
          if (this.category === werk.skill) {
            // display only matched workers
            marker([werk.latitude, werk.longitude])
              .addTo(this.map)
              .bindPopup(
                `<img src="${werk.imageUrl}"/><br /><b>${werk.name}</b><br />${werk.skill}<br />Rating:${werk.rating}`
              )
              .openPopup()
              .on("click", () => {
                this.presentModal(
                  werk.name,
                  werk.imageUrl,
                  werk.telephone,
                  werk.skill
                );
              }); // open popup
              
          } // if block
          
        } // for loop
      });
  } // method show selected

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

} // class

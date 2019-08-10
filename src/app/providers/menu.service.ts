import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Menu {
  title: '';
  url: '';
  admin?: '';
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  adminMenus: Menu[];

  constructor(private db: AngularFirestore) { }

  getMenuAdmin() {
    return this.db.collection('menus', ref => ref.where('admin', '==', true)).valueChanges();
   }

  addMenu(menu: Menu) {
    this.db.collection('menus').add(menu);
  }

  deleteMenu(menuId) {
    this.db.doc('menus/' + menuId).delete();
  }

  updateMenu(menuId, menu: Menu) {
    this.db.doc('menus/' + menuId).update(menu);
  }
}

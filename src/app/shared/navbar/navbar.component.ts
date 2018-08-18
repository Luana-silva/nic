import {Component, Input, OnInit} from '@angular/core';
import {StorageUtils} from "../../utils/storage-utils";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import {NavBarDataService} from "./navbar-dataservice";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [
      StorageUtils
    ]
})
export class NavbarComponent implements OnInit{

  constructor(private storage: StorageUtils, private dataService: NavBarDataService) { }

  pageTitle: string;

  ngOnInit(){
    this.dataService.currentPageTitle.subscribe(pageTitle => this.pageTitle = pageTitle)
  }

  logout(){
    this.storage.storeToken(null)
    this.storage.idEvent(null)
    this.storage.idUser(null)
    window.location.href = "pages/login";
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {BillingService} from '../billing/billing-service';
import {BookingEvent} from '../billing/billing';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {isBoolean} from 'util';
import swal from 'sweetalert2';
import {DateFormatPipe} from '../../../pipes/billing-date-format/date-format.pipe';
import {StorageUtils} from '../../../utils/storage-utils';


declare var require: any;

//const data: any = require('app/shared/data/event.json');

@Component({
  selector: 'app-list-billing-page',
  templateUrl: './list-billing-page.component.html',
  styleUrls: ['./list-billing-page.component.scss'],
  providers: [
    BillingService,
    DateFormatPipe,
    StorageUtils
  ]
})
export class ListBillingPageComponent implements OnInit {

  scrollBarHorizontal = (window.innerWidth < 1200);

  billing: BookingEvent;

  rows = [];

  temp = [];

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  url: string[];
  urlApprove: boolean;

  // DataTable Content Titles
  columns = [
    {prop: 'nome', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'Billing', name: 'Billing'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private billingService: BillingService,
              private navBarDataService: NavBarDataService,
              private storageUtils: StorageUtils) {

    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 1200);
    };

    /*
    if (this.storageUtils.getRoleId() === 'event' || this.storageUtils.getRoleId() === 'null') {
      window.location.href = 'pages/login';
    } */

    //this.billing = new BookingEvent(); 

    this.url = window.location.pathname.split('/');

    if (this.url[3] === 'listConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit() {

    this.billingService.listAll((result, list) => {
      if (list != null) {
        this.rows = list;
        this.temp = [...list];
      }
    });

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Relatório de Vendas')
    } else {
      this.navBarDataService.changePageTitle('Requisição de Cadastro')
    }

  }

  view(row: any) {
    if (this.urlApprove) {
      this.router.navigate(['viewConfirm', row.id], {relativeTo: this.route.parent});
    } else {
      this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
    }

  }

  viewConfirm(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (data) {

      let creationDate = new DateFormatPipe('en-US').transform(data.creationDate);
      //return d.fantasyName.toLowerCase().indexOf(val) !== -1 || !val;
      return (data.data.toLowerCase().indexOf(val) !== -1) || (creationDate.toString().includes(val) || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

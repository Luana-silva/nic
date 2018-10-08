import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookingEvent} from '../billing/billing';
import {ActivatedRoute, Router} from '@angular/router';
import {BillingService} from '../billing/billing-service';
import {User} from '../../msk-user/user/user';
import {UserService} from '../../msk-user/user/user-service';
import {StorageUtils} from '../../../utils/storage-utils';
import {DateFormatPipe} from '../../../pipes/billing-date-format/date-format.pipe';

declare var require: any;

@Component({
  selector: 'app-register-billing-page',
  templateUrl: './view-billing-page.component.html',
  styleUrls: ['./view-billing-page.component.scss'],
  providers: [
    BillingService,
    DateFormatPipe,
    UserService,
    StorageUtils
  ]
})
export class ViewBillingPageComponent implements OnInit {

  scrollBarHorizontal = (window.innerWidth < 1200);

  billing: BookingEvent

  _billing: any = {}

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

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService,
              private billingService: BillingService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() == 'event' || this.storageUtils.getRoleId() == 'null') {
      window.location.href = 'pages/login';
    }

    this.billing = new BookingEvent();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.billing.id = params['id'];
    });

    /*this.billingService.listAll((result, list) => {
      if (list != null) {
        console.log(list[2].listBookings)
        this.rows = list[2].listBookings;
        this.temp = [...list[2].listBookings];
      }
    }); */

    if (this.billing.id != null) {
      this.billingService.load(this.billing.id, (result, billing) => {
        if (billing != null) {
          this.billing = billing;
          this._billing = billing;

          this.rows = billing.listBookings;
          this.temp = [...billing.listBookings];
        }
        this.loadData();
      });
    } else {
      this.loadData()
    }
  }

  loadData() {

    if (this.billing.id == null) {
      this.billing = new BookingEvent();
    }
    this.navBarDataService.changePageTitle('Venda ' + this._billing.event.name)

  }

}

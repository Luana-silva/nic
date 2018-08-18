import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Reports} from '../reports/reports';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportsService} from '../reports/reports-service';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {CompanyService} from '../../msk-company/company/company-service';
import {Company} from '../../msk-company/company/company';

import swal from 'sweetalert2';
import {StorageUtils} from '../../../utils/storage-utils';
import { defaultLongDateFormat } from '../../../../../node_modules/ngx-bootstrap/chronos/locale/locale.class';


declare var require: any;

const quanty = 1;
const token = localStorage.getItem('token');
let companyId: string;
let checkId;
var nameFile;

@Component({
  selector: 'app-register-reports-page',
  templateUrl: './register-reports-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./register-reports-page.component.scss'],
  providers: [
    CompanyService,
    ReportsService,
  ]
})
export class RegisterReportsPageComponent implements OnInit {

  status = true;
  newEdit: string;
  reports: Reports;
  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  rowOptions: Company [];

  rows = [];
  public checkUpload: boolean;
  //nameFile: string;
  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private reportsService: ReportsService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() == "event" || this.storageUtils.getRoleId() == "null" ) {
      window.location.href = "pages/login";
    }

    this.reports = new Reports();

    this.route.params.subscribe(params => {
      this.reports.id = params['id'];
    });
  }

  ngOnInit() {

    this.uploader = new FileUploader({
      url: 'http://192.168.123.10:8080/NICLandPagesWs/rs/report/uploadFile',
      isHTML5: true,
      headers: [{name: 'authorization', value: `Bearer ${token}`}],
      queueLimit: quanty,
      itemAlias: 'file',
      additionalParameter: {
        idCompany: companyId, name: nameFile ? nameFile : this.getNameDate()
      }
    });

    this.uploader.onAfterAddingFile = (item: any) => {
      item.withCredentials = false;
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
      nameFile = item._file.name;
        companyId = this.reports.idCompany;
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      nameFile = fileItem._file.name;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.showMessages()
    };

    if (this.reports.id != null) {
      this.reportsService.load(this.reports.id, (result, reports) => {
        if (reports != null) {
          this.reports = reports;
        }
        this.loadData();
      });
    } else {

      this.reports = new Reports();

      this.checkUpload = true;

      this.loadData();

    }
    this.navBarDataService.changePageTitle('Relatórios');
    this.checkUpload = false;

    this.companyService.listAll((result, list) => {
      this.rowOptions = list;
      if (list != null) {
        this.rowOptions = list;
        // this.temp = [...list];
      }
    });
    if (checkId == null || checkId == "null") {
      this.reports.idCompany = companyId;
      this.checkUpload = true;
    }

  }

  getNameDate() {
    return `
      File - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}
      -${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}h
    `
  }

  showMessages() {
    // swal("Atenção", "Tem certeza que deseja remover a empresa.", "warning");
    swal({
      title: 'Atenção',
      text: 'Seu relatório foi enviado com sucesso',
      type: 'success',
      showCancelButton: false,
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['list'], {relativeTo: this.route.parent})
      }
    })
  }

  loadData() {

    if (this.reports.id == null) {
      this.reports = new Reports();
      this.newEdit = 'Nova';
    } else {
      this.newEdit = 'Editar - ' + this.reports.name;
    }
    this.navBarDataService.changePageTitle('Relatórios');

    this.form = new FormGroup({
      idCompany: new FormControl(this.reports.idCompany, [Validators.required]),
    }, {updateOn: 'change'});
    companyId = this.storageUtils.getIdCompany();
    checkId = this.storageUtils.getIdEvent();
    if (checkId == null || checkId == "null") {
      (<HTMLInputElement> document.getElementById("txtselectCompany")).disabled = true;
    }
  }



  save() {
    console.log(this.reports);

    /*
    if (this.form.valid) {
      console.log('ola');
      this.reportsService.newUser(this.reports, (result) => {
        if (result.success) {

          this.router.navigate(['list'], {relativeTo: this.route.parent});
        } else {
          console.log(result.desc);
          console.log('Error');
        }
      });
    } */
  }

  teste() {
    console.log(document.getElementById("temQuePerderOBlur"));
  }

  selectCompany() {
    companyId = this.reports.idCompany;
    this.checkUpload = true;
  }

}

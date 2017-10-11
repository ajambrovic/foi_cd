import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SampleTypeService } from '../service/sample-type.service';
import { MenuItem, Message, ConfirmationService, SelectItem, PanelModule } from 'primeng/primeng';
import { SampleTypeChangeComponent } from './sample-type-change.component';
import { SampleType } from '../domain/sampletype';
import { APP_CONFIG } from 'app/app.config';
import { IAppConfig } from 'app/iapp.config';

@Component({
  selector: 'app-zupit-test',
  templateUrl: './zupit-test.component.html',
  providers: [ConfirmationService]
})
export class ZupitTestComponent implements OnInit {
  sampleTypeList: SampleType[];
  selectedSampleType: SampleType;
  msgs: Message[] = [];
  title: string;
  showFilter: boolean;
  columnData: Object[];
  columnActions: Object[];
  checkboxColumn: Object = { field: 'selections', selectionMode: 'multiple', type: 'checkbox', styleClass: 'checkboxColumn' };


  @ViewChild(SampleTypeChangeComponent)
  private sampleTypeChangeComponent: SampleTypeChangeComponent;

  constructor(private sampleTypeService: SampleTypeService, private confirmationService: ConfirmationService,
    @Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    this.getSampleTypes();
  }

  getSampleTypes() {
    this.sampleTypeService.getSampleTypes().subscribe(
      (data: any) => {
        this.sampleTypeList = data.items;
        this.columnData = data.columnData;
        this.columnActions = data.columnActions;
        this.title = data.title;
        this.showFilter = data.showFilter;
      },
      err => this.showError(err)
    );
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni??',
      header: 'Potvrda',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.sampleTypeService.deleteSampleType(this.selectedSampleType).subscribe(
          data => {
            this.sampleTypeList.splice(this.sampleTypeList.indexOf(this.selectedSampleType), 1);
            this.showMsg('Uspješno ste obrisali to što ste već brisali!');
          },
          err => this.showError(err)
        );
      }
    });
  }

  editSampleType(id: number) {
    this.openSampleType(id);
  }

  openSampleType(id: number) {
    if (id) {
      this.sampleTypeService.getSampleType(id).subscribe(
        (data: SampleType) => {
          this.sampleTypeChangeComponent.sampleType = data;
          this.sampleTypeChangeComponent.open(false);
        },
        err => this.showError(err)
      );
    } else {
      this.sampleTypeChangeComponent.sampleType = new SampleType();
      this.sampleTypeChangeComponent.open(true);
    }
  }

  onSampleTypeChanged($event) {
    if ($event.isNew) {
      this.sampleTypeList.unshift($event.object);
    } else {
      // this.sampleTypeList.splice(this.sampleTypeList.indexOf(this.selectedSampleType), 1, $event.object);
    }
    this.msgs = [];
    this.msgs.push($event.msg);
  }

  toggleMultiSelect() {
    if (this.columnData.indexOf(this.checkboxColumn) > -1) {
      this.columnData.splice(this.columnData.indexOf(this.checkboxColumn), 1);
    } else {
      this.columnData.unshift(this.checkboxColumn);
    }
  }

  showMsg(msg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Poruka', detail: msg });
  }

  showError(msg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Greška', detail: msg });
  }


}

import { Component, OnInit, Input, Output, OnChanges, EventEmitter, Inject } from '@angular/core';
import { SampleType } from '../domain/sampletype';
import { SampleTypeService } from '../service/sample-type.service';
import { IAppConfig } from 'app/iapp.config';
import { APP_CONFIG } from 'app/app.config';

@Component({
  selector: 'app-sample-type-change',
  templateUrl: './sample-type-change.component.html'
})
export class SampleTypeChangeComponent implements OnInit {

  @Input() sampleType: SampleType;
  @Output() onChanged = new EventEmitter();
  isVisible: boolean;
  header: string;
  isNew: boolean;
  data: any = [];
  maxDate: Date = new Date();

  selectedPodrucje: number;
  selectedPosao: number;
  selectedDate: Date;
  selectedOldZUP: Boolean;
  selectedByArticle: number;
  selectedByArticleType: number;
  selectedPartyIdentification: string[] = [];
  selectedPartyRepresentation: string[] = [];
  selectedPartyExplaining: string[] = [];
  selectedPartyExplainingReason: string[] = [];

  constructor(private sampleTypeService: SampleTypeService, @Inject(APP_CONFIG) private config: IAppConfig) {

  }


  ngOnInit() {
    this.data.podrucja = [];
    this.data.podrucja.push({ label: 'Odaberite upravno područje', value: null });
    this.data.podrucja.push({ label: 'Financije', value: 1 });
    this.data.podrucja.push({ label: 'Gospodarstvo', value: 2 });
    this.data.poslovi = [];
    this.data.poslovi.push({ label: 'Odaberite upravni posao', value: null });
    this.data.poslovi.push({ label: 'Porez na nekretnine', value: 1 });
    this.data.poslovi.push({ label: 'Porez na sve', value: 2 });
    this.data.oldZUP = [];
    this.data.oldZUP.push({ label: 'Odaberite stari ZUP ', value: null });
    this.data.oldZUP.push({ label: 'Da', value: true });
    this.data.oldZUP.push({ label: 'Ne', value: false });
    this.data.byArticle = [];
    this.data.byArticle.push({ label: 'Odaberite članak', value: null });
    this.data.byArticle.push({ label: 'Po zahtjevu stranke (čl. 40 i 41)', value: 1 });
    this.data.byArticle.push({ label: 'Po zahtjevu protustranke (čl. 43)', value: 2 });
    this.data.byArticleType = [];
    this.data.byArticleType.push({ label: 'Odaberite kako', value: null });
    this.data.byArticleType.push({ label: 'Usmeno na zapisnik', value: 1 });
    this.data.byArticleType.push({ label: 'Pisanim putem', value: 2 });
    this.data.selectedPartyExplaining = [];
    this.data.selectedPartyExplaining.push({ label: 'Odaberite ', value: null });
    this.data.selectedPartyExplaining.push({ label: 'Usmeno na zapisnik', value: 1 });
    this.data.selectedPartyExplaining.push({ label: 'Pisanim putem', value: 2 });
  }


  open(isNew: boolean) {
    this.isNew = isNew;
    this.selectedDate = new Date(this.sampleType.datum_rjesenja);
    if (isNew) {
      this.header = 'Dodavanje tipa uzorka';
    } else {
      this.header = 'Uređivanje tipa uzorka';
    }
    this.isVisible = true;
  }

  save() {
    this.sampleTypeService.saveSampleType(this.sampleType).subscribe(
      data => {
        this.sampleType = data;
        let msg = { severity: 'info', summary: 'Poruka', detail: 'Transakcija uspješna' };
        this.onChanged.emit({ msg: msg, object: this.sampleType, isNew: false });
        this.isVisible = false;
      },
      err => {
        let msg = { severity: 'error', summary: 'Greška', detail: err };
        this.onChanged.emit({ msg: msg, object: null, isNew: false });
      }
    );
  }

  delete() {
    // emit delete event OR implement delete confirmation
  }
  onDateChanged($event: Date) {
    this.sampleType.datum_rjesenja = $event.getTime();
  }
}

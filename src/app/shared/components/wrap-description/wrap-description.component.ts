import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '@core/models/card.model';

@Component({
  selector: 'app-wrap-description',
  templateUrl: './wrap-description.component.html',
  styleUrls: ['./wrap-description.component.sass']
})
export class WrapDescriptionComponent implements OnInit {

  @Input() descriptionTitle? : string = ''
  @Input() descriptionText? : string = ''
  @Input() staticTitle : string = ''
  @Input() preTitle : string = ''
  @Input() staticDescription : string = ''
  @Input() gridCols : string = '1'
  @Input() spanCol1 : string = 'span-1'
  @Input() spanCol2 : string = 'span-1'
  @Input() startCol2 : string = 'col-start-2'
  @Input() dataCards : Array<CardModel> = []

  constructor() { }

  ngOnInit(): void {
  }
  
}

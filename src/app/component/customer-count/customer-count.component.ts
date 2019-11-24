import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-count',
  templateUrl: './customer-count.component.html',
  styleUrls: ['./customer-count.component.scss']
})
export class CustomerCountComponent implements OnChanges {
  @Input() count: number;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.count = changes.count.currentValue;
  }

}

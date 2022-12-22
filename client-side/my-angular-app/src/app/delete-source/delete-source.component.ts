import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-source',
  templateUrl: './delete-source.component.html',
  styleUrls: ['./delete-source.component.css']
})
export class DeleteSourceComponent {
  constructor(public activeModal: NgbActiveModal){}
  
}

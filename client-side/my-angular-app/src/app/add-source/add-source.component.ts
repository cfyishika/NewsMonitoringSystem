import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {SourcingService} from '../services/sourcing.service'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css'],
  providers:[SourcingService]
})
export class AddSourceComponent implements OnInit{
myForm:any;
status:any;
s1:any;
s2:any;

constructor(private sourcingService: SourcingService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder){
  this.createForm();
  this.sourcingService.refreshNeeded.subscribe(result=>{
    this.addSource(this.s1,this.s2);
  })
}

@Input() public source_passed:any;
public createForm(){
 
  this.myForm=this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(5)]],
    url:['',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
  })
}
get sourceControl(){
  return this.myForm.controls;
}
addSource(get_source:any,new_source:any){
  
  this.s1=get_source;
  this.s2=new_source;
  if(get_source==null){
    console.log("I have to check the added source", new_source)
    this.sourcingService.addSource(new_source).subscribe(()=>{
      this.status="source added successfull";
        });
    
  }
  else{
    let id=get_source.id
    this.sourcingService.updateSource(id,get_source).subscribe(()=>{
      this.status = "source update succeddful";
      this.ngOnInit
  })
    console.log("I have to check the edited source", new_source)
    
  }
  this.activeModal.close("operation performed successfully")
}

ngOnInit(){
  console.log("on init  --- id is ",this.source_passed);
}

}

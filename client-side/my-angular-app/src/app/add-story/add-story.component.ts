import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup,Validators, FormBuilder } from '@angular/forms';
import {SourcingService} from '../services/sourcing.service'
import {CompaniesService} from '../services/companies.service'
import { GetDataService } from '../services/get-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css'],
  providers:[SourcingService, CompaniesService, GetDataService]
})
export class AddStoryComponent implements OnInit{
  myForm:any;
  sources:any;
  companies:any;
  status:any;
  s1:any;
  s2:any;
  constructor(private sourcingService: SourcingService, private companyService: CompaniesService, private apiservive: GetDataService,  public activeModal: NgbActiveModal, private formBuilder: FormBuilder){
    this.createForm();
    this.apiservive.refreshNeeded.subscribe(result=>{
      this.addStory(this.s1,this.s2);
    })
  }
  @Input() public story_passed:any;
  public createForm(){
    this.myForm = this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(5)]],
      source_name:['', [Validators.required]],
      body_text:[''],
      pub_date:['',[Validators.required]],
      url:['',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      tagged_company:['']
    })
  }
  get storyControl(){
    return this.myForm.controls;
  }
  ngOnInit(): void{
  this.companies=this.getCompanies()
  this.sources=this.getSources()
}
getSources(){
  this.sourcingService.getsource().subscribe(res=>{
    this.sources=res
    console.log(this.sources)
  })
}
getCompanies(){
  this.companyService.getcompanies().subscribe(res=>{
    this.companies=res
    console.log(this.companies)
  })
}
addStory(get_story:any,new_story:any){
  this.s1=get_story;
  this.s2=new_story;
  if(get_story==null){
    console.log("new story added is-- ", new_story)
    this.apiservive.addStory(new_story).subscribe(()=>{
      this.status="added successfull";
    });
  }
  else{
    console.log(get_story)
    let id=get_story.id;
    this.apiservive.updateStory(id,get_story).subscribe(()=>{
      this.status = "update succeddful";
      this.ngOnInit();
    })
    console.log("I have to check the edited source", new_story )
  }

  this.activeModal.close(new_story)
  console.log(new_story)
  console.log("strooy added successfullyyy !!!!!!!!!!!!")
}

}
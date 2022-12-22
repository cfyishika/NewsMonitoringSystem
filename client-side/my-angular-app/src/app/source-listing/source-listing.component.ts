import { Component, OnInit, ViewChild } from '@angular/core';
import {SourcingService} from '../services/sourcing.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSourceComponent } from '../add-source/add-source.component';
import { DeleteSourceComponent } from '../delete-source/delete-source.component';

@Component({
  selector: 'app-source-listing',
  templateUrl: './source-listing.component.html',
  styleUrls: ['./source-listing.component.css'],
  providers: [SourcingService]
})
export class SourceListingComponent {
  sources:any;
  status:any;
  source_data:any;
  display=false;
  search_text:any;
  search_title:string='';
  total_sources:any;

  constructor(private soucingService: SourcingService, private modalService: NgbModal){}

  AddSourceModal(){
    const modalRef = this.modalService.open(AddSourceComponent);
    modalRef.componentInstance.source_passed=null;
    modalRef.result.then((result)=>{
      console.log(result);
      this.getSources();
    }).catch((error)=>{
      console.log(error);
    })
  }
  EditSourceModal(source:any){
    const modalRef = this.modalService.open(AddSourceComponent);
    modalRef.componentInstance.source_passed=source;
    modalRef.result.then((result)=>{
      console.log(result);
      this.getSources();
    }).catch((error)=>{
      console.log(error);
    })
    this.getSources()
  }
  openDeleteModal(id:number){
    const modalRef = this.modalService.open(DeleteSourceComponent);
    modalRef.result.then((result)=>{
      console.log(result);
      if(result==='delete click'){
        console.log("hey we have got the error")
        this.onDeleteSource(id);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  getSources(){
    this.soucingService.getsource().subscribe(res=>{
      const data_to_display:any[]=[]
      res.forEach((element:any)=>{
        let source_name=element.name
        let source_url=element.url
        if(source_name.includes(this.search_title) || source_url.includes(this.search_title)){
          data_to_display.push(element)
        }
      });
      if(this.search_title === ''){
        this.sources=res
        this.total_sources=null;
      }
      else{
        this.sources=data_to_display;
        this.total_sources=data_to_display.length
      }
      console.log("data to be displayed here is ")
      console.log(data_to_display)
      console.log("response is ----")
      console.log(res)
      console.log(typeof(res))

    })
  }

  onDeleteSource(id:number){
    this.soucingService.deleteSource(id).subscribe(()=>{
    this.status = 'Delete successful';
    this.getSources();
  });
    this.getSources();
    console.log("source delete success")
  }
  
  onEditSource(source:any){
    console.log("source edition performed")
    this.source_data = source
    this.display = !this.display;
  }
  searchingSources(value:string){
   console.log(value)
   this.search_title=value
   this.getSources()
  }
  ngOnInit(){
    this.getSources()
  }
}

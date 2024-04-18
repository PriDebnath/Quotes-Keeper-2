import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyProfileComponent } from 'src/app/view/my-profile/my-profile.component';
import { QuoteFormModalComponent } from 'src/app/view/quote-form-modal/quote-form-modal.component';


@Component({
  selector: 'app-my-quote-list',
  templateUrl: './my-quote-list.component.html',
  styleUrls: ['./my-quote-list.component.css']
})
export class MyQuoteListComponent  implements OnInit{
  appTitle = 'My Quotes';
  isAddEdit = false
  quotes: any = []
  constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private quoteService: QuoteService,
    ) {}

  ngOnInit(): void {
    this.title.setTitle(this.appTitle);
    this.getAllQuoteList();
  }

  getAllQuoteList() {
    this.quoteService.getAllQuoteList().subscribe({
      next: (res: any) => {
        console.log({ res });
        this.quotes = res.results
      },
      error: (err: any) => {
        console.log({ err });
      },
    });
  }
  
  changeIsAddEdit(){
    this.isAddEdit = !this.isAddEdit
    this.openModal()
  }
  
  openModal(editQuoteData?: any) {
    const modalRef = this.ngbModal.open(QuoteFormModalComponent);
    modalRef.componentInstance.editQuoteData = {};
    
    modalRef.result.then((result) => {
      
      if (result == 'Cross click'){
         this.isAddEdit = false
      }
      alert(new String(result).toString())
    }, (reason) => {
      if (reason == 0){
        this.isAddEdit = false
      }
    });
  }
  
  
  
}

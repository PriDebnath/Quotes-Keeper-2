import { Component, OnInit } from '@angular/core';
import { QuoteService } from "src/app/core/services/quote/quote.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'quotes_keeper_2';
  
  constructor ( 
    private quoteService: QuoteService
    ){
  }
  
  ngOnInit(): void{
  
    setInterval(()=>{
    //this.getAllQuoteList()
    alert (888)
    },1000)
}
  
  /*
  
  getAllQuoteList(){
    this.quoteService.getAllQuoteList().subscribe({
      next: (res: any)=>{
        //console.log({res})
        alert(res.toString())
      },
      error: (err: any)=>{
        alert(err.toString())
      // let errr = err.toString()
        //alert(errr)
        //console.log({errr})
      }
    })
  }
  
  */
}

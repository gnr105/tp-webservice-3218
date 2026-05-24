import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor(private http: HttpClient){
    
  }

  getCurrencies(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'apikey': '4nlXkIrT095ye9ilmmBo19bKip2z7dOM' 
      })
    };
    return this.http.get(`https://api.apilayer.com/currency_data/list`, httpOptions);
  }

  convert(from: string, to: string, amount: number):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'apikey': '4nlXkIrT095ye9ilmmBo19bKip2z7dOM',
      }),
      params: new HttpParams().append('from', from).append('to', to).append('amount', amount)
    }
    return this.http.get('https://api.apilayer.com/currency_data/convert', httpOptions);
  }


}


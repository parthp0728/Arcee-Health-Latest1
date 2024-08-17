import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',  // This makes the service available application-wide
})
export class AddressService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';  // Base URL for Nominatim API

  constructor(private http: HttpClient) {}

  // Define the searchAddress method
  searchAddress(query: string): Observable<string[]> {
    const params = {
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5',
    };

    return this.http.get<any[]>(this.nominatimUrl, { params }).pipe(
      map(results => results.map(result => result.display_name))  // Transform results to return only display names
    );
  }
}

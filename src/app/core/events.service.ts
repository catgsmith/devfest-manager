import { httpResource } from "@angular/common/http";
import { DevFestEvent } from "../models/event.model";
import { Injectable, Signal } from "@angular/core";

@Injectable({
  providedIn: 'root', // This makes the service available application-wide
})
export class EventsService {

  private apiUrl = 'http://localhost:3000/events';

  getEventsResource(query: Signal<string>) {
    return httpResource<DevFestEvent[]>(() => {
      const q = query();
      // The function returns the URL to fetch.
      // Whenever 'q' changes, httpResource re-fetches automatically.
      return q ? `${this.apiUrl}?q=${q}` : this.apiUrl;
    });
  }

}

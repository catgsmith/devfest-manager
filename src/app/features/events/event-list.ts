import { Component, inject, signal } from '@angular/core';
import { EventCard } from './event-card';
import { SearchBar } from './search-bar';
import { EventsService } from '../../core/events.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, SearchBar],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
      <!-- Two-way binding syncs parent signal <-> child model -->
      <app-search-bar [(query)]="searchQuery" />

      <p class="text-gray-500 mt-2">Searching for: {{ searchQuery() }}</p>
    </div>

    <!-- 3. Data State -->
    <!-- We guard the value access with hasValue() -->
    @if (events.hasValue()) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (event of events.value(); track event.id) {
          <app-event-card
            [title]="event.title"
            [date]="event.date"
            [image]="event.image"
            (delete)="console.log('Event deleted')" />
        } @empty {
          <p class="col-span-3 text-center text-gray-500">No events found.</p>
        }
      </div>
    }
  `,
})
export class EventList {
  // TODO Mod 2: Inject Service and use resource()
  readonly eventsService = inject(EventsService);
  // aliasing the console
  readonly console = console;
  // Signal to hold the search query
  searchQuery = signal('');

  // We pass our signal directly to the service.
  // This creates a live connection: searchQuery -> URL -> HTTP Request -> events.value
  events = this.eventsService.getEventsResource(this.searchQuery);
}

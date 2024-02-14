import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private routerService: RouterService) {
  }

  onInput(event: any) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.routerService.goToSearchResults(event.target.value);
    }
  }
}

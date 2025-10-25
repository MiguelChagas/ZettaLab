import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ZettaLab';
}

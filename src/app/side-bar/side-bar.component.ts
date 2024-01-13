import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.currentUser = this.authService.getCurrentUserbyStore();
    console.log(this.currentUser.username);
  }
}

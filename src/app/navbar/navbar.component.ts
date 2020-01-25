import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title$ = this.navbarService.title;

  constructor(private navbarService: NavbarService, private router: Router) { }

  ngOnInit() {
  }

}

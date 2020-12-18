import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
                localStorage.removeItem('jwt');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('id');
                window.location.href = '/';
  }

}

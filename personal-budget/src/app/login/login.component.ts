import { Component, OnInit } from '@angular/core';
import { axisBottom } from 'd3';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public htttp:HttpClient,
              private router:Router,
              private route: ActivatedRoute) { }


  login(){
    console.log("entered login");
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;

  // console.log(data);
  this.htttp.post<any>('http://localhost:3000/api/login?username='+username+'&password='+password,null).subscribe((res) => {
            console.log('Inside api login call')
            console.log(res)
            console.log(res.success)
            if(res && res.success){
              console.log("login done");
              localStorage.setItem('jwt', res.token);
              localStorage.setItem('id', res.id);
              localStorage.setItem('refreshToken', res.refreshToken);
              this.router.navigate(['/home']);
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "login done";

            }else{
              console.log("not done");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "";
              (<HTMLInputElement>document.getElementById('result')).innerHTML = res.err;
            }
            // if(res)
        },(err)=>{console.log('Inside api erro login call')
        console.log(err.status);
        (<HTMLInputElement>document.getElementById('result')).innerHTML = "";
        (<HTMLInputElement>document.getElementById('result')).innerHTML = err.error.err;})
  // this.HttpClient
  // .post('http://localhost:3000/api/login',data
  // .subscribe)
  // console.log(username);
  }
  ngOnInit(): void {
  }


}

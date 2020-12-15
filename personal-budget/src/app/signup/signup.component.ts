import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private htttp:HttpClient,
              private router:Router,
              private route: ActivatedRoute
              ) { }

  signup(){
    console.log("entered signup");
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;

  // console.log(data);
  this.htttp.post<any>('http://localhost:3000/api/signup?username='+username+'&password='+password,null).subscribe((res) => {
            console.log(res)
            if(res && res.success){
              console.log("sign up done");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "Sign up done please go to login";

            }else{
              console.log("not donesignup error");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "";
              (<HTMLInputElement>document.getElementById('result')).innerHTML = res.err;
            }
            // if(res)
        })
  // this.HttpClient
  // .post('http://localhost:3000/api/login',data
  // .subscribe)
  console.log(username);
  }

  ngOnInit(): void {
  }

}

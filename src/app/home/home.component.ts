import { Component, OnInit, ViewChild } from '@angular/core';
import { GET } from '../model/get.model';
import { ApiService } from '../service/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  @ViewChild('locref', { static: true }) search: NgForm;
  loadedPosts: GET[] = [];
  isFetching = false;
  error = null;
  coinA:number = 0;CoinA_change:number=0;
  coinB:number = 0;CoinB_change:number=0;
  coinC:number = 0;CoinC_change:number=0;
  coinD:number= 0;CoinD_change:number=0;

  ngOnInit() {
    this.isFetching = true;
    this.apiService.getVaultAvailablity().subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
      this.coinA = Number(posts[0].coinA)<=Number(0)?'Coins Unavailable':posts[0].coinA;
      this.coinB = Number(posts[0].coinB)<=Number(0)?'Coins Unavailable':posts[0].coinB;
      this.coinC = Number(posts[0].coinC)<=Number(0)?'Coins Unavailable':posts[0].coinC;
      this.coinD = Number(posts[0].coinD)<=Number(0)?'Coins Unavailable':posts[0].coinD;
    }, error => {
      this.error = error.message;
    });
  }

  getMyCollection() {
    this.isFetching = true;
    this.apiService.getVaultAvailablity().subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
      this.coinA = Number(posts[0].coinA)<=Number(0)?'Coins Unavailable':posts[0].coinA;
      this.coinB = Number(posts[0].coinB)<=Number(0)?'Coins Unavailable':posts[0].coinB;
      this.coinC = Number(posts[0].coinC)<=Number(0)?'Coins Unavailable':posts[0].coinC;
      this.coinD = Number(posts[0].coinD)<=Number(0)?'Coins Unavailable':posts[0].coinD;
    }, error => {
      this.error = error.message;
    });
  }

  getMyChange() {
    this.isFetching = true;
    this.apiService.getCalculatedChange().subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
     
    }, error => {
      this.error = error.message;
    });
  }

  onSearch() {
      this.isFetching = true;
      if(this.search.value.searchText !== null && this.search.value.searchText !== ''){
      this.apiService.reqChangeFromVault(  this.search.value.searchText);
      }else{
        console.log("Invalid : Null or blank input");
      }
      // this.getMyChange();
      //this.getMyCollection();
  }
}
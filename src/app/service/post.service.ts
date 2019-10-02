import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GET } from '../model/get.model'
import { Post } from '../model/post.model'
import { map, tap } from 'rxjs/operators';
import { GET_CHANGE } from '../model/getChange.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
    baseUrl: string = 'http://localhost:8082/api';

    constructor(private http: HttpClient) { }

    reqChangeFromVault(bill : any) {
        const postData:Post={bill:bill};
        return this.http.put<{ bill: Post }>(this.baseUrl + '/vaults', postData)
            .pipe(tap(postData=>console.log("tapping the PUT data:"+postData.bill))).subscribe(respData => {
                console.log("here:"+respData.bill);
            });
    }

    getVaultAvailablity() {
        return this.http
            .get<{ [key: string]: GET }>(this.baseUrl + '/vaults')
            .pipe(map(respData => {
                const postArray = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        postArray.push({ ...respData[key], id: key })
                    }
                }
                return postArray;
            }))
    }

    getCalculatedChange(){
        return this.http
            .get<{ [key: string]: GET_CHANGE }>(this.baseUrl + '/change')
            .pipe(map(respData => {
                const postArray = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        postArray.push({ ...respData[key], id: key })
                    }
                }
                return postArray;
            }))
    }

}
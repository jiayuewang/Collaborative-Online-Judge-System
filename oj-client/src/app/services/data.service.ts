import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]>{
  	//return PROBLEMS;
  	// return this.problems;
    this.http.get('api/v1/problems')
             .toPromise()
             .then((res:Response) => {
               this._problemSource.next(res.json());
             })
             .catch(this.handleError);
    return this._problemSource.asObservable();
  }


  getProblem(id: number): Promise<Problem>{
  	//return PROBLEMS.find((problem) => problem.id === id);
  	// return this.problems.find((problem) => problem.id === id);
    return this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res:Response) => res.json())
                    .catch(this.handleError);
  }

  addProblem(newProblem: Problem){
  	// newProblem.id = this.problems.length + 1;
  	// this.problems.push(newProblem);
    const headers = new Headers({
      'content-type': 'application/json'
    });
    return this.http.post('api/v1/problems', newProblem, headers)
                    .toPromise()
                    .then((res:Response) => {
                      this.getProblems(); //need to display all problems include new problem
                      res.json();
                    })
                    .catch(this.handleError);
  }

  buildAndRun(submitCode: any): Promise<Object>{
    const headers = new Headers({
      'content-type': 'application/json'
    });
    return this.http.post('api/v1/build_and_run', submitCode, headers)
                    .toPromise()
                    .then((res:Response) => {
                      console.log(res);
                      return res.json();
                    })
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('An error happened', error);
    return Promise.reject(error.body || error);
  }
}

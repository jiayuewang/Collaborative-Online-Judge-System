import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: string= "Java";
  languages: string[] = ["Java","Python","C++","JavaScript"];
  sessionID: string;
  output: string;

  languagesMap = {
    "Java":"java",
    "Python":"python",
    "C++":"c_cpp",
    "JavaScript":"javascript"
  }
  defaultContent = {
  	'Java': 
  	`public class Example{
	public static void main(String[] args){
		//Type your Java code here
	}
}`,
    'Python':
    `class Solution:
  def example():
    #Write your Python code here`,
    'C++':
    `#include <iostream>
using namespace std;
int main(){
  //Type your C++ code here
  return 0;
}`,
    'JavaScript':
    `Solution = function(){
  //Type your JavaScript code here
}`
  };
  constructor(
    @Inject('collaboration') private collaboration,
    @Inject('data') private data,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.params.subscribe( params => {
     this.sessionID = params['id'];
     this.initEditor();
   });
  }

  initEditor(): void{

    //set editor
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/xcode");
    this.editor.setFontSize(18);
    this.editor.$blockScrolling = Infinity;
    this.resetEditor();

    //send session id to collaboration service
    this.collaboration.init(this.editor, this.sessionID);
    this.editor.lastAppliedChange = null;
    
    //registering editor change event callback function
    this.editor.on('change', (e) => {
      console.log('Editor component: '+ JSON.stringify(e));
      if(this.editor.lastAppliedChange != e){
        //emit change to server
        this.collaboration.change(JSON.stringify(e));
      }
    });

    //registering cursor change event callback function
    this.editor.getSession().getSelection().on('changeCursor', () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('Cursor chage: '+ JSON.stringify(cursor));

      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  submit(){
    this.output = "";
    console.log('submit the answer....');
    const userCodes = this.editor.getValue();
    console.log(userCodes);
    const submitCode = {
      userCode: userCodes,
      language: this.language.toLocaleLowerCase()
    };
    this.data.buildAndRun(submitCode)
        .then( res => this.output = res.text );
  }

  setLanguage(language: string){
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void{
    console.log('Resetting editor');
    this.editor.getSession().setMode(`ace/mode/${this.languagesMap[this.language]}`);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = "";
  }

}

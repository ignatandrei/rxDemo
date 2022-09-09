import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TitleStrategy, RouterStateSnapshot, ActivatedRoute } from "@angular/router";

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`RXJS | ${title}`);
      return;
    }
    var t=routerState.root;
    var url=routerState.url;
    var whereIndexExample=url.indexOf("/example/");
    if(whereIndexExample>0){
        var restUrl= url.substring(whereIndexExample + "/example/".length);

        this.title.setTitle(`RXJS | RXJS Example ${restUrl} `);
        
        
        return;
    }
    this.title.setTitle("unknown");
  }
}
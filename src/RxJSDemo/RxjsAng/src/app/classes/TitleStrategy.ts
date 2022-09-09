import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TitleStrategy, RouterStateSnapshot } from "@angular/router";

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
    if(url.indexOf("/example/")){
        var pars=t.params;
        console.log(pars);
        console.log(t);
        var exampleID =pars['exampleId'];
        var exampleSource = pars['exampleSource'];
        this.title.setTitle(`RXJS | RXJS Example with ${exampleSource} and ${exampleID}`);
        
        return;
    }
    this.title.setTitle("unknown");
  }
}
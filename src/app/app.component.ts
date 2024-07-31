import { Component, OnInit } from "@angular/core";
import { LayoutComponent } from "./layout/layout.component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle() {
    const routeTitle = this.getRouteTitle(this.router.routerState.root);
    document.title = routeTitle
      ? `${routeTitle} - KBC`
      : "KBC - Knowledge Based Contest";
  }

  private getRouteTitle(route: any): string | null {
    if (route.firstChild) {
      return this.getRouteTitle(route.firstChild);
    }
    return route.snapshot.data["title"] || null;
  }
}

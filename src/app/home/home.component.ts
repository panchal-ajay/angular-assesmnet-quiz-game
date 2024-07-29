import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(private router: Router) {}

  startGame() {
    localStorage.setItem("userLevel", "1");
    this.router.navigate(["/user"]);
  }
}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  displayName: string = "";
  userId: number | null = null;

  constructor(private router: Router) {}

  generateUniqueId(): number {
    let currentId = Number(localStorage.getItem("currentUserId")) || 0;
    currentId++;
    localStorage.setItem("currentUserId", currentId.toString());
    return currentId;
  }

  startGame() {
    if (this.displayName.trim()) {
      this.localStorage();
      this.router.navigate(["/game"]);
    } else {
      alert("Please enter a display name.");
    }
  }

  localStorage() {
    this.userId = this.generateUniqueId();
    localStorage.setItem("userId", this.userId.toString());
    localStorage.setItem("userLevel", "1");
    localStorage.setItem("totalQuestions", "9");
    localStorage.setItem("displayName", this.displayName);
  }
}

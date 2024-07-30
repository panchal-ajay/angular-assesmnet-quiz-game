import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-leader-board",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./leader-board.component.html",
  styleUrls: ["./leader-board.component.css"],
})
export class LeaderBoardComponent implements OnInit {
  users: any[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parseUser = JSON.parse(storedUsers);
      this.users = parseUser.map((user: any) => {
        return {
          ...user,
          userLevel: user.userLevel - 1,
        };
      });
    }
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  goHome() {
    this.router.navigate(["/home"]);
  }
}


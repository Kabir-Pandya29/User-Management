import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user/user.service';

interface User {
  id: number | null; // Assuming ID can be null for new users
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false,
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  searchQuery = '';
  errorMessage: string | null = null;
  roleOptions: string[] = ['Admin', 'User'];

  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;
  @ViewChild('editUserDialog') editUserDialog!: TemplateRef<any>;
  @ViewChild('deleteUserDialog') deleteUserDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  newUser: User = { id: null, name: '', email: '', role: 'User' };
  userToDelete: User | null = null;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ferchUsers();
    this.dataSource.paginator = this.paginator; // Attach paginator
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const lowerCaseFilter = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(lowerCaseFilter) ||
        data.email.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }

  // Fetch users from the service and handle errors

  ferchUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource.data = users;
        this.errorMessage = users.length ? null : 'No users found.';
        this.dataSource.paginator = this.paginator; // Ensure paginator is refreshed
      },
      error => {
        this.errorMessage = 'Failed to fetch users. Please try again later.';
      }
    );
  }


  // Open dialog for adding a new user
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(this.addUserDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.isValidEmail(result.email)) {
        this.addUser(result);
      } else if (result) {
        alert('Invalid email address.');
      }
      this.resetNewUser(); // Reset dialog fields
    });
  }


  // Add a new user and handle errors

  addUser(user: User): void {
    this.userService.addUser(user).subscribe(
      () => {
        this.ferchUsers(); // Refresh the user list after adding
      },
      error => {
        alert('Failed to add user. Please try again.');
      }
    );
  }

  // Open dialog for editing an existing user

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(this.editUserDialog);
    this.newUser = { ...user }; // Populate dialog with user data

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.isValidEmail(result.email)) {
        this.updateUser(result);
      } else if (result) {
        alert('Invalid email address.');
      }
      this.resetNewUser(); // Reset dialog fields
    });
  }

  // Update an existing user and handle errors
  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      () => {
        this.ferchUsers(); // Refresh the user list after updating
      },
      error => {
        alert('Failed to update user. Please try again.');
      }
    );
  }

  // Function to delete a user and handle errors
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id!).subscribe(
      () => {
        this.ferchUsers(); // Refresh the user list after deleting
      },
      error => {
        alert('Failed to delete user. Please try again.');
      }
    );
  }

  // Open dialog for confirming user deletion
  confirmDeleteUser(user: User): void {
    this.userToDelete = user;
    const dialogRef = this.dialog.open(this.deleteUserDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user);
      }
      this.userToDelete = null; // Reset after dialog closes
    });
  }

 
  // Function to validate email format using regex
  // This is a simple regex and may not cover all cases
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to reset new user fields after adding/editing
  resetNewUser(): void {
    this.newUser = { id: null, name: '', email: '', role: 'User' };
  }

  // Function to handle search input changes
  onSearchChange(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
}

// Factory Pattern based on user role

interface Role {
  name: string;
  permission: string[];
  can(permission: string): boolean;
  describe(): void;
}

class Admin implements Role {
  name = "Admin";
  permission: string[] = ["read", "write", "delete"];

  can(permission: string): boolean {
    return this.permission.includes(permission);
  }

  describe(): void {
    console.log(`${this.name} Permissions: ${this.permission.join(", ")}`);
  }
}

class Editor implements Role {
  name = "Editor";
  permission: string[] = ["read", "write"];

  can(permission: string): boolean {
    return this.permission.includes(permission);
  }

  describe(): void {
    console.log(`${this.name} Permissions: ${this.permission.join(", ")}`);
  }
}

class Viewer implements Role {
  name = "Viewer";
  permission: string[] = ["read"];

  can(permission: string): boolean {
    return this.permission.includes(permission);
  }

  describe() {
    console.log(`${this.name} Permissions: ${this.permission.join(", ")}`);
  }
}

class RoleFactory {
  static createRole(roleType: string): Role {
    switch (roleType.toLowerCase()) {
      case "admin":
        return new Admin();
      case "editor":
        return new Editor();
      case "viewer":
        return new Viewer();
      default:
        throw new Error(`Role type "${roleType}" is not recognized.`);
    }
  }
}

class User {
  constructor(public name: string, public role: Role) {}

  can(permission: string): boolean {
    return this.role.can(permission);
  }

  describe(): void {
    console.log(`User: ${this.name}, Role: ${this.role.name}`);
    this.role.describe();
  }
}

class RoleManger {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
    console.log(`User "${user.name}" added with role "${user.role.name}"`);
  }

  listUsers() {
    this.users.forEach((u) => u.describe());
  }
}


const adminRole = RoleFactory.createRole("admin");
const editorRole = RoleFactory.createRole("editor");
const viewerRole = RoleFactory.createRole("viewer");

const mad = new User('Madesh', adminRole);
const ram = new User('Ramesh', editorRole);
const prav = new User("Pravin", viewerRole);

const roleManager1 = new RoleManger();
roleManager1.addUser(mad);
roleManager1.addUser(ram)
roleManager1.addUser(prav);

roleManager1.listUsers();

console.log("Can Alice delete?", mad.can("delete")); 
console.log("Can Bob delete?", ram.can("delete")); 
console.log("Can Charlie read?", prav.can("read"));



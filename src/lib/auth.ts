// Simple mock database for authentication
interface User {
  id: string
  name: string
  email: string
  password: string
  companyName?: string
  companyWebsite?: string
  companySize?: string
  plan?: string
  createdAt: string
}

// Initialize mock database
export const initializeAuthDatabase = () => {
  if (typeof window === "undefined") return

  // Check if we already have a users database
  const existingUsers = localStorage.getItem("teamify_users")
  if (!existingUsers) {
    // Create initial database with demo users
    const initialUsers: User[] = [
      {
        id: "1",
        name: "Demo User",
        email: "demo@teamify.com",
        password: "password123",
        companyName: "Teamify Demo",
        companyWebsite: "https://teamify.com",
        companySize: "11-50",
        plan: "premium",
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem("teamify_users", JSON.stringify(initialUsers))
  }
}

// Get all users
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const users = localStorage.getItem("teamify_users")
  return users ? JSON.parse(users) : []
}

// Find user by email
export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Register new user
export const registerUser = (userData: Omit<User, "id" | "createdAt">): User => {
  const users = getUsers()

  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  // Add to database
  users.push(newUser)
  localStorage.setItem("teamify_users", JSON.stringify(users))

  return newUser
}

// Login user
export const loginUser = (email: string, password: string): User => {
  const user = findUserByEmail(email)

  if (!user) {
    throw new Error("No account found with this email")
  }

  if (user.password !== password) {
    throw new Error("Invalid password")
  }

  // Set auth state
  const authData = {
    isAuthenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      plan: user.plan,
    },
  }

  localStorage.setItem("teamify_auth", JSON.stringify(authData))
  return user
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false

  const authData = localStorage.getItem("teamify_auth")
  if (!authData) return false

  try {
    const parsed = JSON.parse(authData)
    return !!parsed.isAuthenticated
  } catch {
    return false
  }
}

// Get current user
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const authData = localStorage.getItem("teamify_auth")
  if (!authData) return null

  try {
    const parsed = JSON.parse(authData)
    return parsed.user
  } catch {
    return null
  }
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("teamify_auth")
}

// Update user plan
export const updateUserPlan = (email: string, plan: string) => {
  const users = getUsers()
  const userIndex = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase())

  if (userIndex === -1) return

  users[userIndex].plan = plan
  localStorage.setItem("teamify_users", JSON.stringify(users))

  // Update current session if it's the logged in user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
    const authData = JSON.parse(localStorage.getItem("teamify_auth") || "{}")
    authData.user.plan = plan
    localStorage.setItem("teamify_auth", JSON.stringify(authData))
  }
}


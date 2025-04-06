"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {
  LogOut,
  User,
  Settings,
  Bell,
  Search,
  Plus,
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Users,
  BarChart2,
  Clock,
  Star,
} from "lucide-react"
import { getCurrentUser, logoutUser, isAuthenticated } from "../../lib/auth"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Team meeting in 30 minutes", time: "Just now", read: false },
    { id: 2, text: "New comment on your project", time: "2 hours ago", read: false },
    { id: 3, text: "Your task was approved", time: "Yesterday", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const userData = getCurrentUser()
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const stats = [
    { name: "Team Members", value: "12", icon: <Users className="h-6 w-6 text-orange-500" /> },
    { name: "Active Projects", value: "8", icon: <FileText className="h-6 w-6 text-orange-500" /> },
    { name: "Tasks Completed", value: "64", icon: <CheckCircleIcon className="h-6 w-6 text-orange-500" /> },
    { name: "Upcoming Meetings", value: "3", icon: <Calendar className="h-6 w-6 text-orange-500" /> },
  ]

  const activities = [
    { user: "John Doe", action: "completed task", item: "Update homepage design", time: "2 hours ago" },
    { user: "Jane Smith", action: "commented on", item: "Marketing campaign", time: "4 hours ago" },
    { user: "Mike Johnson", action: "created project", item: "Q2 Product Roadmap", time: "Yesterday" },
    { user: "Sarah Williams", action: "scheduled meeting", item: "Weekly Team Sync", time: "Yesterday" },
  ]

  const projects = [
    { id: 1, name: "Website Redesign", status: "In Progress", progress: 65, team: ["J", "S", "M"], updated: "2d ago" },
    {
      id: 2,
      name: "Mobile App Development",
      status: "On Track",
      progress: 40,
      team: ["A", "B", "C"],
      updated: "1d ago",
    },
    { id: 3, name: "Marketing Campaign", status: "At Risk", progress: 20, team: ["J", "D"], updated: "5h ago" },
    {
      id: 4,
      name: "Product Launch",
      status: "Completed",
      progress: 100,
      team: ["S", "M", "J", "A"],
      updated: "1w ago",
    },
    { id: 5, name: "Customer Research", status: "On Hold", progress: 10, team: ["B", "C"], updated: "3d ago" },
  ]

  const teamMembers = [
    { id: 1, name: "John Doe", role: "Product Designer", avatar: "J", online: true },
    { id: 2, name: "Jane Smith", role: "Frontend Developer", avatar: "J", online: true },
    { id: 3, name: "Mike Johnson", role: "Backend Developer", avatar: "M", online: false },
    { id: 4, name: "Sarah Williams", role: "Project Manager", avatar: "S", online: true },
    { id: 5, name: "Alex Brown", role: "UI/UX Designer", avatar: "A", online: false },
    { id: 6, name: "Emily Davis", role: "Content Writer", avatar: "E", online: true },
    { id: 7, name: "David Wilson", role: "QA Engineer", avatar: "D", online: false },
    { id: 8, name: "Lisa Taylor", role: "Marketing Specialist", avatar: "L", online: true },
  ]

  const upcomingMeetings = [
    { id: 1, title: "Weekly Team Sync", time: "Today, 2:00 PM", participants: 8 },
    { id: 2, title: "Product Review", time: "Tomorrow, 10:00 AM", participants: 5 },
    { id: 3, title: "Client Presentation", time: "Friday, 1:30 PM", participants: 4 },
  ]

  const tasks = [
    { id: 1, title: "Finalize homepage design", status: "In Progress", dueDate: "Today", priority: "High" },
    { id: 2, title: "Review marketing materials", status: "Not Started", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, title: "Prepare client presentation", status: "In Progress", dueDate: "Friday", priority: "High" },
    { id: 4, title: "Update documentation", status: "Not Started", dueDate: "Next Week", priority: "Low" },
    { id: 5, title: "Fix navigation bug", status: "In Progress", dueDate: "Today", priority: "Medium" },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-500/20 text-blue-500"
      case "on track":
        return "bg-green-500/20 text-green-500"
      case "at risk":
        return "bg-red-500/20 text-red-500"
      case "completed":
        return "bg-purple-500/20 text-purple-500"
      case "on hold":
        return "bg-yellow-500/20 text-yellow-500"
      case "not started":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-orange-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Office background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="opacity-10"
        />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || "User"}!</h1>
            <p className="text-gray-400">Here's what's happening with your team today.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            <div className="relative">
              <button
                className="bg-gray-800 p-2 rounded-full relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-300" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                    <p className="text-sm font-medium">Notifications</p>
                    <button className="text-xs text-orange-500 hover:underline" onClick={markAllNotificationsAsRead}>
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-700 ${notification.read ? "" : "bg-gray-700/50"}`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 mr-2 ${notification.read ? "bg-gray-600" : "bg-orange-500"}`}
                            ></div>
                            <div>
                              <p className="text-sm">{notification.text}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-gray-400 text-sm">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative group">
              <button className="bg-gray-800 p-2 rounded-full">
                <User className="h-5 w-5 text-gray-300" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-2" /> Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              </div>
            </div>

            <Link href="/new-project">
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 font-medium">{stat.name}</h3>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
          <div className="border-b border-gray-700 mb-6">
            <nav className="flex space-x-8">
              <button
                className={`py-2 font-medium border-b-2 ${
                  activeTab === "overview"
                    ? "border-orange-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`py-2 font-medium border-b-2 ${
                  activeTab === "projects"
                    ? "border-orange-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`py-2 font-medium border-b-2 ${
                  activeTab === "team"
                    ? "border-orange-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("team")}
              >
                Team
              </button>
              <button
                className={`py-2 font-medium border-b-2 ${
                  activeTab === "tasks"
                    ? "border-orange-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("tasks")}
              >
                Tasks
              </button>
            </nav>
          </div>

          <div>
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-orange-500" />
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start p-3 rounded-md hover:bg-gray-700/50 border border-gray-700 hover:border-orange-500 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                          {activity.user.charAt(0)}
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                            <span className="text-orange-500">{activity.item}</span>
                          </p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                    Upcoming Meetings
                  </h2>
                  <div className="space-y-3">
                    {upcomingMeetings.map((meeting, index) => (
                      <motion.div
                        key={meeting.id}
                        className="p-3 rounded-md bg-gray-700/50 border border-gray-700 hover:border-orange-500 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{meeting.title}</h3>
                            <div className="flex items-center mt-1 text-sm text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {meeting.time}
                            </div>
                          </div>
                          <div className="bg-gray-600 px-2 py-1 rounded-full text-xs">
                            {meeting.participants} attendees
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <button className="text-xs text-orange-500 hover:underline">View details</button>
                          <button className="text-xs bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-full">
                            Join
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full text-center text-sm text-orange-500 hover:underline mt-2">
                      View all meetings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-500" />
                    Your Projects
                  </h2>
                  <div className="flex space-x-2">
                    <select className="bg-gray-700 text-sm rounded-md border border-gray-600 px-2 py-1">
                      <option>All Projects</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>On Hold</option>
                    </select>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md flex items-center">
                      <Plus className="h-4 w-4 mr-1" /> Add Project
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Updated
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {projects.map((project) => (
                        <motion.tr
                          key={project.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-gray-700/50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-medium">{project.name}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-orange-500 h-2.5 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{project.progress}%</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex -space-x-2">
                              {project.team.map((member, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded-full bg-gray-600 border border-gray-800 flex items-center justify-center text-xs"
                                >
                                  {member}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{project.updated}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                            <button className="text-orange-500 hover:text-orange-600">View</button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Users className="h-5 w-5 mr-2 text-orange-500" />
                    Your Team
                  </h2>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Invite Member
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-orange-500 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 text-lg font-bold">
                            {member.avatar}
                          </div>
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-700 ${member.online ? "bg-green-500" : "bg-gray-500"}`}
                          ></div>
                        </div>
                        <div>
                          <h3 className="font-bold flex items-center">
                            {member.name}
                            {member.id === 1 && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                          </h3>
                          <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded-full flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" /> Message
                        </button>
                        <button className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded-full flex items-center">
                          <Video className="h-3 w-3 mr-1" /> Call
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-orange-500" />
                    Your Tasks
                  </h2>
                  <div className="flex space-x-2">
                    <select className="bg-gray-700 text-sm rounded-md border border-gray-600 px-2 py-1">
                      <option>All Tasks</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Not Started</option>
                    </select>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md flex items-center">
                      <Plus className="h-4 w-4 mr-1" /> Add Task
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      className="p-4 rounded-lg bg-gray-700/50 border border-gray-700 hover:border-orange-500 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            className="mt-1 mr-3 h-4 w-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-gray-700"
                          />
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-600 text-gray-300">
                                Due: {task.dueDate}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}


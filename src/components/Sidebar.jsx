import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Plus, ChevronLeft, ChevronRight, Clock, FolderOpen, Zap, Settings, Bug, Gauge, Shield, Sparkles, GitBranch, BookOpen, BarChart2, ArrowLeftRight } from 'lucide-react'

const recentAnalyses = [
  { id: 1, title: 'user_auth.py', time: '2h ago' },
  { id: 2, title: 'UserService.java', time: '1d ago' },
  { id: 3, title: 'main.cpp', time: '2d ago' },
  { id: 4, title: 'data_processor.py', time: '4d ago' },
]

const savedProjects = [
  { id: 1, title: 'E-Commerce Backend' },
  { id: 2, title: 'Microservices Auth' },
  { id: 3, title: 'ML Pipeline' },
]

const analysisModes = [
  { icon: Bug, label: 'Bug Detection' },
  { icon: Gauge, label: 'Performance' },
  { icon: Shield, label: 'Security Scan' },
  { icon: Sparkles, label: 'Code Cleanup' },
  { icon: GitBranch, label: 'Refactor' },
  { icon: BookOpen, label: 'Explain Code' },
  { icon: BarChart2, label: 'Complexity' },
  { icon: ArrowLeftRight, label: 'Code Convert' },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex-shrink-0 h-full bg-[#0d0d14] border-r border-white/10 overflow-hidden flex flex-col"
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {/* New Analysis button */}
        <div className="px-3 mb-6">
          <Link
            to="/analyzer"
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <Plus size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  New Analysis
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Recent Analyses */}
        <SidebarSection icon={Clock} label="Recent" collapsed={collapsed}>
          {recentAnalyses.map((item) => (
            <SidebarItem key={item.id} collapsed={collapsed}>
              <span className="truncate">{item.title}</span>
              {!collapsed && <span className="text-xs text-gray-500 flex-shrink-0">{item.time}</span>}
            </SidebarItem>
          ))}
        </SidebarSection>

        {/* Saved Projects */}
        <SidebarSection icon={FolderOpen} label="Projects" collapsed={collapsed}>
          {savedProjects.map((item) => (
            <Link key={item.id} to="/projects">
              <SidebarItem collapsed={collapsed}>
                <span className="truncate">{item.title}</span>
              </SidebarItem>
            </Link>
          ))}
        </SidebarSection>

        {/* Analysis Modes */}
        <SidebarSection icon={Zap} label="Modes" collapsed={collapsed}>
          {analysisModes.map(({ icon: Icon, label }) => (
            <SidebarItem key={label} collapsed={collapsed}>
              <Icon size={13} className="flex-shrink-0 text-gray-400" />
              {!collapsed && <span className="truncate text-xs">{label}</span>}
            </SidebarItem>
          ))}
        </SidebarSection>
      </div>

      {/* Settings link */}
      <div className="p-3 border-t border-white/10">
        <SidebarItem collapsed={collapsed}>
          <Settings size={15} className="flex-shrink-0 text-gray-400" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </SidebarItem>
      </div>
    </motion.aside>
  )
}

function SidebarSection({ icon: Icon, label, collapsed, children }) {
  return (
    <div className="mb-4">
      <div className={`flex items-center gap-2 px-4 mb-1 ${collapsed ? 'justify-center' : ''}`}>
        <Icon size={13} className="text-gray-500 flex-shrink-0" />
        {!collapsed && <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

function SidebarItem({ collapsed, children }) {
  return (
    <div className={`flex items-center gap-2 mx-2 px-2 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors text-sm ${collapsed ? 'justify-center' : ''}`}>
      {children}
    </div>
  )
}

export default Sidebar

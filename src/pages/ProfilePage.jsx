import { useState } from 'react'
import { motion } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import ProfileCard from '../components/ProfileCard'
import MetricCard from '../components/MetricCard'
import { userProfile } from '../data/mockData'

function ProfilePage() {
  const [form, setForm] = useState({ name: userProfile.name, email: userProfile.email, role: userProfile.role })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-[900px] mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account settings</p>
        </div>

        <ProfileCard user={userProfile} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <MetricCard title="Total Analyses" value={userProfile.totalAnalyses} icon="🔍" color="from-blue-500 to-cyan-500" delay={0.1} />
          <MetricCard title="Saved Projects" value={userProfile.savedProjects} icon="📁" color="from-purple-500 to-pink-500" delay={0.15} />
          <MetricCard title="Avg Confidence" value={userProfile.avgConfidenceScore} suffix="%" icon="🎯" color="from-green-500 to-emerald-500" delay={0.2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass rounded-2xl p-6 mt-6"
        >
          <h3 className="text-lg font-semibold text-white mb-5">Edit Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Save Changes
              </motion.button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-400"
                >
                  ✓ Saved successfully
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AppLayout>
  )
}

export default ProfilePage

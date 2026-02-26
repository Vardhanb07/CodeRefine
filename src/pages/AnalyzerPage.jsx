import { useState } from 'react'
import { motion } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import CodeEditor from '../components/CodeEditor'
import ResultsPanel from '../components/ResultsPanel'
import LoadingSpinner from '../components/LoadingSpinner'
import ModeSelector from '../components/ModeSelector'
import { mockData, languageLabels } from '../data/mockData'

function AnalyzerPage() {
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState(mockData.python.sampleCode)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState('bug')
  const [customInstruction, setCustomInstruction] = useState('')

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setCode(mockData[newLang].sampleCode)
    setResults(null)
  }

  const handleAnalyze = async () => {
    setIsLoading(true)
    setResults(null)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 500))
    setResults(mockData[language].results)
    setIsLoading(false)
  }

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 max-w-[1400px] mx-auto"
      >
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Code Analyzer</h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered code analysis with multiple modes</p>
        </div>

        {/* Mode Selector */}
        <div className="glass rounded-2xl p-5 mb-6">
          <ModeSelector selectedMode={selectedMode} onSelect={setSelectedMode} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Custom Instruction (optional)</label>
            <input
              type="text"
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              placeholder="e.g. Optimize memory usage, Focus on async patterns..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-380px)]">
          {/* Left: Editor */}
          <div className="flex flex-col gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm font-medium text-gray-400">Language:</label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-white/10 border border-white/20 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {Object.entries(languageLabels).map(([value, label]) => (
                    <option key={value} value={value} className="bg-gray-900">{label}</option>
                  ))}
                </select>
              </div>
              <CodeEditor language={language} value={code} onChange={(val) => setCode(val || '')} />
              <motion.button
                onClick={handleAnalyze}
                disabled={isLoading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                className={`w-full mt-4 py-3.5 rounded-xl font-semibold text-white transition-all ${
                  isLoading
                    ? 'bg-gray-700 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20'
                }`}
              >
                {isLoading ? '⏳ Analyzing...' : '🔍 Analyze Code'}
              </motion.button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="glass rounded-2xl p-5 min-h-[600px] flex flex-col">
            {isLoading ? <LoadingSpinner /> : <ResultsPanel results={results} language={language} />}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  )
}

export default AnalyzerPage

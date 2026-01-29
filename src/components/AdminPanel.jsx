import { useState, useEffect } from 'react';

function AdminPanel({ onClose }) {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const data = JSON.parse(localStorage.getItem('futuraise_submissions') || '[]');
    setSubmissions(data.reverse()); // Newest first
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL submissions? This cannot be undone!')) {
      localStorage.removeItem('futuraise_submissions');
      setSubmissions([]);
    }
  };

  const deleteSubmission = (index) => {
    if (window.confirm('Delete this submission?')) {
      const data = JSON.parse(localStorage.getItem('futuraise_submissions') || '[]');
      data.reverse(); // Match display order
      data.splice(index, 1);
      data.reverse(); // Back to storage order
      localStorage.setItem('futuraise_submissions', JSON.stringify(data));
      loadSubmissions();
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No data to export!');
      return;
    }

    const headers = ['Name', 'Phone', 'Email', 'Grade', 'Vendor', 'Quiz Type', 'Score', 'Profile', 'Date'];
    const rows = submissions.map(s => [
      s.name,
      s.phone,
      s.email,
      s.grade,
      s.vendor || 'Unknown',
      s.quizType || 'AI Knowledge',
      s.score,
      s.profile,
      new Date(s.timestamp).toLocaleString()
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FuturAIse_Submissions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredSubmissions = submissions.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.vendor && s.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 relative z-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-violet-300/70 text-sm mt-1">
              FuturAIse Survey Submissions
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700/50 text-violet-300 rounded-lg border border-violet-500/30 hover:bg-slate-700 transition-colors"
          >
            ← Back to Survey
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-violet-500/20">
            <div className="text-3xl font-bold text-violet-400">{submissions.length}</div>
            <div className="text-violet-300/60 text-sm">Total Submissions</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/20">
            <div className="text-3xl font-bold text-cyan-400">
              {submissions.filter(s => s.grade === 'Grades 4-5').length}
            </div>
            <div className="text-cyan-300/60 text-sm">Grades 4-5</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-500/20">
            <div className="text-3xl font-bold text-amber-400">
              {submissions.filter(s => s.grade === 'Grades 6-8').length}
            </div>
            <div className="text-amber-300/60 text-sm">Grades 6-8</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-pink-500/20">
            <div className="text-3xl font-bold text-pink-400">
              {submissions.filter(s => s.grade === 'Grades 9-10').length}
            </div>
            <div className="text-pink-300/60 text-sm">Grades 9-10</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, phone, email, grade, or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-xl text-white placeholder-violet-300/50 focus:outline-none focus:border-violet-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium"
            >
              📥 Export CSV
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-3 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-colors font-medium"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800/50 rounded-2xl border border-violet-500/20 overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-violet-300/70">
                {submissions.length === 0 ? 'No submissions yet!' : 'No matching results'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50 text-left">
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">#</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Name</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Phone</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Email</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Grade</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Vendor</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Type</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Score</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Profile</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm">Date</th>
                    <th className="px-4 py-3 text-violet-300 font-medium text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-violet-300/60 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-white font-medium">{submission.name}</td>
                      <td className="px-4 py-3 text-cyan-300">{submission.phone}</td>
                      <td className="px-4 py-3 text-violet-300">{submission.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.grade === 'Grades 4-5' ? 'bg-cyan-500/20 text-cyan-300' :
                          submission.grade === 'Grades 6-8' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-pink-500/20 text-pink-300'
                        }`}>
                          {submission.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                          {submission.vendor || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.quizType === 'Beginner'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {submission.quizType || 'AI'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-emerald-300">{submission.score}/5</td>
                      <td className="px-4 py-3 text-amber-300 text-sm">{submission.profile}</td>
                      <td className="px-4 py-3 text-violet-300/60 text-sm">
                        {new Date(submission.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteSubmission(index)}
                          className="text-red-400/60 hover:text-red-400 transition-colors"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-violet-300/50 text-sm">
          FuturAIse Admin Panel • Data stored locally in browser
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

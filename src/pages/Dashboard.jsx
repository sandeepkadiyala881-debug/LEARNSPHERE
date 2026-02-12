export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Courses</h2>
          <p className="text-gray-500 text-sm">Manage your courses</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Progress</h2>
          <p className="text-gray-500 text-sm">Track your learning</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">AI Assistant</h2>
          <p className="text-gray-500 text-sm">Ask questions instantly</p>
        </div>
      </div>
    </div>
  );
}

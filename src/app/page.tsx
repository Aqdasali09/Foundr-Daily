import PostsList from '../components/ui/PostsList';
import Sidebar from '../components/ui/Sidebar';
import Header from '../components/layout/Header';
import { samplePosts } from '../data/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-light-gray">
      <div className="p-5">
        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="max-w-3xl">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">FoundrDaily</h1>
                <p className="text-gray-600">Daily updates from founders building amazing products</p>
              </header>
              
              <main>
                <PostsList posts={samplePosts} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

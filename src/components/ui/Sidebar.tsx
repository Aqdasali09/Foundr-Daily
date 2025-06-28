'use client';

import { FireIcon, UserIcon, ProjectIcon, HeartIcon, CommentIcon, ShareIcon } from '../../lib/utils/icons';

export default function Sidebar() {
  return (
    <div className="w-[300px] bg-white rounded-lg shadow-linkedin border border-border-gray overflow-hidden">
      {/* Profile Section */}
      <div className="relative pb-4 border-b border-border-gray">
        {/* Cover Image */}
        <div className="h-[54px] bg-cover-gradient relative"></div>
        
        {/* Profile Picture */}
        <div className="w-[72px] h-[72px] rounded-full bg-profile-gradient absolute top-[18px] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-2xl text-white font-semibold border-4 border-white shadow-profile">
          AJ
        </div>
        
        {/* Profile Info */}
        <div className="text-center pt-10 px-4">
          <div className="text-xl font-semibold text-dark-gray mb-1 leading-tight">Alex Johnson</div>
          <div className="text-xs text-gray-600 mb-3 leading-relaxed">Founder & CEO at TechStart • Building the future</div>
          <div className="inline-flex items-center bg-primary-blue bg-opacity-10 text-primary-blue px-3 py-1.5 rounded-2xl text-xs font-semibold border border-primary-blue border-opacity-20">
            <FireIcon size={14} className="text-primary-blue mr-1.5" />
            #247 Worldwide
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 border-b border-border-gray">
        <div className="text-base font-semibold text-dark-gray mb-4 flex items-center">
          <FireIcon size={20} className="text-primary-orange mr-2" />
          Activity Stats
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FireIcon size={16} className="text-primary-orange mr-3" />
            Current Streak
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            <span className="mr-1">23</span>
            <span>days</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <CommentIcon size={16} className="text-primary-orange mr-3" />
            Total Posts
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            <span>156</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FireIcon size={16} className="text-primary-orange mr-3" />
            Best Streak
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            <span className="mr-1">47</span>
            <span>days</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <UserIcon size={16} className="text-primary-orange mr-3" />
            Connections
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            <span>1,248</span>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="p-4">
        <div className="text-base font-semibold text-dark-gray mb-4 flex items-center">
          <ProjectIcon size={20} className="text-primary-blue mr-2" />
          Active Projects
        </div>
        
        <div className="flex items-center p-3 rounded-md mb-2 transition-all duration-200 cursor-pointer border border-transparent hover:bg-gray-50 hover:border-border-gray">
          <div className="w-10 h-10 rounded-md bg-project-gradient flex items-center justify-center mr-3 flex-shrink-0">
            <ProjectIcon size={20} className="text-primary-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-dark-gray mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">SaaS Dashboard</div>
            <div className="text-xs text-gray-600 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">Analytics platform for startup metrics</div>
          </div>
          <div className="flex items-center bg-primary-orange bg-opacity-10 text-primary-orange px-2 py-1 rounded-xl text-xs font-semibold ml-2 flex-shrink-0">
            <FireIcon size={12} className="mr-1" />
            15
          </div>
        </div>

        <div className="flex items-center p-3 rounded-md mb-2 transition-all duration-200 cursor-pointer border border-transparent hover:bg-gray-50 hover:border-border-gray">
          <div className="w-10 h-10 rounded-md bg-project-gradient flex items-center justify-center mr-3 flex-shrink-0">
            <ProjectIcon size={20} className="text-primary-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-dark-gray mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Mobile App</div>
            <div className="text-xs text-gray-600 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">React Native productivity app</div>
          </div>
          <div className="flex items-center bg-primary-orange bg-opacity-10 text-primary-orange px-2 py-1 rounded-xl text-xs font-semibold ml-2 flex-shrink-0">
            <FireIcon size={12} className="mr-1" />
            8
          </div>
        </div>

        <div className="flex items-center p-3 rounded-md transition-all duration-200 cursor-pointer border border-transparent hover:bg-gray-50 hover:border-border-gray">
          <div className="w-10 h-10 rounded-md bg-project-gradient flex items-center justify-center mr-3 flex-shrink-0">
            <ProjectIcon size={20} className="text-primary-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-dark-gray mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">AI Assistant</div>
            <div className="text-xs text-gray-600 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">GPT-powered business automation</div>
          </div>
          <div className="flex items-center bg-primary-orange bg-opacity-10 text-primary-orange px-2 py-1 rounded-xl text-xs font-semibold ml-2 flex-shrink-0">
            <FireIcon size={12} className="mr-1" />
            12
          </div>
        </div>
      </div>

      {/* View Profile */}
      <div className="text-center p-4 border-t border-border-gray">
        <a href="#" className="text-primary-blue text-sm font-semibold no-underline py-2 px-4 rounded-full border border-primary-blue transition-all duration-200 inline-block hover:bg-primary-blue hover:text-white">
          View full profile
        </a>
      </div>
    </div>
  );
} 
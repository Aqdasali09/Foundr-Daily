'use client';

import { Post } from '../../types/post';
import { formatRelativeTime } from '../../lib/utils/time';
import { HeartIcon, HeartFilledIcon, CommentIcon, ShareIcon, FireIcon, UserIcon, ProjectIcon } from '../../lib/utils/icons';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-sky-blue-light flex items-center justify-center text-white font-semibold text-base">
            {post.profileImg ? (
              <img 
                src={post.profileImg} 
                alt={post.personName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon size={20} className="text-white" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{post.personName}</h4>
            <div className="text-gray-500 text-xs">{formatRelativeTime(post.time)}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-gradient-to-br from-flame-orange to-flame-orange-light text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          <FireIcon size={14} className="text-white" />
          <span>{post.streakCount}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 bg-gradient-to-r from-sky-blue/10 to-sky-blue/5 border border-sky-blue/20 px-3 py-2 rounded-xl">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-blue to-sky-blue-light flex items-center justify-center">
            <ProjectIcon size={14} className="text-white" />
          </div>
          <span className="text-sky-blue font-semibold text-sm">{post.projectName}</span>
        </div>
      </div>
      
      <div className="text-base text-gray-900 leading-6 mb-5">
        {post.oneLiner}
      </div>
      
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        <button 
          onClick={handleLike}
          className={`action-btn flex items-center gap-2 bg-transparent border-0 cursor-pointer text-sm font-medium px-3 py-2 rounded-lg transition-all hover:bg-orange-50 ${
            isLiked ? 'text-flame-orange' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isLiked ? (
            <HeartFilledIcon size={16} className="text-flame-orange" />
          ) : (
            <HeartIcon size={16} className="text-gray-600" />
          )}
          <span>{likeCount}</span>
        </button>
        <button className="action-btn flex items-center gap-2 bg-transparent border-0 text-gray-600 cursor-pointer text-sm font-medium px-3 py-2 rounded-lg transition-all hover:bg-gray-100 hover:text-gray-900">
          <CommentIcon size={16} className="text-gray-600" />
          <span>{post.commentCount}</span>
        </button>
        <button className="action-btn flex items-center gap-2 bg-transparent border-0 text-gray-600 cursor-pointer text-sm font-medium px-3 py-2 rounded-lg transition-all hover:bg-gray-100 hover:text-gray-900">
          <ShareIcon size={16} className="text-gray-600" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
} 
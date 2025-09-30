// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>FoundrDaily Guest Sidebar</title>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
//     <script src="https://cdn.tailwindcss.com"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/umd/lucide.js"></script>
//     <script>
//         tailwind.config = {
//             theme: {
//                 extend: {
//                     fontFamily: {
//                         'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
//                     },
//                     colors: {
//                         'primary-orange': '#FF6B00',
//                         'primary-blue': '#009FFD',
//                         'light-gray': '#F4F4F4',
//                         'dark-gray': '#2D2D2D',
//                         'border-gray': '#e1e5e9',
//                     },
//                     boxShadow: {
//                         'linkedin': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
//                         'profile': '0 2px 8px rgba(0, 0, 0, 0.15)',
//                     },
//                     backgroundImage: {
//                         'cover-gradient': 'linear-gradient(135deg, #FF6B00 0%, #009FFD 100%)',
//                         'cta-gradient': 'linear-gradient(135deg, #FF6B00, #009FFD)',
//                         'feature-gradient': 'linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(0, 159, 253, 0.1))',
//                     }
//                 }
//             }
//         }
//     </script>
//     <style>
//         .font-inter {
//             font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }
//     </style>
// </head>
// <body class="font-inter bg-light-gray p-5 min-h-screen">
//     <div class="w-[300px] bg-white rounded-lg shadow-linkedin border border-border-gray overflow-hidden">
//         <!-- Header Section -->
//         <div class="relative">
//             <!-- Cover Image -->
//             <div class="h-[54px] bg-cover-gradient relative flex items-center justify-center">
//                 <div class="text-white font-bold text-lg">FoundrDaily</div>
//             </div>
            
//             <!-- Welcome Message -->
//             <div class="text-center pt-6 px-4 pb-4">
//                 <div class="text-xl font-semibold text-dark-gray mb-2">Welcome to FoundrDaily</div>
//                 <div class="text-sm text-gray-600 leading-relaxed">Join 10,000+ founders building their dreams daily</div>
//             </div>
//         </div>

//         <!-- Call to Action -->
//         <div class="px-4 pb-4">
//             <button class="w-full bg-cta-gradient text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg mb-3">
//                 Join FoundrDaily
//             </button>
//             <button class="w-full border-2 border-primary-blue text-primary-blue font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-primary-blue hover:text-white">
//                 Sign In
//             </button>
//         </div>

//         <!-- Features Section -->
//         <div class="px-4 pb-4 border-b border-border-gray">
//             <div class="text-base font-semibold text-dark-gray mb-4 flex items-center">
//                 <i data-lucide="star" class="w-5 h-5 mr-2 text-primary-orange"></i>
//                 Why Join Us?
//             </div>
            
//             <div class="space-y-3">
//                 <div class="flex items-start">
//                     <div class="w-8 h-8 rounded-lg bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
//                         <i data-lucide="trending-up" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div>
//                         <div class="text-sm font-medium text-dark-gray">Track Your Progress</div>
//                         <div class="text-xs text-gray-600 leading-tight">Build streaks and stay consistent with your startup journey</div>
//                     </div>
//                 </div>
                
//                 <div class="flex items-start">
//                     <div class="w-8 h-8 rounded-lg bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
//                         <i data-lucide="users" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div>
//                         <div class="text-sm font-medium text-dark-gray">Connect with Founders</div>
//                         <div class="text-xs text-gray-600 leading-tight">Network with like-minded entrepreneurs worldwide</div>
//                     </div>
//                 </div>
                
//                 <div class="flex items-start">
//                     <div class="w-8 h-8 rounded-lg bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
//                         <i data-lucide="target" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div>
//                         <div class="text-sm font-medium text-dark-gray">Achieve Your Goals</div>
//                         <div class="text-xs text-gray-600 leading-tight">Set milestones and celebrate your wins</div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <!-- Community Stats -->
//         <div class="p-4 border-b border-border-gray">
//             <div class="text-base font-semibold text-dark-gray mb-4 flex items-center">
//                 <i data-lucide="activity" class="w-5 h-5 mr-2 text-primary-blue"></i>
//                 Community Stats
//             </div>
            
//             <div class="grid grid-cols-2 gap-4">
//                 <div class="text-center">
//                     <div class="text-xl font-bold text-primary-orange">10K+</div>
//                     <div class="text-xs text-gray-600">Active Founders</div>
//                 </div>
//                 <div class="text-center">
//                     <div class="text-xl font-bold text-primary-blue">50K+</div>
//                     <div class="text-xs text-gray-600">Daily Posts</div>
//                 </div>
//                 <div class="text-center">
//                     <div class="text-xl font-bold text-primary-orange">500+</div>
//                     <div class="text-xs text-gray-600">Success Stories</div>
//                 </div>
//                 <div class="text-center">
//                     <div class="text-xl font-bold text-primary-blue">95%</div>
//                     <div class="text-xs text-gray-600">Satisfaction Rate</div>
//                 </div>
//             </div>
//         </div>

//         <!-- Featured Projects -->
//         <div class="p-4">
//             <div class="text-base font-semibold text-dark-gray mb-4 flex items-center">
//                 <i data-lucide="briefcase" class="w-5 h-5 mr-2 text-primary-blue"></i>
//                 Featured Projects
//             </div>
            
//             <div class="space-y-3">
//                 <div class="flex items-center p-3 rounded-md bg-gray-50 border border-gray-100">
//                     <div class="w-8 h-8 rounded-md bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0">
//                         <i data-lucide="rocket" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div class="flex-1 min-w-0">
//                         <div class="text-sm font-medium text-dark-gray">AI Startup</div>
//                         <div class="text-xs text-gray-600">30-day streak</div>
//                     </div>
//                     <div class="text-primary-orange text-xs font-semibold">🔥 30</div>
//                 </div>
                
//                 <div class="flex items-center p-3 rounded-md bg-gray-50 border border-gray-100">
//                     <div class="w-8 h-8 rounded-md bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0">
//                         <i data-lucide="shopping-cart" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div class="flex-1 min-w-0">
//                         <div class="text-sm font-medium text-dark-gray">E-commerce</div>
//                         <div class="text-xs text-gray-600">45-day streak</div>
//                     </div>
//                     <div class="text-primary-orange text-xs font-semibold">🔥 45</div>
//                 </div>
                
//                 <div class="flex items-center p-3 rounded-md bg-gray-50 border border-gray-100">
//                     <div class="w-8 h-8 rounded-md bg-feature-gradient flex items-center justify-center mr-3 flex-shrink-0">
//                         <i data-lucide="heart" class="w-4 h-4 text-primary-orange"></i>
//                     </div>
//                     <div class="flex-1 min-w-0">
//                         <div class="text-sm font-medium text-dark-gray">HealthTech</div>
//                         <div class="text-xs text-gray-600">60-day streak</div>
//                     </div>
//                     <div class="text-primary-orange text-xs font-semibold">🔥 60</div>
//                 </div>
//             </div>
//         </div>

//         <!-- Footer CTA -->
//         <div class="text-center p-4 bg-gray-50 border-t border-border-gray">
//             <div class="text-xs text-gray-600 mb-3">Ready to start your founder journey?</div>
//             <button class="text-primary-blue text-sm font-semibold hover:underline">
//                 Learn More →
//             </button>
//         </div>
//     </div>

//     <script>
//         // Initialize Lucide icons
//         lucide.createIcons();
//     </script>
// </body>
// </html>